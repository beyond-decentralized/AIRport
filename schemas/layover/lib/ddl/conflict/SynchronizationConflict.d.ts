import { IRecordHistory, IRepository } from '@airport/holding-pattern';
import { SynchronizationConflict_Type } from './SynchronizationConflictType';
import { SynchronizationConflictValues } from './SynchronizationConflictValues';
export declare type SynchronizationConflict_Id = number;
export declare type SynchronizationConflict_Acknowledged = boolean;
export declare class SynchronizationConflict {
    _localId: SynchronizationConflict_Id;
    type: SynchronizationConflict_Type;
    acknowledged: SynchronizationConflict_Acknowledged;
    repository: IRepository;
    overwrittenRecordHistory: IRecordHistory;
    overwritingRecordHistory: IRecordHistory;
    values: SynchronizationConflictValues[];
}
//# sourceMappingURL=SynchronizationConflict.d.ts.map