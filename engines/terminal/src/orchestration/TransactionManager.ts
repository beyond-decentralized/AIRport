import { IQEntityInternal } from '@airport/air-control';
import {
	DEPENDENCY_INJECTION,
	IContext
} from '@airport/direction-indicator';
import {
	IActiveQueries,
	IIdGenerator,
} from '@airport/fuel-hydrant-system';
import {
	INTERNAL_DOMAIN,
	IRootTransaction
} from '@airport/ground-control';
import { ISynchronizationOutManager } from '@airport/ground-transport';
import {
	ITransactionHistoryDuo,
	Q
} from '@airport/holding-pattern';
import {
	IStoreDriver,
	ITerminalStore,
	ITransaction,
	ITransactionContext,
	ITransactionCredentials,
	ITransactionInitiator,
	ITransactionManager,
	ITransactionManagerStore,
	TRANSACTION_MANAGER
} from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';

export class TransactionManager
	extends AbstractMutationManager
	implements ITransactionManager {

	activeQueries: IActiveQueries
	idGenerator: IIdGenerator
	storeDriver: IStoreDriver
	synchronizationOutManager: ISynchronizationOutManager
	terminalStore: ITerminalStore
	transactionHistoryDuo: ITransactionHistoryDuo

	/**
	 * Initializes the EntityManager at server load time.
	 * @returns {Promise<void>}
	 */
	async initialize(
		dbName: string,
		context: IContext,
	): Promise<void> {
		return await this.storeDriver.initialize(dbName, context);
		// await this.dataStore.initialize(dbName)
		// await this.repositoryManager.initialize();
	}

	getInProgressTransactionById(
		transactionId: string
	): ITransaction {
		return this.terminalStore.getTransactionManager()
			.transactionInProgressMap.get(transactionId)
	}

	isServer(
		context?: ITransactionContext
	) {
		return this.storeDriver.isServer(context);
	}

	async transact(
		credentials: ITransactionCredentials,
		transactionalCallback: {
			(
				transaction: IStoreDriver,
				context: ITransactionContext
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
		const transactionManagerStore = this.terminalStore.getTransactionManager()

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

		const transaction = await this.internalStartTransaction(credentials,
			parentTransaction, context)
		if (!parentTransaction) {
			(transaction as any as IRootTransaction).numberOfOperations = 0
		}

		return transaction
	}

	private async internalStartTransaction(
		credentials: ITransactionCredentials,
		parentTransaction: ITransaction,
		context: ITransactionContext,
	): Promise<ITransaction> {
		const transactionManagerStore = this.terminalStore.getTransactionManager()
		const transaction = await this.storeDriver
			.setupTransaction(context, parentTransaction)
		await this.storeDriver.startTransaction(transaction, context)

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

	async getTransactionFromContextOrCredentials(
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
			const transactionManagerStore = this.terminalStore
				.getTransactionManager()
			transaction = transactionManagerStore.transactionInProgressMap.get(credentials.transactionId)
			if (!transaction) {
				throw new Error(`
Could not find Transaction: ${credentials.transactionId} in Transactons in-progress.
NOTE: nested/child transactions must be commited or rolled back before their
parent transactions.
				`)
			}
			context.transaction = transaction
		}
		let ancestorTransaction = transaction
		while (ancestorTransaction = ancestorTransaction.parentTransaction);
		context.rootTransaction = ancestorTransaction as any as IRootTransaction

		return transaction
	}

	private async resumeParentOrPendingTransaction(
		parentTransaction: ITransaction,
		context: ITransactionContext,
	): Promise<void> {
		const transactionManagerStore = this.terminalStore
			.getTransactionManager()
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
			if (parentTransaction) {
				// Copy transaction history to the parent transaction
				let childTransactionHistory = transaction.transactionHistory
				let parentTransactionHistory = parentTransaction.transactionHistory
				for (const operationHistory of childTransactionHistory.allOperationHistory) {
					const repositoryId = operationHistory.repositoryTransactionHistory.repository.id
					const parentRepositoryTransactionRecord = parentTransactionHistory
						.repositoryTransactionHistoryMap[repositoryId]
					if (parentRepositoryTransactionRecord) {
						operationHistory.repositoryTransactionHistory = parentRepositoryTransactionRecord
					} else {
						parentTransactionHistory.repositoryTransactionHistoryMap[repositoryId]
							= operationHistory.repositoryTransactionHistory
						parentTransactionHistory.repositoryTransactionHistories
							.push(operationHistory.repositoryTransactionHistory)
					}
				}
				parentTransactionHistory.allOperationHistory = parentTransactionHistory
					.allOperationHistory.concat(childTransactionHistory.allOperationHistory)
				parentTransactionHistory.allRecordHistory = parentTransactionHistory
					.allRecordHistory.concat(childTransactionHistory.allRecordHistory)
				parentTransactionHistory.allRecordHistoryNewValues = parentTransactionHistory
					.allRecordHistoryNewValues.concat(childTransactionHistory.allRecordHistoryNewValues)
				parentTransactionHistory.allRecordHistoryOldValues = parentTransactionHistory
					.allRecordHistoryOldValues.concat(childTransactionHistory.allRecordHistoryOldValues)

			} else {
				// This is the root transaction, save it's history, along with any nested transactions
				await this.saveRepositoryHistory(transaction, context);
				await transaction.saveTransaction(transaction.transactionHistory);
			}

			this.activeQueries.rerunQueries();
			await transaction.commit(null, context);

			let transactionHistory = transaction.transactionHistory;
			if (!parentTransaction && transactionHistory.allRecordHistory.length) {
				await this.synchronizationOutManager.synchronizeOut(
					transactionHistory.repositoryTransactionHistories)
			}
		} finally {
			await this.clearTransaction(transaction, parentTransaction, credentials, context);
			// Right now transactions are tied to @Api() calls,
			// If an @Api() fails to commit the parent @Api() call should resume
			// it's transaction or the next 
			await this.resumeParentOrPendingTransaction(parentTransaction, context)
		}
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
				let hierarchyTransaction = transaction
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

		transaction.transactionHistory = this.transactionHistoryDuo.getNewRecord();

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
		const transactionManagerStore = this.terminalStore
			.getTransactionManager()
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
		let transactionHistory = transaction.transactionHistory;
		if (!transactionHistory.allRecordHistory.length) {
			return false;
		}
		let applicationMap = transactionHistory.applicationMap;

		const transactionHistoryIds = await this.idGenerator.generateTransactionHistoryIds(
			transactionHistory.repositoryTransactionHistories.length,
			transactionHistory.allOperationHistory.length,
			transactionHistory.allRecordHistory.length
		);

		applicationMap.ensureEntity((<IQEntityInternal><any>Q.TransactionHistory).__driver__.dbEntity, true);
		transactionHistory.id = transactionHistoryIds.transactionHistoryId;
		await this.doInsertValues(transaction, Q.TransactionHistory,
			[transactionHistory], context);

		applicationMap.ensureEntity((<IQEntityInternal><any>Q.RepositoryTransactionHistory).__driver__.dbEntity, true);
		transactionHistory.repositoryTransactionHistories.forEach((
			repositoryTransactionHistory,
			index,
		) => {
			repositoryTransactionHistory.id = transactionHistoryIds.repositoryHistoryIds[index];
			repositoryTransactionHistory.transactionHistory = transactionHistory
		});
		await this.doInsertValues(transaction, Q.RepositoryTransactionHistory,
			transactionHistory.repositoryTransactionHistories, context);

		applicationMap.ensureEntity((<IQEntityInternal><any>Q.OperationHistory).__driver__.dbEntity, true);
		transactionHistory.allOperationHistory.forEach((
			operationHistory,
			index,
		) => {
			operationHistory.id = transactionHistoryIds.operationHistoryIds[index];
		});
		await this.doInsertValues(transaction, Q.OperationHistory,
			transactionHistory.allOperationHistory, context);

		applicationMap.ensureEntity((<IQEntityInternal><any>Q.RecordHistory).__driver__.dbEntity, true);
		transactionHistory.allRecordHistory.forEach((
			recordHistory,
			index,
		) => {
			recordHistory.id = transactionHistoryIds.recordHistoryIds[index];
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

}
DEPENDENCY_INJECTION.set(TRANSACTION_MANAGER, TransactionManager);
