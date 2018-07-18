import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { DailySyncLog } from '../ddl/DailySyncLog';
import { QDailySyncLog } from './qdailysynclog';
import { Log } from '../ddl/log/Log';
import { QLog } from './log/qlog';
import { MonthlySyncLog } from '../ddl/MonthlySyncLog';
import { QMonthlySyncLog } from './qmonthlysynclog';

import {
	IBaseDailySyncLogDmo,
	IBaseLogDmo,
	IBaseMonthlySyncLogDmo
} from './baseDmos';

import {
	IBaseDailySyncLogDao,
	IBaseLogDao,
	IBaseMonthlySyncLogDao
} from './baseDaos';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	dmo: {
		DailySyncLog: IBaseDailySyncLogDmo;
		Log: IBaseLogDmo;
		MonthlySyncLog: IBaseMonthlySyncLogDmo;
	}

	dao: {
		DailySyncLog: IBaseDailySyncLogDao;
		Log: IBaseLogDao;
		MonthlySyncLog: IBaseMonthlySyncLogDao;
	}
	
	DailySyncLog: QDailySyncLog;
	Log: QLog;
	MonthlySyncLog: QMonthlySyncLog;

}

const __constructors__ = {
	DailySyncLog: DailySyncLog,
	Log: Log,
	MonthlySyncLog: MonthlySyncLog
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
