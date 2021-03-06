import { IContext } from '@airport/direction-indicator';
import { IActiveQueries } from '@airport/flight-number';
import { IIdGenerator, SQLQuery } from '@airport/fuel-hydrant-system';
import { ISynchronizationOutManager } from '@airport/ground-transport';
import { ITransactionHistoryDuo } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import { IStoreDriver, ITerminalStore, ITransaction, ITransactionalCallback, ITransactionContext, ITransactionCredentials, ITransactionManager } from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';
export declare class TransactionManager extends AbstractMutationManager implements ITransactionManager {
    activeQueries: IActiveQueries<SQLQuery<any>>;
    idGenerator: IIdGenerator;
    storeDriver: IStoreDriver;
    synchronizationOutManager: ISynchronizationOutManager;
    terminalStore: ITerminalStore;
    transactionHistoryDuo: ITransactionHistoryDuo;
    /**
     * Initializes the EntityManager at server load time.
     * @returns {Promise<void>}
     */
    initialize(dbName: string, context: IContext): Promise<void>;
    getInProgressTransactionById(transactionId: string): ITransaction;
    isServer(context?: ITransactionContext): boolean;
    transactInternal(transactionalCallback: ITransactionalCallback, context: ITransactionContext): Promise<void>;
    transact(credentials: ITransactionCredentials, transactionalCallback: ITransactionalCallback, context: ITransactionContext): Promise<void>;
    startTransaction(credentials: ITransactionCredentials, context: ITransactionContext): Promise<ITransaction>;
    private internalStartTransaction;
    rollback(credentials: ITransactionCredentials, context: ITransactionContext): Promise<void>;
    getTransactionFromContextOrCredentials(credentials: ITransactionCredentials, context: ITransactionContext): ITransaction;
    private resumeParentOrPendingTransaction;
    commit(credentials: ITransactionCredentials, context: ITransactionContext): Promise<void>;
    private copyTransactionHistoryToParentTransaction;
    private checkForCircularDependencies;
    private setupTransaction;
    private isSameSource;
    private getApiName;
    private clearTransaction;
    private saveRepositoryHistory;
}
//# sourceMappingURL=TransactionManager.d.ts.map