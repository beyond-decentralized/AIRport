import { AgtRepositoryId } from "@airport/arrivals-n-departures";
import { AgtRepositoryTransactionBlockAddDatetime, AgtRepositoryTransactionBlockId, DailyArchiveLogValues } from "@airport/guideway";
import { DailyArchiveValues } from "@airport/point-of-destination";
export interface ICloudArchiver {
    archive(dailyArchiveDtos: DailyArchiveValues[], dailyArchiveLogValues: DailyArchiveLogValues[], onDate: AgtRepositoryTransactionBlockAddDatetime): Promise<[AgtRepositoryTransactionBlockId[], DailyArchiveLogValues[], AgtRepositoryId[]]>;
}
export declare class CloudArchiver implements ICloudArchiver {
    archive(dailyArchiveDtos: DailyArchiveValues[], dailyArchiveLogValues: DailyArchiveLogValues[], onDate: AgtRepositoryTransactionBlockAddDatetime): Promise<[AgtRepositoryTransactionBlockId[], DailyArchiveLogValues[], AgtRepositoryId[]]>;
}
