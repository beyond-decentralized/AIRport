import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { IActor, ActorEOptionalId, ActorESelect, QActorQRelation } from '../infrastructure/qactor';
import { IRepositoryActor, RepositoryActorECascadeGraph, RepositoryActorESelect, QRepositoryActor } from './qrepositoryactor';
import { IRepositoryApplication, RepositoryApplicationECascadeGraph, RepositoryApplicationESelect, QRepositoryApplication } from './qrepositoryapplication';
import { IRepositoryTransactionHistory, RepositoryTransactionHistoryECascadeGraph, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistory } from '../history/qrepositorytransactionhistory';
export interface IRepository {
    id: number;
    orderedId?: number;
    randomId?: number;
    name?: string;
    url?: string;
    platformConfig?: string;
    syncPriority?: number;
    ownerActor?: IActor;
    repositoryActors?: IRepositoryActor[];
    repositoryApplications?: IRepositoryApplication[];
    repositoryTransactionHistory?: IRepositoryTransactionHistory[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryESelect extends IEntitySelectProperties, RepositoryEOptionalId {
    orderedId?: number | IQNumberField;
    randomId?: number | IQNumberField;
    name?: string | IQStringField;
    url?: string | IQStringField;
    platformConfig?: string | IQStringField;
    syncPriority?: number | IQNumberField;
    ownerActor?: ActorESelect;
    repositoryActors?: RepositoryActorESelect;
    repositoryApplications?: RepositoryApplicationESelect;
    repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryEUpdateProperties extends IEntityUpdateProperties {
    orderedId?: number | IQNumberField;
    randomId?: number | IQNumberField;
    name?: string | IQStringField;
    url?: string | IQStringField;
    platformConfig?: string | IQStringField;
    syncPriority?: number | IQNumberField;
    ownerActor?: ActorEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryECascadeGraph extends IEntityCascadeGraph {
    repositoryActors?: RepositoryActorECascadeGraph;
    repositoryApplications?: RepositoryApplicationECascadeGraph;
    repositoryTransactionHistory?: RepositoryTransactionHistoryECascadeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEUpdateColumns extends IEntityUpdateColumns {
    ORDERED_ID?: number | IQNumberField;
    RANDOM_ID?: number | IQNumberField;
    NAME?: string | IQStringField;
    REPOSITORY_URL?: string | IQStringField;
    PLATFORM_CONFIG?: string | IQStringField;
    SYNC_PRIORITY?: number | IQNumberField;
    OWNER_ACTOR_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryECreateProperties extends Partial<RepositoryEId>, RepositoryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryECreateColumns extends RepositoryEId, RepositoryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepository extends IQEntity {
    id: IQNumberField;
    orderedId: IQNumberField;
    randomId: IQNumberField;
    name: IQStringField;
    url: IQStringField;
    platformConfig: IQStringField;
    syncPriority: IQNumberField;
    ownerActor: QActorQRelation;
    repositoryActors: IQOneToManyRelation<QRepositoryActor>;
    repositoryApplications: IQOneToManyRelation<QRepositoryApplication>;
    repositoryTransactionHistory: IQOneToManyRelation<QRepositoryTransactionHistory>;
}
export interface QRepositoryQId {
    id: IQNumberField;
}
export interface QRepositoryQRelation extends IQRelation<QRepository>, QRepositoryQId {
}
