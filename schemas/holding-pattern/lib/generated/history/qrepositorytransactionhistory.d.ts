import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { RepositoryGraph, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation } from '../repository/qrepository';
import { ActorGraph, ActorEOptionalId, ActorESelect, QActorQRelation } from '../infrastructure/qactor';
import { TransactionHistoryGraph, TransactionHistoryEOptionalId, TransactionHistoryESelect, QTransactionHistoryQRelation } from './qtransactionhistory';
import { OperationHistoryGraph, OperationHistoryESelect, QOperationHistory } from './qoperationhistory';
import { OperationHistory } from '../../ddl/history/OperationHistory';
import { RepositoryTransactionHistory } from '../../ddl/history/RepositoryTransactionHistory';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTransactionHistoryESelect extends IEntitySelectProperties, RepositoryTransactionHistoryEOptionalId {
    saveTimestamp?: number | IQNumberField;
    repositoryTransactionType?: string | IQStringField;
    synced?: boolean | IQBooleanField;
    repository?: RepositoryESelect;
    actor?: ActorESelect;
    transactionHistory?: TransactionHistoryESelect;
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
    saveTimestamp?: number | IQNumberField;
    repositoryTransactionType?: string | IQStringField;
    synced?: boolean | IQBooleanField;
    repository?: RepositoryEOptionalId;
    actor?: ActorEOptionalId;
    transactionHistory?: TransactionHistoryEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryTransactionHistoryGraph extends RepositoryTransactionHistoryEOptionalId, IEntityCascadeGraph {
    saveTimestamp?: number | IQNumberField;
    repositoryTransactionType?: string | IQStringField;
    synced?: boolean | IQBooleanField;
    repository?: RepositoryGraph;
    actor?: ActorGraph;
    transactionHistory?: TransactionHistoryGraph;
    operationHistory?: OperationHistoryGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTransactionHistoryEUpdateColumns extends IEntityUpdateColumns {
    SAVE_TIMESTAMP?: number | IQNumberField;
    REPOSITORY_TRANSACTION_TYPE?: string | IQStringField;
    SYNCED?: boolean | IQBooleanField;
    REPOSITORY_ID?: number | IQNumberField;
    ACTOR_ID?: number | IQNumberField;
    TRANSACTION_HISTORY_ID?: number | IQNumberField;
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
export interface QRepositoryTransactionHistory extends IQEntity<RepositoryTransactionHistory> {
    id: IQNumberField;
    saveTimestamp: IQNumberField;
    repositoryTransactionType: IQStringField;
    synced: IQBooleanField;
    repository: QRepositoryQRelation;
    actor: QActorQRelation;
    transactionHistory: QTransactionHistoryQRelation;
    operationHistory: IQOneToManyRelation<OperationHistory, QOperationHistory>;
}
export interface QRepositoryTransactionHistoryQId {
    id: IQNumberField;
}
export interface QRepositoryTransactionHistoryQRelation extends IQRelation<RepositoryTransactionHistory, QRepositoryTransactionHistory>, QRepositoryTransactionHistoryQId {
}
//# sourceMappingURL=qrepositorytransactionhistory.d.ts.map