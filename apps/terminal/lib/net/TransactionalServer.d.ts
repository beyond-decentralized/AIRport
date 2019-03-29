import { IStoreDriver, PortableQuery } from '@airport/ground-control';
import { ITransactionHistory } from '@airport/holding-pattern';
import { IObservable } from '@airport/observe';
import { DistributionStrategy, PlatformType } from '@airport/terminal-map';
import { IInternalTransactionalConnector } from '@airport/tower';
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
export declare class TransactionalServer implements IInternalTransactionalConnector {
    activeTransactions: {
        [index: number]: ITransactionHistory;
    };
    lastTransactionIndex: number;
    currentTransactionIndex: any;
    dataStore: IStoreDriver;
    private deleteManager;
    private insertManager;
    private queryManager;
    private transactionManager;
    private updateManager;
    constructor();
    startTransaction(): Promise<number>;
    rollbackTransaction(transactionIndex: number): Promise<void>;
    commitTransaction(transactionIndex: number): Promise<void>;
    find<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<EntityArray>;
    findOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): Promise<E>;
    search<E, EntityArray extends Array<E>>(portableQuery: PortableQuery, cachedSqlQueryId?: number): IObservable<EntityArray>;
    searchOne<E>(portableQuery: PortableQuery, cachedSqlQueryId?: number): IObservable<E>;
    addRepository(name: string, url: string, platform: PlatformType, platformConfig: string, distributionStrategy: DistributionStrategy): Promise<number>;
    insertValues(portableQuery: PortableQuery, transactionIndex?: number): Promise<number>;
    insertValuesGetIds(portableQuery: PortableQuery, transactionIndex?: number): Promise<number[] | string[]>;
    updateValues(portableQuery: PortableQuery, transactionIndex?: number): Promise<number>;
    deleteWhere(portableQuery: PortableQuery, transactionIndex?: number): Promise<number>;
    private getActor;
    private wrapInTransaction;
}
