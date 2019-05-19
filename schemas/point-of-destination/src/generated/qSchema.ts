import {
	AIR_DB,
	QSchema as AirportQSchema
}                      from '@airport/air-control'
import {DI}            from '@airport/di'
import {
	DbSchema,
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

DI.get((
	airportDatabase
) => {
	airportDatabase.QM[getSchemaName(Q_SCHEMA)] = Q
}, AIR_DB)
