import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserESelect extends IEntitySelectProperties, UserEOptionalId {
    origin?: string | IQStringField;
    originId?: string | IQStringField;
    email?: string | IQStringField;
    passwordHash?: string | IQStringField;
    ranking?: number | IQNumberField;
    username?: string | IQStringField;
    GUID?: string | IQStringField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserEId extends IEntityIdProperties {
    id?: number | IQNumberField;
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
    origin?: string | IQStringField;
    originId?: string | IQStringField;
    email?: string | IQStringField;
    passwordHash?: string | IQStringField;
    ranking?: number | IQNumberField;
    username?: string | IQStringField;
    GUID?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserGraph extends UserEOptionalId, IEntityCascadeGraph {
    origin?: string | IQStringField;
    originId?: string | IQStringField;
    email?: string | IQStringField;
    passwordHash?: string | IQStringField;
    ranking?: number | IQNumberField;
    username?: string | IQStringField;
    GUID?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserEUpdateColumns extends IEntityUpdateColumns {
    ORIGIN?: string | IQStringField;
    ORIGIN_ID?: string | IQStringField;
    EMAIL?: string | IQStringField;
    PASSWORD_HASH?: string | IQStringField;
    RANKING?: number | IQNumberField;
    USERNAME?: string | IQStringField;
    GUID?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserECreateProperties extends Partial<UserEId>, UserEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserECreateColumns extends UserEId, UserEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUser extends IQEntity {
    id: IQNumberField;
    origin: IQStringField;
    originId: IQStringField;
    email: IQStringField;
    passwordHash: IQStringField;
    ranking: IQNumberField;
    username: IQStringField;
    GUID: IQStringField;
}
export interface QUserQId {
    id: IQNumberField;
}
export interface QUserQRelation extends IQRelation<QUser>, QUserQId {
}
//# sourceMappingURL=quser.d.ts.map