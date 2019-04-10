import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QDailyArchive } from './qdailyarchive';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    DailyArchive: QDailyArchive;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
