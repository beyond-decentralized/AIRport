import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
export interface ILoggedErrorStackTrace {
    id: number;
    stackHash?: string;
    stack?: string;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface LoggedErrorStackTraceESelect extends IEntitySelectProperties, LoggedErrorStackTraceEOptionalId {
    stackHash?: string | IQStringField;
    stack?: string | IQStringField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LoggedErrorStackTraceEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface LoggedErrorStackTraceEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LoggedErrorStackTraceEUpdateProperties extends IEntityUpdateProperties {
    stackHash?: string | IQStringField;
    stack?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface LoggedErrorStackTraceEUpdateColumns extends IEntityUpdateColumns {
    STACK_HASH?: string | IQStringField;
    STACK?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LoggedErrorStackTraceECreateProperties extends Partial<LoggedErrorStackTraceEId>, LoggedErrorStackTraceEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LoggedErrorStackTraceECreateColumns extends LoggedErrorStackTraceEId, LoggedErrorStackTraceEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLoggedErrorStackTrace extends IQEntity {
    id: IQNumberField;
    stackHash: IQStringField;
    stack: IQStringField;
}
export interface QLoggedErrorStackTraceQId {
    id: IQNumberField;
}
export interface QLoggedErrorStackTraceQRelation extends IQRelation<QLoggedErrorStackTrace>, QLoggedErrorStackTraceQId {
}
