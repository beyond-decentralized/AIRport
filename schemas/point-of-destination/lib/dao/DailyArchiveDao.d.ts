import { DailyArchiveDate, DailyArchiveRepositoryData, DailyArchiveRepositoryId, DailyArchiveValues } from '../ddl/DailyArchive';
import { BaseDailyArchiveDao } from '../generated/baseDaos';
export declare type FlatDailyArchive = [
    DailyArchiveRepositoryId,
    DailyArchiveDate,
    DailyArchiveRepositoryData
];
export interface IDailyArchiveDao {
    findForRepositoryIdsOnDates(repositoryIds: DailyArchiveRepositoryId[], dates: DailyArchiveDate[][]): Promise<FlatDailyArchive[]>;
    addRecords(dailyArchiveDtos: DailyArchiveValues[]): Promise<void>;
}
export declare class DailyArchiveDao extends BaseDailyArchiveDao implements IDailyArchiveDao {
    addRecords(values: DailyArchiveValues[]): Promise<void>;
    findForRepositoryIdsOnDates(repositoryIds: DailyArchiveRepositoryId[], dates: DailyArchiveDate[][]): Promise<FlatDailyArchive[]>;
}
//# sourceMappingURL=DailyArchiveDao.d.ts.map