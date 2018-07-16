import { IAirportDatabase, IUtils } from "@airport/air-control";
import { DailyArchiveDate, DailyArchiveRepositoryData, DailyArchiveRepositoryId, DailyArchiveValues } from "../ddl/DailyArchive";
import { BaseDailyArchiveDao } from "../generated/baseDaos";
export declare type FlatDailyArchive = [DailyArchiveRepositoryId, DailyArchiveDate, DailyArchiveRepositoryData];
export interface IDailyArchiveDao {
    findForRepositoryIdsOnDates(repositoryIds: DailyArchiveRepositoryId[], dates: DailyArchiveDate[][]): Promise<FlatDailyArchive[]>;
    addRecords(dailyArchiveDtos: DailyArchiveValues[]): Promise<void>;
}
export declare class DailyArchiveDao extends BaseDailyArchiveDao implements IDailyArchiveDao {
    private airportDb;
    constructor(airportDb: IAirportDatabase, utils: IUtils);
    addRecords(values: DailyArchiveValues[]): Promise<void>;
    findForRepositoryIdsOnDates(repositoryIds: DailyArchiveRepositoryId[], dates: DailyArchiveDate[][]): Promise<FlatDailyArchive[]>;
}
