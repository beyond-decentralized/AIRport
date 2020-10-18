import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-control';
import { AgtSharingMessageGraph, AgtSharingMessageEId, AgtSharingMessageEOptionalId, AgtSharingMessageESelect, QAgtSharingMessageQId, QAgtSharingMessageQRelation } from './qagtsharingmessage';
import { AgtRepositoryTransactionBlockGraph, AgtRepositoryTransactionBlockEId, AgtRepositoryTransactionBlockEOptionalId, AgtRepositoryTransactionBlockESelect, QAgtRepositoryTransactionBlockQId, QAgtRepositoryTransactionBlockQRelation } from './qagtrepositorytransactionblock';
/**
 * SELECT - All fields and relations (optional).
 */
export interface SyncLogESelect extends IEntitySelectProperties, SyncLogEOptionalId {
    sharingMessage?: AgtSharingMessageESelect;
    repositoryTransactionBlock?: AgtRepositoryTransactionBlockESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SyncLogEId extends IEntityIdProperties {
    sharingMessage: AgtSharingMessageEId;
    repositoryTransactionBlock: AgtRepositoryTransactionBlockEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SyncLogEOptionalId {
    sharingMessage?: AgtSharingMessageEOptionalId;
    repositoryTransactionBlock?: AgtRepositoryTransactionBlockEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SyncLogEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface SyncLogGraph extends IEntitySelectProperties, SyncLogEOptionalId, IEntityCascadeGraph {
    sharingMessage?: AgtSharingMessageGraph;
    repositoryTransactionBlock?: AgtRepositoryTransactionBlockGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SyncLogEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SyncLogECreateProperties extends Partial<SyncLogEId>, SyncLogEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SyncLogECreateColumns extends SyncLogEId, SyncLogEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSyncLog extends IQEntity {
    sharingMessage: QAgtSharingMessageQRelation;
    repositoryTransactionBlock: QAgtRepositoryTransactionBlockQRelation;
}
export interface QSyncLogQId {
    sharingMessage: QAgtSharingMessageQId;
    repositoryTransactionBlock: QAgtRepositoryTransactionBlockQId;
}
export interface QSyncLogQRelation extends IQRelation<QSyncLog>, QSyncLogQId {
}
//# sourceMappingURL=qsynclog.d.ts.map