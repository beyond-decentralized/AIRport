import { IContext } from "@airport/di";
import { StoreType, DbEntity, PortableQuery, InternalFragments, QueryType, SQLDataType } from "@airport/ground-control";
import { ICredentials, IStoreDriver, ITransaction } from "@airport/terminal-map";
import { Observable } from "rxjs";
import { TransactionManager } from "./TransactionManager";

export class Transaction
    implements ITransaction {
    credentials: ICredentials;
    isSync: boolean;
    saveTransaction;
    transHistory;
    type: StoreType;

    constructor(
        private transactionManager: TransactionManager
    ) {
    }

    async commit(): Promise<void> {
        await this.transactionManager.commit(this, {})
    }
    
    async rollback(): Promise<void> {
        await this.transactionManager.rollback(this, {})
    }

    doesTableExist(applicationName: string, tableName: string, context: IContext): Promise<boolean> {
        throw new Error("Operation not supported from an application.");
    }
    dropTable(applicationName: string, tableName: string, context: IContext): Promise<boolean> {
        throw new Error("Operation not supported from an application.");
    }
    getEntityTableName(dbEntity: DbEntity, context: IContext): string {
        throw new Error("Operation not supported from an application.");
    }
    getTableName(application: { domain: string | { name: string; }; name: string; fullName?: string; }, table: { name: string; tableConfig?: { name?: string; }; }, context: IContext): string {
        throw new Error("Operation not supported from an application.");
    }
    initialize(dbName: string, context: IContext): Promise<any> {
        throw new Error("Operation not supported from an application.");
    }
    search<E, EntityArray extends E[]>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Observable<EntityArray> {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    searchOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Observable<E> {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    transact(transactionalCallback: (transaction: IStoreDriver) => void | Promise<void>, context: IContext): Promise<void> {
        throw new Error("Cannot nest transactional context from a transaction, please use 'transactional' method.  Note, nested transactions are not supported.");
    }
    startTransaction(): Promise<ITransaction> {
        throw new Error("Operation not supported from an application, please use 'transactional' method.  Note, nested transactions are not supported.");
    }
    isServer(context?: IContext): boolean {
        throw new Error("Operation not supported from an application.");
    }
    deleteWhere(portableQuery: PortableQuery, context: IContext): Promise<number> {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    find<E, EntityArray extends E[]>(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext, cachedSqlQueryId?: number): Promise<EntityArray> {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    findOne<E>(portableQuery: PortableQuery, internalFragments: InternalFragments, ctx: IContext, cachedSqlQueryId?: number): Promise<E> {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    findNative(sqlQuery: string, parameters: any[], context: IContext): Promise<any[]> {
        throw new Error("Operation not supported from an application.");
    }
    insertValues(portableQuery: PortableQuery, context: IContext, cachedSqlQueryId?: number): Promise<number> {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    query(queryType: QueryType, query: string, params: any, context: IContext, saveTransaction?: boolean): Promise<any> {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    updateWhere(portableQuery: PortableQuery, internalFragments: InternalFragments, context: IContext): Promise<number> {
        throw new Error("Operation not supported from an application, please use DAO objects.");
    }
    isValueValid(value: any, sqlDataType: SQLDataType, context: IContext): boolean {
        throw new Error("Operation not supported from an application.");
    }

}
