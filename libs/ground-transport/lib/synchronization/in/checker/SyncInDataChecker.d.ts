import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
export interface ISyncInDataChecker {
    checkData(message: RepositorySynchronizationMessage): Promise<boolean>;
}
export declare class SyncInDataChecker implements ISyncInDataChecker {
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleApplications
     * @returns {DataCheckResults}
     */
    checkData(message: RepositorySynchronizationMessage): Promise<boolean>;
    private populateApplicationEntityMap;
    private checkOperationHistories;
    private checkRecordHistories;
    private checkNewValues;
    private checkOldValues;
}
//# sourceMappingURL=SyncInDataChecker.d.ts.map