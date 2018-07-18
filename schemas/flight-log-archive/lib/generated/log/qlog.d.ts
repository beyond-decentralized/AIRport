import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, QEntity, QRelation } from '@airport/air-control';
export interface ILog {
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface LogESelect extends IEntitySelectProperties, LogEOptionalId, LogEUpdateProperties {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface LogEId extends IEntityIdProperties {
}
/**
 * Ids fields and relations only (optional).
 */
export interface LogEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface LogEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface LogEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface LogECreateProperties extends LogEId, LogEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface LogECreateColumns extends LogEId, LogEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLog extends QEntity {
}
export interface QLogQId {
}
export interface QLogQRelation extends QRelation<QLog>, QLogQId {
}
