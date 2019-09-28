import { SyncColumnMap } from '@airport/ground-control';
import { Actor, OperationHistory, RecordHistoryNewValue, RecordHistoryOldValue } from '../..';
/**
 * Entity Changes are always local-only, so a sequence for id will do.
 */
export declare type RecordHistoryId = number;
export declare type RecordHistoryActorRecordId = number;
export declare class RecordHistory {
    id: RecordHistoryId;
    actor: Actor;
    actorRecordId: RecordHistoryActorRecordId;
    operationHistory: OperationHistory;
    newValues: RecordHistoryNewValue[];
    oldValues: RecordHistoryOldValue[];
    tableColumnMap: SyncColumnMap;
}
