import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQEntity, IQRelation } from '@airport/air-control';
import { RepositoryTransactionHistoryEId, RepositoryTransactionHistoryEOptionalId, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistoryQId, QRepositoryTransactionHistoryQRelation } from './qrepositorytransactionhistory';
import { SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation } from '@airport/traffic-pattern';
import { RecordHistoryECascadeGraph, RecordHistoryESelect, QRecordHistory } from './qrecordhistory';
/**
 * SELECT - All fields and relations (optional).
 */
export interface OperationHistoryESelect extends IEntitySelectProperties, OperationHistoryEOptionalId {
    orderNumber?: number | IQNumberField;
    changeType?: number | IQNumberField;
    systemWideOperationId?: number | IQNumberField;
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
    systemWideOperationId?: number | IQNumberField;
    entity?: SchemaEntityEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface OperationHistoryECascadeGraph extends IEntityCascadeGraph {
    recordHistory?: RecordHistoryECascadeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface OperationHistoryEUpdateColumns extends IEntityUpdateColumns {
    ORDER_NUMBER?: number | IQNumberField;
    CHANGE_TYPE?: number | IQNumberField;
    SYSTEM_WIDE_OPERATION_ID?: number | IQNumberField;
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
    systemWideOperationId: IQNumberField;
    entity: QSchemaEntityQRelation;
    recordHistory: IQOneToManyRelation<QRecordHistory>;
}
export interface QOperationHistoryQId {
    id: IQNumberField;
    repositoryTransactionHistory: QRepositoryTransactionHistoryQId;
}
export interface QOperationHistoryQRelation extends IQRelation<QOperationHistory>, QOperationHistoryQId {
}
//# sourceMappingURL=qoperationhistory.d.ts.map