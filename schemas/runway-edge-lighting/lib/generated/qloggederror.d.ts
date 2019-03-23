import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { ILogEntry, LogEntryEId, LogEntryEOptionalId, LogEntryESelect, QLogEntryQId, QLogEntryQRelation } from './qlogentry';
import { ILoggedErrorStackTrace, LoggedErrorStackTraceEOptionalId, LoggedErrorStackTraceESelect, QLoggedErrorStackTraceQRelation } from './qloggederrorstacktrace';
export interface ILoggedError {
    logEntry?: ILogEntry;
    stackTrace?: ILoggedErrorStackTrace;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface LoggedErrorESelect extends IEntitySelectProperties, LoggedErrorEOptionalId {
    logEntry?: LogEntryESelect;
    stackTrace?: LoggedErrorStackTraceESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LoggedErrorEId extends IEntityIdProperties {
    logEntry: LogEntryEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface LoggedErrorEOptionalId {
    logEntry?: LogEntryEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LoggedErrorEUpdateProperties extends IEntityUpdateProperties {
    stackTrace?: LoggedErrorStackTraceEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface LoggedErrorEUpdateColumns extends IEntityUpdateColumns {
    LOGGED_ERROR_STACK_TRACE_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LoggedErrorECreateProperties extends Partial<LoggedErrorEId>, LoggedErrorEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LoggedErrorECreateColumns extends LoggedErrorEId, LoggedErrorEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLoggedError extends QEntity {
    logEntry: QLogEntryQRelation;
    stackTrace: QLoggedErrorStackTraceQRelation;
}
export interface QLoggedErrorQId {
    logEntry: QLogEntryQId;
}
export interface QLoggedErrorQRelation extends QRelation<QLoggedError>, QLoggedErrorQId {
}
