import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, QEntity, QRelation } from '@airport/air-control';
import { IRepositoryTransactionHistory, RepositoryTransactionHistoryEId, RepositoryTransactionHistoryEOptionalId, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistoryQId, QRepositoryTransactionHistoryQRelation } from './qrepositorytransactionhistory';
import { ISchemaVersion, SchemaVersionEOptionalId, SchemaVersionESelect, QSchemaVersionQRelation, ISchemaEntity, SchemaEntityEOptionalId, SchemaEntityESelect, QSchemaEntityQRelation } from '@airport/traffic-pattern';
import { IRecordHistory, RecordHistoryESelect, QRecordHistory } from './qrecordhistory';
export interface IOperationHistory {
    id?: number;
    repositoryTransactionHistory?: IRepositoryTransactionHistory;
    orderNumber?: number;
    changeType?: number;
    schemaVersion?: ISchemaVersion;
    entity?: ISchemaEntity;
    recordHistory?: IRecordHistory[];
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface OperationHistoryESelect extends IEntitySelectProperties, OperationHistoryEOptionalId, OperationHistoryEUpdateProperties {
    repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
    schemaVersion?: SchemaVersionESelect;
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
    schemaVersion?: SchemaVersionEOptionalId;
    entity?: SchemaEntityEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface OperationHistoryEUpdateColumns extends IEntityUpdateColumns {
    ORDER_NUMBER?: number | IQNumberField;
    CHANGE_TYPE?: number | IQNumberField;
    SCHEMA_VERSION_ID?: number | IQNumberField;
    ENTITY_INDEX?: number | IQNumberField;
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
export interface QOperationHistory extends QEntity {
    id: IQNumberField;
    repositoryTransactionHistory: QRepositoryTransactionHistoryQRelation;
    orderNumber: IQNumberField;
    changeType: IQNumberField;
    schemaVersion: QSchemaVersionQRelation;
    entity: QSchemaEntityQRelation;
    recordHistory: IQOneToManyRelation<QRecordHistory>;
}
export interface QOperationHistoryQId {
    id: IQNumberField;
    repositoryTransactionHistory: QRepositoryTransactionHistoryQId;
}
export interface QOperationHistoryQRelation extends QRelation<QOperationHistory>, QOperationHistoryQId {
}
