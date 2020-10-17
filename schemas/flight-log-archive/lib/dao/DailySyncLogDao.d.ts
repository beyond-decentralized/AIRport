import { DailySyncLogDatabaseId, DailySyncLogDateNumber, DailySyncLogRepositoryId, DailySyncLogSynced, DailySyncLogValues } from '../ddl/DailySyncLog';
import { BaseDailySyncLogDao } from '../generated/baseDaos';
export declare type DailyToMonthlyResult = [
    DailySyncLogDatabaseId,
    DailySyncLogRepositoryId
];
export interface IDailySyncLogDao {
    insertValues(values: DailySyncLogValues[]): Promise<void>;
    findAllForDatabase(databaseId: DailySyncLogDatabaseId, synced: DailySyncLogSynced, callback: (syncSyncLogRows: [DailySyncLogRepositoryId, DailySyncLogDateNumber][]) => void): Promise<void>;
    updateSyncStatus(databaseId: DailySyncLogDatabaseId, repositoryIds: DailySyncLogRepositoryId[], synced: DailySyncLogSynced): Promise<void>;
    findMonthlyResults(databaseIds: DailySyncLogDatabaseId[], fromDateInclusive: DailySyncLogDateNumber, toDateExclusive: DailySyncLogDateNumber): Promise<DailyToMonthlyResult[]>;
}
export declare class DailySyncLogDao extends BaseDailySyncLogDao implements IDailySyncLogDao {
    insertValues(values: DailySyncLogValues[]): Promise<void>;
    findAllForDatabase(databaseId: DailySyncLogDatabaseId, synced: DailySyncLogSynced, callback: (syncSyncLogRows: [DailySyncLogRepositoryId, DailySyncLogDateNumber][]) => void): Promise<void>;
    updateSyncStatus(databaseId: DailySyncLogDatabaseId, repositoryIds: DailySyncLogRepositoryId[], synced: DailySyncLogSynced): Promise<void>;
    findMonthlyResults(databaseIds: DailySyncLogDatabaseId[], fromDateInclusive: DailySyncLogDateNumber, toDateExclusive: DailySyncLogDateNumber): Promise<DailyToMonthlyResult[]>;
}
//# sourceMappingURL=DailySyncLogDao.d.ts.map