import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQDateField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { ActorGraph, ActorEOptionalId, ActorESelect, QActorQRelation } from '../infrastructure/qactor';
import { RepositoryActorGraph, RepositoryActorESelect, QRepositoryActor } from './qrepositoryactor';
import { RepositoryActor } from '../../ddl/repository/RepositoryActor';
import { RepositoryTransactionHistoryGraph, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistory } from '../history/qrepositorytransactionhistory';
import { RepositoryTransactionHistory } from '../../ddl/history/RepositoryTransactionHistory';
import { Repository } from '../../ddl/repository/Repository';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryESelect extends IEntitySelectProperties, RepositoryEOptionalId {
    createdAt?: Date | IQDateField;
    uuId?: string | IQStringField;
    name?: string | IQStringField;
    url?: string | IQStringField;
    syncPriority?: string | IQStringField;
    ownerActor?: ActorESelect;
    repositoryActors?: RepositoryActorESelect;
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
    createdAt?: Date | IQDateField;
    uuId?: string | IQStringField;
    name?: string | IQStringField;
    url?: string | IQStringField;
    syncPriority?: string | IQStringField;
    ownerActor?: ActorEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryGraph extends RepositoryEOptionalId, IEntityCascadeGraph {
    createdAt?: Date | IQDateField;
    uuId?: string | IQStringField;
    name?: string | IQStringField;
    url?: string | IQStringField;
    syncPriority?: string | IQStringField;
    ownerActor?: ActorGraph;
    repositoryActors?: RepositoryActorGraph[];
    repositoryTransactionHistory?: RepositoryTransactionHistoryGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEUpdateColumns extends IEntityUpdateColumns {
    CREATED_AT?: Date | IQDateField;
    UU_ID?: string | IQStringField;
    NAME?: string | IQStringField;
    REPOSITORY_URL?: string | IQStringField;
    SYNC_PRIORITY?: string | IQStringField;
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
export interface QRepository extends IQEntity<Repository> {
    id: IQNumberField;
    createdAt: IQDateField;
    uuId: IQStringField;
    name: IQStringField;
    url: IQStringField;
    syncPriority: IQStringField;
    ownerActor: QActorQRelation;
    repositoryActors: IQOneToManyRelation<RepositoryActor, QRepositoryActor>;
    repositoryTransactionHistory: IQOneToManyRelation<RepositoryTransactionHistory, QRepositoryTransactionHistory>;
}
export interface QRepositoryQId {
    id: IQNumberField;
}
export interface QRepositoryQRelation extends IQRelation<Repository, QRepository>, QRepositoryQId {
}
//# sourceMappingURL=qrepository.d.ts.map