import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQDateField, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { ISharingNode, SharingNodeEId, SharingNodeEOptionalId, SharingNodeESelect, QSharingNodeQId, QSharingNodeQRelation } from './qsharingnode';
import { IRepositoryTransactionBlock, RepositoryTransactionBlockEId, RepositoryTransactionBlockEOptionalId, RepositoryTransactionBlockESelect, QRepositoryTransactionBlockQId, QRepositoryTransactionBlockQRelation } from '../repositoryTransactionBlock/qrepositorytransactionblock';
export interface ISharingNodeRepoTransBlock {
    sharingNode?: ISharingNode;
    repositoryTransactionBlock?: IRepositoryTransactionBlock;
    syncTimestamp?: Date;
    syncOutcomeType?: number;
    origin?: number;
    blockSyncStatus?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockESelect extends IEntitySelectProperties, SharingNodeRepoTransBlockEOptionalId, SharingNodeRepoTransBlockEUpdateProperties {
    sharingNode?: SharingNodeESelect;
    repositoryTransactionBlock?: RepositoryTransactionBlockESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeRepoTransBlockEId extends IEntityIdProperties {
    sharingNode: SharingNodeEId;
    repositoryTransactionBlock: RepositoryTransactionBlockEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeRepoTransBlockEOptionalId {
    sharingNode?: SharingNodeEOptionalId;
    repositoryTransactionBlock?: RepositoryTransactionBlockEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockEUpdateProperties extends IEntityUpdateProperties {
    syncTimestamp?: Date | IQDateField;
    syncOutcomeType?: number | IQNumberField;
    origin?: number | IQNumberField;
    blockSyncStatus?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeRepoTransBlockEUpdateColumns extends IEntityUpdateColumns {
    SYNC_TIMESTAMP?: Date | IQDateField;
    SYNC_OUTCOME_TYPE?: number | IQNumberField;
    ORIGIN?: number | IQNumberField;
    BLOCK_SYNC_STATUS?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockECreateProperties extends SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeRepoTransBlockECreateColumns extends SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNodeRepoTransBlock extends QEntity {
    sharingNode: QSharingNodeQRelation;
    repositoryTransactionBlock: QRepositoryTransactionBlockQRelation;
    syncTimestamp: IQDateField;
    syncOutcomeType: IQNumberField;
    origin: IQNumberField;
    blockSyncStatus: IQNumberField;
}
export interface QSharingNodeRepoTransBlockQId {
    sharingNode: QSharingNodeQId;
    repositoryTransactionBlock: QRepositoryTransactionBlockQId;
}
export interface QSharingNodeRepoTransBlockQRelation extends QRelation<QSharingNodeRepoTransBlock>, QSharingNodeRepoTransBlockQId {
}
