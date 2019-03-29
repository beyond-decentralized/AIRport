import { IQEntityInternal, IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQDateField, QEntity, QRelation } from '@airport/air-control';
import { IUser, UserEOptionalId, UserESelect, QUserQRelation } from '@airport/travel-document-checkpoint';
export interface IImmutableRow {
    createdAt?: Date;
    user?: IUser;
}
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
export interface QImmutableRow extends QEntity {
    createdAt: IQDateField;
    user: QUserQRelation;
}
export interface QImmutableRowQId {
}
export interface QImmutableRowQRelation<SubType extends IQEntityInternal> extends QRelation<SubType>, QImmutableRowQId {
}
