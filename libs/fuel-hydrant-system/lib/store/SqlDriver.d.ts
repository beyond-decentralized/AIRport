import { IAirportDatabase, ISchemaUtils } from '@airport/air-control';
import { DbEntity, DomainName, InternalFragments, IStoreDriver, PortableQuery, QueryType, SchemaName, SchemaStatus, SQLDataType, StoreType } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { ITransaction } from '@airport/tower';
import { SQLDialect, SQLQuery } from '../sql/core/SQLQuery';
/**
 * Created by Papa on 9/9/2016.
 */
export declare abstract class SqlDriver implements IStoreDriver {
    type: StoreType;
    protected maxValues: number;
    supportsLocalTransactions(): boolean;
    getEntityTableName(dbEntity: DbEntity): string;
    getTableName(schema: {
        domain: DomainName | {
            name: DomainName;
        };
        name: SchemaName;
        status?: SchemaStatus;
    }, table: {
        name: string;
        tableConfig?: {
            name?: string;
        };
    }): string;
    abstract composeTableName(schemaName: string, tableName: string): string;
    abstract initialize(dbName: string): Promise<any>;
    abstract transact(callback: {
        (transaction: ITransaction): Promise<void>;
    }): Promise<void>;
    insertValues(portableQuery: PortableQuery): Promise<number>;
    deleteWhere(portableQuery: PortableQuery): Promise<number>;
    updateWhere(portableQuery: PortableQuery, internalFragments: InternalFragments): Promise<number>;
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
    protected abstract executeNative(sql: string, parameters: any[]): Promise<number>;
    protected abstract getDialect(): SQLDialect;
    private splitValues;
}
//# sourceMappingURL=SqlDriver.d.ts.map