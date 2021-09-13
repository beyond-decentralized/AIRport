import { IContext } from '@airport/di';
import { IStoreDriver, StoreType } from '@airport/ground-control';
import { ICredentials, ITransactionContext, ITransactionManager } from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';
export declare class TransactionManager extends AbstractMutationManager implements ITransactionManager {
    storeType: StoreType;
    transactionIndexQueue: string[];
    transactionInProgress: string;
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
    private rollback;
    private commit;
    private clearTransaction;
    private saveRepositoryHistory;
    private wait;
    private canRunTransaction;
}
//# sourceMappingURL=TransactionManager.d.ts.map