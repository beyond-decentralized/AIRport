import {
	IContext,
} from '@airport/direction-indicator';
import { QueryResultType } from '@airport/ground-control';
import { Inject, Injected } from '@airport/direction-indicator';
import { ILookup } from '../../definition/query/ILookup';
import {
	IAbstractQuery,
	IEntityQueryContext,
	IEntityUtils,
	IQueryContext,
	RawReadQuery
} from '@airport/tarmaq-query';
import { IQueryFacade } from '../../definition/IDatabaseFacade';
import { IDao } from '../../definition/IDao';

export class LookupProxy
	implements ILookup {

	ensureContext<C extends IContext = IContext>(
		context?: C
	): C {
		return this.dao.lookup.ensureContext<C>(context);
	}

	constructor(
		protected dao: IDao<any, any, any, any, any, any, any, any>
	) {
	}

	async lookup(
		rawQuery: RawReadQuery | { (...args: any[]): RawReadQuery },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		QueryClass: new (rawNonEntityQuery: RawReadQuery) => IAbstractQuery,
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
		if (!context) {
			context = {} as any;
		}

		if (!context.startedAt) {
			context.startedAt = new Date();
		}

		return context;
	}

	async lookup(
		rawQuery: RawReadQuery | { (...args: any[]): RawReadQuery },
		queryResultType: QueryResultType,
		search: boolean,
		one: boolean,
		QueryClass: new (rawNonEntityQuery: RawReadQuery) => IAbstractQuery,
		context: IQueryContext
	): Promise<any> {
		let query: IAbstractQuery;
		let theRawQuery = this.entityUtils.getRawQuery(rawQuery)
		this.entityUtils.ensureAllQEntitiesInFromClause(theRawQuery)

		if (QueryClass) {
			const rawNonEntityQuery = this.entityUtils.getQuery(theRawQuery);
			query = new QueryClass(rawNonEntityQuery);
		} else {
			query = this.entityUtils.getEntityQuery(theRawQuery);
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
