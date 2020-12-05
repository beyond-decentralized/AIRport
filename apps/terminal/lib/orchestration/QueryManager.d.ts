import { IContext } from '@airport/di';
import { PortableQuery } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
export interface IQueryManager {
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IContext): Promise<IObservable<EntityArray>>;
    searchOne<E>(portableQuery: PortableQuery, context: IContext): Promise<IObservable<E>>;
}
export declare class QueryManager implements IQueryManager {
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<IObservable<EntityArray>>;
    searchOne<E>(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<IObservable<E>>;
}
//# sourceMappingURL=QueryManager.d.ts.map