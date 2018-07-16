import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQDateField, IQNumberField, IQOneToManyRelation, QEntity, QRelation } from '@airport/air-control';
import { ISharingNode, SharingNodeEId, SharingNodeEOptionalId, SharingNodeESelect, QSharingNodeQId, QSharingNodeQRelation } from '../sharingNode/qsharingnode';
import { ISharingMessageRepoTransBlock, SharingMessageRepoTransBlockESelect, QSharingMessageRepoTransBlock } from './qsharingmessagerepotransblock';
export interface ISharingMessage {
    id?: number;
    sharingNode?: ISharingNode;
    origin?: number;
    agtDatabaseSyncLogId?: number;
    syncTimestamp?: Date;
    sharingMessageRepoTransBlocks?: ISharingMessageRepoTransBlock[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingMessageESelect extends IEntitySelectProperties, SharingMessageEOptionalId, SharingMessageEUpdateProperties {
    sharingNode?: SharingNodeESelect;
    sharingMessageRepoTransBlocks?: SharingMessageRepoTransBlockESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingMessageEId extends IEntityIdProperties {
    id: number | IQNumberField;
    sharingNode: SharingNodeEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SharingMessageEOptionalId {
    id?: number | IQNumberField;
    sharingNode?: SharingNodeEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingMessageEUpdateProperties extends IEntityUpdateProperties {
    origin?: number | IQNumberField;
    agtDatabaseSyncLogId?: number | IQNumberField;
    syncTimestamp?: Date | IQDateField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingMessageEUpdateColumns extends IEntityUpdateColumns {
    ORIGIN?: number | IQNumberField;
    AGT_DATABASE_SYNC_LOG_ID?: number | IQNumberField;
    SYNC_TIMESTAMP?: Date | IQDateField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingMessageECreateProperties extends SharingMessageEId, SharingMessageEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingMessageECreateColumns extends SharingMessageEId, SharingMessageEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingMessage extends QEntity {
    id: IQNumberField;
    sharingNode: QSharingNodeQRelation;
    origin: IQNumberField;
    agtDatabaseSyncLogId: IQNumberField;
    syncTimestamp: IQDateField;
    sharingMessageRepoTransBlocks: IQOneToManyRelation<QSharingMessageRepoTransBlock>;
}
export interface QSharingMessageQId {
    id: IQNumberField;
    sharingNode: QSharingNodeQId;
}
export interface QSharingMessageQRelation extends QRelation<QSharingMessage>, QSharingMessageQId {
}
