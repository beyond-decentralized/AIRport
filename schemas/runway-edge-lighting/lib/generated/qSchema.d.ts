import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema } from '@airport/ground-control';
import { QLogEntry } from './qlogentry';
import { QLogEntryType } from './qlogentrytype';
import { QLogEntryValue } from './qlogentryvalue';
import { QLoggedError } from './qloggederror';
import { QLoggedErrorStackTrace } from './qloggederrorstacktrace';
import { IBaseLogEntryDuo, IBaseLogEntryTypeDuo, IBaseLogEntryValueDuo, IBaseLoggedErrorDuo, IBaseLoggedErrorStackTraceDuo } from './baseDuos';
import { IBaseLogEntryDao, IBaseLogEntryTypeDao, IBaseLogEntryValueDao, IBaseLoggedErrorDao, IBaseLoggedErrorStackTraceDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    duo: {
        LogEntry: IBaseLogEntryDuo;
        LogEntryType: IBaseLogEntryTypeDuo;
        LogEntryValue: IBaseLogEntryValueDuo;
        LoggedError: IBaseLoggedErrorDuo;
        LoggedErrorStackTrace: IBaseLoggedErrorStackTraceDuo;
    };
    dao: {
        LogEntry: IBaseLogEntryDao;
        LogEntryType: IBaseLogEntryTypeDao;
        LogEntryValue: IBaseLogEntryValueDao;
        LoggedError: IBaseLoggedErrorDao;
        LoggedErrorStackTrace: IBaseLoggedErrorStackTraceDao;
    };
    LogEntry: QLogEntry;
    LogEntryType: QLogEntryType;
    LogEntryValue: QLogEntryValue;
    LoggedError: QLoggedError;
    LoggedErrorStackTrace: QLoggedErrorStackTrace;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
