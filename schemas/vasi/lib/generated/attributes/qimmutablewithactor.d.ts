import { IQEntity } from '@airport/air-control';
import { ImmutableGraph, ImmutableEId, ImmutableEUpdateColumns, ImmutableEUpdateProperties, ImmutableESelect, QImmutableQId, QImmutableQRelation, QImmutable } from './qimmutable';
import { ActorGraph, ActorEOptionalId, ActorESelect, QActorQRelation } from '@airport/holding-pattern';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ImmutableWithActorESelect extends ImmutableESelect, ImmutableWithActorEOptionalId {
    actor?: ActorESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ImmutableWithActorEId extends ImmutableEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface ImmutableWithActorEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ImmutableWithActorEUpdateProperties extends ImmutableEUpdateProperties {
    actor?: ActorEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ImmutableWithActorGraph extends ImmutableWithActorEOptionalId, ImmutableGraph {
    actor?: ActorGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ImmutableWithActorEUpdateColumns extends ImmutableEUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ImmutableWithActorECreateProperties extends Partial<ImmutableWithActorEId>, ImmutableWithActorEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ImmutableWithActorECreateColumns extends ImmutableWithActorEId, ImmutableWithActorEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QImmutableWithActor<T> extends QImmutable<T> {
    actor: QActorQRelation;
}
export interface QImmutableWithActorQId extends QImmutableQId {
}
export interface QImmutableWithActorQRelation<SubType, SubQType extends IQEntity<SubType>> extends QImmutableQRelation<SubType, SubQType>, QImmutableWithActorQId {
}
//# sourceMappingURL=qimmutablewithactor.d.ts.map