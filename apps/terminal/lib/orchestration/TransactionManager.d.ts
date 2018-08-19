import { IUtils } from "@airport/air-control";
import { ActiveQueries, IIdGenerator } from '@airport/fuel-hydrant-system';
import { IStoreDriver, StoreType } from "@airport/ground-control";
import { ITransactionHistory, ITransactionHistoryDmo } from "@airport/holding-pattern";
import { ITransactionManager } from "@airport/terminal-map";
import { IOfflineDeltaStore } from "../data/OfflineDeltaStore";
import { IOnlineManager } from "../net/OnlineManager";
import { AbstractMutationManager } from "./AbstractMutationManager";
export declare class TransactionManager extends AbstractMutationManager implements ITransactionManager {
    private idGenerator;
    private offlineDeltaStore;
    private onlineManager;
    private queries;
    private transactionHistoryDmo;
    currentTransHistory: ITransactionHistory;
    transactionIndexQueue: number[];
    transactionInProgress: number;
    yieldToRunningTransaction: number;
    storeType: StoreType;
    constructor(utils: IUtils, dataStore: IStoreDriver, idGenerator: IIdGenerator, offlineDeltaStore: IOfflineDeltaStore, onlineManager: IOnlineManager, queries: ActiveQueries, transactionHistoryDmo: ITransactionHistoryDmo);
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
