import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { MissingRecordEOptionalId, MissingRecordESelect, QMissingRecordQRelation } from './qmissingrecord';
import { RepositoryTransactionBlockEOptionalId, RepositoryTransactionBlockESelect, QRepositoryTransactionBlockQRelation } from '../repositoryTransactionBlock/qrepositorytransactionblock';
/**
 * SELECT - All fields and relations (optional).
 */
export interface MissingRecordRepoTransBlockESelect extends IEntitySelectProperties, MissingRecordRepoTransBlockEOptionalId {
    missingRecord?: MissingRecordESelect;
    repositoryTransactionBlock?: RepositoryTransactionBlockESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MissingRecordRepoTransBlockEId extends IEntityIdProperties {
}
/**
 * Ids fields and relations only (optional).
 */
export interface MissingRecordRepoTransBlockEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MissingRecordRepoTransBlockEUpdateProperties extends IEntityUpdateProperties {
    missingRecord?: MissingRecordEOptionalId;
    repositoryTransactionBlock?: RepositoryTransactionBlockEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MissingRecordRepoTransBlockECascadeGraph extends IEntityCascadeGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface MissingRecordRepoTransBlockEUpdateColumns extends IEntityUpdateColumns {
    MISSING_RECORD_ID?: number | IQNumberField;
    REPOSITORY_TRANSACTION_BLOCK_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MissingRecordRepoTransBlockECreateProperties extends Partial<MissingRecordRepoTransBlockEId>, MissingRecordRepoTransBlockEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MissingRecordRepoTransBlockECreateColumns extends MissingRecordRepoTransBlockEId, MissingRecordRepoTransBlockEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMissingRecordRepoTransBlock extends IQEntity {
    missingRecord: QMissingRecordQRelation;
    repositoryTransactionBlock: QRepositoryTransactionBlockQRelation;
}
export interface QMissingRecordRepoTransBlockQId {
}
export interface QMissingRecordRepoTransBlockQRelation extends IQRelation<QMissingRecordRepoTransBlock>, QMissingRecordRepoTransBlockQId {
}
