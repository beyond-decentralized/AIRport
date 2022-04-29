import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import { IRepositoryTransactionHistoryDuo } from '@airport/holding-pattern';
import { ISynchronizationConflictDao, ISynchronizationConflictValuesDao } from '@airport/moving-walkway';
import { ITransaction } from '@airport/terminal-map';
import { IStage1SyncedInDataProcessor } from './Stage1SyncedInDataProcessor';
import { IStage2SyncedInDataProcessor } from './Stage2SyncedInDataProcessor';
/**
 * Synchronizes incoming data and records message conflicts in two processing stages.
 */
export interface ITwoStageSyncedInDataProcessor {
    syncMessages(messages: RepositorySynchronizationMessage[], transaction: ITransaction): Promise<void>;
}
export declare class TwoStageSyncedInDataProcessor implements ITwoStageSyncedInDataProcessor {
    repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo;
    stage1SyncedInDataProcessor: IStage1SyncedInDataProcessor;
    stage2SyncedInDataProcessor: IStage2SyncedInDataProcessor;
    synchronizationConflictDao: ISynchronizationConflictDao;
    synchronizationConflictValuesDao: ISynchronizationConflictValuesDao;
    /**
     * Synchronize the data messages coming to Terminal (new data for this TM)
     */
    syncMessages(messages: RepositorySynchronizationMessage[], transaction: ITransaction): Promise<void>;
    private aggregateHistoryRecords;
    private getDataStructures;
    private updateLocalData;
}
//# sourceMappingURL=TwoStageSyncedInDataProcessor.d.ts.map