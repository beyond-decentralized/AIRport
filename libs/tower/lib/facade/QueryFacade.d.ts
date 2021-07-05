import { AbstractQuery, IAbstractQuery, IQueryContext, IQueryFacade, UpdateCacheType } from '@airport/air-control';
import { PortableQuery, QueryResultType } from '@airport/ground-control';
import { Observable } from 'rxjs';
export declare class QueryFacade implements IQueryFacade {
    find<E, EntityArray extends Array<E>>(query: AbstractQuery, queryResultType: QueryResultType, context: IQueryContext<E>, cacheForUpdate?: UpdateCacheType): Promise<EntityArray>;
    findOne<E>(query: IAbstractQuery, queryResultType: QueryResultType, context: IQueryContext<E>, cacheForUpdate?: UpdateCacheType): Promise<E>;
    getPortableQuery<E>(query: IAbstractQuery, queryResultType: QueryResultType, context: IQueryContext<E>): PortableQuery;
    search<E, EntityArray extends Array<E>>(query: IAbstractQuery, queryResultType: QueryResultType, context: IQueryContext<E>, cacheForUpdate?: UpdateCacheType): Promise<Observable<EntityArray>>;
    searchOne<E>(query: IAbstractQuery, queryResultType: QueryResultType, context: IQueryContext<E>, cacheForUpdate?: UpdateCacheType): Promise<Observable<E>>;
    ensureIocContext<E>(context: IQueryContext<E>): Promise<void>;
}
//# sourceMappingURL=QueryFacade.d.ts.map