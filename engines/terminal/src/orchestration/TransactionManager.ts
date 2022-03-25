import { IQEntityInternal } from '@airport/air-control';
import {
	container,
	DI,
	IContext
} from '@airport/di';
import {
	ACTIVE_QUERIES,
	ID_GENERATOR,
	IIdGenerator
} from '@airport/fuel-hydrant-system';
import {
	StoreType,
	getFullApplicationNameFromDomainAndName
} from '@airport/ground-control';
import { SYNCHRONIZATION_OUT_MANAGER } from '@airport/ground-transport';
import {
	OperationHistory,
	Q,
	RecordHistory,
	RecordHistoryNewValue,
	RecordHistoryOldValue,
	RepositoryTransactionHistory,
	TRANSACTION_HISTORY_DUO,
	TransactionHistory,
} from '@airport/holding-pattern';
import {
	ICredentials,
	IStoreDriver,
	ITransaction,
	ITransactionContext,
	ITransactionManager,
	STORE_DRIVER,
	TRANSACTION_MANAGER
} from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';

export class TransactionManager
	extends AbstractMutationManager
	implements ITransactionManager {

	// Keyed by repository index
	storeType: StoreType;
	transactionIndexQueue: string[] = [];
	sourceOfTransactionInProgress: string = null;
	transactionInProgress: ITransaction = null;
	yieldToRunningTransaction: number = 200;

	/**
	 * Initializes the EntityManager at server load time.
	 * @returns {Promise<void>}
	 */
	async initialize(
		dbName: string,
		context: IContext,
	): Promise<void> {
		const storeDriver = await container(this)
			.get(STORE_DRIVER);

		return await storeDriver.initialize(dbName, context);
		// await this.dataStore.initialize(dbName)
		// await this.repositoryManager.initialize();
	}

	isServer(
		context?: IContext
	) {
		return container(this).getSync(STORE_DRIVER).isServer(context);
	}

	async transact(
		credentials: ICredentials,
		transactionalCallback: {
			(
				transaction: IStoreDriver,
				context: IContext
			): Promise<void> | void
		},
		context: ITransactionContext,
	): Promise<void> {
		if (context.transaction) {
			await transactionalCallback(context.transaction, context)
			return
		}
		const storeDriver = await container(this).get(STORE_DRIVER);

		if(!await this.startTransactionPrep(credentials, context, transactionalCallback)) {
			return
		}

		await storeDriver.transact(async (
			transaction: ITransaction,
		) => {
			await this.setupTransaction(credentials, transaction, context)
			try {
				await transactionalCallback(transaction, context);
				await this.commit(transaction, context);
			} catch (e) {
				console.error(e);
				await this.rollback(transaction, context);
			} finally {
				context.transaction = null
			}
		}, context);
	}

	async startTransaction(
		credentials: ICredentials,
		context: ITransactionContext,
	): Promise<void> {
		const storeDriver = await container(this).get(STORE_DRIVER);

		if(!await this.startTransactionPrep(credentials, context)) {
			return
		}

		const transaction = await storeDriver.startTransaction()

		await this.setupTransaction(credentials, transaction, context)
	}

	async rollback(
		transaction: ITransaction,
		context: IContext,
	): Promise<void> {
		const storeDriver = await container(this).get(STORE_DRIVER);
		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			transaction.credentials.domain, transaction.credentials.application)
		if (!storeDriver.isServer(context) && this.sourceOfTransactionInProgress
			!== fullApplicationName) {
			let foundTransactionInQueue = false;
			this.transactionIndexQueue.filter(
				transIndex => {
					if (transIndex === fullApplicationName) {
						foundTransactionInQueue = true;
						return false;
					}
					return true;
				});
			if (!foundTransactionInQueue) {
				throw new Error(
					`Could not find transaction '${fullApplicationName}' is not found`);
			}
			return;
		}
		try {
			await transaction.rollback();
		} finally {
			this.clearTransaction();
		}
	}

	async commit(
		transaction: ITransaction,
		context: IContext,
	): Promise<void> {
		const [activeQueries, idGenerator, storeDriver] = await container(this)
			.get(
				ACTIVE_QUERIES, ID_GENERATOR, STORE_DRIVER,
			);

		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			transaction.credentials.domain, transaction.credentials.application)
		if (!storeDriver.isServer(context)
			&& this.sourceOfTransactionInProgress !== fullApplicationName) {
			throw new Error(
				`Cannot commit inactive transaction '${fullApplicationName}'.`);
		}

		try {
			await this.saveRepositoryHistory(transaction, idGenerator, context);

			await transaction.saveTransaction(transaction.transHistory);

			activeQueries.rerunQueries();
			await transaction.commit();
		} finally {
			this.clearTransaction();
		}

		let transactionHistory = transaction.transHistory;
		if (!transactionHistory.allRecordHistory.length) {
			return;
		}

		const synchronizationOutManager = await container(this)
			.get(SYNCHRONIZATION_OUT_MANAGER)

		await synchronizationOutManager.synchronizeOut(
			transactionHistory.repositoryTransactionHistories)
	}

	async startTransactionPrep(
		credentials: ICredentials,
		context: ITransactionContext,
		transactionalCallback?: {
			(
				transaction: IStoreDriver,
				context: IContext
			): Promise<void> | void
		},
	): Promise<boolean> {
		if (context.transaction) {
			return false
		}
		const storeDriver = await container(this).get(STORE_DRIVER);

		const isServer = storeDriver.isServer(context)
		const fullApplicationName = getFullApplicationNameFromDomainAndName(
			credentials.domain, credentials.application)

		if (!isServer) {
			if (fullApplicationName === this.sourceOfTransactionInProgress) {
				if (transactionalCallback) {
					await transactionalCallback(this.transactionInProgress, context);
				}
				return false
			} else if (this.transactionIndexQueue.filter(
				transIndex =>
					transIndex === fullApplicationName,
			).length) {
				// Either just continue using the current transaction
				// or return (domain shouldn't be initiating multiple transactions
				// at the same time
				throw new Error(`
	Domain:
		${credentials.domain}
	Application:
		${credentials.application}
initialized multiple transactions at the same time.
Only one concurrent transaction is allowed per application.`)
				// return;
			}
			this.transactionIndexQueue.push(fullApplicationName);
		}

		while (!this.canRunTransaction(fullApplicationName, storeDriver, context)) {
			await this.wait(this.yieldToRunningTransaction);
		}
		if (!isServer) {
			this.transactionIndexQueue = this.transactionIndexQueue.filter(
				transIndex =>
					transIndex !== fullApplicationName,
			);
			this.sourceOfTransactionInProgress = fullApplicationName;
		}

		return true
	}

	private async setupTransaction(
		credentials: ICredentials,
		transaction: ITransaction,
		context: IContext,
	): Promise<void> {
		const transHistoryDuo = await container(this)
			.get(TRANSACTION_HISTORY_DUO);
		this.transactionInProgress = transaction
		context.transaction = transaction
		transaction.transHistory = transHistoryDuo.getNewRecord();
		transaction.credentials = credentials;
	}

	// @Transactional()
	// private async recordRepositoryTransactionBlock(
	// 	transaction: IRepositoryTransactionHistory
	// ): Promise<void> {
	// 	if (this.onlineManager.isOnline()) {
	// 		// let repository = transaction.repository;
	// 		transaction.serialize();
	//
	// 		let deltaStore = this.repositoryManager.getDeltaStore(transaction.repository);
	// 		await deltaStore.addChanges(deltaStore.config.changeListConfig, [transaction]);
	//
	// 		transaction.deserialize(
	// 			// repository
	// 		);
	// 		await this.offlineDeltaStore.markChangesAsSynced(transaction.repository,
	// [transaction]);
	// this.queries.markQueriesToRerun(transaction.transactionHistory.applicationMap); } }

	private clearTransaction() {
		this.sourceOfTransactionInProgress = null;
		this.transactionInProgress = null;
		if (this.transactionIndexQueue.length) {
			this.sourceOfTransactionInProgress = this.transactionIndexQueue.shift();
		}
	}

	private async saveRepositoryHistory(
		transaction: ITransaction,
		idGenerator: IIdGenerator,
		context: IContext,
	): Promise<boolean> {
		let transactionHistory = transaction.transHistory;
		if (!transactionHistory.allRecordHistory.length) {
			return false;
		}
		let applicationMap = transactionHistory.applicationMap;

		const transHistoryIds = await idGenerator.generateTransactionHistoryIds(
			transactionHistory.repositoryTransactionHistories.length,
			transactionHistory.allOperationHistory.length,
			transactionHistory.allRecordHistory.length
		);

		applicationMap.ensureEntity((<IQEntityInternal><any>Q.TransactionHistory).__driver__.dbEntity, true);
		transactionHistory.id = transHistoryIds.transactionHistoryId;
		await this.doInsertValues(transaction, Q.TransactionHistory,
			[transactionHistory], context);

		applicationMap.ensureEntity((<IQEntityInternal><any>Q.RepositoryTransactionHistory).__driver__.dbEntity, true);
		transactionHistory.repositoryTransactionHistories.forEach((
			repositoryTransactionHistory,
			index,
		) => {
			repositoryTransactionHistory.id = transHistoryIds.repositoryHistoryIds[index];
			repositoryTransactionHistory.transactionHistory = transactionHistory
		});
		await this.doInsertValues(transaction, Q.RepositoryTransactionHistory,
			transactionHistory.repositoryTransactionHistories, context);

		applicationMap.ensureEntity((<IQEntityInternal><any>Q.OperationHistory).__driver__.dbEntity, true);
		transactionHistory.allOperationHistory.forEach((
			operationHistory,
			index,
		) => {
			operationHistory.id = transHistoryIds.operationHistoryIds[index];
		});
		await this.doInsertValues(transaction, Q.OperationHistory,
			transactionHistory.allOperationHistory, context);

		applicationMap.ensureEntity((<IQEntityInternal><any>Q.RecordHistory).__driver__.dbEntity, true);
		transactionHistory.allRecordHistory.forEach((
			recordHistory,
			index,
		) => {
			recordHistory.id = transHistoryIds.recordHistoryIds[index];
		});
		await this.doInsertValues(transaction,
			(<IQEntityInternal><any>Q.RecordHistory),
			transactionHistory.allRecordHistory, context);

		if (transactionHistory.allRecordHistoryNewValues.length) {
			applicationMap.ensureEntity((<IQEntityInternal><any>Q.RecordHistoryNewValue).__driver__.dbEntity, true);
			await this.doInsertValues(transaction,
				Q.RecordHistoryNewValue, transactionHistory.allRecordHistoryNewValues,
				context);
		}

		if (transactionHistory.allRecordHistoryOldValues.length) {
			applicationMap.ensureEntity((<IQEntityInternal><any>Q.RecordHistoryOldValue).__driver__.dbEntity, true);
			await this.doInsertValues(transaction,
				Q.RecordHistoryOldValue, transactionHistory.allRecordHistoryOldValues,
				context);
		}

		return true;
	}

	private async wait(timeoutMillis: number,
	) {
		return new Promise<void>((
			resolve,
			reject,
		) => {
			try {
				setTimeout(() => {
					resolve();
				}, timeoutMillis);
			} catch (error) {
				console.error(error);
				reject(error);
			}
		});
	}

	private canRunTransaction(
		domainAndPort: string,
		storeDriver: IStoreDriver,
		context: IContext,
	): boolean {
		if (storeDriver.isServer(context)) {
			return true;
		}
		if (this.sourceOfTransactionInProgress) {
			return false;
		}

		return this.transactionIndexQueue[this.transactionIndexQueue.length - 1]
			=== domainAndPort;
	}

}
DI.set(TRANSACTION_MANAGER, TransactionManager);
