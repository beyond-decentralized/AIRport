import {
	AbstractQuery,
	FIELD_UTILS,
	IFieldUtils,
	IQueryFacade,
	IQueryUtils,
	QUERY_FACADE,
	QUERY_UTILS,
	SCHEMA_UTILS,
	UpdateCacheType
}                     from '@airport/air-control'
import {DI}           from '@airport/di'
import {
	DbEntity,
	JsonQuery,
	PortableQuery,
	QueryResultType,
	TRANS_CONNECTOR,
}                     from '@airport/ground-control'
import {IObservable}  from '@airport/observe'
import {Observable}   from '@airport/observe'
import {UPDATE_CACHE} from './diTokens'

export class QueryFacade
	implements IQueryFacade {

	/*
	private connector: ITransactionalConnector
	public databaseFacade: IDatabaseFacade

	async init(): Promise<void> {
		this.connector = await DI.getP(TRANS_CONNECTOR)
	}
*/

	async find<E, EntityArray extends Array<E>>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<EntityArray> {
		const [fieldUtils, queryUtils, schemaUtils, transConnector, updateCache] =
			      await DI.get(FIELD_UTILS, QUERY_UTILS, SCHEMA_UTILS,
				      TRANS_CONNECTOR, UPDATE_CACHE)

		const result = await transConnector.find<E, EntityArray>(
			this.getPortableQuery(
				dbEntity, query, queryResultType, queryUtils, fieldUtils))
		updateCache.addToCache(
			schemaUtils, cacheForUpdate, dbEntity, ...result)

		return result
	}

	async findOne<E>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<E> {
		const [fieldUtils, queryUtils, schemaUtils, transConnector, updateCache] =
			      await DI.get(FIELD_UTILS, QUERY_UTILS, SCHEMA_UTILS, TRANS_CONNECTOR, UPDATE_CACHE)

		const result = await transConnector.findOne<E>(this.getPortableQuery(
			dbEntity, query, queryResultType, queryUtils, fieldUtils))
		updateCache.addToCache(
			schemaUtils, cacheForUpdate, dbEntity, result)

		return result
	}

	search<E, EntityArray extends Array<E>>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): IObservable<EntityArray> {
		return Observable.from(this.doSearch(
			dbEntity, query, queryResultType, cacheForUpdate))
	}

	searchOne<E>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): IObservable<E> {
		return Observable.from(this.doSearchOne(
			dbEntity, query, queryResultType, cacheForUpdate))
	}

	getPortableQuery<E>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		queryUtils: IQueryUtils,
		fieldUtils: IFieldUtils
	): PortableQuery {
		return {
			jsonQuery: <JsonQuery>query.toJSON(queryUtils, fieldUtils),
			parameterMap: query.getParameters(),
			queryResultType,
			schemaIndex: dbEntity.schemaVersion.schema.index,
			tableIndex: dbEntity.index,
			// values: query.values
		}
	}

	private async doSearch<E>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<IObservable<E[]>> {
		const [fieldUtils, queryUtils, transConnector] =
			      await DI.get(FIELD_UTILS, QUERY_UTILS, TRANS_CONNECTOR)

		return transConnector.search(this.getPortableQuery(
			dbEntity, query, queryResultType, queryUtils, fieldUtils))

	}

	private async doSearchOne<E>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<IObservable<E>> {
		const [fieldUtils, queryUtils, transConnector] =
			      await DI.get(FIELD_UTILS, QUERY_UTILS, TRANS_CONNECTOR)

		return transConnector.searchOne(this.getPortableQuery(
			dbEntity, query, queryResultType, queryUtils, fieldUtils))

	}

}

DI.set(QUERY_FACADE, QueryFacade)
