import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQDateField, IQNumberField, IQOneToManyRelation, IQEntity, IQRelation } from '@airport/air-control';
import { ILogEntryType, LogEntryTypeEOptionalId, LogEntryTypeESelect, QLogEntryTypeQRelation } from './qlogentrytype';
import { ILogEntryValue, LogEntryValueESelect, QLogEntryValue } from './qlogentryvalue';
export interface ILogEntry {
    id?: number;
    timestamp?: Date;
    type?: ILogEntryType;
    values?: ILogEntryValue[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface LogEntryESelect extends IEntitySelectProperties, LogEntryEOptionalId {
    timestamp?: Date | IQDateField;
    type?: LogEntryTypeESelect;
    values?: LogEntryValueESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LogEntryEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface LogEntryEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LogEntryEUpdateProperties extends IEntityUpdateProperties {
    timestamp?: Date | IQDateField;
    type?: LogEntryTypeEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface LogEntryEUpdateColumns extends IEntityUpdateColumns {
    TIMESTAMP?: Date | IQDateField;
    LOG_ENTRY_TYPE_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LogEntryECreateProperties extends Partial<LogEntryEId>, LogEntryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LogEntryECreateColumns extends LogEntryEId, LogEntryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLogEntry extends IQEntity {
    id: IQNumberField;
    timestamp: IQDateField;
    type: QLogEntryTypeQRelation;
    values: IQOneToManyRelation<QLogEntryValue>;
}
export interface QLogEntryQId {
    id: IQNumberField;
}
export interface QLogEntryQRelation extends IQRelation<QLogEntry>, QLogEntryQId {
}
