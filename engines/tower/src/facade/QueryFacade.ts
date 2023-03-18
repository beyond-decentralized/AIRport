import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ITransactionalConnector,
	Query,
	PortableQuery,
	QueryResultType,
} from '@airport/ground-control';
import { IQueryFacade } from '@airport/tarmaq-dao';
import {
	AbstractQuery,
	IAbstractQuery,
	IFieldUtils,
	IQueryContext,
	IQueryUtils,
	IQueryRelationManager
} from '@airport/tarmaq-query';
import {
	Observable,
} from 'rxjs';

@Injected()
export class QueryFacade
	implements IQueryFacade {

	@Inject()
	fieldUtils: IFieldUtils

	@Inject()
	queryRelationManager: IQueryRelationManager

	@Inject()
	queryUtils: IQueryUtils

	@Inject()
	transactionalConnector: ITransactionalConnector

	async find<E, EntityArray extends Array<E>>(
		query: AbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): Promise<EntityArray> {
		const result = await this.transactionalConnector.find<E, EntityArray>(
			this.getPortableQuery(query, queryResultType, context), context);

		return result;
	}

	async findOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): Promise<E> {
		const result = await this.transactionalConnector.findOne<E>(this.getPortableQuery(
			query, queryResultType, context), context);

		return result;
	}

	getPortableQuery<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): PortableQuery {
		return {
			query: <Query>query.toQuery(
				this.queryUtils, this.fieldUtils, this.queryRelationManager),
			parameterMap: query.getParameters(),
			queryResultType,
			applicationIndex: context.dbEntity.applicationVersion.application.index,
			entityIndex: context.dbEntity.index,
			trackedRepoGUIDs: Array.from(query.trackedRepoGUIDSet),
			trackedRepoLocalIds: Array.from(query.trackedRepoLocalIdSet)
			// values: query.values
		};
	}

	search<E, EntityArray extends Array<E>>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): Observable<EntityArray> {
		return this.transactionalConnector.search<E, EntityArray>(this.getPortableQuery(
			query, queryResultType, context), context);
	}

	searchOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): Observable<E> {
		return this.transactionalConnector.searchOne<E>(this.getPortableQuery(
			query, queryResultType, context), context);
	}

}
