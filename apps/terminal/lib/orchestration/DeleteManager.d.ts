import { IAirportDatabase, IUtils } from "@airport/air-control";
import { IStoreDriver, PortableQuery } from "@airport/ground-control";
import { IActor, IOperationHistoryDmo, IRecordHistoryDmo, IRepositoryTransactionHistoryDmo, ITransactionHistoryDmo } from "@airport/holding-pattern";
import { IRepositoryManager } from "../core/repository/RepositoryManager";
import { IOfflineDeltaStore } from "../data/OfflineDeltaStore";
import { IHistoryManager } from "./HistoryManager";
import { ITransactionManager } from "./TransactionManager";
export interface IDeleteManager {
    deleteWhere(portableQuery: PortableQuery, actor: IActor): Promise<number>;
}
export declare class DeleteManager implements IDeleteManager {
    private airportDb;
    private dataStore;
    private historyManager;
    private offlineDataStore;
    private operationHistoryDmo;
    private recordHistoryDmo;
    private repositoryManager;
    private repositoryTransactionHistoryDmo;
    private transactionHistoryDmo;
    private transactionManager;
    private utils;
    constructor(airportDb: IAirportDatabase, dataStore: IStoreDriver, historyManager: IHistoryManager, offlineDataStore: IOfflineDeltaStore, operationHistoryDmo: IOperationHistoryDmo, recordHistoryDmo: IRecordHistoryDmo, repositoryManager: IRepositoryManager, repositoryTransactionHistoryDmo: IRepositoryTransactionHistoryDmo, transactionHistoryDmo: ITransactionHistoryDmo, transactionManager: ITransactionManager, utils: IUtils);
    deleteWhere(portableQuery: PortableQuery, actor: IActor): Promise<number>;
    private recordRepositoryIds;
    private columnProcessed;
    private recordTreeToDelete;
    private getCascadeSubTree;
}
