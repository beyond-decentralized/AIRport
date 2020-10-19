import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { SharingNodeGraph, SharingNodeEId, SharingNodeEOptionalId, SharingNodeESelect, QSharingNodeQId, QSharingNodeQRelation } from './qsharingnode';
import { RepositoryTransactionBlockGraph, RepositoryTransactionBlockEId, RepositoryTransactionBlockEOptionalId, RepositoryTransactionBlockESelect, QRepositoryTransactionBlockQId, QRepositoryTransactionBlockQRelation } from '../repositorytransactionblock/qrepositorytransactionblock';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockESelect extends IEntitySelectProperties, SharingNodeRepoTransBlockEOptionalId {
    syncStatus?: number | IQNumberField;
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
    syncStatus?: number | IQNumberField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SharingNodeRepoTransBlockGraph extends SharingNodeRepoTransBlockEOptionalId, IEntityCascadeGraph {
    syncStatus?: number | IQNumberField;
    sharingNode?: SharingNodeGraph;
    repositoryTransactionBlock?: RepositoryTransactionBlockGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeRepoTransBlockEUpdateColumns extends IEntityUpdateColumns {
    SYNC_STATUS?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeRepoTransBlockECreateProperties extends Partial<SharingNodeRepoTransBlockEId>, SharingNodeRepoTransBlockEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeRepoTransBlockECreateColumns extends SharingNodeRepoTransBlockEId, SharingNodeRepoTransBlockEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNodeRepoTransBlock extends IQEntity {
    sharingNode: QSharingNodeQRelation;
    repositoryTransactionBlock: QRepositoryTransactionBlockQRelation;
    syncStatus: IQNumberField;
}
export interface QSharingNodeRepoTransBlockQId {
    sharingNode: QSharingNodeQId;
    repositoryTransactionBlock: QRepositoryTransactionBlockQId;
}
export interface QSharingNodeRepoTransBlockQRelation extends IQRelation<QSharingNodeRepoTransBlock>, QSharingNodeRepoTransBlockQId {
}
//# sourceMappingURL=qsharingnoderepotransblock.d.ts.map