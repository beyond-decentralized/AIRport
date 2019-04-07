import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { DailyArchive } from '../ddl/dailyarchive';
import { QDailyArchive } from './qdailyarchive';

import {
	IBaseDailyArchiveDuo
} from './baseDuos';

import {
	IBaseDailyArchiveDao
} from './baseDaos';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	duo: {
		DailyArchive: IBaseDailyArchiveDuo;
	}

	dao: {
		DailyArchive: IBaseDailyArchiveDao;
	}
	
	DailyArchive: QDailyArchive;

}

const __constructors__ = {
	DailyArchive: DailyArchive
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
