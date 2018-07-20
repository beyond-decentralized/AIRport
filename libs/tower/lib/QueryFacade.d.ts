import { AbstractQuery, IDatabaseFacade, IQueryFacade, UpdateCacheType } from "@airport/air-control";
import { DbEntity, ITransactionalConnector, PortableQuery, QueryResultType } from "@airport/ground-control";
import { Observable } from "rxjs";
export declare class QueryFacade implements IQueryFacade {
    private connector;
    databaseFacade: IDatabaseFacade;
    constructor(connector: ITransactionalConnector);
    find<E, EntityArray extends Array<E>>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): Promise<EntityArray>;
    findOne<E>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): Promise<E>;
    search<E, EntityArray extends Array<E>>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): Observable<EntityArray>;
    searchOne<E>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): Observable<E>;
    getPortableQuery<E>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: boolean): PortableQuery;
}
