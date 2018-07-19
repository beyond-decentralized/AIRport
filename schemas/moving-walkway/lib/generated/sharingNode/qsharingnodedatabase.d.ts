import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { ISharingNode, SharingNodeEId, SharingNodeEOptionalId, SharingNodeESelect, QSharingNodeQId, QSharingNodeQRelation } from './qsharingnode';
import { IDatabase, DatabaseEId, DatabaseEOptionalId, DatabaseESelect, QDatabaseQId, QDatabaseQRelation } from '@airport/holding-pattern';
export interface ISharingNodeDatabase {
    sharingNode?: ISharingNode;
    database?: IDatabase;
    agtDatabaseId?: number;
    agtDatabaseHash?: string;
    databaseSyncStatus?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeDatabaseESelect extends IEntitySelectProperties, SharingNodeDatabaseEOptionalId, SharingNodeDatabaseEUpdateProperties {
    sharingNode?: SharingNodeESelect;
    database?: DatabaseESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeDatabaseEId extends IEntityIdProperties {
    sharingNode: SharingNodeEId;
    database: DatabaseEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeDatabaseEOptionalId {
    sharingNode?: SharingNodeEOptionalId;
    database?: DatabaseEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeDatabaseEUpdateProperties extends IEntityUpdateProperties {
    agtDatabaseId?: number | IQNumberField;
    agtDatabaseHash?: string | IQStringField;
    databaseSyncStatus?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeDatabaseEUpdateColumns extends IEntityUpdateColumns {
    AGT_DATABASE_ID?: number | IQNumberField;
    AGT_DATABASE_HASH?: string | IQStringField;
    DATABASE_SYNC_STATUS?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeDatabaseECreateProperties extends SharingNodeDatabaseEId, SharingNodeDatabaseEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeDatabaseECreateColumns extends SharingNodeDatabaseEId, SharingNodeDatabaseEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNodeDatabase extends QEntity {
    sharingNode: QSharingNodeQRelation;
    database: QDatabaseQRelation;
    agtDatabaseId: IQNumberField;
    agtDatabaseHash: IQStringField;
    databaseSyncStatus: IQNumberField;
}
export interface QSharingNodeDatabaseQId {
    sharingNode: QSharingNodeQId;
    database: QDatabaseQId;
}
export interface QSharingNodeDatabaseQRelation extends QRelation<QSharingNodeDatabase>, QSharingNodeDatabaseQId {
}
