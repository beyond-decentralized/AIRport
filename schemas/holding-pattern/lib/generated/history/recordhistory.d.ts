import { SyncColumnMap } from '@airport/ground-control';
import { IActor } from '../infrastructure/actor';
import { IOperationHistory } from './operationhistory';
import { IRecordHistoryNewValue } from './recordhistorynewvalue';
import { IRecordHistoryOldValue } from './recordhistoryoldvalue';
export interface IRecordHistory {
    _localId: number;
    _actorRecordId?: number;
    actor?: IActor;
    operationHistory?: IOperationHistory;
    newValues?: IRecordHistoryNewValue[];
    oldValues?: IRecordHistoryOldValue[];
    tableColumnMap?: SyncColumnMap;
}
//# sourceMappingURL=recordhistory.d.ts.map