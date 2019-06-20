import { AbstractQuery, IFieldUtils, IQueryFacade, IQueryUtils, UpdateCacheType } from '@airport/air-control';
import { DbEntity, PortableQuery, QueryResultType } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
export declare class QueryFacade implements IQueryFacade {
    find<E, EntityArray extends Array<E>>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): Promise<EntityArray>;
    findOne<E>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): Promise<E>;
    search<E, EntityArray extends Array<E>>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): IObservable<EntityArray>;
    searchOne<E>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, cacheForUpdate?: UpdateCacheType): IObservable<E>;
    getPortableQuery<E>(dbEntity: DbEntity, query: AbstractQuery, queryResultType: QueryResultType, queryUtils: IQueryUtils, fieldUtils: IFieldUtils): PortableQuery;
    private doSearch;
    private doSearchOne;
}
