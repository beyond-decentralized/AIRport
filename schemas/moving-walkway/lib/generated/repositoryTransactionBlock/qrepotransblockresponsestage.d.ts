import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
export interface IRepoTransBlockResponseStage {
    id: number;
    syncOutcomeType?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepoTransBlockResponseStageESelect extends IEntitySelectProperties, RepoTransBlockResponseStageEOptionalId {
    syncOutcomeType?: number | IQNumberField;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepoTransBlockResponseStageEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepoTransBlockResponseStageEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepoTransBlockResponseStageEUpdateProperties extends IEntityUpdateProperties {
    syncOutcomeType?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepoTransBlockResponseStageEUpdateColumns extends IEntityUpdateColumns {
    SYNC_OUTCOME_TYPE?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepoTransBlockResponseStageECreateProperties extends Partial<RepoTransBlockResponseStageEId>, RepoTransBlockResponseStageEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepoTransBlockResponseStageECreateColumns extends RepoTransBlockResponseStageEId, RepoTransBlockResponseStageEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepoTransBlockResponseStage extends IQEntity {
    id: IQNumberField;
    syncOutcomeType: IQNumberField;
}
export interface QRepoTransBlockResponseStageQId {
    id: IQNumberField;
}
export interface QRepoTransBlockResponseStageQRelation extends IQRelation<QRepoTransBlockResponseStage>, QRepoTransBlockResponseStageQId {
}
