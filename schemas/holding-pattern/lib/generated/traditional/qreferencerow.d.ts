import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-traffic-control';
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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QReferenceRow extends IQEntity {
}
export interface QReferenceRowQId {
}
export interface QReferenceRowQRelation<SubQType extends IQEntity> extends IQRelation<SubQType>, QReferenceRowQId {
}
//# sourceMappingURL=qreferencerow.d.ts.map