import {
	IContext,
} from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { Inject, Injected } from '@airport/direction-indicator';
import { ILookup } from '../../definition/query/Lookup';
import {
	IAbstractQuery,
	IEntityQueryContext,
	IEntityUtils,
	IQueryContext,
	RawQuery
} from '@airport/tarmaq-query';
import { IQueryFacade } from '../../definition/IDatabaseFacade';
import { IDao } from '../../definition/Dao';

export class LookupProxy
	implements ILookup {

	ensureContext<C extends IContext = IContext>(
		context?: C
	): C {
		return doEnsureContext<C>(context);
	}

	constructor(
		protected dao: IDao<any, any, any, any, any, any, any, any>
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

@Injected()
export class Lookup
	implements ILookup {

	@Inject()
	entityUtils: IEntityUtils

	@Inject()
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
		context: IQueryContext
	): Promise<any> {
		let query: IAbstractQuery;
		if (QueryClass) {
			const rawNonEntityQuery = this.entityUtils.getQuery(rawQuery);
			query = new QueryClass(rawNonEntityQuery);
		} else {
			query = this.entityUtils.getEntityQuery(rawQuery);
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
			queryResultType, context);
		if (!one && !result) {
			result = []
		}

		return result
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

