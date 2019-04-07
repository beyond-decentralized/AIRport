import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { LogEntry } from '../ddl/logentry';
import { QLogEntry } from './qlogentry';
import { LogEntryType } from '../ddl/logentrytype';
import { QLogEntryType } from './qlogentrytype';
import { LogEntryValue } from '../ddl/logentryvalue';
import { QLogEntryValue } from './qlogentryvalue';
import { LoggedError } from '../ddl/loggederror';
import { QLoggedError } from './qloggederror';
import { LoggedErrorStackTrace } from '../ddl/loggederrorstacktrace';
import { QLoggedErrorStackTrace } from './qloggederrorstacktrace';

import {
	IBaseLogEntryDuo,
	IBaseLogEntryTypeDuo,
	IBaseLogEntryValueDuo,
	IBaseLoggedErrorDuo,
	IBaseLoggedErrorStackTraceDuo
} from './baseDuos';

import {
	IBaseLogEntryDao,
	IBaseLogEntryTypeDao,
	IBaseLogEntryValueDao,
	IBaseLoggedErrorDao,
	IBaseLoggedErrorStackTraceDao
} from './baseDaos';

export interface LocalQSchema extends AirportQSchema {

  db: DbSchema;

	duo: {
		LogEntry: IBaseLogEntryDuo;
		LogEntryType: IBaseLogEntryTypeDuo;
		LogEntryValue: IBaseLogEntryValueDuo;
		LoggedError: IBaseLoggedErrorDuo;
		LoggedErrorStackTrace: IBaseLoggedErrorStackTraceDuo;
	}

	dao: {
		LogEntry: IBaseLogEntryDao;
		LogEntryType: IBaseLogEntryTypeDao;
		LogEntryValue: IBaseLogEntryValueDao;
		LoggedError: IBaseLoggedErrorDao;
		LoggedErrorStackTrace: IBaseLoggedErrorStackTraceDao;
	}
	
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
	__constructors__
};
export const Q: LocalQSchema = Q_SCHEMA;
