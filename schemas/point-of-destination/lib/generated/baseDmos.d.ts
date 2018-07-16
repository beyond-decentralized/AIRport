import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateProperties, DailyArchiveEId, QDailyArchive } from './qdailyarchive';
export interface IBaseDailyArchiveDmo extends IDmo<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateProperties, DailyArchiveEId, QDailyArchive> {
}
export declare class BaseDailyArchiveDmo extends Dmo<IDailyArchive, DailyArchiveESelect, DailyArchiveECreateProperties, DailyArchiveEUpdateProperties, DailyArchiveEId, QDailyArchive> implements IBaseDailyArchiveDmo {
    constructor();
}
