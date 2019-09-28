import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { RepositoryTransactionHistoryEOptionalId, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistoryQRelation } from './qrepositorytransactionhistory';
import { RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation } from '../repository/qrepository';
import { ActorEOptionalId, ActorESelect, QActorQRelation } from '../infrastructure/qactor';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorESelect extends IEntitySelectProperties, RepoTransHistoryChangedRepositoryActorEOptionalId {
    referenceType?: number | IQNumberField;
    repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
    repository?: RepositoryESelect;
    actor?: ActorESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepoTransHistoryChangedRepositoryActorEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorEUpdateProperties extends IEntityUpdateProperties {
    referenceType?: number | IQNumberField;
    repositoryTransactionHistory?: RepositoryTransactionHistoryEOptionalId;
    repository?: RepositoryEOptionalId;
    actor?: ActorEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorECascadeGraph extends IEntityCascadeGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorEUpdateColumns extends IEntityUpdateColumns {
    REFERENCE_TYPE?: number | IQNumberField;
    REPOSITORY_TRANSACTION_HISTORY_ID?: number | IQNumberField;
    REPOSITORY_ID?: number | IQNumberField;
    ACTOR_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorECreateProperties extends Partial<RepoTransHistoryChangedRepositoryActorEId>, RepoTransHistoryChangedRepositoryActorEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorECreateColumns extends RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepoTransHistoryChangedRepositoryActor extends IQEntity {
    id: IQNumberField;
    referenceType: IQNumberField;
    repositoryTransactionHistory: QRepositoryTransactionHistoryQRelation;
    repository: QRepositoryQRelation;
    actor: QActorQRelation;
}
export interface QRepoTransHistoryChangedRepositoryActorQId {
    id: IQNumberField;
}
export interface QRepoTransHistoryChangedRepositoryActorQRelation extends IQRelation<QRepoTransHistoryChangedRepositoryActor>, QRepoTransHistoryChangedRepositoryActorQId {
}
