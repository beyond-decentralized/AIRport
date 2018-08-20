import { ATransactionHistory, IStoreDriver, PortableQuery } from '@airport/ground-control';
import { Observable } from 'rxjs';
export declare class IndexedDbDriver implements IStoreDriver {
    deleteWhere(portableQuery: PortableQuery): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<E>;
    initialize(dbName: string): Promise<any>;
    insertValues(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<number>;
    saveTransaction(transaction: ATransactionHistory): Promise<any>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Observable<E>;
    updateWhere(portableQuery: PortableQuery): Promise<number>;
    startTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollbackTransaction(): Promise<void>;
}
