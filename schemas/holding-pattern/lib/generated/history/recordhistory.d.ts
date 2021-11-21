import { SyncColumnMap } from '@airport/ground-control';
import { IOperationHistory } from './operationhistory';
import { IRecordHistoryNewValue } from './recordhistorynewvalue';
import { IRecordHistoryOldValue } from './recordhistoryoldvalue';
export interface IRecordHistory {
    id: number;
    actorRecordId?: number;
    operationHistory?: IOperationHistory;
    newValues?: IRecordHistoryNewValue[];
    oldValues?: IRecordHistoryOldValue[];
    tableColumnMap?: SyncColumnMap;
}
//# sourceMappingURL=recordhistory.d.ts.map