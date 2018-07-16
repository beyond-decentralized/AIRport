import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, QEntity, QRelation } from '@airport/air-control';
export interface IUser {
    id?: number;
    uniqueId?: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    phone?: string;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserESelect extends IEntitySelectProperties, UserEOptionalId, UserEUpdateProperties {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface UserEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserEUpdateProperties extends IEntityUpdateProperties {
    uniqueId?: string | IQStringField;
    firstName?: string | IQStringField;
    lastName?: string | IQStringField;
    middleName?: string | IQStringField;
    phone?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserEUpdateColumns extends IEntityUpdateColumns {
    UNIQUE_IDENTIFIER?: string | IQStringField;
    FIRST_NAME?: string | IQStringField;
    LAST_NAME?: string | IQStringField;
    MIDDLE_NAME?: string | IQStringField;
    PHONE?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserECreateProperties extends UserEId, UserEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserECreateColumns extends UserEId, UserEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUser extends QEntity {
    id: IQNumberField;
    uniqueId: IQStringField;
    firstName: IQStringField;
    lastName: IQStringField;
    middleName: IQStringField;
    phone: IQStringField;
}
export interface QUserQId {
    id: IQNumberField;
}
export interface QUserQRelation extends QRelation<QUser>, QUserQId {
}
