import { IAirportDatabase, IUtils } from "@airport/air-control";
import { IStoreDriver, PortableQuery, StoreType } from "@airport/ground-control";
import { ITransactionHistory } from "@airport/holding-pattern";
import { Observable } from "rxjs";
import { SQLDialect, SQLQuery } from "../query/sql/core/SQLQuery";
import { ActiveQueries } from "./ActiveQueries";
/**
 * Created by Papa on 9/9/2016.
 */
export declare abstract class SqlDriver implements IStoreDriver {
    protected airportDb: IAirportDatabase;
    protected utils: IUtils;
    queries: ActiveQueries;
    type: StoreType;
    constructor(airportDb: IAirportDatabase, utils: IUtils, queries: ActiveQueries);
    supportsLocalTransactions(): boolean;
    abstract initialize(dbName: string): Promise<any>;
    abstract startTransaction(): Promise<void>;
    abstract commitTransaction(): Promise<void>;
    abstract rollbackTransaction(): Promise<void>;
    saveTransaction(transaction: ITransactionHistory): Promise<any>;
    insertValues(portableQuery: PortableQuery): Promise<number>;
    deleteWhere(portableQuery: PortableQuery): Promise<number>;
    updateWhere(portableQuery: PortableQuery): Promise<number>;
    protected abstract executeNative(sql: string, parameters: any[]): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<EntityArray>;
    getSQLQuery(portableQuery: PortableQuery): SQLQuery<any>;
    protected abstract getDialect(): SQLDialect;
    protected abstract findNative(sqlQuery: string, parameters: any[]): Promise<any[]>;
    findOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Observable<E>;
    warn(message: string): void;
}
