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
import { LogEntry } from '../ddl/LogEntry';
import { QLogEntry } from './qlogentry';
import { LogEntryType } from '../ddl/LogEntryType';
import { QLogEntryType } from './qlogentrytype';
import { LogEntryValue } from '../ddl/LogEntryValue';
import { QLogEntryValue } from './qlogentryvalue';
import { LoggedError } from '../ddl/LoggedError';
import { QLoggedError } from './qloggederror';
import { LoggedErrorStackTrace } from '../ddl/LoggedErrorStackTrace';
import { QLoggedErrorStackTrace } from './qloggederrorstacktrace';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	LogEntry: QLogEntry;
	LogEntryType: QLogEntryType;
	LogEntryValue: QLogEntryValue;
	LoggedError: QLoggedError;
	LoggedErrorStackTrace: QLoggedErrorStackTrace;

}

const __constructors__ = {
	LogEntry: LogEntry,
	LogEntryType: LogEntryType,
	LogEntryValue: LogEntryValue,
	LoggedError: LoggedError,
	LoggedErrorStackTrace: LoggedErrorStackTrace
};

export const Q_SCHEMA: LocalQSchema = <any>{
	__constructors__,
  domain: 'npmjs.org',
  name: '@airport/runway-edge-lighting'
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
