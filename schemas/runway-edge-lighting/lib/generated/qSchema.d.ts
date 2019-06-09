import { QSchema as AirportQSchema } from '@airport/air-control';
import { DbSchema, EntityId } from '@airport/ground-control';
import { QLogEntry } from './qlogentry';
import { QLogEntryType } from './qlogentrytype';
import { QLogEntryValue } from './qlogentryvalue';
import { QLoggedError } from './qloggederror';
import { QLoggedErrorStackTrace } from './qloggederrorstacktrace';
export interface LocalQSchema extends AirportQSchema {
    db: DbSchema;
    LogEntry: QLogEntry;
    LogEntryType: QLogEntryType;
    LogEntryValue: QLogEntryValue;
    LoggedError: QLoggedError;
    LoggedErrorStackTrace: QLoggedErrorStackTrace;
}
export declare const Q_SCHEMA: LocalQSchema;
export declare const Q: LocalQSchema;
export declare function diSet(dbEntityId: EntityId): boolean;
