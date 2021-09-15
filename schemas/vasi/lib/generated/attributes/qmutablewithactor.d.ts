import { IQEntity } from '@airport/air-control';
import { MutableGraph, MutableEId, MutableEUpdateColumns, MutableEUpdateProperties, MutableESelect, QMutableQId, QMutableQRelation, QMutable } from './qmutable';
import { ActorGraph, ActorEOptionalId, ActorESelect, QActorQRelation } from '@airport/holding-pattern';
/**
 * SELECT - All fields and relations (optional).
 */
export interface MutableWithActorESelect extends MutableESelect, MutableWithActorEOptionalId {
    actor?: ActorESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MutableWithActorEId extends MutableEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface MutableWithActorEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MutableWithActorEUpdateProperties extends MutableEUpdateProperties {
    actor?: ActorEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MutableWithActorGraph extends MutableWithActorEOptionalId, MutableGraph {
    actor?: ActorGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface MutableWithActorEUpdateColumns extends MutableEUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MutableWithActorECreateProperties extends Partial<MutableWithActorEId>, MutableWithActorEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MutableWithActorECreateColumns extends MutableWithActorEId, MutableWithActorEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMutableWithActor<T> extends QMutable<T> {
    actor: QActorQRelation;
}
export interface QMutableWithActorQId extends QMutableQId {
}
export interface QMutableWithActorQRelation<SubType, SubQType extends IQEntity<SubType>> extends QMutableQRelation<SubType, SubQType>, QMutableWithActorQId {
}
//# sourceMappingURL=qmutablewithactor.d.ts.map