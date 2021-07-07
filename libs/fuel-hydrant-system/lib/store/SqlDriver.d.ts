import { DbEntity, DomainName, InternalFragments, IStoreDriver, PortableQuery, QueryType, SchemaName, SchemaStatus, SQLDataType, StoreType } from '@airport/ground-control';
import { Observable } from 'rxjs';
import { ITransaction } from '@airport/tower';
import { SQLDialect, SQLQuery } from '../sql/core/SQLQuery';
import { IFuelHydrantContext } from '../FuelHydrantContext';
/**
 * Created by Papa on 9/9/2016.
 */
export declare abstract class SqlDriver implements IStoreDriver {
    type: StoreType;
    protected maxValues: number;
    supportsLocalTransactions(context: IFuelHydrantContext): boolean;
    getEntityTableName(dbEntity: DbEntity, context: IFuelHydrantContext): string;
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
    }, context: IFuelHydrantContext): string;
    abstract composeTableName(schemaName: string, tableName: string, context: IFuelHydrantContext): string;
    abstract initialize(dbName: string, context: IFuelHydrantContext): Promise<any>;
    abstract transact(callback: {
        (transaction: ITransaction): Promise<void>;
    }, context: IFuelHydrantContext): Promise<void>;
    insertValues(portableQuery: PortableQuery, context: IFuelHydrantContext, cachedSqlQueryId?: number): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, context: IFuelHydrantContext): Promise<number>;
    updateWhere(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IFuelHydrantContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IFuelHydrantContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    getSQLQuery(portableQuery: PortableQuery, context: IFuelHydrantContext): SQLQuery<any>;
    abstract isValueValid(value: any, sqlDataType: SQLDataType, context: IFuelHydrantContext): boolean;
    abstract findNative(sqlQuery: string, parameters: any[], context: IFuelHydrantContext): Promise<any[]>;
    findOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IFuelHydrantContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IFuelHydrantContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IFuelHydrantContext, cachedSqlQueryId?: number): Observable<E>;
    warn(message: string): void;
    abstract doesTableExist(schemaName: string, tableName: string, context: IFuelHydrantContext): Promise<boolean>;
    abstract dropTable(schemaName: string, tableName: string, context: IFuelHydrantContext): Promise<boolean>;
    abstract query(queryType: QueryType, query: string, params: any, context: IFuelHydrantContext, saveTransaction?: boolean): Promise<any>;
    abstract isServer(context: IFuelHydrantContext): boolean;
    protected abstract executeNative(sql: string, parameters: any[], context: IFuelHydrantContext): Promise<number>;
    protected abstract getDialect(context: IFuelHydrantContext): SQLDialect;
    protected splitValues(values: any[][], context: IFuelHydrantContext): any[][][];
    protected ensureContext(context: IFuelHydrantContext): Promise<IFuelHydrantContext>;
    protected ensureIocContext(context: IFuelHydrantContext): Promise<void>;
}
//# sourceMappingURL=SqlDriver.d.ts.map