import { IStoreDriver, PortableQuery } from "@airport/ground-control";
import { Observable } from 'rxjs';
export interface IQueryManager {
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery): Observable<E>;
}
export declare class QueryManager implements IQueryManager {
    private dataStore;
    constructor(dataStore: IStoreDriver);
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Observable<E>;
}
