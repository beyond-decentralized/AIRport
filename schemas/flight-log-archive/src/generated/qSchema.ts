import {
	AIR_DB,
	QSchema as AirportQSchema
}                      from '@airport/air-control'
import {
	diSet as dS,
	duoDiSet as ddS
}                      from '@airport/check-in'
import {DI}            from '@airport/di'
import {
	DbSchema,
	EntityId,
	getSchemaName
}                      from '@airport/ground-control';
import { QDailySyncLog } from './qdailysynclog';
import { QLog } from './log/qlog';
import { QMonthlySyncLog } from './qmonthlysynclog';
import {
  DailySyncLog,
  Log,
  MonthlySyncLog
} from '../ddl/ddl';

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
  domain: 'air',
  name: '@airport/flight-log-archive'
};
export const Q: LocalQSchema = Q_SCHEMA

export function diSet(
	dbEntityId: EntityId
): boolean {
	return dS(Q.__dbSchema__, dbEntityId)
}

export function duoDiSet(
	dbEntityId: EntityId
): boolean {
	return ddS(Q.__dbSchema__, dbEntityId)
}

DI.db().get(AIR_DB).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
