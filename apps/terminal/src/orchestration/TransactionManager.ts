import {
	DI,
	ICachedPromise
}                                from '@airport/di'
import {
	ACTIVE_QUERIES,
	ActiveQueries,
	ID_GENERATOR,
	IIdGenerator
}                                from '@airport/fuel-hydrant-system'
import {
	StoreType,
	SyncSchemaMap
}                                from '@airport/ground-control'
import {
	ITransactionHistory,
	ITransactionHistoryDmo,
	Q,
	TRANS_HISTORY_DMO
}                                from '@airport/holding-pattern'
import {
	ITransactionManager,
	TRANSACTION_MANAGER
}                                from '@airport/terminal-map'
import {IOfflineDeltaStore}      from '../data/OfflineDeltaStore'
import {
	OFFLINE_DELTA_STORE,
	ONLINE_MANAGER,
}                                from '../diTokens'
import {IOnlineManager}          from '../net/OnlineManager'
import {AbstractMutationManager} from './AbstractMutationManager'

export class TransactionManager
	extends AbstractMutationManager
	implements ITransactionManager {

	// Keyed by repository index
	currentTransHistory: ITransactionHistory
	private idGenerator: IIdGenerator
	private offlineDeltaStore: IOfflineDeltaStore
	private onlineManager: IOnlineManager
	// private repositoryManager: IRepositoryManager
	private queries: ActiveQueries
	storeType: StoreType
	private transHistoryDmo: ICachedPromise<ITransactionHistoryDmo>
	transactionIndexQueue: number[]
	transactionInProgress: number     = null
	yieldToRunningTransaction: number = 100

	constructor() {
		super()
		DI.get((
			idGenerator,
			offlineDeltaStore,
			onlineManager,
			queries,
			) => {
				this.idGenerator       = idGenerator
				this.offlineDeltaStore = offlineDeltaStore
				this.onlineManager     = onlineManager
				this.queries           = queries
			}, ID_GENERATOR, OFFLINE_DELTA_STORE,
			ONLINE_MANAGER, ACTIVE_QUERIES)

		this.transHistoryDmo = DI.cache(TRANS_HISTORY_DMO)
	}


	/**
	 * Initializes the EntityManager at server load time.
	 * @returns {Promise<void>}
	 */
	async initialize(
		dbName: string
	): Promise<void> {
		await this.dataStore.initialize(dbName)
		// await this.repositoryManager.initialize();
	}

	async startTransaction(
		transactionIndex: number
	): Promise<void> {
		if (this.transactionInProgress) {
			this.transactionIndexQueue.push(transactionIndex)
		}
		while (!this.canRunTransaction(transactionIndex)) {
			await this.wait(this.yieldToRunningTransaction)
		}
		this.transactionInProgress = transactionIndex
		let fieldMap               = new SyncSchemaMap()

		this.currentTransHistory = (await this.transHistoryDmo.get()).getNewRecord()

		await this.dataStore.transact()
	}

	async rollbackTransaction(
		transactionIndex: number
	): Promise<void> {
		if (this.transactionInProgress !== transactionIndex) {
			let foundTransactionInQueue = false
			this.transactionIndexQueue.filter(
				transIndex => {
					if (transIndex === transactionIndex) {
						foundTransactionInQueue = true
						return false
					}
					return true
				})
			if (!foundTransactionInQueue) {
				throw `Could not find transaction '${transactionIndex}' is not found`
			}
			return
		}
		try {
			await this.dataStore.rollback()
		} finally {
			this.clearTransaction()
		}
	}

	async commitTransaction(
		transactionIndex: number
	): Promise<void> {
		if (this.transactionInProgress !== transactionIndex) {
			throw `Cannot commit inactive transaction '${transactionIndex}'.`
		}
		let transaction = this.currentTransHistory

		try {
			await this.saveRepositoryHistory(transaction)

			await this.dataStore.saveTransaction(transaction)

			this.queries.rerunQueries()
			await this.dataStore.commit()
		} finally {
			this.clearTransaction()
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
	// this.queries.markQueriesToRerun(transaction.transactionHistory.schemaMap); } }


	private clearTransaction() {
		this.currentTransHistory   = null
		this.transactionInProgress = null
		if (this.transactionIndexQueue.length) {
			this.transactionInProgress = this.transactionIndexQueue.shift()
		}
	}

	private async saveRepositoryHistory(
		transaction: ITransactionHistory
	): Promise<boolean> {
		if (!transaction.allRecordHistory.length) {
			return false
		}
		let schemaMap = transaction.schemaMap

		const transHistoryIds = await this.idGenerator.generateTransactionHistoryIds(
			transaction.repositoryTransactionHistories.length,
			transaction.allOperationHistory.length,
			transaction.allRecordHistory.length
		)

		schemaMap.ensureEntity(Q.TransactionHistory.__driver__.dbEntity, true)
		transaction.id = transHistoryIds.transactionHistoryId
		await this.doInsertValues(Q.TransactionHistory, [transaction])

		schemaMap.ensureEntity(Q.RepositoryTransactionHistory.__driver__.dbEntity, true)
		transaction.repositoryTransactionHistories.forEach((
			repositoryTransactionHistory,
			index
		) => {
			repositoryTransactionHistory.id = transHistoryIds.repositoryHistoryIds[index]
		})
		await this.doInsertValues(Q.RepositoryTransactionHistory, transaction.repositoryTransactionHistories)

		schemaMap.ensureEntity(Q.OperationHistory.__driver__.dbEntity, true)
		transaction.allOperationHistory.forEach((
			operationHistory,
			index
		) => {
			operationHistory.id = transHistoryIds.operationHistoryIds[index]
		})
		await this.doInsertValues(Q.OperationHistory, transaction.allOperationHistory)

		schemaMap.ensureEntity(Q.RecordHistory.__driver__.dbEntity, true)
		transaction.allRecordHistory.forEach((
			recordHistory,
			index
		) => {
			recordHistory.id = transHistoryIds.recordHistoryIds[index]
		})
		await this.doInsertValues(Q.RecordHistory, transaction.allRecordHistory)

		if (transaction.allRecordHistoryNewValues.length) {
			schemaMap.ensureEntity(Q.RecordHistoryNewValue.__driver__.dbEntity, true)
			await this.doInsertValues(Q.RecordHistoryNewValue, transaction.allRecordHistoryNewValues)
		}

		if (transaction.allRecordHistoryOldValues.length) {
			schemaMap.ensureEntity(Q.RecordHistoryOldValue.__driver__.dbEntity, true)
			await this.doInsertValues(Q.RecordHistoryOldValue, transaction.allRecordHistoryOldValues)
		}


		return true
	}


	private async wait(timeoutMillis: number
	) {
		return new Promise<void>((
			resolve,
			reject
		) => {
			try {
				setTimeout(() => {
					resolve()
				}, timeoutMillis)
			} catch (error) {
				reject(error)
			}
		})
	}

	private canRunTransaction(
		transactionIndex: number
	): boolean {
		if (this.transactionInProgress) {
			return false
		}

		return this.transactionIndexQueue[this.transactionIndexQueue.length - 1]
			=== transactionIndex
	}

}

DI.set(TRANSACTION_MANAGER, TransactionManager)
