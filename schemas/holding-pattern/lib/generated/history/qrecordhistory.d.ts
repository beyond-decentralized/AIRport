import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQEntity, IQRelation } from '@airport/air-control';
import { ActorEOptionalId, ActorESelect, QActorQRelation } from '../infrastructure/qactor';
import { OperationHistoryEOptionalId, OperationHistoryESelect, QOperationHistoryQRelation } from './qoperationhistory';
import { RecordHistoryNewValueECascadeGraph, RecordHistoryNewValueESelect, QRecordHistoryNewValue } from './qrecordhistorynewvalue';
import { RecordHistoryOldValueECascadeGraph, RecordHistoryOldValueESelect, QRecordHistoryOldValue } from './qrecordhistoryoldvalue';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RecordHistoryESelect extends IEntitySelectProperties, RecordHistoryEOptionalId {
    actorRecordId?: number | IQNumberField;
    actor?: ActorESelect;
    operationHistory?: OperationHistoryESelect;
    newValues?: RecordHistoryNewValueESelect;
    oldValues?: RecordHistoryOldValueESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RecordHistoryEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RecordHistoryEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordHistoryEUpdateProperties extends IEntityUpdateProperties {
    actorRecordId?: number | IQNumberField;
    actor?: ActorEOptionalId;
    operationHistory?: OperationHistoryEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RecordHistoryECascadeGraph extends IEntityCascadeGraph {
    newValues?: RecordHistoryNewValueECascadeGraph;
    oldValues?: RecordHistoryOldValueECascadeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RecordHistoryEUpdateColumns extends IEntityUpdateColumns {
    ACTOR_RECORD_ID?: number | IQNumberField;
    ACTOR_ID?: number | IQNumberField;
    REPOSITORY_OPERATION_HISTORY_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RecordHistoryECreateProperties extends Partial<RecordHistoryEId>, RecordHistoryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RecordHistoryECreateColumns extends RecordHistoryEId, RecordHistoryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRecordHistory extends IQEntity {
    id: IQNumberField;
    actorRecordId: IQNumberField;
    actor: QActorQRelation;
    operationHistory: QOperationHistoryQRelation;
    newValues: IQOneToManyRelation<QRecordHistoryNewValue>;
    oldValues: IQOneToManyRelation<QRecordHistoryOldValue>;
}
export interface QRecordHistoryQId {
    id: IQNumberField;
}
export interface QRecordHistoryQRelation extends IQRelation<QRecordHistory>, QRecordHistoryQId {
}
//# sourceMappingURL=qrecordhistory.d.ts.map