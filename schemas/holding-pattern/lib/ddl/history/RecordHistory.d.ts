import { SyncColumnMap } from '@airport/ground-control';
import { Actor, OperationHistory, RecordHistoryNewValue, RecordHistoryOldValue } from '../..';
import { Repository } from '../ddl';
/**
 * Entity Changes are always local-only, so a sequence for id will do.
 */
export declare type RecordHistoryId = number;
export declare type RecordHistoryActorRecordId = number;
export declare class RecordHistory {
    id: RecordHistoryId;
    actorRecordId: RecordHistoryActorRecordId;
    repository: Repository;
    actor: Actor;
    operationHistory: OperationHistory;
    newValues: RecordHistoryNewValue[];
    oldValues: RecordHistoryOldValue[];
    tableColumnMap: SyncColumnMap;
}
//# sourceMappingURL=RecordHistory.d.ts.map