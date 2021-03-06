import { IContext } from '@airport/direction-indicator';
import { ISaveResult, PortableQuery } from '@airport/ground-control';
import { IActor, IAirEntity, Repository_LocalId } from '@airport/holding-pattern';
import { IOperationContext, IQueryOperationContext, ITransactionalServer, ITransactionContext, IApiCallContext, ITransactionCredentials, ITerminalStore, ITransactionManager, IOperationManager, IInsertManager, IDeleteManager, IQueryManager, IRepositoryManager, IUpdateManager } from '@airport/terminal-map';
import { Observable } from 'rxjs';
export interface InternalPortableQuery extends PortableQuery {
    domainAndPort: string;
}
/**
 * Keeps track of transactions, per client and validates that a given
 * transaction belongs to the provided client.  If the connection
 * information matches, passes the transaction for handling.
 *
 * All transactions are queued.  Read operations are not blocked while
 * any transaction is in progress.  Best way to make sure that you get
 * the latest state is to subscribe to a query, which is guaranteed to
 * be updated after data has changed.
 *
 *
 * Should read operations be blocked while transactions are in process?
 * Probably not since they will just get snapshot of the state at any
 * given point in time and transactionality takes care of not exposing
 * inconsistent state.  There doesn't appear to be a need to que-up
 * read transactions, since SqLite can handle it:
 *
 * https://www.skoumal.net/en/parallel-read-and-write-in-sqlite/
 *
 * Also, there doesn't appear to be a reason to prioritize remote transactions
 * over local ones, since ultimately the state needs to sync either way.
 * A single transactional queue should be enough.
 *
 */
export declare class TransactionalServer implements ITransactionalServer {
    deleteManager: IDeleteManager;
    insertManager: IInsertManager;
    operationManager: IOperationManager;
    queryManager: IQueryManager;
    repositoryManager: IRepositoryManager;
    terminalStore: ITerminalStore;
    transactionManager: ITransactionManager;
    updateManager: IUpdateManager;
    tempActor: IActor;
    init(context?: IContext): Promise<void>;
    addRepository(credentials: ITransactionCredentials, context: IOperationContext & ITransactionContext): Promise<Repository_LocalId>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IQueryOperationContext & ITransactionContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IQueryOperationContext & ITransactionContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IQueryOperationContext & ITransactionContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IQueryOperationContext & ITransactionContext, cachedSqlQueryId?: number): Observable<E>;
    startTransaction(credentials: ITransactionCredentials, context: IOperationContext & ITransactionContext & IApiCallContext): Promise<boolean>;
    commit(credentials: ITransactionCredentials, context: IOperationContext & ITransactionContext & IApiCallContext): Promise<boolean>;
    rollback(credentials: ITransactionCredentials, context: IOperationContext & ITransactionContext & IApiCallContext): Promise<boolean>;
    save<E extends IAirEntity, T = E | E[]>(entity: T, credentials: ITransactionCredentials, context: IOperationContext & ITransactionContext): Promise<ISaveResult>;
    saveToDestination<E extends IAirEntity, T = E | E[]>(repositoryDestination: string, entity: T, credentials: ITransactionCredentials, context: IOperationContext & ITransactionContext): Promise<ISaveResult>;
    insertValues(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IOperationContext & ITransactionContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetLocalIds(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IOperationContext & ITransactionContext): Promise<number[][]>;
    updateValues(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IOperationContext & ITransactionContext): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IOperationContext & ITransactionContext): Promise<number>;
    private getActor;
}
export declare function injectTransactionalServer(): void;
//# sourceMappingURL=TransactionalServer.d.ts.map