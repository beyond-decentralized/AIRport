import { IQNumberField, IQEntity } from '@airport/air-control';
import { ImmutableWithActorGraph, ImmutableWithActorEId, ImmutableWithActorEUpdateColumns, ImmutableWithActorEUpdateProperties, ImmutableWithActorESelect, QImmutableWithActorQId, QImmutableWithActorQRelation, QImmutableWithActor } from './qimmutablewithactor';
/**
 * SELECT - All fields and relations (optional).
 */
export interface AgeSuitableESelect extends ImmutableWithActorESelect, AgeSuitableEOptionalId {
    ageSuitability?: number | IQNumberField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface AgeSuitableEId extends ImmutableWithActorEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface AgeSuitableEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface AgeSuitableEUpdateProperties extends ImmutableWithActorEUpdateProperties {
    ageSuitability?: number | IQNumberField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface AgeSuitableGraph extends AgeSuitableEOptionalId, ImmutableWithActorGraph {
    ageSuitability?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface AgeSuitableEUpdateColumns extends ImmutableWithActorEUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface AgeSuitableECreateProperties extends Partial<AgeSuitableEId>, AgeSuitableEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface AgeSuitableECreateColumns extends AgeSuitableEId, AgeSuitableEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QAgeSuitable<T> extends QImmutableWithActor<T> {
    ageSuitability: IQNumberField;
}
export interface QAgeSuitableQId extends QImmutableWithActorQId {
}
export interface QAgeSuitableQRelation<SubType, SubQType extends IQEntity<SubType>> extends QImmutableWithActorQRelation<SubType, SubQType>, QAgeSuitableQId {
}
//# sourceMappingURL=qagesuitable.d.ts.map