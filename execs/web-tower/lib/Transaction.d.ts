import { IContext } from "@airport/di";
import { StoreType, DbEntity, PortableQuery, InternalFragments, QueryType, SQLDataType } from "@airport/ground-control";
import { ICredentials, IStoreDriver, ITransaction } from "@airport/terminal-map";
import { Observable } from "rxjs";
import { TransactionManager } from "./TransactionManager";
export declare class Transaction implements ITransaction {
    private transactionManager;
    credentials: ICredentials;
    isSync: boolean;
    saveTransaction: any;
    transHistory: any;
    type: StoreType;
    constructor(transactionManager: TransactionManager);
    commit(): Promise<void>;
    rollback(): Promise<void>;
    doesTableExist(applicationName: string, tableName: string, context: IContext): Promise<boolean>;
    dropTable(applicationName: string, tableName: string, context: IContext): Promise<boolean>;
    getEntityTableName(dbEntity: DbEntity, context: IContext): string;
    getTableName(application: {
        domain: string | {
            name: string;
        };
        name: string;
        fullName?: string;
    }, table: {
        name: string;
        tableConfig?: {
            name?: string;
        };
    }, context: IContext): string;
    initialize(dbName: string, context: IContext): Promise<any>;
    search<E, EntityArray extends E[]>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Observable<E>;
    transact(transactionalCallback: (transaction: IStoreDriver) => void | Promise<void>, context: IContext): Promise<void>;
    startTransaction(): Promise<ITransaction>;
    isServer(context?: IContext): boolean;
    deleteWhere(portableQuery: PortableQuery, context: IContext): Promise<number>;
    find<E, EntityArray extends E[]>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, ctx: IContext, cachedSqlQueryId?: number): Promise<E>;
    findNative(sqlQuery: string, parameters: any[], context: IContext): Promise<any[]>;
    insertValues(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<number>;
    query(queryType: QueryType, query: string, params: any, context: IContext, saveTransaction?: boolean): Promise<any>;
    updateWhere(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext): Promise<number>;
    isValueValid(value: any, sqlDataType: SQLDataType, context: IContext): boolean;
}
//# sourceMappingURL=Transaction.d.ts.map