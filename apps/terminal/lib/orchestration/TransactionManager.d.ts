import { StoreType } from '@airport/ground-control';
import { ITransactionHistory } from '@airport/holding-pattern';
import { ICredentials, ITransactionManager } from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';
export declare class TransactionManager extends AbstractMutationManager implements ITransactionManager {
    currentTransHistory: ITransactionHistory;
    storeType: StoreType;
    transactionIndexQueue: string[];
    transactionInProgress: string;
    yieldToRunningTransaction: number;
    /**
     * Initializes the EntityManager at server load time.
     * @returns {Promise<void>}
     */
    init(dbName: string): Promise<void>;
    transact(credentials: ICredentials): Promise<void>;
    rollback(credentials: ICredentials): Promise<void>;
    commit(credentials: ICredentials): Promise<void>;
    private clearTransaction;
    private saveRepositoryHistory;
    private wait;
    private canRunTransaction;
}
//# sourceMappingURL=TransactionManager.d.ts.map