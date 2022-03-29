import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQDateField, IQEntity, IQRelation } from '@airport/air-control';
import { UserGraph, UserEOptionalId, UserESelect, QUserQRelation } from '@airport/travel-document-checkpoint/lib/to_be_generated';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ImmutableRowESelect extends IEntitySelectProperties, ImmutableRowEOptionalId {
    createdAt?: Date | IQDateField;
    user?: UserESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ImmutableRowEId extends IEntityIdProperties {
}
/**
 * Ids fields and relations only (optional).
 */
export interface ImmutableRowEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ImmutableRowEUpdateProperties extends IEntityUpdateProperties {
    createdAt?: Date | IQDateField;
    user?: UserEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ImmutableRowGraph extends ImmutableRowEOptionalId, IEntityCascadeGraph {
    createdAt?: Date | IQDateField;
    user?: UserGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ImmutableRowEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ImmutableRowECreateProperties extends Partial<ImmutableRowEId>, ImmutableRowEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ImmutableRowECreateColumns extends ImmutableRowEId, ImmutableRowEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QImmutableRow extends IQEntity {
    createdAt: IQDateField;
    user: QUserQRelation;
}
export interface QImmutableRowQId {
}
export interface QImmutableRowQRelation<SubQType extends IQEntity> extends IQRelation<SubQType>, QImmutableRowQId {
}
//# sourceMappingURL=qimmutablerow.d.ts.map