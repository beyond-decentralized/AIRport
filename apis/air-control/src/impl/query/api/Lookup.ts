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
		context: IEntityContext,
		cacheForUpdate?: UpdateCacheType,
		mapResults?: boolean
	): Promise<any> {
		return DI.db()
			.get(LOOKUP)
			.then(
				lookup => lookup.lookup(
					rawQuery, queryResultType, search, one,
					QueryClass, context, cacheForUpdate, mapResults))
	}

	protected ensureContext(
		context?: IContext
	): IContext {
		return doEnsureContext(context)
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
		context: IQueryContext<any>,
		cacheForUpdate?: UpdateCacheType,
		mapResults?: boolean
	): Promise<any> {
		const queryContextLoader = await DI.db().get(QUERY_CONTEXT_LOADER)
		await queryContextLoader.ensure(context)
		let query: IAbstractQuery
		if (QueryClass) {
			const rawNonEntityQuery = context.ioc.entityUtils.getQuery(rawQuery)
			query                   = new QueryClass(rawNonEntityQuery)
		} else {
			query           = context.ioc.entityUtils.getEntityQuery(rawQuery)
			queryResultType = this.getQueryResultType(queryResultType, mapResults)
		}
		let queryMethod
		if (search) {
			if (one) {
				queryMethod = context.ioc.queryFacade.searchOne
			} else {
				queryMethod = context.ioc.queryFacade.search
			}
		} else {
			if (one) {
				queryMethod = context.ioc.queryFacade.findOne
			} else {
				queryMethod = context.ioc.queryFacade.find
			}
		}

		return await queryMethod.call(context.ioc.queryFacade, query,
			this.getQueryResultType(queryResultType, mapResults), context, cacheForUpdate)
	}

	protected ensureContext<C extends IContext>(
		context?: IContext
	): C {
		return doEnsureContext(context) as C
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
	context?: IContext
): IContext {
	if (!context) {
		context = {}
	}

	if (!context.startedAt) {
		context.startedAt = new Date()
	}

	return context
}

DI.set(LOOKUP, Lookup)
