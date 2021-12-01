import { TerminalMessage } from '@airport/arrivals-n-departures';
export interface ISyncInDataChecker {
    checkData(message: TerminalMessage): Promise<boolean>;
}
export declare class SyncInDataChecker implements ISyncInDataChecker {
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleApplications
     * @returns {DataCheckResults}
     */
    checkData(message: TerminalMessage): Promise<boolean>;
    private populateApplicationEntityMap;
    private checkOperationHistories;
    private checkRecordHistories;
    private checkNewValues;
    private checkOldValues;
}
//# sourceMappingURL=SyncInDataChecker.d.ts.map