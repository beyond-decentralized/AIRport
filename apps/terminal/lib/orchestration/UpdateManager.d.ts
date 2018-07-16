import { IAirportDatabase, IUtils } from "@airport/air-control";
import { IStoreDriver, PortableQuery } from "@airport/ground-control";
import { IActor, OperationHistoryDmo, RecordHistoryDmo, RepositoryTransactionHistoryDmo, TransactionHistoryDmo } from "@airport/holding-pattern";
import { IRepositoryManager } from "../core/repository/RepositoryManager";
import { IOfflineDeltaStore } from "../data/OfflineDeltaStore";
import { IHistoryManager } from "./HistoryManager";
import { ITransactionManager } from "./TransactionManager";
export interface IUpdateManager {
    updateValues(portableQuery: PortableQuery, actor: IActor): Promise<number>;
}
export declare class UpdateManager implements IUpdateManager {
    private airportDb;
    private utils;
    private dataStore;
    private historyManager;
    private offlineDataStore;
    private operationHistoryDmo;
    private recordHistoryDmo;
    private repositoryManager;
    private repositoryTransactionHistoryDmo;
    private transactionHistoryDmo;
    private transactionManager;
    constructor(airportDb: IAirportDatabase, utils: IUtils, dataStore: IStoreDriver, historyManager: IHistoryManager, offlineDataStore: IOfflineDeltaStore, operationHistoryDmo: OperationHistoryDmo, recordHistoryDmo: RecordHistoryDmo, repositoryManager: IRepositoryManager, repositoryTransactionHistoryDmo: RepositoryTransactionHistoryDmo, transactionHistoryDmo: TransactionHistoryDmo, transactionManager: ITransactionManager);
    updateValues(portableQuery: PortableQuery, actor: IActor): Promise<number>;
    private addUpdateHistory;
    private addNewValueHistory;
    private groupRecordsByRepository;
}
