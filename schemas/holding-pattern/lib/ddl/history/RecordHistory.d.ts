import { SyncColumnMap } from '@airport/ground-control';
import { IOperationHistory } from '../../generated/history/qoperationhistory';
import { IRecordHistory } from '../../generated/history/qrecordhistory';
import { IRecordHistoryNewValue } from '../../generated/history/qrecordhistorynewvalue';
import { IRecordHistoryOldValue } from '../../generated/history/qrecordhistoryoldvalue';
import { IActor } from '../../generated/infrastructure/qactor';
/**
 * Entity Changes are always local-only, so a sequence for id will do.
 */
export declare type RecordHistoryId = number;
export declare type RecordHistoryActorRecordId = number;
export declare class RecordHistory implements IRecordHistory {
    id: RecordHistoryId;
    actor: IActor;
    actorRecordId: RecordHistoryActorRecordId;
    operationHistory: IOperationHistory;
    newValues: IRecordHistoryNewValue[];
    oldValues: IRecordHistoryOldValue[];
    tableColumnMap: SyncColumnMap;
}
