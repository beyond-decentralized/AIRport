import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { IUser, UserEOptionalId, UserESelect, QUserQRelation } from './quser';
export interface IDatabase {
    id?: number;
    name?: string;
    secondId?: number;
    isLocal?: boolean;
    owner?: IUser;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface DatabaseESelect extends IEntitySelectProperties, DatabaseEOptionalId, DatabaseEUpdateProperties {
    owner?: UserESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DatabaseEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface DatabaseEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DatabaseEUpdateProperties extends IEntityUpdateProperties {
    name?: string | IQStringField;
    secondId?: number | IQNumberField;
    isLocal?: boolean | IQBooleanField;
    owner?: UserEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface DatabaseEUpdateColumns extends IEntityUpdateColumns {
    NAME?: string | IQStringField;
    SECOND_ID?: number | IQNumberField;
    IS_LOCAL?: boolean | IQBooleanField;
    OWNER_USER_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DatabaseECreateProperties extends DatabaseEId, DatabaseEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DatabaseECreateColumns extends DatabaseEId, DatabaseEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDatabase extends QEntity {
    id: IQNumberField;
    name: IQStringField;
    secondId: IQNumberField;
    isLocal: IQBooleanField;
    owner: QUserQRelation;
}
export interface QDatabaseQId {
    id: IQNumberField;
}
export interface QDatabaseQRelation extends QRelation<QDatabase>, QDatabaseQId {
}
