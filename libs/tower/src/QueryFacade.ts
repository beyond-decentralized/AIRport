import {
	AbstractQuery,
	IAbstractQuery,
	IocQueryContext,
	IQueryContext,
	IQueryFacade,
	QUERY_FACADE,
	UpdateCacheType
} from '@airport/air-control'
import {DI} from '@airport/di'
import {
	JsonQuery,
	PortableQuery,
	QueryResultType,
}           from '@airport/ground-control'
import {
	IObservable,
	map
}           from '@airport/observe'

export class QueryFacade
	implements IQueryFacade {

	async find<E, EntityArray extends Array<E>>(
		query: AbstractQuery,
		queryResultType: QueryResultType,
		ctx: IQueryContext<E>,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<EntityArray> {
		await this.ensureIocContext(ctx)
		const result = await ctx.ioc.transactionalConnector.find<E, EntityArray>(
			this.getPortableQuery(query, queryResultType, ctx))
		ctx.ioc.updateCache.addToCache(
			ctx.ioc.schemaUtils, cacheForUpdate, ctx.dbEntity, ...result)

		return result
	}

	async findOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		ctx: IQueryContext<E>,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<E> {
		await this.ensureIocContext(ctx)
		const result = await ctx.ioc.transactionalConnector.findOne<E>(this.getPortableQuery(
			query, queryResultType, ctx))
		ctx.ioc.updateCache.addToCache(
			ctx.ioc.schemaUtils, cacheForUpdate, ctx.dbEntity, result)

		return result
	}

	getPortableQuery<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		ctx: IQueryContext<E>
	): PortableQuery {
		return {
			jsonQuery: <JsonQuery>query.toJSON(ctx.ioc.queryUtils, ctx.ioc.fieldUtils),
			parameterMap: query.getParameters(),
			queryResultType,
			schemaIndex: ctx.dbEntity.schemaVersion.schema.index,
			tableIndex: ctx.dbEntity.index,
			// values: query.values
		}
	}

	async search<E, EntityArray extends Array<E>>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		ctx: IQueryContext<E>,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<IObservable<EntityArray>> {
		await this.ensureIocContext(ctx)
		let observable = await ctx.ioc.transactionalConnector.search(this.getPortableQuery(
			query, queryResultType, ctx))

		observable = observable.pipe(
			map(
				results => {
					ctx.ioc.updateCache.addToCache(
						ctx.ioc.schemaUtils, cacheForUpdate, ctx.dbEntity, ...results)

					return results
				})
		) as IObservable<EntityArray>

		return observable as IObservable<EntityArray>
	}

	async searchOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		ctx: IQueryContext<E>,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<IObservable<E>> {
		await this.ensureIocContext(ctx)
		let observable = await ctx.ioc.transactionalConnector.searchOne(this.getPortableQuery(
			query, queryResultType, ctx))

		observable = observable.pipe(
			map(
				result => {
					ctx.ioc.updateCache.addToCache(
						ctx.ioc.schemaUtils, cacheForUpdate, ctx.dbEntity, result)

					return result
				})
		)

		return observable as IObservable<E>
	}

	private async ensureIocContext<E>(
		ctx: IQueryContext<E>
	): Promise<void> {
		await IocQueryContext.ensure(ctx)
	}

}

DI.set(QUERY_FACADE, QueryFacade)
