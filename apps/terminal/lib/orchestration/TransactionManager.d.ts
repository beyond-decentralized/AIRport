import { ITransaction, StoreType } from '@airport/ground-control';
import { ICredentials, ITransactionManager } from '@airport/terminal-map';
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
    init(dbName: string): Promise<void>;
    transact(credentials: ICredentials): Promise<ITransaction>;
    rollback(transaction: ITransaction): Promise<void>;
    commit(transaction: ITransaction): Promise<void>;
    private clearTransaction;
    private saveRepositoryHistory;
    private wait;
    private canRunTransaction;
}
//# sourceMappingURL=TransactionManager.d.ts.map