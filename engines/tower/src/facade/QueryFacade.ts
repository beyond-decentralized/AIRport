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
	queryUtils: IQueryUtils

	@Inject()
	relationManager: IQueryRelationManager

	@Inject()
	transactionalConnector: ITransactionalConnector

	async find<E, EntityArray extends Array<E>>(
		query: AbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): Promise<EntityArray> {
		await this.ensureContext(context);
		const result = await this.transactionalConnector.find<E, EntityArray>(
			this.getPortableQuery(query, queryResultType, context), context);

		return result;
	}

	async findOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): Promise<E> {
		await this.ensureContext(context);
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
				this.queryUtils, this.fieldUtils, this.relationManager),
			parameterMap: query.getParameters(),
			queryResultType,
			applicationIndex: context.dbEntity.applicationVersion.application.index,
			tableIndex: context.dbEntity.index,
			trackedRepoGUIDs: Array.from(query.trackedRepoGUIDSet),
			trackedRepoLocalIds: Array.from(query.trackedRepoLocalIdSet)
			// values: query.values
		};
	}

	// FIXME: merge update caches on the client
	async search<E, EntityArray extends Array<E>>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): Promise<Observable<EntityArray>> {
		await this.ensureContext(context);
		let observable = await this.transactionalConnector.search(this.getPortableQuery(
			query, queryResultType, context), context);

		return observable as Observable<EntityArray>;
	}

	async searchOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): Promise<Observable<E>> {
		await this.ensureContext(context);
		let observable = await this.transactionalConnector.searchOne(this.getPortableQuery(
			query, queryResultType, context), context);

		return observable as Observable<E>;
	}

	async ensureContext<E>(
		context: IQueryContext
	): Promise<void> {
	}

}
