import {
	AbstractQuery,
	DbEntity,
	IDatabaseFacade,
	IQueryFacade,
	UpdateCacheType
}                         from "@airport/air-control";
import {
	ITransactionalConnector,
	JsonQuery,
	PortableQuery,
	QueryResultType,
	TransactionalConnectorToken
}                         from "@airport/ground-control";
import {Observable}       from "rxjs/Observable";
import {
	Inject,
	Service
}                         from "typedi";
import {QueryFacadeToken} from "./InjectionTokens";

@Service(QueryFacadeToken)
export class QueryFacade
	implements IQueryFacade {

	public databaseFacade: IDatabaseFacade;

	constructor(
		@Inject(
			_ => TransactionalConnectorToken)
		private connector: ITransactionalConnector,
	) {
	}

	async find<E, EntityArray extends Array<E>>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<EntityArray> {
		const result = await this.connector.find<E, EntityArray>(
			this.getPortableQuery(dbEntity, query, queryResultType));
		if (cacheForUpdate !== UpdateCacheType.NONE) {
			this.databaseFacade.cacheForUpdate(cacheForUpdate, dbEntity, ...result);
		}

		return result;
	}

	async findOne<E>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): Promise<E> {
		const result = await this.connector.findOne<E>(this.getPortableQuery(dbEntity, query, queryResultType));
		if (cacheForUpdate !== UpdateCacheType.NONE) {
			this.databaseFacade.cacheForUpdate(cacheForUpdate, dbEntity, result);
		}

		return result;
	}

	search<E, EntityArray extends Array<E>>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): Observable<EntityArray> {
		return this.connector.search<E, EntityArray>(
			this.getPortableQuery(dbEntity, query, queryResultType));
	}

	searchOne<E>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = UpdateCacheType.NONE,
	): Observable<E> {
		return this.connector.searchOne<E>(
			this.getPortableQuery(dbEntity, query, queryResultType));
	}

	getPortableQuery<E>(
		dbEntity: DbEntity,
		query: AbstractQuery,
		queryResultType: QueryResultType,
		cacheForUpdate = false,
	): PortableQuery {
		return {
			jsonQuery: <JsonQuery>query.toJSON(),
			parameterMap: query.getParameters(),
			queryResultType,
			schemaIndex: dbEntity.schemaVersion.schema.index,
			tableIndex: dbEntity.index,
			values: query.values
		};
	}

}