import { IDataToTM } from './SyncInUtils';
/**
 * Synchronizes incoming data and records message conflicts in two processing stages.
 */
export interface ITwoStageSyncedInDataProcessor {
    syncDataMessages(dataMessages: IDataToTM[]): Promise<void>;
}
export declare class TwoStageSyncedInDataProcessor implements ITwoStageSyncedInDataProcessor {
    /**
     * Synchronize the data messages coming from AGT (new data for this TM).
     * @param {IDataToTM[]} dataMessages  Incoming data messages.
     * @param {Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>}
     *   sharingNodeRepositoryMap Local (TM) repository Id Map.
     * @returns {Promise<void>}
     */
    syncDataMessages(dataMessages: IDataToTM[]): Promise<void>;
    private recordSharingMessageToHistoryRecords;
    private getRepoTransHistoryMapByRepoId;
    private addRepoTransHistoriesToMapFromData;
    private updateLocalData;
}
//# sourceMappingURL=TwoStageSyncedInDataProcessor.d.ts.map