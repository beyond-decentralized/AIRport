import {DI}          from '@airport/di'
import {
	JsonInsertValues,
	PortableQuery
}                    from '@airport/ground-control'
import {IActor}      from '@airport/holding-pattern'
import {IObservable} from '@airport/observe'
import {
	DistributionStrategy,
	ICredentials,
	PlatformType,
	TRANSACTION_MANAGER
}                    from '@airport/terminal-map'
import {
	ITransactionalServer,
	TRANS_SERVER
}                    from '@airport/tower'
import {
	DELETE_MANAGER,
	INSERT_MANAGER,
	QUERY_MANAGER,
	UPDATE_MANAGER
}                    from '../diTokens'

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

	tempActor: IActor

	async init(): Promise<void> {
		const transManager = await DI.get(TRANSACTION_MANAGER)

		return await transManager.init('airport')
	}

	async transact(
		credentials: ICredentials
	): Promise<void> {
		const transManager = await DI.get(TRANSACTION_MANAGER)

		return await transManager.transact(credentials)
		// this.lastTransactionIndex++
		// await this.transactionManager.transact(credentials)
		// this.currentTransactionIndex = this.lastTransactionIndex
	}

	async rollback(
		credentials: ICredentials
	): Promise<void> {
		const transManager = await DI.get(TRANSACTION_MANAGER)

		return await transManager.rollback(credentials)
		// await this.transactionManager.rollback(credentials)
		// this.currentTransactionIndex = null
	}

	async commit(
		credentials: ICredentials
	): Promise<void> {
		const transManager = await DI.get(TRANSACTION_MANAGER)

		return await transManager.commit(credentials)
		// await this.transactionManager.commit(credentials)
		// this.currentTransactionIndex = null
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		const queryManager = await DI.get(QUERY_MANAGER)

		return await queryManager.find<E, EntityArray>(portableQuery, cachedSqlQueryId)
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		cachedSqlQueryId?: number,
	): Promise<E> {
		const queryManager = await DI.get(QUERY_MANAGER)

		return await queryManager.findOne<E>(portableQuery, cachedSqlQueryId)
	}

	async search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		cachedSqlQueryId?: number,
	): Promise<IObservable<EntityArray>> {
		const queryManager = await DI.get(QUERY_MANAGER)

		return await queryManager.search<E, EntityArray>(portableQuery)
	}

	async searchOne<E>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		cachedSqlQueryId?: number,
	): Promise<IObservable<E>> {
		const queryManager = await DI.get(QUERY_MANAGER)

		return await queryManager.searchOne<E>(portableQuery)
	}

	async addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
		credentials: ICredentials,
	): Promise<number> {
		const insertManager = await DI.get(INSERT_MANAGER)

		return await insertManager.addRepository(name, url, platform,
			platformConfig, distributionStrategy)
	}

	async insertValues(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		transactionIndex?: number,
		ensureGeneratedValues?: boolean // for internal use only
	): Promise<number> {
		const values = (portableQuery.jsonQuery as JsonInsertValues).V
		if (!values.length) {
			return 0
		}
		const firstValuesRow = values[0]

		if (!firstValuesRow || !firstValuesRow.length) {
			return 0
		}

		const numValuesInRow = firstValuesRow.length

		for (let valuesRow of values) {
			if (valuesRow.length !== numValuesInRow) {
				return 0
			}
		}

		const insertManager = await DI.get(INSERT_MANAGER)

		const actor = await this.getActor(portableQuery)
		return await this.wrapInTransaction(async () =>
				await insertManager.insertValues(portableQuery, actor, ensureGeneratedValues)
			, 'INSERT', credentials)
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		transactionIndex?: number,
	): Promise<number[] | string[] | number[][] | string[][]> {
		const insertManager = await DI.get(INSERT_MANAGER)

		const actor = await this.getActor(portableQuery)
		return await this.wrapInTransaction<number[] | string[] | number[][] | string[][]>(async () =>
				await insertManager.insertValuesGetIds(portableQuery, actor)
			, 'INSERT GET IDS', credentials)
	}

	async updateValues(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		transactionIndex?: number,
	): Promise<number> {
		const updateManager = await DI.get(UPDATE_MANAGER)

		const actor = await this.getActor(portableQuery)
		return await this.wrapInTransaction(async () =>
				await updateManager.updateValues(portableQuery, actor)
			, 'UPDATE', credentials)
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		transactionIndex?: number,
	): Promise<number> {
		const deleteManager = await DI.get(DELETE_MANAGER)

		const actor = await this.getActor(portableQuery)
		return await this.wrapInTransaction(async () =>
				await deleteManager.deleteWhere(portableQuery, actor)
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
		const transManager = await DI.get(TRANSACTION_MANAGER)

		let transact = false
		if (transManager.transactionInProgress) {
			if (credentials.domainAndPort !== transManager.transactionInProgress) {
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
