import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { DailyArchive } from '../ddl/dailyarchive';
import { QDailyArchive } from './qdailyarchive';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	DailyArchive: QDailyArchive;

}

const __constructors__ = {
	DailyArchive: DailyArchive
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
