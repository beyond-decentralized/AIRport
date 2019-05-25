import {IDatabaseFacade} from '@airport/air-control'
import {DI}              from '@airport/di'
import {
	ITransactionalConnector,
	PortableQuery,
	TRANS_CONNECTOR
}                        from '@airport/ground-control'
import {IObservable}     from '@airport/observe'
import {
	ENTITY_MANAGER,
	ITransactionalServer,
	TRANS_SERVER
}                        from '@airport/tower'

export class TransactionalConnector
	implements ITransactionalConnector {

	private databaseFacade: IDatabaseFacade
	dbName: string
	serverUrl: string
	transServer: ITransactionalServer

	constructor() {
		DI.get((
			databaseFacade: IDatabaseFacade,
			transServer: ITransactionalServer
		) => {
			this.databaseFacade = databaseFacade
			this.transServer    = transServer
		}, ENTITY_MANAGER, TRANS_SERVER)
	}

	async transact(): Promise<void> {
		await this.transServer.transact({
			domainAndPort: 'test'
		})
	}

	async rollback(): Promise<void> {
		await this.transServer.rollback({
			domainAndPort: 'test'
		})
	}

	async commit(): Promise<void> {
		await this.transServer.commit({
			domainAndPort: 'test'
		})
	}

	async find<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<EntityArray> {
		return await this.transServer.find(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			cachedSqlQueryId
		)
	}

	async findOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): Promise<E> {
		return await this.transServer.findOne(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			cachedSqlQueryId
		)
	}

	search<E, EntityArray extends Array<E>>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): IObservable<EntityArray> {
		return this.transServer.search(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			cachedSqlQueryId
		)
	}

	searchOne<E>(
		portableQuery: PortableQuery,
		cachedSqlQueryId?: number,
	): IObservable<E> {
		return this.transServer.searchOne(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			cachedSqlQueryId
		)
	}

	async insertValues(
		portableQuery: PortableQuery,
		transactionIndex?: number,
		ensureGeneratedValues?: boolean // For internal use only
	): Promise<number> {
		return await this.transServer.insertValues(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			transactionIndex,
			ensureGeneratedValues
		)
	}

	async insertValuesGetIds(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number[] | string[]> {
		return await this.transServer.insertValuesGetIds(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			transactionIndex
		)
	}

	async updateValues(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number> {
		return await this.transServer.updateValues(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			transactionIndex
		)
	}

	async deleteWhere(
		portableQuery: PortableQuery,
		transactionIndex?: number,
	): Promise<number> {
		return await this.transServer.updateValues(
			portableQuery,
			{
				domainAndPort: 'test'
			},
			transactionIndex
		)
	}

}

DI.set(TRANS_CONNECTOR, TransactionalConnector)
