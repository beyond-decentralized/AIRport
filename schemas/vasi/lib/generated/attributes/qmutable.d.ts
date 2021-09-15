import { IQDateField, IQEntity } from '@airport/air-control';
import { ImmutableGraph, ImmutableEId, ImmutableEUpdateColumns, ImmutableEUpdateProperties, ImmutableESelect, QImmutableQId, QImmutableQRelation, QImmutable } from './qimmutable';
/**
 * SELECT - All fields and relations (optional).
 */
export interface MutableESelect extends ImmutableESelect, MutableEOptionalId {
    updatedAt?: Date | IQDateField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MutableEId extends ImmutableEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface MutableEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MutableEUpdateProperties extends ImmutableEUpdateProperties {
    updatedAt?: Date | IQDateField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MutableGraph extends MutableEOptionalId, ImmutableGraph {
    updatedAt?: Date | IQDateField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface MutableEUpdateColumns extends ImmutableEUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MutableECreateProperties extends Partial<MutableEId>, MutableEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MutableECreateColumns extends MutableEId, MutableEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMutable<T> extends QImmutable<T> {
    updatedAt: IQDateField;
}
export interface QMutableQId extends QImmutableQId {
}
export interface QMutableQRelation<SubType, SubQType extends IQEntity<SubType>> extends QImmutableQRelation<SubType, SubQType>, QMutableQId {
}
//# sourceMappingURL=qmutable.d.ts.map