import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { RepositoryTransactionHistoryGraph, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryEOptionalId, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistoryQId, QRepositoryTransactionHistoryQRelation } from './qrepositorytransactionhistory';
import { SchemaEntityGraph, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation } from '@airport/traffic-pattern';
import { RecordHistoryGraph, RecordHistoryESelect, QRecordHistory } from './qrecordhistory';
import { RecordHistory } from '../../ddl/history/RecordHistory';
import { OperationHistory } from '../../ddl/history/OperationHistory';
/**
 * SELECT - All fields and relations (optional).
 */
export interface OperationHistoryESelect extends IEntitySelectProperties, OperationHistoryEOptionalId {
    orderNumber?: number | IQNumberField;
    changeType?: string | IQStringField;
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
    changeType?: string | IQStringField;
    systemWideOperationId?: number | IQNumberField;
    entity?: SchemaEntityEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface OperationHistoryGraph extends OperationHistoryEOptionalId, IEntityCascadeGraph {
    orderNumber?: number | IQNumberField;
    changeType?: string | IQStringField;
    systemWideOperationId?: number | IQNumberField;
    repositoryTransactionHistory?: RepositoryTransactionHistoryGraph;
    entity?: SchemaEntityGraph;
    recordHistory?: RecordHistoryGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface OperationHistoryEUpdateColumns extends IEntityUpdateColumns {
    ORDER_NUMBER?: number | IQNumberField;
    CHANGE_TYPE?: string | IQStringField;
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
export interface QOperationHistory extends IQEntity<OperationHistory> {
    id: IQNumberField;
    repositoryTransactionHistory: QRepositoryTransactionHistoryQRelation;
    orderNumber: IQNumberField;
    changeType: IQStringField;
    systemWideOperationId: IQNumberField;
    entity: QSchemaEntityQRelation;
    recordHistory: IQOneToManyRelation<RecordHistory, QRecordHistory>;
}
export interface QOperationHistoryQId {
    id: IQNumberField;
    repositoryTransactionHistory: QRepositoryTransactionHistoryQId;
}
export interface QOperationHistoryQRelation extends IQRelation<OperationHistory, QOperationHistory>, QOperationHistoryQId {
}
//# sourceMappingURL=qoperationhistory.d.ts.map