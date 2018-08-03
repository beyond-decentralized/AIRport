import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
export interface IRepositoryTransactionHistoryUpdateStage {
    repositoryTransactionHistoryId?: number;
    blockId?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTransactionHistoryUpdateStageESelect extends IEntitySelectProperties, RepositoryTransactionHistoryUpdateStageEOptionalId, RepositoryTransactionHistoryUpdateStageEUpdateProperties {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryTransactionHistoryUpdateStageEId extends IEntityIdProperties {
    repositoryTransactionHistoryId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryTransactionHistoryUpdateStageEOptionalId {
    repositoryTransactionHistoryId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryTransactionHistoryUpdateStageEUpdateProperties extends IEntityUpdateProperties {
    blockId?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTransactionHistoryUpdateStageEUpdateColumns extends IEntityUpdateColumns {
    BLOCK_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryTransactionHistoryUpdateStageECreateProperties extends Partial<RepositoryTransactionHistoryUpdateStageEId>, RepositoryTransactionHistoryUpdateStageEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryTransactionHistoryUpdateStageECreateColumns extends RepositoryTransactionHistoryUpdateStageEId, RepositoryTransactionHistoryUpdateStageEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryTransactionHistoryUpdateStage extends QEntity {
    repositoryTransactionHistoryId: IQNumberField;
    blockId: IQNumberField;
}
export interface QRepositoryTransactionHistoryUpdateStageQId {
    repositoryTransactionHistoryId: IQNumberField;
}
export interface QRepositoryTransactionHistoryUpdateStageQRelation extends QRelation<QRepositoryTransactionHistoryUpdateStage>, QRepositoryTransactionHistoryUpdateStageQId {
}
