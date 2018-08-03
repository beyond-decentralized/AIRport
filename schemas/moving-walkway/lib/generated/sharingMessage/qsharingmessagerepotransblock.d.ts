import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, QEntity, QRelation } from '@airport/air-control';
import { ISharingMessage, SharingMessageEId, SharingMessageEOptionalId, SharingMessageESelect, QSharingMessageQId, QSharingMessageQRelation } from './qsharingmessage';
import { IRepositoryTransactionBlock, RepositoryTransactionBlockEId, RepositoryTransactionBlockEOptionalId, RepositoryTransactionBlockESelect, QRepositoryTransactionBlockQId, QRepositoryTransactionBlockQRelation } from '../repositoryTransactionBlock/qrepositorytransactionblock';
export interface ISharingMessageRepoTransBlock {
    sharingMessage?: ISharingMessage;
    repositoryTransactionBlock?: IRepositoryTransactionBlock;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingMessageRepoTransBlockESelect extends IEntitySelectProperties, SharingMessageRepoTransBlockEOptionalId, SharingMessageRepoTransBlockEUpdateProperties {
    sharingMessage?: SharingMessageESelect;
    repositoryTransactionBlock?: RepositoryTransactionBlockESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingMessageRepoTransBlockEId extends IEntityIdProperties {
    sharingMessage: SharingMessageEId;
    repositoryTransactionBlock: RepositoryTransactionBlockEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SharingMessageRepoTransBlockEOptionalId {
    sharingMessage?: SharingMessageEOptionalId;
    repositoryTransactionBlock?: RepositoryTransactionBlockEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingMessageRepoTransBlockEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingMessageRepoTransBlockEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingMessageRepoTransBlockECreateProperties extends Partial<SharingMessageRepoTransBlockEId>, SharingMessageRepoTransBlockEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingMessageRepoTransBlockECreateColumns extends SharingMessageRepoTransBlockEId, SharingMessageRepoTransBlockEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingMessageRepoTransBlock extends QEntity {
    sharingMessage: QSharingMessageQRelation;
    repositoryTransactionBlock: QRepositoryTransactionBlockQRelation;
}
export interface QSharingMessageRepoTransBlockQId {
    sharingMessage: QSharingMessageQId;
    repositoryTransactionBlock: QRepositoryTransactionBlockQId;
}
export interface QSharingMessageRepoTransBlockQRelation extends QRelation<QSharingMessageRepoTransBlock>, QSharingMessageRepoTransBlockQId {
}
