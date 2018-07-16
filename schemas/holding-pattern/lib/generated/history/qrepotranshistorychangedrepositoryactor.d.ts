import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { IRepositoryTransactionHistory, RepositoryTransactionHistoryEOptionalId, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistoryQRelation } from './qrepositorytransactionhistory';
import { IRepository, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation } from '../repository/qrepository';
import { IActor, ActorEOptionalId, ActorESelect, QActorQRelation } from '../infrastructure/qactor';
export interface IRepoTransHistoryChangedRepositoryActor {
    id?: number;
    referenceType?: number;
    repositoryTransactionHistory?: IRepositoryTransactionHistory;
    repository?: IRepository;
    actor?: IActor;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorESelect extends IEntitySelectProperties, RepoTransHistoryChangedRepositoryActorEOptionalId, RepoTransHistoryChangedRepositoryActorEUpdateProperties {
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
export interface RepoTransHistoryChangedRepositoryActorECreateProperties extends RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepoTransHistoryChangedRepositoryActorECreateColumns extends RepoTransHistoryChangedRepositoryActorEId, RepoTransHistoryChangedRepositoryActorEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepoTransHistoryChangedRepositoryActor extends QEntity {
    id: IQNumberField;
    referenceType: IQNumberField;
    repositoryTransactionHistory: QRepositoryTransactionHistoryQRelation;
    repository: QRepositoryQRelation;
    actor: QActorQRelation;
}
export interface QRepoTransHistoryChangedRepositoryActorQId {
    id: IQNumberField;
}
export interface QRepoTransHistoryChangedRepositoryActorQRelation extends QRelation<QRepoTransHistoryChangedRepositoryActor>, QRepoTransHistoryChangedRepositoryActorQId {
}
