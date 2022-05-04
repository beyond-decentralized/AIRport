import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { RepositoryTransactionHistoryGraph, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistory } from './qrepositorytransactionhistory';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TransactionHistoryESelect extends IEntitySelectProperties, TransactionHistoryEOptionalId {
    transactionType?: string | IQStringField;
    repositoryTransactionHistories?: RepositoryTransactionHistoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface TransactionHistoryEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface TransactionHistoryEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface TransactionHistoryEUpdateProperties extends IEntityUpdateProperties {
    transactionType?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TransactionHistoryGraph extends TransactionHistoryEOptionalId, IEntityCascadeGraph {
    transactionType?: string | IQStringField;
    repositoryTransactionHistories?: RepositoryTransactionHistoryGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TransactionHistoryEUpdateColumns extends IEntityUpdateColumns {
    TRANSACTION_TYPE?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface TransactionHistoryECreateProperties extends Partial<TransactionHistoryEId>, TransactionHistoryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface TransactionHistoryECreateColumns extends TransactionHistoryEId, TransactionHistoryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QTransactionHistory extends IQEntity {
    id: IQNumberField;
    transactionType: IQStringField;
    repositoryTransactionHistories: IQOneToManyRelation<QRepositoryTransactionHistory>;
}
export interface QTransactionHistoryQId {
    id: IQNumberField;
}
export interface QTransactionHistoryQRelation extends IQRelation<QTransactionHistory>, QTransactionHistoryQId {
}
//# sourceMappingURL=qtransactionhistory.d.ts.map