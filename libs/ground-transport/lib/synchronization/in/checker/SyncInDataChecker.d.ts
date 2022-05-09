import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { IAirportDatabase } from '@airport/air-traffic-control';
import { IContext } from '@airport/direction-indicator';
import { ISequenceGenerator } from '@airport/check-in';
import { ITerminalStore } from '@airport/terminal-map';
export interface ISyncInDataChecker {
    checkData(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
}
export declare class SyncInDataChecker implements ISyncInDataChecker {
    airportDatabase: IAirportDatabase;
    sequenceGenerator: ISequenceGenerator;
    terminalStore: ITerminalStore;
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleApplications
     * @returns {DataCheckResults}
     */
    checkData(message: RepositorySynchronizationMessage, context: IContext): Promise<boolean>;
    private populateApplicationEntityMap;
    private checkOperationHistories;
    private checkRecordHistories;
    private checkNewValues;
    private checkOldValues;
}
//# sourceMappingURL=SyncInDataChecker.d.ts.map