import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { DailyArchive } from '../ddl/DailyArchive';
import { QDailyArchive } from './qdailyarchive';

import {
	IBaseDailyArchiveDmo
} from './baseDmos';

import {
	IBaseDailyArchiveDao
} from './baseDaos';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	dmo: {
		DailyArchive: IBaseDailyArchiveDmo;
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
