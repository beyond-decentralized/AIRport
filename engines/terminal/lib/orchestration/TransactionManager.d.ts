import { IContext } from '@airport/di';
import { IStoreDriver, ITransaction, ITransactionContext, ITransactionCredentials, ITransactionManager } from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';
export declare class TransactionManager extends AbstractMutationManager implements ITransactionManager {
    /**
     * Initializes the EntityManager at server load time.
     * @returns {Promise<void>}
     */
    initialize(dbName: string, context: IContext): Promise<void>;
    getInProgressTransactionById(transactionId: string): ITransaction;
    isServer(context?: ITransactionContext): boolean;
    transact(credentials: ITransactionCredentials, transactionalCallback: {
        (transaction: IStoreDriver, context: IContext): Promise<void> | void;
    }, context: ITransactionContext): Promise<void>;
    startTransaction(credentials: ITransactionCredentials, context: ITransactionContext): Promise<ITransaction>;
    private internalStartTransaction;
    rollback(credentials: ITransactionCredentials, context: ITransactionContext): Promise<void>;
    private getTransactionFromContextOrCredentials;
    private resumeParentOrPendingTransaction;
    commit(credentials: ITransactionCredentials, context: ITransactionContext): Promise<void>;
    private composeRepositoryTransactionHistories;
    private checkForCircularDependencies;
    private setupTransaction;
    private isSameSource;
    private getApiName;
    private clearTransaction;
    private saveRepositoryHistory;
    private wait;
    private canRunTransaction;
}
//# sourceMappingURL=TransactionManager.d.ts.map