import {
	container,
	DI,
	IContext
}                    from '@airport/di'
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
	IOperationContext,
	ITransaction,
	ITransactionalServer,
	TRANS_SERVER
}                    from '@airport/tower'
import {
	DELETE_MANAGER,
	INSERT_MANAGER,
	QUERY_MANAGER,
	UPDATE_MANAGER
}                    from '../tokens'

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
		const transManager = await container(this)
			.get(TRANSACTION_MANAGER)

		return await transManager.init('airport')
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IContext,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		const queryManager = await container(this)
			.get(QUERY_MANAGER)

		return await queryManager.find<E, EntityArray>(portableQuery, context, cachedSqlQueryId)
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IContext,
		cachedSqlQueryId?: number,
	): Promise<E> {
		const queryManager = await container(this)
			.get(QUERY_MANAGER)

		return await queryManager.findOne<E>(portableQuery, context, cachedSqlQueryId)
	}

	async search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IContext,
		cachedSqlQueryId?: number,
	): Promise<IObservable<EntityArray>> {
		const queryManager = await container(this)
			.get(QUERY_MANAGER)

		return await queryManager.search<E, EntityArray>(portableQuery, context)
	}

	async searchOne<E>(
		portableQuery: PortableQuery,
		credentials: ICredentials,
		context: IContext,
		cachedSqlQueryId?: number,
	): Promise<IObservable<E>> {
		const queryManager = await container(this)
			.get(QUERY_MANAGER)

		return await queryManager.searchOne<E>(portableQuery, context)
	}

	async addRepository(
		name: string,
		url: string,
		platform: PlatformType,
		platformConfig: string,
		distributionStrategy: DistributionStrategy,
		credentials: ICredentials,
		ctx: IOperationContext<any, any>
	): Promise<number> {
		const insertManager = await container(this)
			.get(INSERT_MANAGER)

		return await insertManager.addRepository(name, url, platform,
			platformConfig, distributionStrategy)
	}

	async insertValues(
		portableQuery: PortableQuery,
		transaction: ITransaction,
		ctx: IOperationContext<any, any>,
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

		const insertManager = await container(this)
			.get(INSERT_MANAGER)

		const actor = await this.getActor(portableQuery)
		return await insertManager.insertValues(portableQuery, actor,
			transaction, ensureGeneratedValues)
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		transaction: ITransaction,
		ctx: IOperationContext<any, any>
	): Promise<number[] | string[] | number[][] | string[][]> {
		const insertManager = await container(this)
			.get(INSERT_MANAGER)

		const actor = await this.getActor(portableQuery)

		return await insertManager.insertValuesGetIds(portableQuery, actor, transaction)
	}

	async updateValues(
		portableQuery: PortableQuery,
		transaction: ITransaction,
		ctx: IOperationContext<any, any>
	): Promise<number> {
		const updateManager = await container(this)
			.get(UPDATE_MANAGER)

		const actor = await this.getActor(portableQuery)
		return await updateManager.updateValues(portableQuery, actor, transaction, ctx)
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		transaction: ITransaction,
		ctx: IOperationContext<any, any>
	): Promise<number> {
		const deleteManager = await container(this)
			.get(DELETE_MANAGER)

		const actor = await this.getActor(portableQuery)
		return await deleteManager.deleteWhere(portableQuery, actor, transaction)
	}

	private async getActor(
		portableQuery: PortableQuery
	): Promise<IActor> {
		if (this.tempActor) {
			return this.tempActor
		}

		throw new Error(`Not Implemented`)
	}

}

DI.set(TRANS_SERVER, TransactionalServer)

export function injectTransactionalServer(): void {
	console.log('Injecting TransactionalServer')
}
