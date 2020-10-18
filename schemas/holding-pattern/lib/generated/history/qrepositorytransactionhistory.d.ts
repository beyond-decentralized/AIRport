import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQDateField, IQNumberField, IQOneToManyRelation, IQEntity, IQRelation } from '@airport/air-control';
import { TransactionHistoryGraph, TransactionHistoryEOptionalId, TransactionHistoryESelect, QTransactionHistoryQRelation } from './qtransactionhistory';
import { RepositoryGraph, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation } from '../repository/qrepository';
import { RepoTransHistoryChangedRepositoryActorGraph, RepoTransHistoryChangedRepositoryActorESelect, QRepoTransHistoryChangedRepositoryActor } from './qrepotranshistorychangedrepositoryactor';
import { ActorGraph, ActorEOptionalId, ActorESelect, QActorQRelation } from '../infrastructure/qactor';
import { OperationHistoryGraph, OperationHistoryESelect, QOperationHistory } from './qoperationhistory';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTransactionHistoryESelect extends IEntitySelectProperties, RepositoryTransactionHistoryEOptionalId {
    remoteId?: number | IQNumberField;
    saveTimestamp?: Date | IQDateField;
    repositoryTransactionType?: number | IQNumberField;
    blockId?: number | IQNumberField;
    transactionHistory?: TransactionHistoryESelect;
    repository?: RepositoryESelect;
    changedRepositoryActors?: RepoTransHistoryChangedRepositoryActorESelect;
    actor?: ActorESelect;
    operationHistory?: OperationHistoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryTransactionHistoryEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryTransactionHistoryEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryTransactionHistoryEUpdateProperties extends IEntityUpdateProperties {
    remoteId?: number | IQNumberField;
    saveTimestamp?: Date | IQDateField;
    repositoryTransactionType?: number | IQNumberField;
    blockId?: number | IQNumberField;
    transactionHistory?: TransactionHistoryEOptionalId;
    repository?: RepositoryEOptionalId;
    actor?: ActorEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryTransactionHistoryGraph extends RepositoryTransactionHistoryEOptionalId, IEntityCascadeGraph {
    remoteId?: number | IQNumberField;
    saveTimestamp?: Date | IQDateField;
    repositoryTransactionType?: number | IQNumberField;
    blockId?: number | IQNumberField;
    transactionHistory?: TransactionHistoryGraph;
    repository?: RepositoryGraph;
    changedRepositoryActors?: RepoTransHistoryChangedRepositoryActorGraph[];
    actor?: ActorGraph;
    operationHistory?: OperationHistoryGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTransactionHistoryEUpdateColumns extends IEntityUpdateColumns {
    REMOTE_ID?: number | IQNumberField;
    SAVE_TIMESTAMP?: Date | IQDateField;
    REPOSITORY_TRANSACTION_TYPE?: number | IQNumberField;
    REPOSITORY_TRANSACTION_HISTORY_BLOCK_ID?: number | IQNumberField;
    TRANSACTION_HISTORY_ID?: number | IQNumberField;
    REPOSITORY_ID?: number | IQNumberField;
    ACTOR_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryTransactionHistoryECreateProperties extends Partial<RepositoryTransactionHistoryEId>, RepositoryTransactionHistoryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryTransactionHistoryECreateColumns extends RepositoryTransactionHistoryEId, RepositoryTransactionHistoryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryTransactionHistory extends IQEntity {
    id: IQNumberField;
    remoteId: IQNumberField;
    saveTimestamp: IQDateField;
    repositoryTransactionType: IQNumberField;
    blockId: IQNumberField;
    transactionHistory: QTransactionHistoryQRelation;
    repository: QRepositoryQRelation;
    changedRepositoryActors: IQOneToManyRelation<QRepoTransHistoryChangedRepositoryActor>;
    actor: QActorQRelation;
    operationHistory: IQOneToManyRelation<QOperationHistory>;
}
export interface QRepositoryTransactionHistoryQId {
    id: IQNumberField;
}
export interface QRepositoryTransactionHistoryQRelation extends IQRelation<QRepositoryTransactionHistory>, QRepositoryTransactionHistoryQId {
}
//# sourceMappingURL=qrepositorytransactionhistory.d.ts.map