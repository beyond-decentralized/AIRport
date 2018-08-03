import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { ISharingMessage, SharingMessageESelect, QSharingMessage } from '../sharingMessage/qsharingmessage';
import { ISharingNodeRepoTransBlock, SharingNodeRepoTransBlockESelect, QSharingNodeRepoTransBlock } from './qsharingnoderepotransblock';
export interface ISharingNode {
    id?: number;
    sharingMechanism?: number;
    isActive?: boolean;
    syncFrequency?: number;
    connectionProtocol?: number;
    connectionUrl?: string;
    messages?: ISharingMessage[];
    sharingNodeRepoTransBlocks?: ISharingNodeRepoTransBlock[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeESelect extends IEntitySelectProperties, SharingNodeEOptionalId, SharingNodeEUpdateProperties {
    messages?: SharingMessageESelect;
    sharingNodeRepoTransBlocks?: SharingNodeRepoTransBlockESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeEUpdateProperties extends IEntityUpdateProperties {
    sharingMechanism?: number | IQNumberField;
    isActive?: boolean | IQBooleanField;
    syncFrequency?: number | IQNumberField;
    connectionProtocol?: number | IQNumberField;
    connectionUrl?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeEUpdateColumns extends IEntityUpdateColumns {
    SHARING_MECHANISM?: number | IQNumberField;
    IS_ACTIVE?: boolean | IQBooleanField;
    SYNC_FREQUENCY?: number | IQNumberField;
    CONNECTION_PROTOCOL?: number | IQNumberField;
    CONNECTION_URL?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeECreateProperties extends Partial<SharingNodeEId>, SharingNodeEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeECreateColumns extends SharingNodeEId, SharingNodeEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNode extends QEntity {
    id: IQNumberField;
    sharingMechanism: IQNumberField;
    isActive: IQBooleanField;
    syncFrequency: IQNumberField;
    connectionProtocol: IQNumberField;
    connectionUrl: IQStringField;
    messages: IQOneToManyRelation<QSharingMessage>;
    sharingNodeRepoTransBlocks: IQOneToManyRelation<QSharingNodeRepoTransBlock>;
}
export interface QSharingNodeQId {
    id: IQNumberField;
}
export interface QSharingNodeQRelation extends QRelation<QSharingNode>, QSharingNodeQId {
}
