import {DI}                              from '@airport/di'
import {
	IStoreDriver,
	PortableQuery,
	TRANS_CONNECTOR
}                                        from '@airport/ground-control'
import {
	IActor,
	ITransactionHistory
}                                        from '@airport/holding-pattern'
import {IObservable}                     from '@airport/observe'
import {
	DistributionStrategy,
	ITransactionManager,
	PlatformType,
	TRANSACTION_MANAGER
}                                        from '@airport/terminal-map'
import {IInternalTransactionalConnector} from '@airport/tower'
import {
	DELETE_MANAGER,
	INSERT_MANAGER,
	QUERY_MANAGER,
	UPDATE_MANAGER
}                                        from '../diTokens'
import {IDeleteManager}                  from '../orchestration/DeleteManager'
import {IInsertManager,}                 from '../orchestration/InsertManager'
import {IQueryManager}                   from '../orchestration/QueryManager'
import {IUpdateManager}                  from '../orchestration/UpdateManager'

/**
 * Keeps track of transactions, per client and validates that a given
 * transaction belongs to the provided client.  If the connection
 * information matches, passes the transaction for handling.
 *
 * All transactions are queued.  Read operations are not blocked while
 * any transaction is in progress.  Best way to make sure that you get
 * the latest state is to subscribe to a query, which is guaranteed to
 * be updated after data has changed.
 *
 *
 * Should read operations be blocked while transactions are in process?
 * Probably not since they will just get snapshot of the state at any
 * given point in time and transactionality takes care of not exposing
 * inconsistent state.  There doesn't appear to be a need to que-up
 * read transactions, since SqLite can handle it:
 *
 * https://www.skoumal.net/en/parallel-read-and-write-in-sqlite/
 *
 * Also, there doesn't appear to be a reason to prioritize remote transactions
 * over local ones, since ultimately the state needs to sync either way.
 * A single transactional queue should be enough.
 *
 */
export class TransactionalServer
	implements IInternalTransactionalConnector {

	activeTransactions: { [index: number]: ITransactionHistory } = {}
	lastTransactionIndex                                         = 0
	currentTransactionIndex
	//
	dataStore: IStoreDriver
	private deleteManager: IDeleteManager
	private insertManager: IInsertManager
	private queryManager: IQueryManager
	private transactionManager: ITransactionManager
	private updateManager: IUpdateManager

	constructor() {
		DI.get((
			deleteManager,
			insertManager,
			queryManager,
			transactionManager,
			updateManager
			) => {
				this.deleteManager      = deleteManager
				this.insertManager      = insertManager
				this.queryManager       = queryManager
				this.transactionManager = transactionManager
				this.updateManager      = updateManager
			}, DELETE_MANAGER, INSERT_MANAGER,
			QUERY_MANAGER, TRANSACTION_MANAGER,
			UPDATE_MANAGER)
	}

	async startTransaction(): Promise<number> {
		this.lastTransactionIndex++
		await this.transactionManager.startTransaction(this.lastTransactionIndex)
		this.currentTransactionIndex = this.lastTransactionIndex

		return this.lastTransactionIndex
	}

	async rollbackTransaction(
		transactionIndex: number
	): Promise<void> {
		await this.transactionManager.rollbackTransaction(transactionIndex)
		this.currentTransactionIndex = null
	}

	async commitTransaction(
		transactionIndex: number
	): Promise<void> {
		await this.transactionManager.commitTransaction(transactionIndex)
		this.currentTransactionIndex = null
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		return await this.queryManager.find<E, EntityArray>(portableQuery, cachedSqlQueryId)
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<E> {
		return await this.queryManager.findOne<E>(portableQuery, cachedSqlQueryId)
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): IObservable<EntityArray> {
		return this.queryManager.search<E, EntityArray>(portableQuery)
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): IObservable<E> {
		return this.queryManager.searchOne<E>(portableQuery)
	}

	async addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
	): Promise<number> {
		return this.insertManager.addRepository(name, url, platform, platformConfig, distributionStrategy)
	}

	async insertValues(
		portableQuery: PortableQuery,
		transactionIndex?: number,
		ensureGeneratedValues?: boolean // for internal use only
	): Promise<number> {
		const actor = await this.getActor(portableQuery)
		return await this.wrapInTransaction(async () =>
				await this.insertManager.insertValues(portableQuery, actor, ensureGeneratedValues)
			, 'INSERT', transactionIndex)
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number[] | string[]> {
		const actor = await this.getActor(portableQuery)
		return await this.wrapInTransaction<number[] | string[]>(async () =>
				await this.insertManager.insertValuesGetIds(portableQuery, actor)
			, 'INSERT GET IDS', transactionIndex)
	}

	async updateValues(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number> {
		const actor = await this.getActor(portableQuery)
		return await this.wrapInTransaction(async () =>
				await this.updateManager.updateValues(portableQuery, actor)
			, 'UPDATE', transactionIndex)
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number> {
		const actor = await this.getActor(portableQuery)
		return await this.wrapInTransaction(async () =>
				await this.deleteManager.deleteWhere(portableQuery, actor)
			, 'DELETE', transactionIndex)
	}


	private async getActor(
		portableQuery: PortableQuery
	): Promise<IActor> {
		throw `Not Implemented`
	}

	private async wrapInTransaction<T>(
		callback: { (): Promise<T> },
		operationName: string,
		transactionIndex?: number,
	): Promise<T> {
		const attachToTransaction = !transactionIndex
		if (attachToTransaction) {
			transactionIndex = await this.startTransaction()
		} else {
			if (transactionIndex !== this.currentTransactionIndex) {
				throw `${operationName}: provided Transaction Index: ${transactionIndex} 
				does not match current Transaction Index.`
			}
		}
		try {
			const returnValue = await callback()
			if (attachToTransaction) {
				await this.commitTransaction(transactionIndex)
			}
			return returnValue
		} catch (error) {
			// if (attachToTransaction) {
			await this.rollbackTransaction(transactionIndex)
			// }
			throw error
		}
	}

}

DI.set(TRANS_CONNECTOR, TransactionalServer)
