import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQEntity, IQRelation } from '@airport/air-control';
import { IRepositoryTransactionHistory, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryEOptionalId, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistoryQId, QRepositoryTransactionHistoryQRelation } from './qrepositorytransactionhistory';
import { ISchemaEntity, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation } from '@airport/traffic-pattern';
import { IRecordHistory, RecordHistoryESelect, QRecordHistory } from './qrecordhistory';
export interface IOperationHistory {
    id?: number;
    repositoryTransactionHistory?: IRepositoryTransactionHistory;
    orderNumber?: number;
    changeType?: number;
    entity?: ISchemaEntity;
    recordHistory?: IRecordHistory[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface OperationHistoryESelect extends IEntitySelectProperties, OperationHistoryEOptionalId {
    orderNumber?: number | IQNumberField;
    changeType?: number | IQNumberField;
    repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
    entity?: SchemaEntityESelect;
    recordHistory?: RecordHistoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface OperationHistoryEId extends IEntityIdProperties {
    id: number | IQNumberField;
    repositoryTransactionHistory: RepositoryTransactionHistoryEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface OperationHistoryEOptionalId {
    id?: number | IQNumberField;
    repositoryTransactionHistory?: RepositoryTransactionHistoryEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface OperationHistoryEUpdateProperties extends IEntityUpdateProperties {
    orderNumber?: number | IQNumberField;
    changeType?: number | IQNumberField;
    entity?: SchemaEntityEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface OperationHistoryEUpdateColumns extends IEntityUpdateColumns {
    ORDER_NUMBER?: number | IQNumberField;
    CHANGE_TYPE?: number | IQNumberField;
    ENTITY_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface OperationHistoryECreateProperties extends Partial<OperationHistoryEId>, OperationHistoryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface OperationHistoryECreateColumns extends OperationHistoryEId, OperationHistoryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QOperationHistory extends IQEntity {
    id: IQNumberField;
    repositoryTransactionHistory: QRepositoryTransactionHistoryQRelation;
    orderNumber: IQNumberField;
    changeType: IQNumberField;
    entity: QSchemaEntityQRelation;
    recordHistory: IQOneToManyRelation<QRecordHistory>;
}
export interface QOperationHistoryQId {
    id: IQNumberField;
    repositoryTransactionHistory: QRepositoryTransactionHistoryQId;
}
export interface QOperationHistoryQRelation extends IQRelation<QOperationHistory>, QOperationHistoryQId {
}
