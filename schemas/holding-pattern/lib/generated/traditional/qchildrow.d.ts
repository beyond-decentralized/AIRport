import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-control';
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ChildRowGraph extends ChildRowEOptionalId, IEntityCascadeGraph {
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
export interface QChildRow extends IQEntity {
}
export interface QChildRowQId {
}
export interface QChildRowQRelation<SubQType extends IQEntity> extends IQRelation<SubQType>, QChildRowQId {
}
//# sourceMappingURL=qchildrow.d.ts.map