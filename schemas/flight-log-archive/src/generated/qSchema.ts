import {
	AIR_DB,
	QSchema as AirportQSchema
}                      from '@airport/air-control'
import {diSet as dS}          from '@airport/check-in'
import {DI}            from '@airport/di'
import {
	DbSchema,
	EntityId,
	getSchemaName
}                      from '@airport/ground-control';
import { DailySyncLog } from '../ddl/dailysynclog';
import { QDailySyncLog } from './qdailysynclog';
import { Log } from '../ddl/log/log';
import { QLog } from './log/qlog';
import { MonthlySyncLog } from '../ddl/monthlysynclog';
import { QMonthlySyncLog } from './qmonthlysynclog';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

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
	__constructors__,
  domain: 'github.com',
  name: '@airport/flight-log-archive'
};
export const Q: LocalQSchema = Q_SCHEMA

export function diSet(
	dbEntityId: EntityId
): boolean {
	return dS(Q.__dbSchema__, dbEntityId)
}

DI.get((
	airportDatabase
) => {
	airportDatabase.QM[getSchemaName(Q_SCHEMA)] = Q
}, AIR_DB)
