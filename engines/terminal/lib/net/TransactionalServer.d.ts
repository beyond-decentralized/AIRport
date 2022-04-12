import { IContext } from '@airport/di';
import { ISaveResult, PortableQuery } from '@airport/ground-control';
import { IActor, Repository_Id } from '@airport/holding-pattern';
import { ICredentials, IOperationContext, IQueryOperationContext, ITransactionalServer, ITransactionContext, IApiCallContext, ITransactionCredentials } from '@airport/terminal-map';
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
    tempActor: IActor;
    private currentTransactionContext;
    init(context?: IContext): Promise<void>;
    addRepository(credentials: ITransactionCredentials, context: IOperationContext): Promise<Repository_Id>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ICredentials, context: IQueryOperationContext, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, credentials: ICredentials, context: IQueryOperationContext, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, credentials: ICredentials, context: IQueryOperationContext, cachedSqlQueryId?: number): Observable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, credentials: ICredentials, context: IQueryOperationContext, cachedSqlQueryId?: number): Observable<E>;
    private checkCurrentTransaction;
    startTransaction(credentials: ITransactionCredentials, context: IOperationContext & ITransactionContext & IApiCallContext): Promise<boolean>;
    private internalStartTransaction;
    commit(credentials: ITransactionCredentials, context: IOperationContext & ITransactionContext & IApiCallContext): Promise<boolean>;
    rollback(credentials: ITransactionCredentials, context: IOperationContext & ITransactionContext & IApiCallContext): Promise<boolean>;
    save<E>(entity: E, credentials: ITransactionCredentials, context: IOperationContext): Promise<ISaveResult>;
    saveToDestination<E>(repositoryDestination: string, entity: E, credentials: ITransactionCredentials, context: IOperationContext): Promise<ISaveResult>;
    insertValues(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IOperationContext, ensureGeneratedValues?: boolean): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IOperationContext): Promise<number[][]>;
    updateValues(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IOperationContext): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, credentials: ITransactionCredentials, context: IOperationContext): Promise<number>;
    private getActor;
    private ensureIocContext;
    private ensureIocContextSync;
}
export declare function injectTransactionalServer(): void;
//# sourceMappingURL=TransactionalServer.d.ts.map