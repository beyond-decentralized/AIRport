import { AbstractQuery, IAbstractQuery, IQueryContext, IQueryFacade, UpdateCacheType } from '@airport/air-control';
import { PortableQuery, QueryResultType } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
export declare class QueryFacade implements IQueryFacade {
    find<E, EntityArray extends Array<E>>(query: AbstractQuery, queryResultType: QueryResultType, ctx: IQueryContext<E>, cacheForUpdate?: UpdateCacheType): Promise<EntityArray>;
    findOne<E>(query: IAbstractQuery, queryResultType: QueryResultType, ctx: IQueryContext<E>, cacheForUpdate?: UpdateCacheType): Promise<E>;
    getPortableQuery<E>(query: IAbstractQuery, queryResultType: QueryResultType, ctx: IQueryContext<E>): PortableQuery;
    search<E, EntityArray extends Array<E>>(query: IAbstractQuery, queryResultType: QueryResultType, ctx: IQueryContext<E>, cacheForUpdate?: UpdateCacheType): Promise<IObservable<EntityArray>>;
    searchOne<E>(query: IAbstractQuery, queryResultType: QueryResultType, ctx: IQueryContext<E>, cacheForUpdate?: UpdateCacheType): Promise<IObservable<E>>;
    private ensureIocContext;
}
//# sourceMappingURL=QueryFacade.d.ts.map