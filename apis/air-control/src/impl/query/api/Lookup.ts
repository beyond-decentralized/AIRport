import {
	IContext,
} from '@airport/direction-indicator';
import { IEntityStateManager, QueryResultType } from '@airport/ground-control';
import { IAirportDatabase } from '../../../lingo/AirportDatabase';
import { IEntityQueryContext } from '../../../lingo/core/EntityContext';
import { IQueryFacade } from '../../../lingo/core/repository/DatabaseFacade';
import { IUpdateCacheManager } from '../../../lingo/core/UpdateCacheManager';
import { ILookup } from '../../../lingo/query/api/Lookup';
import { IAbstractQuery } from '../../../lingo/query/facade/AbstractQuery';
import { RawQuery, } from '../../../lingo/query/facade/Query';
import { IQueryContext } from '../../../lingo/query/QueryContext';
import { IEntityUtils } from '../../../lingo/utils/EntityUtils';

export interface IDaoStub {
	airportDatabase: IAirportDatabase
	entityStateManager: IEntityStateManager
	lookup: ILookup
	updateCacheManager: IUpdateCacheManager
}

export class LookupProxy
	implements ILookup {

	ensureContext<C extends IContext = IContext>(
		context?: C
	): C {
		return doEnsureContext<C>(context);
	}

	constructor(
		protected dao: IDaoStub
	) {
	}

	async lookup(
		rawQuery: RawQuery | { (...args: any[]): RawQuery },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		QueryClass: new (rawNonEntityQuery: RawQuery) => IAbstractQuery,
		context: IEntityQueryContext,
		mapResults?: boolean
	): Promise<any> {
		return await this.dao.lookup.lookup(
					rawQuery, queryResultType, search, one,
					QueryClass, context, mapResults);
	}
}

export class Lookup
	implements ILookup {

	entityUtils: IEntityUtils
	queryFacade: IQueryFacade

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
		let query: IAbstractQuery;
		if (QueryClass) {
			const rawNonEntityQuery = this.entityUtils.getQuery(rawQuery);
			query = new QueryClass(rawNonEntityQuery);
		} else {
			query = this.entityUtils.getEntityQuery(rawQuery);
			queryResultType = this.getQueryResultType(queryResultType, mapResults);
		}
		let queryMethod;
		if (search) {
			if (one) {
				queryMethod = this.queryFacade.searchOne;
			} else {
				queryMethod = this.queryFacade.search;
			}
		} else {
			if (one) {
				queryMethod = this.queryFacade.findOne;
			} else {
				queryMethod = this.queryFacade.find;
			}
		}

		let result = await queryMethod.call(this.queryFacade, query,
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

