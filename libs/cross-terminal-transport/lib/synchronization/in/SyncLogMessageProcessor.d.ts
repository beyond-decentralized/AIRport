import { ISyncLogToTM } from './SynchronizationInManager';
export interface ISyncLogMessageProcessor {
    recordSyncLogMessages(syncLogMessages: ISyncLogToTM[]): Promise<void>;
}
export declare class SyncLogMessageProcessor implements ISyncLogMessageProcessor {
    /**
     *
     * Record Synchronization Log messages coming from AGT (messages replying back with
     * status of sync logs sent from this TM).
     *
     * @param {ISyncLogToTM[]} syncLogMessages   Sync log messages from AGT
     * @returns {Promise<void>}
     */
    recordSyncLogMessages(syncLogMessages: ISyncLogToTM[]): Promise<void>;
    private generateSyncLogDataStructures;
    private insertNewSharingNodeRepoTransBlocks;
}
//# sourceMappingURL=SyncLogMessageProcessor.d.ts.map