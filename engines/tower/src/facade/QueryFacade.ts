import {
	AbstractQuery,
	IAbstractQuery,
	IQueryContext,
	IQueryFacade,
	QUERY_CONTEXT_LOADER,
	QUERY_FACADE
} from '@airport/air-control';
import {
	container,
	DEPENDENCY_INJECTION
} from '@airport/direction-indicator';
import {
	JsonQuery,
	PortableQuery,
	QueryResultType,
} from '@airport/ground-control';
import {
	Observable,
} from 'rxjs';
import {
	map
} from 'rxjs/operators';

export class QueryFacade
	implements IQueryFacade {

	async find<E, EntityArray extends Array<E>>(
		query: AbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): Promise<EntityArray> {
		await this.ensureIocContext(context);
		const result = await context.ioc.transactionalConnector.find<E, EntityArray>(
			this.getPortableQuery(query, queryResultType, context), context);

		return result;
	}

	async findOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): Promise<E> {
		await this.ensureIocContext(context);
		const result = await context.ioc.transactionalConnector.findOne<E>(this.getPortableQuery(
			query, queryResultType, context), context);

		return result;
	}

	getPortableQuery<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): PortableQuery {
		return {
			jsonQuery: <JsonQuery>query.toJSON(context.ioc.queryUtils, context.ioc.fieldUtils),
			parameterMap: query.getParameters(),
			queryResultType,
			applicationIndex: context.dbEntity.applicationVersion.application.index,
			tableIndex: context.dbEntity.index,
			// values: query.values
		};
	}

	// FIXME: merge update caches on the client
	async search<E, EntityArray extends Array<E>>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): Promise<Observable<EntityArray>> {
		await this.ensureIocContext(context);
		let observable = await context.ioc.transactionalConnector.search(this.getPortableQuery(
			query, queryResultType, context), context);

		return observable as Observable<EntityArray>;
	}

	async searchOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext
	): Promise<Observable<E>> {
		await this.ensureIocContext(context);
		let observable = await context.ioc.transactionalConnector.searchOne(this.getPortableQuery(
			query, queryResultType, context), context);

		return observable as Observable<E>;
	}

	async ensureIocContext<E>(
		context: IQueryContext
	): Promise<void> {
		const queryContextLoader = await container(this)
			.get(QUERY_CONTEXT_LOADER);
		await queryContextLoader.ensure(context);
	}

}

DEPENDENCY_INJECTION.set(QUERY_FACADE, QueryFacade);
