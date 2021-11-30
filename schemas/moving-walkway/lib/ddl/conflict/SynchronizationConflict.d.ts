import { IRecordHistory, IRepository } from "@airport/holding-pattern";
import { SynchronizationConflictType } from "./SynchronizationConflictType";
import { SynchronizationConflictValues } from "./SynchronizationConflictValues";
export declare type SynchronizationConflict_Id = number;
export declare class SynchronizationConflict {
    id: SynchronizationConflict_Id;
    repository: IRepository;
    overwrittenRecordHistory: IRecordHistory;
    overwritingRecordHistory: IRecordHistory;
    values: SynchronizationConflictValues[];
    type: SynchronizationConflictType;
}
//# sourceMappingURL=SynchronizationConflict.d.ts.map