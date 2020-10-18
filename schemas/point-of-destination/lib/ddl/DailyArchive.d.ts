import { AgtRepositoryId } from "@airport/arrivals-n-departures";
import { DailyArchiveLog, DailyArchiveLogDate, Repository } from "@airport/guideway";
export declare type DailyArchiveRepositoryId = AgtRepositoryId;
export declare type DailyArchiveDate = DailyArchiveLogDate;
export declare type DailyArchiveRepositoryData = string;
export declare type DailyArchiveValues = [
    DailyArchiveRepositoryId,
    DailyArchiveDate,
    DailyArchiveRepositoryData
];
export declare class DailyArchive {
    repository: Repository;
    dailyArchiveLog: DailyArchiveLog;
    repositoryData: DailyArchiveRepositoryData;
}
//# sourceMappingURL=DailyArchive.d.ts.map