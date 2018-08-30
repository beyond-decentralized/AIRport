import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQOneToManyRelation, QEntity, QRelation } from '@airport/air-control';
import { SyncColumnMap } from '@airport/ground-control';
import { IActor, ActorEOptionalId, ActorESelect, QActorQRelation } from '../infrastructure/qactor';
import { IOperationHistory, OperationHistoryEOptionalId, OperationHistoryESelect, QOperationHistoryQRelation } from './qoperationhistory';
import { IRecordHistoryNewValue, RecordHistoryNewValueESelect, QRecordHistoryNewValue } from './qrecordhistorynewvalue';
import { IRecordHistoryOldValue, RecordHistoryOldValueESelect, QRecordHistoryOldValue } from './qrecordhistoryoldvalue';
export interface IRecordHistory {
    id?: number;
    actorRecordId?: number;
    actor?: IActor;
    operationHistory?: IOperationHistory;
    newValues?: IRecordHistoryNewValue[];
    oldValues?: IRecordHistoryOldValue[];
    tableColumnMap?: SyncColumnMap;
}
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
export interface QRecordHistory extends QEntity {
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
export interface QRecordHistoryQRelation extends QRelation<QRecordHistory>, QRecordHistoryQId {
}
