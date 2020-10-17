import { AgtRepositoryId } from "@airport/arrivals-n-departures";
import { Repository } from "../repository/Repository";
export declare type DailyArchiveLogDate = number;
export declare type DailyArchiveLogNumberOfChanges = number;
export declare type DailyArchiveLogValues = [AgtRepositoryId, DailyArchiveLogDate, DailyArchiveLogNumberOfChanges];
export declare class DailyArchiveLog {
    repository: Repository;
    dateNumber: DailyArchiveLogDate;
    numberOfChanges: DailyArchiveLogNumberOfChanges;
}
//# sourceMappingURL=DailyArchiveLog.d.ts.map