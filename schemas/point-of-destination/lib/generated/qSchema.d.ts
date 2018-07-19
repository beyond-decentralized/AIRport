import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QDailyArchive } from './qdailyarchive';
import { IBaseDailyArchiveDmo } from './baseDmos';
import { IBaseDailyArchiveDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    dmo: {
        DailyArchive: IBaseDailyArchiveDmo;
    };
    dao: {
        DailyArchive: IBaseDailyArchiveDao;
    };
    DailyArchive: QDailyArchive;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
