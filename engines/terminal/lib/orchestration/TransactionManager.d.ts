import { IContext } from '@airport/direction-indicator';
import { IActiveQueries, IIdGenerator } from '@airport/fuel-hydrant-system';
import { ISynchronizationOutManager } from '@airport/ground-transport';
import { ITransactionHistoryDuo } from '@airport/holding-pattern';
import { IStoreDriver, ITerminalStore, ITransaction, ITransactionContext, ITransactionCredentials, ITransactionManager } from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';
export declare class TransactionManager extends AbstractMutationManager implements ITransactionManager {
    activeQueries: IActiveQueries;
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
    transact(credentials: ITransactionCredentials, transactionalCallback: {
        (transaction: IStoreDriver, context: ITransactionContext): Promise<void> | void;
    }, context: ITransactionContext): Promise<void>;
    startTransaction(credentials: ITransactionCredentials, context: ITransactionContext): Promise<ITransaction>;
    private internalStartTransaction;
    rollback(credentials: ITransactionCredentials, context: ITransactionContext): Promise<void>;
    getTransactionFromContextOrCredentials(credentials: ITransactionCredentials, context: ITransactionContext): Promise<ITransaction>;
    private resumeParentOrPendingTransaction;
    commit(credentials: ITransactionCredentials, context: ITransactionContext): Promise<void>;
    private checkForCircularDependencies;
    private setupTransaction;
    private isSameSource;
    private getApiName;
    private clearTransaction;
    private saveRepositoryHistory;
}
//# sourceMappingURL=TransactionManager.d.ts.map