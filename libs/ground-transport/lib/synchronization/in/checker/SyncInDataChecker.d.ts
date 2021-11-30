import { TerminalMessage } from '@airport/arrivals-n-departures';
export interface ISyncInDataChecker {
    checkData(message: TerminalMessage): Promise<boolean>;
}
export declare class SyncInDataChecker implements ISyncInDataChecker {
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleSchemas
     * @returns {DataCheckResults}
     */
    checkData(message: TerminalMessage): Promise<boolean>;
    private populateSchemaEntityMap;
    private checkOperationHistories;
    private checkRecordHistories;
    private checkNewValues;
    private checkOldValues;
}
//# sourceMappingURL=SyncInDataChecker.d.ts.map