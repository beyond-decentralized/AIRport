import {
	DI,
	IContext,
}                        from '@airport/di'
import {QueryResultType} from '@airport/ground-control'
import {IEntityContext}  from '../../../lingo/core/data/EntityContext'
import {UpdateCacheType} from '../../../lingo/core/data/UpdateCacheType'
import {ILookup}         from '../../../lingo/query/api/Lookup'
import {IAbstractQuery}  from '../../../lingo/query/facade/AbstractQuery'
import {RawQuery,}       from '../../../lingo/query/facade/Query'
import {
	LOOKUP,
	QUERY_CONTEXT_LOADER
}                        from '../../../tokens'
import {IQueryContext}   from '../QueryContext'

export class LookupProxy
	implements ILookup {

	lookup(
		rawQuery: RawQuery | { (...args: any[]): RawQuery },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		QueryClass: new (rawNonEntityQuery: RawQuery) => IAbstractQuery,
		ctx: IEntityContext,
		cacheForUpdate?: UpdateCacheType,
		mapResults?: boolean
	): Promise<any> {
		return DI.db()
			.get(LOOKUP)
			.then(
				lookup => lookup.lookup(
					rawQuery, queryResultType, search, one,
					QueryClass, ctx, cacheForUpdate, mapResults))
	}

	protected ensureContext(
		ctx?: IContext
	): IContext {
		return doEnsureContext(ctx)
	}
}

export class Lookup
	implements ILookup {

	async lookup(
		rawQuery: RawQuery | { (...args: any[]): RawQuery },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		QueryClass: new (rawNonEntityQuery: RawQuery) => IAbstractQuery,
		ctx: IQueryContext<any>,
		cacheForUpdate?: UpdateCacheType,
		mapResults?: boolean
	): Promise<any> {
		const queryContextLoader = await DI.db().get(QUERY_CONTEXT_LOADER)
		await queryContextLoader.ensure(ctx)
		let query: IAbstractQuery
		if (QueryClass) {
			const rawNonEntityQuery = ctx.ioc.entityUtils.getQuery(rawQuery)
			query                   = new QueryClass(rawNonEntityQuery)
		} else {
			query           = ctx.ioc.entityUtils.getEntityQuery(rawQuery)
			queryResultType = this.getQueryResultType(queryResultType, mapResults)
		}
		let queryMethod
		if (search) {
			if (one) {
				queryMethod = ctx.ioc.queryFacade.searchOne
			} else {
				queryMethod = ctx.ioc.queryFacade.search
			}
		} else {
			if (one) {
				queryMethod = ctx.ioc.queryFacade.findOne
			} else {
				queryMethod = ctx.ioc.queryFacade.find
			}
		}

		return await queryMethod.call(ctx.ioc.queryFacade, query,
			this.getQueryResultType(queryResultType, mapResults), ctx, cacheForUpdate)
	}

	protected ensureContext<C extends IContext>(
		ctx?: IContext
	): C {
		return doEnsureContext(ctx) as C
	}

	private getQueryResultType(
		baseQueryResultType: QueryResultType,
		mapResults: boolean
	): QueryResultType {
		switch (baseQueryResultType) {
			case QueryResultType.ENTITY_GRAPH:
				if (mapResults) {
					return QueryResultType.MAPPED_ENTITY_GRAPH
				}
				return QueryResultType.ENTITY_GRAPH
			case QueryResultType.ENTITY_TREE:
				if (mapResults) {
					return QueryResultType.MAPPED_ENTITY_TREE
				}
				return QueryResultType.ENTITY_TREE
			default:
				throw new Error(`Unexpected Base Query ResultType: '${baseQueryResultType}'.`)
		}
	}

}

export function doEnsureContext(
	ctx?: IContext
): IContext {
	if (!ctx) {
		ctx = {}
	}

	if (!ctx.startedAt) {
		ctx.startedAt = new Date()
	}

	return ctx
}

DI.set(LOOKUP, Lookup)
