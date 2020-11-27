import { DbEntity, DomainName, InternalFragments, IStoreDriver, PortableQuery, QueryType, SchemaName, SchemaStatus, SQLDataType, StoreType } from '@airport/ground-control';
import { IObservable } from '@airport/observe';
import { IOperationContext, ITransaction } from '@airport/tower';
import { SQLDialect, SQLQuery } from '../sql/core/SQLQuery';
/**
 * Created by Papa on 9/9/2016.
 */
export declare abstract class SqlDriver implements IStoreDriver {
    type: StoreType;
    protected maxValues: number;
    supportsLocalTransactions(context: IOperationContext<any, any>): boolean;
    getEntityTableName(dbEntity: DbEntity, context: IOperationContext<any, any>): string;
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
    }, context: IOperationContext<any, any>): string;
    abstract composeTableName(schemaName: string, tableName: string, context: IOperationContext<any, any>): string;
    abstract initialize(dbName: string, context: IOperationContext<any, any>): Promise<any>;
    abstract transact(callback: {
        (transaction: ITransaction): Promise<void>;
    }, context: IOperationContext<any, any>): Promise<void>;
    insertValues(portableQuery: PortableQuery, context: IOperationContext<any, any>, cachedSqlQueryId?: number): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, context: IOperationContext<any, any>): Promise<number>;
    updateWhere(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IOperationContext<any, any>): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IOperationContext<any, any>, cachedSqlQueryId?: number): Promise<EntityArray>;
    getSQLQuery(portableQuery: PortableQuery, context: IOperationContext<any, any>): SQLQuery<any>;
    abstract isValueValid(value: any, sqlDataType: SQLDataType, context: IOperationContext<any, any>): boolean;
    abstract findNative(sqlQuery: string, parameters: any[], context: IOperationContext<any, any>): Promise<any[]>;
    findOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IOperationContext<any, any>, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IOperationContext<any, any>, cachedSqlQueryId?: number): IObservable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IOperationContext<any, any>, cachedSqlQueryId?: number): IObservable<E>;
    warn(message: string): void;
    abstract doesTableExist(schemaName: string, tableName: string, context: IOperationContext<any, any>): Promise<boolean>;
    abstract dropTable(schemaName: string, tableName: string, context: IOperationContext<any, any>): Promise<boolean>;
    abstract query(queryType: QueryType, query: string, params: any, context: IOperationContext<any, any>, saveTransaction?: boolean): Promise<any>;
    abstract isServer(context: IOperationContext<any, any>): boolean;
    protected abstract executeNative(sql: string, parameters: any[], context: IOperationContext<any, any>): Promise<number>;
    protected abstract getDialect(context: IOperationContext<any, any>): SQLDialect;
    protected splitValues(values: any[][], context: IOperationContext<any, any>): any[][][];
}
//# sourceMappingURL=SqlDriver.d.ts.map