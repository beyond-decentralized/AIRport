import {
	AbstractQuery,
	IAbstractQuery,
	IQueryContext,
	IQueryFacade,
	QUERY_CONTEXT_LOADER,
	QUERY_FACADE,
	UpdateCacheType
} from '@airport/air-control'
import {
	container,
	DI
} from '@airport/di'
import {
	JsonQuery,
	PortableQuery,
	QueryResultType,
} from '@airport/ground-control'
import {
	IObservable,
	map
} from '@airport/observe'

export class QueryFacade
	implements IQueryFacade {

	async find<E, EntityArray extends Array<E>>(
		query: AbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext<E>,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<EntityArray> {
		await this.ensureIocContext(context)
		const result = await context.ioc.transactionalConnector.find<E, EntityArray>(
			this.getPortableQuery(query, queryResultType, context))
		// TODO: restore and property maintain update cache, when needed
		// context.ioc.updateCache.addToCache(
		// 	context.ioc.schemaUtils, cacheForUpdate, context.dbEntity, ...result)

		return result
	}

	async findOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext<E>,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<E> {
		await this.ensureIocContext(context)
		const result = await context.ioc.transactionalConnector.findOne<E>(this.getPortableQuery(
			query, queryResultType, context))
		context.ioc.updateCache.addToCache(
			context.ioc.schemaUtils, cacheForUpdate, context.dbEntity, result)

		return result
	}

	getPortableQuery<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext<E>
	): PortableQuery {
		return {
			jsonQuery: <JsonQuery>query.toJSON(context.ioc.queryUtils, context.ioc.fieldUtils),
			parameterMap: query.getParameters(),
			queryResultType,
			schemaIndex: context.dbEntity.schemaVersion.schema.index,
			tableIndex: context.dbEntity.index,
			// values: query.values
		}
	}

	async search<E, EntityArray extends Array<E>>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext<E>,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<IObservable<EntityArray>> {
		await this.ensureIocContext(context)
		let observable = await context.ioc.transactionalConnector.search(this.getPortableQuery(
			query, queryResultType, context))

		observable = observable.pipe(
			map(
				results => {
					context.ioc.updateCache.addToCache(
						context.ioc.schemaUtils, cacheForUpdate, context.dbEntity, ...results)

					return results
				})
		) as IObservable<EntityArray>

		return observable as IObservable<EntityArray>
	}

	async searchOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext<E>,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<IObservable<E>> {
		await this.ensureIocContext(context)
		let observable = await context.ioc.transactionalConnector.searchOne(this.getPortableQuery(
			query, queryResultType, context))

		observable = observable.pipe(
			map(
				result => {
					context.ioc.updateCache.addToCache(
						context.ioc.schemaUtils, cacheForUpdate, context.dbEntity, result)

					return result
				})
		)

		return observable as IObservable<E>
	}

	private async ensureIocContext<E>(
		context: IQueryContext<E>
	): Promise<void> {
		const queryContextLoader = await container(this)
			.get(QUERY_CONTEXT_LOADER)
		await queryContextLoader.ensure(context)
	}

}

DI.set(QUERY_FACADE, QueryFacade)
