import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { ApplicationEntityGraph, ApplicationEntityEOptionalId, ApplicationEntityESelect, QApplicationEntityQRelation } from '@airport/airspace';
import { ActorGraph, ActorEOptionalId, ActorESelect, QActorQRelation } from '../infrastructure/qactor';
import { RepositoryTransactionHistoryGraph, RepositoryTransactionHistoryEOptionalId, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistoryQRelation } from './qrepositorytransactionhistory';
import { RecordHistoryGraph, RecordHistoryESelect, QRecordHistory } from './qrecordhistory';
/**
 * SELECT - All fields and relations (optional).
 */
export interface OperationHistoryESelect extends IEntitySelectProperties, OperationHistoryEOptionalId {
    orderNumber?: number | IQNumberField;
    changeType?: string | IQStringField;
    systemWideOperationId?: number | IQNumberField;
    entity?: ApplicationEntityESelect;
    actor?: ActorESelect;
    repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
    recordHistory?: RecordHistoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface OperationHistoryEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface OperationHistoryEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface OperationHistoryEUpdateProperties extends IEntityUpdateProperties {
    orderNumber?: number | IQNumberField;
    changeType?: string | IQStringField;
    systemWideOperationId?: number | IQNumberField;
    entity?: ApplicationEntityEOptionalId;
    actor?: ActorEOptionalId;
    repositoryTransactionHistory?: RepositoryTransactionHistoryEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface OperationHistoryGraph extends OperationHistoryEOptionalId, IEntityCascadeGraph {
    orderNumber?: number | IQNumberField;
    changeType?: string | IQStringField;
    systemWideOperationId?: number | IQNumberField;
    entity?: ApplicationEntityGraph;
    actor?: ActorGraph;
    repositoryTransactionHistory?: RepositoryTransactionHistoryGraph;
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
    ACTOR_ID?: number | IQNumberField;
    REPOSITORY_TRANSACTION_HISTORY_ID?: number | IQNumberField;
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
    orderNumber: IQNumberField;
    changeType: IQStringField;
    systemWideOperationId: IQNumberField;
    entity: QApplicationEntityQRelation;
    actor: QActorQRelation;
    repositoryTransactionHistory: QRepositoryTransactionHistoryQRelation;
    recordHistory: IQOneToManyRelation<QRecordHistory>;
}
export interface QOperationHistoryQId {
    id: IQNumberField;
}
export interface QOperationHistoryQRelation extends IQRelation<QOperationHistory>, QOperationHistoryQId {
}
//# sourceMappingURL=qoperationhistory.d.ts.map