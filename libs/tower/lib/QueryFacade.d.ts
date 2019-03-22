import { AbstractQuery, IDatabaseFacade, IQueryFacade, UpdateCacheType } from '@airport/air-control';
import { DbEntity, PortableQuery, QueryResultType } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
export declare class QueryFacade implements IQueryFacade {
    private connector;
    databaseFacade: IDatabaseFacade;
    constructor();
    find<E, EntityArray extends Array<E>>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): Promise<EntityArray>;
    findOne<E>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): Promise<E>;
    search<E, EntityArray extends Array<E>>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): IObservable<EntityArray>;
    searchOne<E>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): IObservable<E>;
    getPortableQuery<E>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: boolean): PortableQuery;
}
