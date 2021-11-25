import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { TerminalGraph, TerminalEOptionalId, TerminalESelect, QTerminalQRelation } from '@airport/travel-document-checkpoint';
import { RepositoryTransactionHistoryGraph, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistory } from './qrepositorytransactionhistory';
import { RepositoryTransactionHistory } from '../../ddl/history/RepositoryTransactionHistory';
import { TransactionHistory } from '../../ddl/history/TransactionHistory';
/**
 * SELECT - All fields and relations (optional).
 */
export interface TransactionHistoryESelect extends IEntitySelectProperties, TransactionHistoryEOptionalId {
    transactionType?: string | IQStringField;
    terminal?: TerminalESelect;
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
    terminal?: TerminalEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface TransactionHistoryGraph extends TransactionHistoryEOptionalId, IEntityCascadeGraph {
    transactionType?: string | IQStringField;
    terminal?: TerminalGraph;
    repositoryTransactionHistories?: RepositoryTransactionHistoryGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface TransactionHistoryEUpdateColumns extends IEntityUpdateColumns {
    TRANSACTION_TYPE?: string | IQStringField;
    TERMINAL_ID?: number | IQNumberField;
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
export interface QTransactionHistory extends IQEntity<TransactionHistory> {
    id: IQNumberField;
    transactionType: IQStringField;
    terminal: QTerminalQRelation;
    repositoryTransactionHistories: IQOneToManyRelation<RepositoryTransactionHistory, QRepositoryTransactionHistory>;
}
export interface QTransactionHistoryQId {
    id: IQNumberField;
}
export interface QTransactionHistoryQRelation extends IQRelation<TransactionHistory, QTransactionHistory>, QTransactionHistoryQId {
}
//# sourceMappingURL=qtransactionhistory.d.ts.map