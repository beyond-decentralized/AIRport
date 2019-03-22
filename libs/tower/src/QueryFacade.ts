import {
	AbstractQuery,
	IDatabaseFacade,
	IQueryFacade,
	UpdateCacheType
}                     from '@airport/air-control'
import {DI}           from '@airport/di'
import {
	DbEntity,
	ITransactionalConnector,
	JsonQuery,
	PortableQuery,
	QueryResultType,
	TRANS_CONNECTOR,
}                     from '@airport/ground-control'
import {IObservable}  from '@airport/observe'
import {QUERY_FACADE} from './diTokens'

export class QueryFacade
	implements IQueryFacade {

	private connector: ITransactionalConnector
	public databaseFacade: IDatabaseFacade

	constructor() {
		DI.get((
			transactionalConnector
		) => {
			this.connector = transactionalConnector
		}, TRANS_CONNECTOR)
	}

	async find<E, EntityArray extends Array<E>>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<EntityArray> {
		const result = await this.connector.find<E, EntityArray>(
			this.getPortableQuery(dbEntity, query, queryResultType))
		if (cacheForUpdate !== UpdateCacheType.NONE) {
			this.databaseFacade.cacheForUpdate(cacheForUpdate, dbEntity, ...result)
		}

		return result
	}

	async findOne<E>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<E> {
		const result = await this.connector.findOne<E>(this.getPortableQuery(dbEntity, query, queryResultType))
		if (cacheForUpdate !== UpdateCacheType.NONE) {
			this.databaseFacade.cacheForUpdate(cacheForUpdate, dbEntity, result)
		}

		return result
	}

	search<E, EntityArray extends Array<E>>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): IObservable<EntityArray> {
		return this.connector.search<E, EntityArray>(
			this.getPortableQuery(dbEntity, query, queryResultType))
	}

	searchOne<E>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): IObservable<E> {
		return this.connector.searchOne<E>(
			this.getPortableQuery(dbEntity, query, queryResultType))
	}

	getPortableQuery<E>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = false,
	): PortableQuery {
		return {
			jsonQuery: <JsonQuery>query.toJSON(),
			parameterMap: query.getParameters(),
			queryResultType,
			schemaIndex: dbEntity.schemaVersion.schema.index,
			tableIndex: dbEntity.index,
			values: query.values
		}
	}

}

DI.set(QUERY_FACADE, QueryFacade)
