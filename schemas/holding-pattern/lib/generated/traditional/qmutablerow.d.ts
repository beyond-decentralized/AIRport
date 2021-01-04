import { IQDateField, IQEntity } from '@airport/air-control';
import { ImmutableRowGraph, ImmutableRowEId, ImmutableRowEUpdateColumns, ImmutableRowEUpdateProperties, ImmutableRowESelect, QImmutableRowQId, QImmutableRowQRelation, QImmutableRow } from './qimmutablerow';
/**
 * SELECT - All fields and relations (optional).
 */
export interface MutableRowESelect extends ImmutableRowESelect, MutableRowEOptionalId {
    updatedAt?: Date | IQDateField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MutableRowEId extends ImmutableRowEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface MutableRowEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MutableRowEUpdateProperties extends ImmutableRowEUpdateProperties {
    updatedAt?: Date | IQDateField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MutableRowGraph extends MutableRowEOptionalId, ImmutableRowGraph {
    updatedAt?: Date | IQDateField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface MutableRowEUpdateColumns extends ImmutableRowEUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MutableRowECreateProperties extends Partial<MutableRowEId>, MutableRowEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MutableRowECreateColumns extends MutableRowEId, MutableRowEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMutableRow<T> extends QImmutableRow<T> {
    updatedAt: IQDateField;
}
export interface QMutableRowQId extends QImmutableRowQId {
}
export interface QMutableRowQRelation<SubType, SubQType extends IQEntity<SubType>> extends QImmutableRowQRelation<SubType, SubQType>, QMutableRowQId {
}
//# sourceMappingURL=qmutablerow.d.ts.map