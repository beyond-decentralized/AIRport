import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
export interface ISharingNodeRepoTransBlockStage {
    sharingNodeId?: number;
    repositoryTransactionBlockId?: number;
    syncStatus?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockStageESelect extends IEntitySelectProperties, SharingNodeRepoTransBlockStageEOptionalId, SharingNodeRepoTransBlockStageEUpdateProperties {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeRepoTransBlockStageEId extends IEntityIdProperties {
    sharingNodeId: number | IQNumberField;
    repositoryTransactionBlockId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeRepoTransBlockStageEOptionalId {
    sharingNodeId?: number | IQNumberField;
    repositoryTransactionBlockId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockStageEUpdateProperties extends IEntityUpdateProperties {
    syncStatus?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeRepoTransBlockStageEUpdateColumns extends IEntityUpdateColumns {
    SYNC_STATUS?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockStageECreateProperties extends Partial<SharingNodeRepoTransBlockStageEId>, SharingNodeRepoTransBlockStageEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeRepoTransBlockStageECreateColumns extends SharingNodeRepoTransBlockStageEId, SharingNodeRepoTransBlockStageEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNodeRepoTransBlockStage extends QEntity {
    sharingNodeId: IQNumberField;
    repositoryTransactionBlockId: IQNumberField;
    syncStatus: IQNumberField;
}
export interface QSharingNodeRepoTransBlockStageQId {
    sharingNodeId: IQNumberField;
    repositoryTransactionBlockId: IQNumberField;
}
export interface QSharingNodeRepoTransBlockStageQRelation extends QRelation<QSharingNodeRepoTransBlockStage>, QSharingNodeRepoTransBlockStageQId {
}
