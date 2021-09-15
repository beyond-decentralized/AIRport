import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQDateField, IQEntity, IQRelation } from '@airport/air-control';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ImmutableESelect extends IEntitySelectProperties, ImmutableEOptionalId {
    createdAt?: Date | IQDateField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ImmutableEId extends IEntityIdProperties {
}
/**
 * Ids fields and relations only (optional).
 */
export interface ImmutableEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ImmutableEUpdateProperties extends IEntityUpdateProperties {
    createdAt?: Date | IQDateField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ImmutableGraph extends ImmutableEOptionalId, IEntityCascadeGraph {
    createdAt?: Date | IQDateField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ImmutableEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ImmutableECreateProperties extends Partial<ImmutableEId>, ImmutableEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ImmutableECreateColumns extends ImmutableEId, ImmutableEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QImmutable<T> extends IQEntity<T> {
    createdAt: IQDateField;
}
export interface QImmutableQId {
}
export interface QImmutableQRelation<SubType, SubQType extends IQEntity<SubType>> extends IQRelation<SubType, SubQType>, QImmutableQId {
}
//# sourceMappingURL=qimmutable.d.ts.map