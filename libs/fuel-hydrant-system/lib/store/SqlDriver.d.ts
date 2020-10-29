import { IAirportDatabase, ISchemaUtils } from '@airport/air-control';
import { InternalFragments, IStoreDriver, ITransaction, PortableQuery, QueryType, SQLDataType, StoreType } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { SQLDialect, SQLQuery } from '../sql/core/SQLQuery';
/**
 * Created by Papa on 9/9/2016.
 */
export declare abstract class SqlDriver implements IStoreDriver {
    protected maxValues: number;
    type: StoreType;
    supportsLocalTransactions(): boolean;
    abstract initialize(dbName: string): Promise<any>;
    abstract transact(keepAlive?: boolean): Promise<ITransaction>;
    insertValues(portableQuery: PortableQuery): Promise<number>;
    private splitValues;
    deleteWhere(portableQuery: PortableQuery): Promise<number>;
    updateWhere(portableQuery: PortableQuery, internalFragments: InternalFragments): Promise<number>;
    protected abstract executeNative(sql: string, parameters: any[]): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): Promise<EntityArray>;
    getSQLQuery(portableQuery: PortableQuery, airDb: IAirportDatabase, schemaUtils: ISchemaUtils): SQLQuery<any>;
    abstract isValueValid(value: any, sqlDataType: SQLDataType): boolean;
    abstract findNative(sqlQuery: string, parameters: any[]): Promise<any[]>;
    findOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): IObservable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, cachedSqlQueryId?: number): IObservable<E>;
    warn(message: string): void;
    abstract doesTableExist(schemaName: string, tableName: string): Promise<boolean>;
    abstract dropTable(schemaName: string, tableName: string): Promise<boolean>;
    abstract query(queryType: QueryType, query: string, params: any, saveTransaction?: boolean): Promise<any>;
    abstract numFreeConnections(): number;
    abstract isServer(): boolean;
    protected abstract getDialect(): SQLDialect;
}
//# sourceMappingURL=SqlDriver.d.ts.map