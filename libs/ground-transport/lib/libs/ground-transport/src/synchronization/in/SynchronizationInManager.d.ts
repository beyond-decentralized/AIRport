import { BatchedMessagesToTM, RepoTransBlockSyncOutcome, TmSharingMessageId } from "@airport/arrivals-n-departures";
import { ISharingMessage, ISharingMessageDao, ISharingNode } from "@airport/moving-walkway";
import { ISyncInChecker } from "./checker/SyncInChecker";
import { IDataToTM } from "./SyncInUtils";
import { ISyncLogMessageProcessor } from "./SyncLogMessageProcessor";
import { ITwoStageSyncedInDataProcessor } from "./TwoStageSyncedInDataProcessor";
/**
 * Synchronization Log part of the Message from AGT to Terminal (TM)
 */
export interface ISyncLogToTM {
    outcomes: RepoTransBlockSyncOutcome[];
    sharingNode: ISharingNode;
    tmSharingMessageId: TmSharingMessageId;
}
/**
 * The manager for synchronizing data coming in the AGT-to-Terminal (TM) direction
 */
export interface ISynchronizationInManager {
    receiveMessages(sharingNodes: ISharingNode[], incomingMessages: BatchedMessagesToTM[]): Promise<void>;
}
export interface ISharingMessageWithData {
    sharingMessage: ISharingMessage;
    dataMessage: IDataToTM;
}
export declare type LastRemoteChangeMillis = number;
/**
 * Synchronization in Manager implementation.
 */
export declare class SynchronizationInManager implements ISynchronizationInManager {
    private sharingMessageDao;
    private syncInChecker;
    private syncLogMessageProcessor;
    private twoStageSyncedInDataProcessor;
    constructor(sharingMessageDao: ISharingMessageDao, syncInChecker: ISyncInChecker, syncLogMessageProcessor: ISyncLogMessageProcessor, twoStageSyncedInDataProcessor: ITwoStageSyncedInDataProcessor);
    /**
     * ASSUMPTION: all of the messages are intended for this TM.
     *
     * @param {ISharingNode[]} sharingNodes   All of the sharing associated with incoming messages
     *      (in same order as messages)
     * @param {MessageToTM[][]} incomingMessages    All of the incoming messages, grouped into
     *      arrays by sharing node
     * @returns {Promise<void>}   Return when all of the messages have been processed
     */
    receiveMessages(sharingNodes: ISharingNode[], incomingMessages: BatchedMessagesToTM[]): Promise<void>;
    private isValidLastChangeTime;
    private getLastChangeMillisFromRepoTransBlock;
}
