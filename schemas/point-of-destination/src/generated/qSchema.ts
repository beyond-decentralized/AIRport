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
	__constructors__,
  domain: 'github.com',
  name: '@airport/point-of-destination'
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

DI.get(AIR_DB).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
