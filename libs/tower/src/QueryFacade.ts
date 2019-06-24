import {
	AbstractQuery,
	IAbstractQuery,
	IFieldUtils,
	IQueryFacade,
	IQueryUtils,
	ISchemaUtils,
	IUpdateCache,
	QUERY_FACADE,
	UpdateCacheType
}                    from '@airport/air-control'
import {DI}          from '@airport/di'
import {
	DbEntity,
	ITransactionalConnector,
	JsonQuery,
	PortableQuery,
	QueryResultType,
}                    from '@airport/ground-control'
import {IObservable} from '@airport/observe'

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
		fieldUtils: IFieldUtils,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<EntityArray> {
		const result = await transConnector.find<E, EntityArray>(
			this.getPortableQuery(
				dbEntity, query, queryResultType, queryUtils, fieldUtils))
		updateCache.addToCache(
			schemaUtils, cacheForUpdate, dbEntity, ...result)

		return result
	}

	async findOne<E>(
		dbEntity: DbEntity,
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		fieldUtils: IFieldUtils,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<E> {
		const result = await transConnector.findOne<E>(this.getPortableQuery(
			dbEntity, query, queryResultType, queryUtils, fieldUtils))
		updateCache.addToCache(
			schemaUtils, cacheForUpdate, dbEntity, result)

		return result
	}

	getPortableQuery<E>(
		dbEntity: DbEntity,
		query: IAbstractQuery,
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

	async search<E, EntityArray extends Array<E>>(
		dbEntity: DbEntity,
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		fieldUtils: IFieldUtils,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<IObservable<EntityArray>> {
		return transConnector.search(this.getPortableQuery(
			dbEntity, query, queryResultType, queryUtils, fieldUtils)).pipe(
				map(results => {
					updateCache.addToCache(
						schemaUtils, cacheForUpdate, dbEntity, ...results)

					return results
				})
		)

	}

	async searchOne<E>(
		dbEntity: DbEntity,
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		fieldUtils: IFieldUtils,
		queryUtils: IQueryUtils,
		schemaUtils: ISchemaUtils,
		transConnector: ITransactionalConnector,
		updateCache: IUpdateCache,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<IObservable<E>> {
		return transConnector.searchOne(this.getPortableQuery(
			dbEntity, query, queryResultType, queryUtils, fieldUtils)).pipe(
				map(result => {
					updateCache.addToCache(
						schemaUtils, cacheForUpdate, dbEntity, result)

					return results
				})
		)

	}

}

DI.set(QUERY_FACADE, QueryFacade)
