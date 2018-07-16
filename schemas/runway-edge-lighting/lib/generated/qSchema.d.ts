import { DbSchema, QSchema as AirportQSchema } from '@airport/air-control';
import { QLogEntry } from './qlogentry';
import { QLogEntryType } from './qlogentrytype';
import { QLogEntryValue } from './qlogentryvalue';
import { QLoggedError } from './qloggederror';
import { QLoggedErrorStackTrace } from './qloggederrorstacktrace';
import { IBaseLogEntryDmo, IBaseLogEntryTypeDmo, IBaseLogEntryValueDmo, IBaseLoggedErrorDmo, IBaseLoggedErrorStackTraceDmo } from './baseDmos';
import { IBaseLogEntryDao, IBaseLogEntryTypeDao, IBaseLogEntryValueDao, IBaseLoggedErrorDao, IBaseLoggedErrorStackTraceDao } from './baseDaos';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    dmo: {
        LogEntry: IBaseLogEntryDmo;
        LogEntryType: IBaseLogEntryTypeDmo;
        LogEntryValue: IBaseLogEntryValueDmo;
        LoggedError: IBaseLoggedErrorDmo;
        LoggedErrorStackTrace: IBaseLoggedErrorStackTraceDmo;
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
