import { IUtils } from "@airport/air-control";
import { AgtRepositoryId } from "@airport/arrivals-n-departures";
import { IRepositoryActorDao, IRepositoryTransactionHistoryDmo, RepositoryId } from "@airport/holding-pattern";
import { IRepositoryTransactionBlockDao, ISharingMessageDao, ISharingMessageRepoTransBlockDao, ISynchronizationConflictDao, ISynchronizationConflictPendingNotificationDao, SharingNodeId } from "@airport/moving-walkway";
import { ITransactionManager } from "@airport/terminal-map";
import { ISyncInChecker } from "./checker/SyncInChecker";
import { IStage1SyncedInDataProcessor } from "./Stage1SyncedInDataProcessor";
import { IStage2SyncedInDataProcessor } from "./Stage2SyncedInDataProcessor";
import { IDataToTM } from "./SyncInUtils";
/**
 * Synchronizes incoming data and records message conflicts in two processing stages.
 */
export interface ITwoStageSyncedInDataProcessor {
    syncDataMessages(dataMessages: IDataToTM[], sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>, dataMessagesWithInvalidData: IDataToTM[]): Promise<void>;
}
export declare class TwoStageSyncedInDataProcessor implements ITwoStageSyncedInDataProcessor {
    private repositoryActorDao;
    private repositoryTransactionHistoryDmo;
    private sharingMessageDao;
    private sharingMessageRepoTransBlockDao;
    private stage1SyncedInDataProcessor;
    private stage2SyncedInDataProcessor;
    private synchronizationConflictDao;
    private synchronizationConflictPendingNotificationDao;
    private syncInChecker;
    private repositoryTransactionBlockDao;
    private transactionManager;
    private utils;
    constructor(repositoryActorDao: IRepositoryActorDao, repositoryTransactionHistoryDmo: IRepositoryTransactionHistoryDmo, sharingMessageDao: ISharingMessageDao, sharingMessageRepoTransBlockDao: ISharingMessageRepoTransBlockDao, stage1SyncedInDataProcessor: IStage1SyncedInDataProcessor, stage2SyncedInDataProcessor: IStage2SyncedInDataProcessor, synchronizationConflictDao: ISynchronizationConflictDao, synchronizationConflictPendingNotificationDao: ISynchronizationConflictPendingNotificationDao, syncInChecker: ISyncInChecker, repositoryTransactionBlockDao: IRepositoryTransactionBlockDao, transactionManager: ITransactionManager, utils: IUtils);
    /**
     * Synchronize the data messages coming from AGT (new data for this TM).
     * @param {IDataToTM[]} dataMessages  Incoming data messages.
     * @param {Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>} sharingNodeRepositoryMap
     *      Local (TM) repository Id Map.
     * @returns {Promise<void>}
     */
    syncDataMessages(dataMessages: IDataToTM[], sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>, dataMessagesWithInvalidData: IDataToTM[]): Promise<void>;
    private recordSharingMessageToHistoryRecords(sharingMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, dataMessages, actorMapById);
    private getRepoTransHistoryMapByRepoId(dataMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, actorMapById);
    private addRepoTransHistoriesToMapFromData(repoTransHistoryMapByRepositoryId, data);
    private updateLocalData(repoTransHistoryMapByRepositoryId, actorMayById, schemasBySchemaVersionIdMap);
}
