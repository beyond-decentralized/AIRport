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
	getFullApplicationNameFromDomainAndName,
	INTERNAL_DOMAIN
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
	ITransactionHistory,
	IRepositoryTransactionHistory,
} from '@airport/holding-pattern';
import {
	ICredentials,
	IStoreDriver,
	ITransaction,
	ITransactionContext,
	ITransactionCredentials,
	ITransactionInitiator,
	ITransactionManager,
	ITransactionManagerStore,
	STORE_DRIVER,
	TERMINAL_STORE,
	TRANSACTION_MANAGER
} from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';

export class TransactionManager
	extends AbstractMutationManager
	implements ITransactionManager {

	/**
	 * Initializes the EntityManager at server load time.
	 * @returns {Promise<void>}
	 */
	async initialize(
		dbName: string,
		context: IContext,
	): Promise<void> {
		const storeDriver = await container(this).get(STORE_DRIVER);

		return await storeDriver.initialize(dbName, context);
		// await this.dataStore.initialize(dbName)
		// await this.repositoryManager.initialize();
	}

	getInProgressTransactionById(
		transactionId: string
	): ITransaction {
		const terminalStore = container(this).getSync(TERMINAL_STORE)

		return terminalStore.getTransactionManager().transactionInProgressMap.get(transactionId)
	}

	isServer(
		context?: ITransactionContext
	) {
		return container(this).getSync(STORE_DRIVER).isServer(context);
	}

	async transact(
		credentials: ITransactionCredentials,
		transactionalCallback: {
			(
				transaction: IStoreDriver,
				context: IContext
			): Promise<void> | void
		},
		context: ITransactionContext,
	): Promise<void> {
		if (context.transaction) {
			// Nested transactal() calls in internal operations
			// do not create nested transactions 
			await transactionalCallback(context.transaction, context)
			return
		}
		const transaction = await this.startTransaction(credentials, context)

		try {
			await transactionalCallback(transaction, context);
			await this.commit(credentials, context);
		} catch (e) {
			await this.rollback(credentials, context);
			throw e
		}
	}

	async startTransaction(
		credentials: ITransactionCredentials,
		context: ITransactionContext,
	): Promise<ITransaction> {
		const terminalStore = await container(this).get(TERMINAL_STORE);
		const transactionManagerStore = terminalStore.getTransactionManager()

		let parentTransaction: ITransaction
		if (credentials.transactionId) {
			parentTransaction = transactionManagerStore
				.transactionInProgressMap.get(credentials.transactionId)
			if (!parentTransaction) {
				throw new Error(`
Recieved a startTransaction call (@Api call) with parent transaction id:
	${credentials.transactionId}
But, there is no such transaction in progress.`)
			}
			if (parentTransaction.id !==
				credentials.transactionId) {
				throw new Error(`
In-progress transaction id does not match the passed in transaction id:
${credentials.transactionId}`)
			}
			this.checkForCircularDependencies(parentTransaction, credentials)
		} else {
			/*
			 * NOTE: Current policy is to NOT limit the number of transactions
			 * a domain can initiate.  In the future, specifically for the
			 * client-side Turbase, it may make sence to limit the number
			 * of transactions to 1 per tab.  This can be accomplished by
			 * generating a unique id on the nested client iframe of an
			 * application. 
			 */
			/*
throw new Error(`
	Domain:
		${credentials.domain}
	Application:
		${credentials.application}
initialized multiple transactions at the same time.
Only one concurrent transaction is allowed per application.`)
			*/
			if (!this.isServer(context)
				&& transactionManagerStore.transactionInProgressMap.size > 0) {
				// Delay the start of the transaction
				return new Promise((resolve, reject) => {
					// Add the transaction to the queue of pending transactions
					transactionManagerStore.pendingTransactionQueue.unshift({
						credentials,
						reject,
						resolve
					})
				})
			}
		}

		return await this.internalStartTransaction(credentials,
			parentTransaction, context)
	}

	private async internalStartTransaction(
		credentials: ITransactionCredentials,
		parentTransaction: ITransaction,
		context: ITransactionContext,
	): Promise<ITransaction> {
		const [storeDriver, terminalStore] = await container(this)
			.get(STORE_DRIVER, TERMINAL_STORE);

		const transactionManagerStore = terminalStore.getTransactionManager()
		const transaction = await storeDriver.setupTransaction(context, parentTransaction)
		await storeDriver.startTransaction(transaction, context)

		transaction.credentials = credentials
		await this.setupTransaction(credentials, transaction, parentTransaction,
			transactionManagerStore, context)

		return transaction
	}

	async rollback(
		credentials: ITransactionCredentials,
		context: ITransactionContext,
	): Promise<void> {
		const transaction = await this.getTransactionFromContextOrCredentials(
			credentials, context)

		let parentTransaction = transaction.parentTransaction
		await transaction.rollback(null, context);
		await this.clearTransaction(transaction, parentTransaction, credentials, context);

		await this.resumeParentOrPendingTransaction(parentTransaction, context)
	}

	private async getTransactionFromContextOrCredentials(
		credentials: ITransactionCredentials,
		context: ITransactionContext,
	): Promise<ITransaction> {
		let transaction = context.transaction
		if (!transaction) {
			if (!credentials.transactionId) {
				throw new Error(`
No Transaction Id is passed in Credentials for a Rollback operation.
				`)
			}
			const terminalStore = await container(this).get(TERMINAL_STORE)
			const transactionManagerStore = terminalStore.getTransactionManager()
			transaction = transactionManagerStore.transactionInProgressMap.get(credentials.transactionId)
			if (!transaction) {
				throw new Error(`
Could not find Transaction: ${credentials.transactionId} in Transactons in-progress.
NOTE: nested/child transactions must be commited or rolled back before their
parent transactions.
				`)
			}
		}

		return transaction
	}

	private async resumeParentOrPendingTransaction(
		parentTransaction: ITransaction,
		context: ITransactionContext,
	): Promise<void> {
		const terminalStore = await container(this).get(TERMINAL_STORE);
		const transactionManagerStore = terminalStore.getTransactionManager()
		if (parentTransaction) {
			await this.setupTransaction(parentTransaction.credentials, parentTransaction,
				parentTransaction.parentTransaction, transactionManagerStore,
				context)
		} else if (transactionManagerStore.pendingTransactionQueue.length) {
			const pendingTransaction = transactionManagerStore.pendingTransactionQueue.pop()
			const transaction = await this.internalStartTransaction(pendingTransaction.credentials,
				null, context)
			pendingTransaction.resolve(transaction)
		}
	}

	async commit(
		credentials: ITransactionCredentials,
		context: ITransactionContext,
	): Promise<void> {
		const transaction = await this.getTransactionFromContextOrCredentials(
			credentials, context)

		let parentTransaction = transaction.parentTransaction

		try {
			await this.saveRepositoryHistory(transaction, context);

			await transaction.saveTransaction(transaction.transHistory);

			const activeQueries = await container(this).get(ACTIVE_QUERIES);
			activeQueries.rerunQueries();
			await transaction.commit(null, context);

			let transactionHistory = transaction.transHistory;

			transaction.priorRepositoryTransactionHistories
				= transaction.priorRepositoryTransactionHistories.concat(
					transactionHistory.repositoryTransactionHistories
				)
			if (transactionHistory.allRecordHistory.length) {
				if (parentTransaction) {
					parentTransaction.priorRepositoryTransactionHistories
						= parentTransaction.priorRepositoryTransactionHistories.concat(
							transaction.priorRepositoryTransactionHistories
						)
				} else {
					const synchronizationOutManager = await container(this)
						.get(SYNCHRONIZATION_OUT_MANAGER)

					const compositeRepositoryTransactionHistories =
						this.composeRepositoryTransactionHistories(transactionHistory)

					await synchronizationOutManager.synchronizeOut(
						compositeRepositoryTransactionHistories)
				}
			}

		} finally {
			await this.clearTransaction(transaction, parentTransaction, credentials, context);
			// Right now transactions are tied to @Api() calls,
			// If an @Api() fails to commit the parent @Api() call should resume
			// it's transaction or the next 
			await this.resumeParentOrPendingTransaction(parentTransaction, context)
		}
	}

	private composeRepositoryTransactionHistories(
		transactionHistory: ITransactionHistory
	): IRepositoryTransactionHistory[] {
		// TODO: work here next
		// Need to differenciate between already saved transaction histories
		// form child transactions and new ones (from this transaction)

		// merge transactionHistory.childTransactionRepositoryTransactionHistories
	}


	private checkForCircularDependencies(
		transaction: ITransaction,
		credentials: ITransactionCredentials
	): void {
		if (credentials.domain === INTERNAL_DOMAIN) {
			return
		}
		do {
			if (this.isSameSource(transaction, credentials)) {
				let callHerarchy = this.getApiName(credentials)
				let hierarchyTransaction = this.transactionInProgress
				do {
					callHerarchy = `${this.getApiName(hierarchyTransaction.initiator)} ->
${callHerarchy}`
				} while (hierarchyTransaction = hierarchyTransaction.parentTransaction)
				throw new Error(`Circular API call detected:
				
${callHerarchy}

				`)
			}

		} while (transaction = transaction.parentTransaction)
	}

	private async setupTransaction(
		credentials: ITransactionCredentials,
		transaction: ITransaction,
		parentTransaction: ITransaction,
		transactionManagerStore: ITransactionManagerStore,
		context: ITransactionContext,
	): Promise<void> {
		context.transaction = transaction
		credentials.transactionId = transaction.id

		const transHistoryDuo = await container(this).get(TRANSACTION_HISTORY_DUO);
		transaction.transHistory = transHistoryDuo.getNewRecord();

		transactionManagerStore.transactionInProgressMap.set(transaction.id, transaction)
		if (parentTransaction) {
			transactionManagerStore.transactionInProgressMap.delete(parentTransaction.id)
		} else {
			transactionManagerStore.rootTransactionInProgressMap.set(transaction.id, transaction)
		}
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

	private isSameSource(
		transaction: ITransaction,
		credentials: ITransactionCredentials
	): boolean {
		const initiator = transaction.initiator
		return initiator.domain === credentials.domain
			&& initiator.application === credentials.application
			&& initiator.objectName === credentials.objectName
			&& initiator.methodName === credentials.methodName
	}

	private getApiName(
		nameContainer: ITransactionInitiator | ITransactionCredentials
	) {
		return `${nameContainer.domain}.${nameContainer.application}.${nameContainer.objectName}.${nameContainer.methodName}`
	}

	private async clearTransaction(
		transaction: ITransaction,
		parentTransaction: ITransaction,
		credentials: ITransactionCredentials,
		context: ITransactionContext
	): Promise<void> {
		const terminalStore = await container(this).get(TERMINAL_STORE)

		const transactionManagerStore = terminalStore.getTransactionManager()
		transactionManagerStore.transactionInProgressMap.delete(transaction.id)

		if (!parentTransaction) {
			transactionManagerStore.rootTransactionInProgressMap.delete(transaction.id)
		}
		context.transaction = null
		credentials.transactionId = null
	}

	private async saveRepositoryHistory(
		transaction: ITransaction,
		context: ITransactionContext,
	): Promise<boolean> {
		let transactionHistory = transaction.transHistory;
		if (!transactionHistory.allRecordHistory.length) {
			return false;
		}
		let applicationMap = transactionHistory.applicationMap;

		const idGenerator = await container(this).get(ID_GENERATOR)

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
		context: ITransactionContext,
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
