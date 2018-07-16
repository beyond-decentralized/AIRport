import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { IMissingRecord, MissingRecordEOptionalId, MissingRecordESelect, QMissingRecordQRelation } from './qmissingrecord';
import { ISharingMessage, SharingMessageEOptionalId, SharingMessageESelect, QSharingMessageQRelation } from '../sharingMessage/qsharingmessage';
export interface IMissingRecordSharingMessage {
    missingRecord?: IMissingRecord;
    sharingMessage?: ISharingMessage;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface MissingRecordSharingMessageESelect extends IEntitySelectProperties, MissingRecordSharingMessageEOptionalId, MissingRecordSharingMessageEUpdateProperties {
    missingRecord?: MissingRecordESelect;
    sharingMessage?: SharingMessageESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MissingRecordSharingMessageEId extends IEntityIdProperties {
}
/**
 * Ids fields and relations only (optional).
 */
export interface MissingRecordSharingMessageEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MissingRecordSharingMessageEUpdateProperties extends IEntityUpdateProperties {
    missingRecord?: MissingRecordEOptionalId;
    sharingMessage?: SharingMessageEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface MissingRecordSharingMessageEUpdateColumns extends IEntityUpdateColumns {
    MISSING_RECORD_ID?: number | IQNumberField;
    SHARING_MESSAGE_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MissingRecordSharingMessageECreateProperties extends MissingRecordSharingMessageEId, MissingRecordSharingMessageEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MissingRecordSharingMessageECreateColumns extends MissingRecordSharingMessageEId, MissingRecordSharingMessageEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMissingRecordSharingMessage extends QEntity {
    missingRecord: QMissingRecordQRelation;
    sharingMessage: QSharingMessageQRelation;
}
export interface QMissingRecordSharingMessageQId {
}
export interface QMissingRecordSharingMessageQRelation extends QRelation<QMissingRecordSharingMessage>, QMissingRecordSharingMessageQId {
}
