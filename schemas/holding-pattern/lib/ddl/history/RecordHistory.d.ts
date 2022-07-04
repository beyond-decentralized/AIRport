import { SyncColumnMap } from '@airport/ground-control';
import { Actor } from '../infrastructure/Actor';
import { OperationHistory } from './OperationHistory';
import { RecordHistoryNewValue } from './RecordHistoryNewValue';
import { RecordHistoryOldValue } from './RecordHistoryOldValue';
/**
 * Entity Changes are always local-only, so a sequence for id will do.
 */
export declare type RecordHistory_LocalId = number;
export declare type RecordHistory_ActorRecordId = number;
export declare class RecordHistory {
    _localId: RecordHistory_LocalId;
    _actorRecordId: RecordHistory_ActorRecordId;
    actor: Actor;
    operationHistory: OperationHistory;
    newValues: RecordHistoryNewValue[];
    oldValues: RecordHistoryOldValue[];
    tableColumnMap: SyncColumnMap;
}
//# sourceMappingURL=RecordHistory.d.ts.map