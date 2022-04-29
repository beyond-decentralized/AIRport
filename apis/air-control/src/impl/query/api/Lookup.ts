import {
	DEPENDENCY_INJECTION,
	IContext,
} from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { IEntityQueryContext } from '../../../lingo/core/EntityContext';
import { ILookup } from '../../../lingo/query/api/Lookup';
import { IAbstractQuery } from '../../../lingo/query/facade/AbstractQuery';
import { RawQuery, } from '../../../lingo/query/facade/Query';
import { IQueryContext } from '../../../lingo/query/QueryContext';
import {
	ENTITY_UTILS,
	LOOKUP,
	QUERY_FACADE
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
		return DEPENDENCY_INJECTION.db()
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
		const [entityUtils, queryFacade] = await DEPENDENCY_INJECTION.db()
			.get(ENTITY_UTILS, QUERY_FACADE);
		let query: IAbstractQuery;
		if (QueryClass) {
			const rawNonEntityQuery = entityUtils.getQuery(rawQuery);
			query = new QueryClass(rawNonEntityQuery);
		} else {
			query = entityUtils.getEntityQuery(rawQuery);
			queryResultType = this.getQueryResultType(queryResultType, mapResults);
		}
		let queryMethod;
		if (search) {
			if (one) {
				queryMethod = queryFacade.searchOne;
			} else {
				queryMethod = queryFacade.search;
			}
		} else {
			if (one) {
				queryMethod = queryFacade.findOne;
			} else {
				queryMethod = queryFacade.find;
			}
		}

		let result = await queryMethod.call(queryFacade, query,
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

