import { IQEntity } from '@airport/air-control';
import { ImmutableGraph, ImmutableEId, ImmutableEUpdateColumns, ImmutableEUpdateProperties, ImmutableESelect, QImmutableQId, QImmutableQRelation, QImmutable } from './qimmutable';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SystemGeneratedESelect extends ImmutableESelect, SystemGeneratedEOptionalId {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SystemGeneratedEId extends ImmutableEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface SystemGeneratedEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SystemGeneratedEUpdateProperties extends ImmutableEUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SystemGeneratedGraph extends SystemGeneratedEOptionalId, ImmutableGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SystemGeneratedEUpdateColumns extends ImmutableEUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SystemGeneratedECreateProperties extends Partial<SystemGeneratedEId>, SystemGeneratedEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SystemGeneratedECreateColumns extends SystemGeneratedEId, SystemGeneratedEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSystemGenerated<T> extends QImmutable<T> {
}
export interface QSystemGeneratedQId extends QImmutableQId {
}
export interface QSystemGeneratedQRelation<SubType, SubQType extends IQEntity<SubType>> extends QImmutableQRelation<SubType, SubQType>, QSystemGeneratedQId {
}
//# sourceMappingURL=qsystemgenerated.d.ts.map