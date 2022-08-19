import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { ActorGraph, ActorEOptionalId, ActorESelect, QActorQRelation } from '../infrastructure/qactor';
import { OperationHistoryGraph, OperationHistoryEOptionalId, OperationHistoryESelect, QOperationHistoryQRelation } from './qoperationhistory';
import { RecordHistoryNewValueGraph, RecordHistoryNewValueESelect, QRecordHistoryNewValue } from './qrecordhistorynewvalue';
import { RecordHistoryOldValueGraph, RecordHistoryOldValueESelect, QRecordHistoryOldValue } from './qrecordhistoryoldvalue';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RecordHistoryESelect extends IEntitySelectProperties, RecordHistoryEOptionalId {
    _actorRecordId?: number | IQNumberField;
    actor?: ActorESelect;
    operationHistory?: OperationHistoryESelect;
    newValues?: RecordHistoryNewValueESelect;
    oldValues?: RecordHistoryOldValueESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RecordHistoryEId extends IEntityIdProperties {
    _localId: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RecordHistoryEOptionalId {
    _localId?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RecordHistoryEUpdateProperties extends IEntityUpdateProperties {
    _actorRecordId?: number | IQNumberField;
    actor?: ActorEOptionalId;
    operationHistory?: OperationHistoryEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RecordHistoryGraph extends RecordHistoryEOptionalId, IEntityCascadeGraph {
    _actorRecordId?: number | IQNumberField;
    actor?: ActorGraph;
    operationHistory?: OperationHistoryGraph;
    newValues?: RecordHistoryNewValueGraph[];
    oldValues?: RecordHistoryOldValueGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RecordHistoryEUpdateColumns extends IEntityUpdateColumns {
    ACTOR_RECORD_ID?: number | IQNumberField;
    ACTOR_LID?: number | IQNumberField;
    OPERATION_HISTORY_LID?: number | IQNumberField;
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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRecordHistory<IQE extends QRecordHistory = any> extends IQEntity<IQE | QRecordHistory> {
    _localId: IQNumberField;
    _actorRecordId: IQNumberField;
    actor: QActorQRelation;
    operationHistory: QOperationHistoryQRelation;
    newValues: IQOneToManyRelation<QRecordHistoryNewValue>;
    oldValues: IQOneToManyRelation<QRecordHistoryOldValue>;
}
export interface QRecordHistoryQId {
    _localId: IQNumberField;
}
export interface QRecordHistoryQRelation extends IQRelation<QRecordHistory>, QRecordHistoryQId {
}
//# sourceMappingURL=qrecordhistory.d.ts.map