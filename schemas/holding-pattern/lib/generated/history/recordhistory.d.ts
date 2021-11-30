import { SyncColumnMap } from '@airport/ground-control';
import { IRepository } from '../repository/repository';
import { IActor } from '../infrastructure/actor';
import { IOperationHistory } from './operationhistory';
import { IRecordHistoryNewValue } from './recordhistorynewvalue';
import { IRecordHistoryOldValue } from './recordhistoryoldvalue';
export interface IRecordHistory {
    id: number;
    actorRecordId?: number;
    repository?: IRepository;
    actor?: IActor;
    operationHistory?: IOperationHistory;
    newValues?: IRecordHistoryNewValue[];
    oldValues?: IRecordHistoryOldValue[];
    tableColumnMap?: SyncColumnMap;
}
//# sourceMappingURL=recordhistory.d.ts.map