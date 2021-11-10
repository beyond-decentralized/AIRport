import { AbstractQuery, IAbstractQuery, IQueryContext, IQueryFacade } from '@airport/air-control';
import { PortableQuery, QueryResultType } from '@airport/ground-control';
import { Observable } from 'rxjs';
export declare class QueryFacade implements IQueryFacade {
    find<E, EntityArray extends Array<E>>(query: AbstractQuery, queryResultType: QueryResultType, context: IQueryContext): Promise<EntityArray>;
    findOne<E>(query: IAbstractQuery, queryResultType: QueryResultType, context: IQueryContext): Promise<E>;
    getPortableQuery<E>(query: IAbstractQuery, queryResultType: QueryResultType, context: IQueryContext): PortableQuery;
    search<E, EntityArray extends Array<E>>(query: IAbstractQuery, queryResultType: QueryResultType, context: IQueryContext): Promise<Observable<EntityArray>>;
    searchOne<E>(query: IAbstractQuery, queryResultType: QueryResultType, context: IQueryContext): Promise<Observable<E>>;
    ensureIocContext<E>(context: IQueryContext): Promise<void>;
}
//# sourceMappingURL=QueryFacade.d.ts.map