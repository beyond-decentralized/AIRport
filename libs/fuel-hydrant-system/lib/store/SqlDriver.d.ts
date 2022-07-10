import { IAirportDatabase, IQMetadataUtils, IUtils } from '@airport/air-traffic-control';
import { IActiveQueries } from '@airport/flight-number';
import { Application_Name, DbEntity, Domain_Name, FullApplication_Name, IDbApplicationUtils, IEntityStateManager, InternalFragments, JsonQuery, PortableQuery, QueryType, SQLDataType, StoreType } from '@airport/ground-control';
import { IStoreDriver, ITransaction, ITransactionContext, ITransactionManager } from '@airport/terminal-map';
import { SQLDialect, SQLQuery } from '../sql/core/SQLQuery';
import { IFuelHydrantContext } from '../FuelHydrantContext';
import { ISQLQueryAdaptor } from '../adaptor/SQLQueryAdaptor';
import { IValidator } from '../validation/Validator';
import { ISubStatementSqlGenerator } from '../sql/core/SubStatementSqlGenerator';
import { IObjectResultParserFactory } from '../result/entity/ObjectResultParserFactory';
import { IApplicationUtils, IRelationManager } from '@airport/tarmaq-query';
/**
 * Created by Papa on 9/9/2016.
 */
export declare abstract class SqlDriver implements IStoreDriver {
    activeQueries: IActiveQueries<SQLQuery<any>>;
    airportDatabase: IAirportDatabase;
    applicationUtils: IApplicationUtils;
    dbApplicationUtils: IDbApplicationUtils;
    entityStateManager: IEntityStateManager;
    objectResultParserFactory: IObjectResultParserFactory;
    qMetadataUtils: IQMetadataUtils;
    qValidator: IValidator;
    relationManager: IRelationManager;
    transactionManager: ITransactionManager;
    sqlQueryAdapter: ISQLQueryAdaptor;
    subStatementQueryGenerator: ISubStatementSqlGenerator;
    utils: IUtils;
    type: StoreType;
    protected maxValues: number;
    supportsLocalTransactions(context: IFuelHydrantContext): boolean;
    getEntityTableName(dbEntity: DbEntity, context: IFuelHydrantContext): string;
    abstract getSelectQuerySuffix(jsonQuery: JsonQuery, context: IFuelHydrantContext): string;
    getTableName(application: {
        domain: Domain_Name | {
            name: Domain_Name;
        };
        name: Application_Name;
        fullName?: FullApplication_Name;
    }, table: {
        name: string;
        tableConfig?: {
            name?: string;
        };
    }, context: IFuelHydrantContext): string;
    abstract composeTableName(applicationName: string, tableName: string, context: IFuelHydrantContext): string;
    abstract initialize(dbName: string, context: IFuelHydrantContext): Promise<any>;
    abstract setupTransaction(context: ITransactionContext, parentTransaction?: ITransaction): Promise<ITransaction>;
    protected internalSetupTransaction(transaction: ITransaction, context: IFuelHydrantContext): Promise<void>;
    tearDownTransaction(transaction: ITransaction, context: ITransactionContext): Promise<void>;
    startTransaction(transaction: ITransaction, context?: IFuelHydrantContext): Promise<void>;
    abstract internalStartTransaction(transaction: ITransaction, context?: IFuelHydrantContext): Promise<void>;
    commit(transaction: ITransaction, context?: IFuelHydrantContext): Promise<void>;
    abstract internalCommit(transaction: ITransaction, context?: ITransactionContext): Promise<void>;
    rollback(transaction: ITransaction, context?: IFuelHydrantContext): Promise<void>;
    abstract internalRollback(transaction: ITransaction, context?: IFuelHydrantContext): Promise<void>;
    insertValues(portableQuery: PortableQuery, context: IFuelHydrantContext, cachedSqlQueryId?: number): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, context: IFuelHydrantContext): Promise<number>;
    updateWhere(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IFuelHydrantContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IFuelHydrantContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    getSQLQuery(portableQuery: PortableQuery, context: IFuelHydrantContext): SQLQuery<any>;
    abstract isValueValid(value: any, sqlDataType: SQLDataType, context: IFuelHydrantContext): boolean;
    abstract findNative(sqlQuery: string, parameters: any[], context: IFuelHydrantContext): Promise<any[]>;
    findOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IFuelHydrantContext, cachedSqlQueryId?: number): Promise<E>;
    warn(message: string): void;
    abstract doesTableExist(applicationName: string, tableName: string, context: IFuelHydrantContext): Promise<boolean>;
    abstract dropTable(applicationName: string, tableName: string, context: IFuelHydrantContext): Promise<boolean>;
    abstract query(queryType: QueryType, query: string, params: any, context: IFuelHydrantContext, saveTransaction?: boolean): Promise<any>;
    abstract isServer(context: IFuelHydrantContext): boolean;
    protected abstract executeNative(sql: string, parameters: any[], context: IFuelHydrantContext): Promise<number>;
    protected abstract getDialect(context: IFuelHydrantContext): SQLDialect;
    protected splitValues(values: any[][], context: IFuelHydrantContext): any[][][];
    protected ensureContext(context: IFuelHydrantContext): Promise<IFuelHydrantContext>;
}
//# sourceMappingURL=SqlDriver.d.ts.map