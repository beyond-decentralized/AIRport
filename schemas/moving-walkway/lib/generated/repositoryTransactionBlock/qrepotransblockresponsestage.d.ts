import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { RepoTransBlockResponseStage } from '../../ddl/repositoryTransactionBlock/RepoTransBlockResponseStage';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepoTransBlockResponseStageESelect extends IEntitySelectProperties, RepoTransBlockResponseStageEOptionalId {
    syncOutcomeType?: string | IQStringField;
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
    syncOutcomeType?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepoTransBlockResponseStageGraph extends RepoTransBlockResponseStageEOptionalId, IEntityCascadeGraph {
    syncOutcomeType?: string | IQStringField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepoTransBlockResponseStageEUpdateColumns extends IEntityUpdateColumns {
    SYNC_OUTCOME_TYPE?: string | IQStringField;
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
export interface QRepoTransBlockResponseStage extends IQEntity<RepoTransBlockResponseStage> {
    id: IQNumberField;
    syncOutcomeType: IQStringField;
}
export interface QRepoTransBlockResponseStageQId {
    id: IQNumberField;
}
export interface QRepoTransBlockResponseStageQRelation extends IQRelation<RepoTransBlockResponseStage, QRepoTransBlockResponseStage>, QRepoTransBlockResponseStageQId {
}
//# sourceMappingURL=qrepotransblockresponsestage.d.ts.map