import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IContext
} from '@airport/direction-indicator';
import {
	IIdGenerator,
} from '@airport/fuel-hydrant-system';
import {
	IAppTrackerUtils,
	IRootTransaction
} from '@airport/ground-control';
import { ISynchronizationOutManager } from '@airport/ground-transport';
import {
	ITransactionHistoryDuo,
	Q_airport____at_airport_slash_holding_dash_pattern as Q,
	RepositoryMemberAcceptanceDao,
	RepositoryMemberDao,
	RepositoryMemberInvitationDao
} from '@airport/holding-pattern/dist/app/bundle';
import { IQEntityInternal } from '@airport/tarmaq-query';
import {
	IStoreDriver,
	ITerminalSessionManager,
	ITerminalStore,
	ITransaction,
	ITransactionalCallback,
	ITransactionContext,
	ITransactionCredentials,
	ITransactionInitiator,
	ITransactionManager,
	ITransactionManagerState
} from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';

@Injected()
export class TransactionManager
	extends AbstractMutationManager
	implements ITransactionManager {

	@Inject()
	appTrackerUtils: IAppTrackerUtils

	@Inject()
	idGenerator: IIdGenerator

	@Inject()
	repositoryMemberAcceptanceDao: RepositoryMemberAcceptanceDao

	@Inject()
	repositoryMemberDao: RepositoryMemberDao

	@Inject()
	repositoryMemberInvitationDao: RepositoryMemberInvitationDao

	@Inject()
	storeDriver: IStoreDriver

	@Inject()
	synchronizationOutManager: ISynchronizationOutManager

	@Inject()
	terminalSessionManager: ITerminalSessionManager

	@Inject()
	terminalStore: ITerminalStore

	@Inject()
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
		return this.terminalStore.getIsServer();
	}

	async transactInternal(
		transactionalCallback: ITransactionalCallback,
		credentials: ITransactionCredentials,
		context: ITransactionContext
	): Promise<void> {
		if (!credentials) {
			credentials = {
				application: this.appTrackerUtils.getInternalApp(),
				domain: this.appTrackerUtils.getInternalDomain(),
				methodName: null,
				objectName: null
			}
		}
		await this.transact(credentials, transactionalCallback, context);
	}

	async transact(
		credentials: ITransactionCredentials,
		transactionalCallback: ITransactionalCallback,
		context: ITransactionContext,
	): Promise<void> {
		if (context.transaction) {
			// Nested transact() calls in internal operations
			// do not create nested transactions
			await transactionalCallback(context.transaction, context)
			return
		}
		const transaction = await this.startTransaction(credentials, context)

		try {
			await transactionalCallback(transaction, context);
			await this.commit(credentials, context);
		} catch (e) {
			console.error(e)
			await this.rollback(credentials, context)
			throw e
		}
	}

	async startTransaction(
		credentials: ITransactionCredentials,
		context: ITransactionContext,
	): Promise<ITransaction> {
		if (context.transaction) {
			return
		}
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
						context,
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
			const rootTransaction: IRootTransaction = transaction as any
			rootTransaction.numberOfOperations = 0
			// Internal calls don't maintain rootTransaction and can create more than
			// one repository at a time.  APIs exposed externally will never be top
			// level transactions
			if (!this.appTrackerUtils.isInternalDomain(credentials.domain)) {
				const userSession = await this.terminalSessionManager.getUserSession()
				userSession.currentRootTransaction = rootTransaction
			}
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
		const transaction = this.getTransactionFromContextOrCredentials(
			credentials, context)

		let parentTransaction = transaction.parentTransaction
		await transaction.rollback(null, context)
		const transactionCleared = await this.clearTransaction(
			transaction, parentTransaction, credentials, context)
		if (!parentTransaction) {
			await this.clearUserSessionRootTransaction(transaction)
		}
		if (transactionCleared) {
			await this.resumeParentOrPendingTransaction(parentTransaction, context)
		}
	}

	getTransactionFromContextOrCredentials(
		credentials: ITransactionCredentials,
		context: ITransactionContext,
	): ITransaction {
		let transaction = context.transaction
		if (!transaction) {
			if (!credentials.transactionId) {
				throw new Error(`
No Transaction Id is passed in Credentials for a transactional operation.
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
		for (; ancestorTransaction.parentTransaction; ancestorTransaction = ancestorTransaction.parentTransaction) {
		}
		context.rootTransaction = ancestorTransaction as any as IRootTransaction

		return transaction
	}

	private async resumeParentOrPendingTransaction(
		parentTransaction: ITransaction,
		context: ITransactionContext,
	): Promise<void> {
		const transactionManagerStore = this.terminalStore.getTransactionManager()
		if (parentTransaction) {
			await this.setupTransaction(parentTransaction.credentials, parentTransaction,
				parentTransaction.parentTransaction, transactionManagerStore,
				context)
		} else if (transactionManagerStore.pendingTransactionQueue.length) {
			const pendingTransaction = transactionManagerStore.pendingTransactionQueue.pop()
			const transaction = await this.internalStartTransaction(pendingTransaction.credentials,
				null, pendingTransaction.context)
			pendingTransaction.resolve(transaction)
		}
	}

	async commit(
		credentials: ITransactionCredentials,
		context: ITransactionContext,
	): Promise<void> {
		const transaction = this.getTransactionFromContextOrCredentials(
			credentials, context)

		let parentTransaction = transaction.parentTransaction
		try {
			if (parentTransaction) {
				if (!context.doNotRecordHistory) {
					this.copyTransactionHistoryToParentTransaction(
						transaction, parentTransaction
					)
				}
			} else {
				// This is the root transaction, save it's history, along with any nested transactions
				if (!context.doNotRecordHistory) {
					await this.saveRepositoryHistory(transaction, context);
				}
			}


			let transactionHistory = transaction.transactionHistory
			if (!context.doNotRecordHistory && !transaction.isSync
				&& transactionHistory.repositoryTransactionHistories.length) {
				const {
					historiesToSend,
					messages
				} = await this.synchronizationOutManager.getSynchronizationMessages(
					transactionHistory.repositoryTransactionHistories, context
				)
				await transaction.commit(null, context)

				if (!parentTransaction && transactionHistory.allRecordHistory.length) {
					await this.synchronizationOutManager.sendMessages(
						historiesToSend,
						messages,
						context
					)
				}
			} else {
				await transaction.commit(null, context)
			}

			if (!parentTransaction) {
				await this.clearUserSessionRootTransaction(transaction)
			}
		} finally {
			if (await this.clearTransaction(
				transaction, parentTransaction, credentials, context)) {
				// Right now transactions are tied to @Api() calls,
				// If an @Api() fails to commit the parent @Api() call should resume
				// it's transaction or the next 
				await this.resumeParentOrPendingTransaction(parentTransaction, context)
			}
		}
	}

	private async clearUserSessionRootTransaction(
		transaction: ITransaction
	): Promise<void> {
		// Internal calls don't maintain rootTransaction and can create more than
		// one repository at a time.  APIs exposed externally will never be top
		// level transactions
		if (this.appTrackerUtils.isInternalDomain(transaction.credentials.domain)) {
			return
		}

		const userSession = await this.terminalSessionManager.getUserSession()
		userSession.currentRootTransaction = null
	}

	private copyTransactionHistoryToParentTransaction(
		transaction: ITransaction,
		parentTransaction: ITransaction
	): void {
		let childTransactionHistory = transaction.transactionHistory
		let parentTransactionHistory = parentTransaction.transactionHistory
		for (const operationHistory of childTransactionHistory.allOperationHistory) {
			const repositoryLocalId = operationHistory.repositoryTransactionHistory.repository._localId
			const parentRepositoryTransactionRecord = parentTransactionHistory
				.repositoryTransactionHistoryMap[repositoryLocalId]
			if (parentRepositoryTransactionRecord) {
				operationHistory.repositoryTransactionHistory = parentRepositoryTransactionRecord
			} else {
				parentTransactionHistory.repositoryTransactionHistoryMap[repositoryLocalId]
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
		parentTransactionHistory.remoteRepositoryMembers = parentTransactionHistory
			.remoteRepositoryMembers.concat(childTransactionHistory.remoteRepositoryMembers)
		parentTransactionHistory.remoteRepositoryMemberAcceptances = parentTransactionHistory
			.remoteRepositoryMemberAcceptances.concat(childTransactionHistory.remoteRepositoryMemberAcceptances)
		parentTransactionHistory.remoteRepositoryMemberInvitations = parentTransactionHistory
			.remoteRepositoryMemberInvitations.concat(childTransactionHistory.remoteRepositoryMemberInvitations)
	}

	private checkForCircularDependencies(
		transaction: ITransaction,
		credentials: ITransactionCredentials
	): void {
		if (this.appTrackerUtils.isInternalDomain(credentials.domain)) {
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
		transactionManagerStore: ITransactionManagerState,
		context: ITransactionContext,
	): Promise<void> {
		context.transaction = transaction
		credentials.transactionId = transaction.id

		if (!context.doNotRecordHistory) {
			transaction.transactionHistory = this.transactionHistoryDuo.getNewRecord();
		}

		transactionManagerStore.transactionInProgressMap.set(transaction.id, transaction)
		if (parentTransaction) {
			transactionManagerStore.transactionInProgressMap.delete(parentTransaction.id)
			let ancestorTransaction = transaction
			for (; ancestorTransaction.parentTransaction; ancestorTransaction = ancestorTransaction.parentTransaction) {
			}
			context.rootTransaction = (ancestorTransaction as any as IRootTransaction)
		} else {
			transactionManagerStore.rootTransactionInProgressMap.set(transaction.id, transaction)
			context.rootTransaction = (transaction as any as IRootTransaction)
		}
	}

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
	): Promise<boolean> {
		const transactionManagerStore = this.terminalStore
			.getTransactionManager()
		transactionManagerStore.transactionInProgressMap.delete(transaction.id)

		if (!parentTransaction) {
			transactionManagerStore.rootTransactionInProgressMap.delete(transaction.id)
		}
		context.transaction = null
		credentials.transactionId = null

		return true
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

		const transactionHistoryIds = await this.idGenerator.generateTransactionHistory_LocalIds(
			transactionHistory.repositoryTransactionHistories.length,
			transactionHistory.allOperationHistory.length,
			transactionHistory.allRecordHistory.length
		);

		applicationMap.ensureEntity((<IQEntityInternal><any>Q.TransactionHistory).__driver__.dbEntity, true);
		transactionHistory._localId = transactionHistoryIds.transactionHistory_LocalId;
		await this.doInsertValues(transaction, Q.TransactionHistory,
			[transactionHistory], context);

		applicationMap.ensureEntity((<IQEntityInternal><any>Q.RepositoryTransactionHistory).__driver__.dbEntity, true);
		transactionHistory.repositoryTransactionHistories.forEach((
			repositoryTransactionHistory,
			index,
		) => {
			repositoryTransactionHistory._localId = transactionHistoryIds.repositoryHistory_LocalIds[index];
			repositoryTransactionHistory.transactionHistory = transactionHistory
		});
		await this.doInsertValues(transaction, Q.RepositoryTransactionHistory,
			transactionHistory.repositoryTransactionHistories, context);

		for (const repositoryTransactionHistory of transactionHistory.repositoryTransactionHistories) {
			if (repositoryTransactionHistory.newRepositoryMembers.length) {
				await this.repositoryMemberDao.updateAddedInRepositoryTransactionHistory(
					repositoryTransactionHistory.newRepositoryMembers,
					repositoryTransactionHistory,
					context
				)
			}
			if (repositoryTransactionHistory.newRepositoryMemberInvitations.length) {
				await this.repositoryMemberAcceptanceDao.updateAddedInRepositoryTransactionHistory(
					repositoryTransactionHistory.newRepositoryMemberAcceptances,
					repositoryTransactionHistory,
					context
				)
			}
			if (repositoryTransactionHistory.newRepositoryMemberAcceptances.length) {
				await this.repositoryMemberInvitationDao.updateAddedInRepositoryTransactionHistory(
					repositoryTransactionHistory.newRepositoryMemberInvitations,
					repositoryTransactionHistory,
					context
				)
			}
		}

		applicationMap.ensureEntity((<IQEntityInternal><any>Q.OperationHistory).__driver__.dbEntity, true);
		transactionHistory.allOperationHistory.forEach((
			operationHistory,
			index,
		) => {
			operationHistory._localId = transactionHistoryIds.operationHistory_LocalIds[index];
		});
		await this.doInsertValues(transaction, Q.OperationHistory,
			transactionHistory.allOperationHistory, context);

		applicationMap.ensureEntity((<IQEntityInternal><any>Q.RecordHistory).__driver__.dbEntity, true);
		transactionHistory.allRecordHistory.forEach((
			recordHistory,
			index,
		) => {
			recordHistory._localId = transactionHistoryIds.recordHistory_LocalIds[index];
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

		if (transactionHistory.remoteRepositoryMembers.length) {
			await this.repositoryMemberDao
				.insert(transactionHistory.remoteRepositoryMembers, context)
		}
		if (transactionHistory.remoteRepositoryMemberAcceptances.length) {
			await this.repositoryMemberAcceptanceDao
				.insert(transactionHistory.remoteRepositoryMemberAcceptances, context)
		}
		if (transactionHistory.remoteRepositoryMemberInvitations.length) {
			await this.repositoryMemberInvitationDao
				.insert(transactionHistory.remoteRepositoryMemberInvitations, context)
		}

		return true;
	}

}
