import { SyncColumnMap } from '@airport/ground-control';
import { Actor } from '../infrastructure/Actor';
import { OperationHistory } from './OperationHistory';
import { RecordHistoryNewValue } from './RecordHistoryNewValue';
import { RecordHistoryOldValue } from './RecordHistoryOldValue';
/**
 * Entity Changes are always local-only, so a sequence for id will do.
 */
export declare type RecordHistoryId = number;
export declare type RecordHistoryActorRecordId = number;
export declare class RecordHistory {
    id: RecordHistoryId;
    actorRecordId: RecordHistoryActorRecordId;
    actor: Actor;
    operationHistory: OperationHistory;
    newValues: RecordHistoryNewValue[];
    oldValues: RecordHistoryOldValue[];
    tableColumnMap: SyncColumnMap;
}
//# sourceMappingURL=RecordHistory.d.ts.map