import { PortableQuery } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
export interface IQueryManager {
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery): Promise<IObservable<EntityArray>>;
    searchOne<E>(portableQuery: PortableQuery): Promise<IObservable<E>>;
}
export declare class QueryManager implements IQueryManager {
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<IObservable<EntityArray>>;
    searchOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<IObservable<E>>;
}
