import { IContext } from '@airport/di';
import { ApplicationName, DbEntity, DomainName, FullApplicationName, InternalFragments, PortableQuery, QueryType, SQLDataType, StoreType } from '@airport/ground-control';
import { ITransactionHistory } from '@airport/holding-pattern';
import { IOperationContext, IStoreDriver, ITransaction, ITransactionContext, ITransactionCredentials } from '@airport/terminal-map';
import { Observable } from 'rxjs';
export declare abstract class SqlTransaction implements ITransaction {
    protected driver: IStoreDriver;
    parentTransaction: ITransaction;
    childTransaction: ITransaction;
    credentials: ITransactionCredentials;
    id: string;
    isSync: boolean;
    transactionHistory: ITransactionHistory;
    type: StoreType;
    initiator: {
        application: string;
        domain: string;
        methodName: string;
        objectName: string;
    };
    constructor(driver: IStoreDriver, parentTransaction: ITransaction);
    saveTransaction(transaction: ITransactionHistory): Promise<any>;
    query(queryType: QueryType, query: string, params: any[], context: IOperationContext, saveTransaction?: boolean): Promise<any>;
    doesTableExist(applicationName: string, tableName: string, context: IOperationContext): Promise<boolean>;
    dropTable(applicationName: string, tableName: string, context: IOperationContext): Promise<boolean>;
    getEntityTableName(dbEntity: DbEntity, context: IContext): string;
    getTableName(application: {
        domain: DomainName | {
            name: DomainName;
        };
        name: ApplicationName;
        fullName?: FullApplicationName;
    }, table: {
        name: string;
        tableConfig?: {
            name?: string;
        };
    }, context: IContext): string;
    initialize(dbName: string, context: IContext): Promise<any>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Observable<E>;
    transact(transactionalCallback: {
        (transaction: ITransaction, context: ITransactionContext): Promise<void> | void;
    }, context: ITransactionContext, parentTransaction?: ITransaction): Promise<void>;
    startTransaction(transaction: ITransaction, context: ITransactionContext): Promise<void>;
    setupTransaction(context: ITransactionContext, parentTransaction?: ITransaction): Promise<ITransaction>;
    tearDownTransaction(transaction: ITransaction, context: ITransactionContext): Promise<void>;
    commit(transaction: ITransaction, context: ITransactionContext): Promise<void>;
    rollback(transaction: ITransaction, context: ITransactionContext): Promise<void>;
    abstract isServer(context?: IContext): boolean;
    deleteWhere(portableQuery: PortableQuery, context: IContext): Promise<number>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Promise<E>;
    findNative(sqlQuery: string, parameters: any[], context: IOperationContext): Promise<any[]>;
    insertValues(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<number>;
    updateWhere(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext): Promise<number>;
    isValueValid(value: any, sqlDataType: SQLDataType, context: IOperationContext): boolean;
}
//# sourceMappingURL=SqlTransaction.d.ts.map