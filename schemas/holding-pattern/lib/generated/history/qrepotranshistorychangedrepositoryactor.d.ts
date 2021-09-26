import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { RepositoryTransactionHistoryGraph, RepositoryTransactionHistoryEOptionalId, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistoryQRelation } from './qrepositorytransactionhistory';
import { RepositoryGraph, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation } from '../repository/qrepository';
import { ActorGraph, ActorEOptionalId, ActorESelect, QActorQRelation } from '../infrastructure/qactor';
import { RepoTransHistoryChangedRepositoryActor } from '../../ddl/history/RepoTransHistoryChangedRepositoryActor';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorESelect extends IEntitySelectProperties, RepoTransHistoryChangedRepositoryActorEOptionalId {
    referenceType?: string | IQStringField;
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
    referenceType?: string | IQStringField;
    repositoryTransactionHistory?: RepositoryTransactionHistoryEOptionalId;
    repository?: RepositoryEOptionalId;
    actor?: ActorEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorGraph extends RepoTransHistoryChangedRepositoryActorEOptionalId, IEntityCascadeGraph {
    referenceType?: string | IQStringField;
    repositoryTransactionHistory?: RepositoryTransactionHistoryGraph;
    repository?: RepositoryGraph;
    actor?: ActorGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorEUpdateColumns extends IEntityUpdateColumns {
    REFERENCE_TYPE?: string | IQStringField;
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
export interface QRepoTransHistoryChangedRepositoryActor extends IQEntity<RepoTransHistoryChangedRepositoryActor> {
    id: IQNumberField;
    referenceType: IQStringField;
    repositoryTransactionHistory: QRepositoryTransactionHistoryQRelation;
    repository: QRepositoryQRelation;
    actor: QActorQRelation;
}
export interface QRepoTransHistoryChangedRepositoryActorQId {
    id: IQNumberField;
}
export interface QRepoTransHistoryChangedRepositoryActorQRelation extends IQRelation<RepoTransHistoryChangedRepositoryActor, QRepoTransHistoryChangedRepositoryActor>, QRepoTransHistoryChangedRepositoryActorQId {
}
//# sourceMappingURL=qrepotranshistorychangedrepositoryactor.d.ts.map