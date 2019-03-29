import { IQEntityInternal, IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, QEntity, QRelation } from '@airport/air-control';
export interface IChildRow {
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface ChildRowESelect extends IEntitySelectProperties, ChildRowEOptionalId {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ChildRowEId extends IEntityIdProperties {
}
/**
 * Ids fields and relations only (optional).
 */
export interface ChildRowEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ChildRowEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ChildRowEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ChildRowECreateProperties extends Partial<ChildRowEId>, ChildRowEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ChildRowECreateColumns extends ChildRowEId, ChildRowEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QChildRow extends QEntity {
}
export interface QChildRowQId {
}
export interface QChildRowQRelation<SubType extends IQEntityInternal> extends QRelation<SubType>, QChildRowQId {
}
