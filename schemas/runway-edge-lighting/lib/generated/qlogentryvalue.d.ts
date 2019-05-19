import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQUntypedField, IQEntity, IQRelation } from '@airport/air-control';
import { ILogEntry, LogEntryEOptionalId, LogEntryESelect, QLogEntryQRelation } from './qlogentry';
export interface ILogEntryValue {
    id?: number;
    position?: number;
    value?: any;
    logEntry?: ILogEntry;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface LogEntryValueESelect extends IEntitySelectProperties, LogEntryValueEOptionalId {
    position?: number | IQNumberField;
    value?: any | IQUntypedField;
    logEntry?: LogEntryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LogEntryValueEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface LogEntryValueEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LogEntryValueEUpdateProperties extends IEntityUpdateProperties {
    position?: number | IQNumberField;
    value?: any | IQUntypedField;
    logEntry?: LogEntryEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface LogEntryValueEUpdateColumns extends IEntityUpdateColumns {
    POSITION?: number | IQNumberField;
    VALUE?: any | IQUntypedField;
    LOG_ENTRY_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LogEntryValueECreateProperties extends Partial<LogEntryValueEId>, LogEntryValueEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LogEntryValueECreateColumns extends LogEntryValueEId, LogEntryValueEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLogEntryValue extends IQEntity {
    id: IQNumberField;
    position: IQNumberField;
    value: IQUntypedField;
    logEntry: QLogEntryQRelation;
}
export interface QLogEntryValueQId {
    id: IQNumberField;
}
export interface QLogEntryValueQRelation extends IQRelation<QLogEntryValue>, QLogEntryValueQId {
}
