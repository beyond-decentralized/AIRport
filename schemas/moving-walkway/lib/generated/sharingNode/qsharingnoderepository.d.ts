import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { ISharingNode, SharingNodeEId, SharingNodeEOptionalId, SharingNodeESelect, QSharingNodeQId, QSharingNodeQRelation } from './qsharingnode';
import { IRepository, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from '@airport/holding-pattern';
export interface ISharingNodeRepository {
    sharingNode?: ISharingNode;
    repository?: IRepository;
    agtRepositoryId?: number;
    advisedSyncPriority?: number;
    repositorySyncStatus?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface SharingNodeRepositoryESelect extends IEntitySelectProperties, SharingNodeRepositoryEOptionalId, SharingNodeRepositoryEUpdateProperties {
    sharingNode?: SharingNodeESelect;
    repository?: RepositoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface SharingNodeRepositoryEId extends IEntityIdProperties {
    sharingNode: SharingNodeEId;
    repository: RepositoryEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface SharingNodeRepositoryEOptionalId {
    sharingNode?: SharingNodeEOptionalId;
    repository?: RepositoryEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface SharingNodeRepositoryEUpdateProperties extends IEntityUpdateProperties {
    agtRepositoryId?: number | IQNumberField;
    advisedSyncPriority?: number | IQNumberField;
    repositorySyncStatus?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface SharingNodeRepositoryEUpdateColumns extends IEntityUpdateColumns {
    AGT_REPOSITORY_ID?: number | IQNumberField;
    ADVISED_SYNC_PRIORITY?: number | IQNumberField;
    REPOSITORY_SYNC_STATUS?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface SharingNodeRepositoryECreateProperties extends Partial<SharingNodeRepositoryEId>, SharingNodeRepositoryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface SharingNodeRepositoryECreateColumns extends SharingNodeRepositoryEId, SharingNodeRepositoryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QSharingNodeRepository extends QEntity {
    sharingNode: QSharingNodeQRelation;
    repository: QRepositoryQRelation;
    agtRepositoryId: IQNumberField;
    advisedSyncPriority: IQNumberField;
    repositorySyncStatus: IQNumberField;
}
export interface QSharingNodeRepositoryQId {
    sharingNode: QSharingNodeQId;
    repository: QRepositoryQId;
}
export interface QSharingNodeRepositoryQRelation extends QRelation<QSharingNodeRepository>, QSharingNodeRepositoryQId {
}
