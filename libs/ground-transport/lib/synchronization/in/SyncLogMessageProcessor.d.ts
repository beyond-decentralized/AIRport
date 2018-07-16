import { IUtils } from "@airport/air-control";
import { IRepositoryTransactionBlockDao, IRepoTransBlockResponseStageDao, ISharingMessageDao } from "@airport/moving-walkway";
import { ISharingNodeRepoTransBlockDao } from "@airport/moving-walkway/lib/dao/sharingNode/SharingNodeRepoTransBlockDao";
import { ISharingNodeRepoTransBlockStageDao } from "@airport/moving-walkway/lib/dao/sharingNode/SharingNodeRepoTransBlockStageDao";
import { ISyncLogToTM } from "./SynchronizationInManager";
export interface ISyncLogMessageProcessor {
    recordSyncLogMessages(syncLogMessages: ISyncLogToTM[]): Promise<void>;
}
export declare class SyncLogMessageProcessor implements ISyncLogMessageProcessor {
    private sharingMessageDao;
    private sharingNodeRepoTransBlockDao;
    private sharingNodeRepoTransBlockStageDao;
    private repositoryTransactionBlockDao;
    private repoTransBlockResponseStageDao;
    private utils;
    constructor(sharingMessageDao: ISharingMessageDao, sharingNodeRepoTransBlockDao: ISharingNodeRepoTransBlockDao, sharingNodeRepoTransBlockStageDao: ISharingNodeRepoTransBlockStageDao, repositoryTransactionBlockDao: IRepositoryTransactionBlockDao, repoTransBlockResponseStageDao: IRepoTransBlockResponseStageDao, utils: IUtils);
    /**
     *
     * Record Synchronization Log messages coming from AGT (messages replying back with status
     * of sync logs sent from this TM).
     *
     * @param {ISyncLogToTM[]} syncLogMessages   Sync log messages from AGT
     * @returns {Promise<void>}
     */
    recordSyncLogMessages(syncLogMessages: ISyncLogToTM[]): Promise<void>;
    private generateSyncLogDataStructures;
    private updateExistingSharingNodeRepoTransBlocks;
    private insertNewSharingNodeRepoTransBlocks;
}
