import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-control';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ReferenceRowESelect extends IEntitySelectProperties, ReferenceRowEOptionalId {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ReferenceRowEId extends IEntityIdProperties {
}
/**
 * Ids fields and relations only (optional).
 */
export interface ReferenceRowEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ReferenceRowEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ReferenceRowGraph extends ReferenceRowEOptionalId, IEntityCascadeGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ReferenceRowEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ReferenceRowECreateProperties extends Partial<ReferenceRowEId>, ReferenceRowEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ReferenceRowECreateColumns extends ReferenceRowEId, ReferenceRowEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QReferenceRow<T> extends IQEntity<T> {
}
export interface QReferenceRowQId {
}
export interface QReferenceRowQRelation<SubType, SubQType extends IQEntity<SubType>> extends IQRelation<SubType, SubQType>, QReferenceRowQId {
}
//# sourceMappingURL=qreferencerow.d.ts.map