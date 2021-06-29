import {
	AIRPORT_DATABASE,
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
import { QLogEntry } from './qlogentry';
import { QLogEntryType } from './qlogentrytype';
import { QLogEntryValue } from './qlogentryvalue';
import { QLoggedError } from './qloggederror';
import { QLoggedErrorStackTrace } from './qloggederrorstacktrace';
import {
  LogEntry,
  LogEntryType,
  LogEntryValue,
  LoggedError,
  LoggedErrorStackTrace
} from '../ddl/ddl';

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
  domain: 'air',
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

DI.db().eventuallyGet(AIRPORT_DATABASE).then((
	airDb
) => {
	airDb.QM[getSchemaName(Q_SCHEMA)] = Q
})
