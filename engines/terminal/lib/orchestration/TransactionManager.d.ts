import { IContext } from '@airport/di';
import { StoreType } from '@airport/ground-control';
import { ICredentials, IStoreDriver, ITransaction, ITransactionContext, ITransactionManager } from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';
export declare class TransactionManager extends AbstractMutationManager implements ITransactionManager {
    storeType: StoreType;
    transactionIndexQueue: string[];
    sourceOfTransactionInProgress: string;
    transactionInProgress: ITransaction;
    yieldToRunningTransaction: number;
    /**
     * Initializes the EntityManager at server load time.
     * @returns {Promise<void>}
     */
    initialize(dbName: string, context: IContext): Promise<void>;
    isServer(context?: IContext): boolean;
    transact(credentials: ICredentials, transactionalCallback: {
        (transaction: IStoreDriver, context: IContext): Promise<void> | void;
    }, context: ITransactionContext): Promise<void>;
    startTransaction(credentials: ICredentials, context: ITransactionContext): Promise<void>;
    rollback(transaction: ITransaction, context: IContext): Promise<void>;
    commit(transaction: ITransaction, context: IContext): Promise<void>;
    startTransactionPrep(credentials: ICredentials, context: ITransactionContext, transactionalCallback?: {
        (transaction: IStoreDriver, context: IContext): Promise<void> | void;
    }): Promise<void>;
    private setupTransaction;
    private clearTransaction;
    private saveRepositoryHistory;
    private wait;
    private canRunTransaction;
}
//# sourceMappingURL=TransactionManager.d.ts.map