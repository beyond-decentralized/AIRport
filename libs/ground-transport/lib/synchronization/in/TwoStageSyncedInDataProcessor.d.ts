import { TerminalMessage } from '@airport/arrivals-n-departures';
/**
 * Synchronizes incoming data and records message conflicts in two processing stages.
 */
export interface ITwoStageSyncedInDataProcessor {
    syncDataMessage(dataMessages: TerminalMessage): Promise<void>;
}
export declare class TwoStageSyncedInDataProcessor implements ITwoStageSyncedInDataProcessor {
    /**
     * Synchronize the data messages coming to Terminal (new data for this TM)
     */
    syncDataMessage(dataMessages: TerminalMessage): Promise<void>;
    private recordSharingMessageToHistoryRecords;
    private getRepoTransHistoryMapByRepoId;
    private addRepoTransHistoriesToMapFromData;
    private updateLocalData;
}
//# sourceMappingURL=TwoStageSyncedInDataProcessor.d.ts.map