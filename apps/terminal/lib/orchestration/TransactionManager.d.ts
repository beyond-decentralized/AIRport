import { StoreType } from '@airport/ground-control';
import { ITransactionHistory } from '@airport/holding-pattern';
import { ITransactionManager } from '@airport/terminal-map';
import { AbstractMutationManager } from './AbstractMutationManager';
export declare class TransactionManager extends AbstractMutationManager implements ITransactionManager {
    currentTransHistory: ITransactionHistory;
    private idGenerator;
    private offlineDeltaStore;
    private onlineManager;
    private queries;
    storeType: StoreType;
    private transactionHistoryDmo;
    transactionIndexQueue: number[];
    transactionInProgress: number;
    yieldToRunningTransaction: number;
    constructor();
    /**
     * Initializes the EntityManager at server load time.
     * @returns {Promise<void>}
     */
    initialize(dbName: string): Promise<void>;
    startTransaction(transactionIndex: number): Promise<void>;
    rollbackTransaction(transactionIndex: number): Promise<void>;
    commitTransaction(transactionIndex: number): Promise<void>;
    private clearTransaction;
    private saveRepositoryHistory;
    private wait;
    private canRunTransaction;
}
