import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
export interface ISharingMessageResponseStage {
    id?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingMessageResponseStageESelect extends IEntitySelectProperties, SharingMessageResponseStageEOptionalId, SharingMessageResponseStageEUpdateProperties {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingMessageResponseStageEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SharingMessageResponseStageEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingMessageResponseStageEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingMessageResponseStageEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingMessageResponseStageECreateProperties extends SharingMessageResponseStageEId, SharingMessageResponseStageEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingMessageResponseStageECreateColumns extends SharingMessageResponseStageEId, SharingMessageResponseStageEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingMessageResponseStage extends QEntity {
    id: IQNumberField;
}
export interface QSharingMessageResponseStageQId {
    id: IQNumberField;
}
export interface QSharingMessageResponseStageQRelation extends QRelation<QSharingMessageResponseStage>, QSharingMessageResponseStageQId {
}
