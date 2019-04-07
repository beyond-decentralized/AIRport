import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QDailyArchive } from './qdailyarchive';
import { IBaseDailyArchiveDuo } from './baseDuos';
import { IBaseDailyArchiveDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    duo: {
        DailyArchive: IBaseDailyArchiveDuo;
    };
    dao: {
        DailyArchive: IBaseDailyArchiveDao;
    };
    DailyArchive: QDailyArchive;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
