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
	DI
} from '@airport/di';
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
		context: IQueryContext<E>
	): Promise<EntityArray> {
		await this.ensureIocContext(context);
		const result = await context.ioc.transactionalConnector.find<E, EntityArray>(
			this.getPortableQuery(query, queryResultType, context), context);

		return result;
	}

	async findOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext<E>
	): Promise<E> {
		await this.ensureIocContext(context);
		const result = await context.ioc.transactionalConnector.findOne<E>(this.getPortableQuery(
			query, queryResultType, context), context);

		return result;
	}

	getPortableQuery<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext<E>
	): PortableQuery {
		return {
			jsonQuery: <JsonQuery>query.toJSON(context.ioc.queryUtils, context.ioc.fieldUtils),
			parameterMap: query.getParameters(),
			queryResultType,
			schemaIndex: context.dbEntity.schemaVersion.schema.index,
			tableIndex: context.dbEntity.index,
			// values: query.values
		};
	}

	// FIXME: merge update caches on the client
	async search<E, EntityArray extends Array<E>>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext<E>
	): Promise<Observable<EntityArray>> {
		await this.ensureIocContext(context);
		let observable = await context.ioc.transactionalConnector.search(this.getPortableQuery(
			query, queryResultType, context), context);

		return observable as Observable<EntityArray>;
	}

	async searchOne<E>(
		query: IAbstractQuery,
		queryResultType: QueryResultType,
		context: IQueryContext<E>
	): Promise<Observable<E>> {
		await this.ensureIocContext(context);
		let observable = await context.ioc.transactionalConnector.searchOne(this.getPortableQuery(
			query, queryResultType, context), context);

		return observable as Observable<E>;
	}

	async ensureIocContext<E>(
		context: IQueryContext<E>
	): Promise<void> {
		const queryContextLoader = await container(this)
			.get(QUERY_CONTEXT_LOADER);
		await queryContextLoader.ensure(context);
	}

}

DI.set(QUERY_FACADE, QueryFacade);
