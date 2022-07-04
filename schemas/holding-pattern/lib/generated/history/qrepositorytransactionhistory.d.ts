import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { RepositoryGraph, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation } from '../repository/qrepository';
import { TransactionHistoryGraph, TransactionHistoryEOptionalId, TransactionHistoryESelect, QTransactionHistoryQRelation } from './qtransactionhistory';
import { OperationHistoryGraph, OperationHistoryESelect, QOperationHistory } from './qoperationhistory';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTransactionHistoryESelect extends IEntitySelectProperties, RepositoryTransactionHistoryEOptionalId {
    repositoryTransactionType?: string | IQStringField;
    saveTimestamp?: number | IQNumberField;
    syncTimestamp?: number | IQNumberField;
    GUID?: string | IQStringField;
    isRepositoryCreation?: boolean | IQBooleanField;
    repository?: RepositoryESelect;
    transactionHistory?: TransactionHistoryESelect;
    operationHistory?: OperationHistoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryTransactionHistoryEId extends IEntityIdProperties {
    _localId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryTransactionHistoryEOptionalId {
    _localId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryTransactionHistoryEUpdateProperties extends IEntityUpdateProperties {
    repositoryTransactionType?: string | IQStringField;
    saveTimestamp?: number | IQNumberField;
    syncTimestamp?: number | IQNumberField;
    GUID?: string | IQStringField;
    isRepositoryCreation?: boolean | IQBooleanField;
    repository?: RepositoryEOptionalId;
    transactionHistory?: TransactionHistoryEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryTransactionHistoryGraph extends RepositoryTransactionHistoryEOptionalId, IEntityCascadeGraph {
    repositoryTransactionType?: string | IQStringField;
    saveTimestamp?: number | IQNumberField;
    syncTimestamp?: number | IQNumberField;
    GUID?: string | IQStringField;
    isRepositoryCreation?: boolean | IQBooleanField;
    repository?: RepositoryGraph;
    transactionHistory?: TransactionHistoryGraph;
    operationHistory?: OperationHistoryGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTransactionHistoryEUpdateColumns extends IEntityUpdateColumns {
    REPOSITORY_TRANSACTION_TYPE?: string | IQStringField;
    SAVE_TIMESTAMP?: number | IQNumberField;
    SYNC_TIMESTAMP?: number | IQNumberField;
    GUID?: string | IQStringField;
    IS_REPOSITORY_CREATION?: boolean | IQBooleanField;
    REPOSITORY_LID?: number | IQNumberField;
    TRANSACTION_HISTORY_LID?: number | IQNumberField;
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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRepositoryTransactionHistory extends IQEntity {
    _localId: IQNumberField;
    repositoryTransactionType: IQStringField;
    saveTimestamp: IQNumberField;
    syncTimestamp: IQNumberField;
    GUID: IQStringField;
    isRepositoryCreation: IQBooleanField;
    repository: QRepositoryQRelation;
    transactionHistory: QTransactionHistoryQRelation;
    operationHistory: IQOneToManyRelation<QOperationHistory>;
}
export interface QRepositoryTransactionHistoryQId {
    _localId: IQNumberField;
}
export interface QRepositoryTransactionHistoryQRelation extends IQRelation<QRepositoryTransactionHistory>, QRepositoryTransactionHistoryQId {
}
//# sourceMappingURL=qrepositorytransactionhistory.d.ts.map