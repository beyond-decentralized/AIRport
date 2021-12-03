import {
	DI,
	IContext,
} from '@airport/di';
import { QueryResultType } from '@airport/ground-control';
import { IEntityQueryContext } from '../../../lingo/core/EntityContext';
import { ILookup } from '../../../lingo/query/api/Lookup';
import { IAbstractQuery } from '../../../lingo/query/facade/AbstractQuery';
import { RawQuery, } from '../../../lingo/query/facade/Query';
import { IQueryContext } from '../../../lingo/query/QueryContext';
import {
	LOOKUP,
	QUERY_CONTEXT_LOADER
} from '../../../tokens';

export class LookupProxy
	implements ILookup {

	ensureContext<C extends IContext = IContext>(
		context?: C
	): C {
		return doEnsureContext<C>(context);
	}

	lookup(
		rawQuery: RawQuery | { (...args: any[]): RawQuery },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		QueryClass: new (rawNonEntityQuery: RawQuery) => IAbstractQuery,
		context: IEntityQueryContext,
		mapResults?: boolean
	): Promise<any> {
		return DI.db()
			.get(LOOKUP)
			.then(
				lookup => lookup.lookup(
					rawQuery, queryResultType, search, one,
					QueryClass, context, mapResults));
	}
}

export class Lookup
	implements ILookup {

	ensureContext<C extends IContext = IContext>(
		context?: C
	): C {
		return doEnsureContext(context) as C;
	}

	async lookup(
		rawQuery: RawQuery | { (...args: any[]): RawQuery },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		QueryClass: new (rawNonEntityQuery: RawQuery) => IAbstractQuery,
		context: IQueryContext,
		mapResults?: boolean
	): Promise<any> {
		const queryContextLoader = await DI.db().get(QUERY_CONTEXT_LOADER);
		await queryContextLoader.ensure(context);
		let query: IAbstractQuery;
		if (QueryClass) {
			const rawNonEntityQuery = context.ioc.entityUtils.getQuery(rawQuery);
			query = new QueryClass(rawNonEntityQuery);
		} else {
			query = context.ioc.entityUtils.getEntityQuery(rawQuery);
			queryResultType = this.getQueryResultType(queryResultType, mapResults);
		}
		let queryMethod;
		if (search) {
			if (one) {
				queryMethod = context.ioc.queryFacade.searchOne;
			} else {
				queryMethod = context.ioc.queryFacade.search;
			}
		} else {
			if (one) {
				queryMethod = context.ioc.queryFacade.findOne;
			} else {
				queryMethod = context.ioc.queryFacade.find;
			}
		}

		let result = await queryMethod.call(context.ioc.queryFacade, query,
			this.getQueryResultType(queryResultType, mapResults), context);
		if (!one && !result) {
			result = []
		}

		return result
	}

	private getQueryResultType(
		baseQueryResultType: QueryResultType,
		mapResults: boolean
	): QueryResultType {
		switch (baseQueryResultType) {
			case QueryResultType.ENTITY_GRAPH:
				if (mapResults) {
					return QueryResultType.MAPPED_ENTITY_GRAPH;
				}
				return QueryResultType.ENTITY_GRAPH;
			case QueryResultType.ENTITY_TREE:
				if (mapResults) {
					return QueryResultType.MAPPED_ENTITY_TREE;
				}
				return QueryResultType.ENTITY_TREE;
			case QueryResultType.FIELD:
			case QueryResultType.RAW:
			case QueryResultType.TREE:
			case QueryResultType.SHEET:
				return baseQueryResultType
			default:
				throw new Error(`Unexpected Base Query ResultType: '${baseQueryResultType}'.`);
		}
	}

}

export function doEnsureContext<C extends IContext = IContext>(
	context?: C
): C {
	if (!context) {
		context = {} as any;
	}

	if (!context.startedAt) {
		context.startedAt = new Date();
	}

	return context;
}

DI.set(LOOKUP, Lookup);
