import { TerminalMessage } from '@airport/arrivals-n-departures';
import { ITransaction } from '@airport/terminal-map';
/**
 * Synchronizes incoming data and records message conflicts in two processing stages.
 */
export interface ITwoStageSyncedInDataProcessor {
    syncMessages(messages: TerminalMessage[], transaction: ITransaction): Promise<void>;
}
export declare class TwoStageSyncedInDataProcessor implements ITwoStageSyncedInDataProcessor {
    /**
     * Synchronize the data messages coming to Terminal (new data for this TM)
     */
    syncMessages(messages: TerminalMessage[], transaction: ITransaction): Promise<void>;
    private aggregateHistoryRecords;
    private getDataStructures;
    private updateLocalData;
}
//# sourceMappingURL=TwoStageSyncedInDataProcessor.d.ts.map