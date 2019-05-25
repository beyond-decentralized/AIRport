import {DI}              from '@airport/di'
import {PortableQuery}   from '@airport/ground-control'
import {IActor}          from '@airport/holding-pattern'
import {IObservable}     from '@airport/observe'
import {
	DistributionStrategy,
	ICredentials,
	ITransactionManager,
	PlatformType,
	TRANSACTION_MANAGER
}                        from '@airport/terminal-map'
import {
	ITransactionalServer,
	TRANS_SERVER
}                        from '@airport/tower'
import {
	DELETE_MANAGER,
	INSERT_MANAGER,
	QUERY_MANAGER,
	UPDATE_MANAGER
}                        from '../diTokens'
import {IDeleteManager}  from '../orchestration/DeleteManager'
import {IInsertManager,} from '../orchestration/InsertManager'
import {IQueryManager}   from '../orchestration/QueryManager'
import {IUpdateManager}  from '../orchestration/UpdateManager'

export interface InternalPortableQuery
	extends PortableQuery {
	domainAndPort: string
}

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
	implements ITransactionalServer {

	// activeTransactions: { [index: number]: ITransactionHistory } = {}
	// lastTransactionIndex                                         = 0
	// currentTransactionIndex
	//
	// dataStore: IStoreDriver
	private deleteManager: IDeleteManager
	private insertManager: IInsertManager
	private queryManager: IQueryManager
	private transactionManager: ITransactionManager
	private updateManager: IUpdateManager

	tempActor: IActor

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

	async init(): Promise<void> {

	}

	async transact(
		credentials: ICredentials
	): Promise<void> {
		// this.lastTransactionIndex++
		await this.transactionManager.transact(credentials)
		// this.currentTransactionIndex = this.lastTransactionIndex
	}

	async rollback(
		credentials: ICredentials
	): Promise<void> {
		await this.transactionManager.rollback(credentials)
		// this.currentTransactionIndex = null
	}

	async commit(
		credentials: ICredentials
	): Promise<void> {
		await this.transactionManager.commit(credentials)
		// this.currentTransactionIndex = null
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		return await this.queryManager.find<E, EntityArray>(portableQuery, cachedSqlQueryId)
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		cachedSqlQueryId?: number,
	): Promise<E> {
		return await this.queryManager.findOne<E>(portableQuery, cachedSqlQueryId)
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		cachedSqlQueryId?: number,
	): IObservable<EntityArray> {
		return this.queryManager.search<E, EntityArray>(portableQuery)
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
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
		credentials: ICredentials,
	): Promise<number> {
		return this.insertManager.addRepository(name, url, platform, platformConfig, distributionStrategy)
	}

	async insertValues(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		transactionIndex?: number,
		ensureGeneratedValues?: boolean // for internal use only
	): Promise<number> {
		const actor = await this.getActor(portableQuery)
		return await this.wrapInTransaction(async () =>
				await this.insertManager.insertValues(portableQuery, actor, ensureGeneratedValues)
			, 'INSERT', credentials)
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		transactionIndex?: number,
	): Promise<number[] | string[]> {
		const actor = await this.getActor(portableQuery)
		return await this.wrapInTransaction<number[] | string[]>(async () =>
				await this.insertManager.insertValuesGetIds(portableQuery, actor)
			, 'INSERT GET IDS', credentials)
	}

	async updateValues(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		transactionIndex?: number,
	): Promise<number> {
		const actor = await this.getActor(portableQuery)
		return await this.wrapInTransaction(async () =>
				await this.updateManager.updateValues(portableQuery, actor)
			, 'UPDATE', credentials)
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		transactionIndex?: number,
	): Promise<number> {
		const actor = await this.getActor(portableQuery)
		return await this.wrapInTransaction(async () =>
				await this.deleteManager.deleteWhere(portableQuery, actor)
			, 'DELETE', credentials)
	}


	private async getActor(
		portableQuery: PortableQuery
	): Promise<IActor> {
		if (this.tempActor) {
			return this.tempActor
		}

		throw `Not Implemented`
	}

	private async wrapInTransaction<T>(
		callback: { (): Promise<T> },
		operationName: string,
		credentials: ICredentials
	): Promise<T> {
		let transact = false
		if(this.transactionManager.transactionInProgress) {
			if (credentials.domainAndPort !== this.transactionManager.transactionInProgress) {
				throw `${operationName}: domain: ${credentials.domainAndPort} 
				does not have an active transaction.`
			}
		} else {
			await this.transact(credentials)
			transact = true
		}

		try {
			const returnValue = await callback()
			if (transact) {
				await this.commit(credentials)
			}
			return returnValue
		} catch (error) {
			// if (attachToTransaction) {
			await this.rollback(credentials)
			// }
			throw error
		}
	}

}

DI.set(TRANS_SERVER, TransactionalServer)
