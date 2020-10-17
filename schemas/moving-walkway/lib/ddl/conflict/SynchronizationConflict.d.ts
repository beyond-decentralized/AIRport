import { IRecordHistory, IRepository } from "@airport/holding-pattern";
import { SynchronizationConflictType } from "./SynchronizationConflictType";
import { SynchronizationConflictValues } from "./SynchronizationConflictValues";
export declare type SynchronizationConflictId = number;
export declare class SynchronizationConflict {
    id: SynchronizationConflictId;
    repository: IRepository;
    overwrittenRecordHistory: IRecordHistory;
    overwritingRecordHistory: IRecordHistory;
    values: SynchronizationConflictValues[];
    type: SynchronizationConflictType;
}
//# sourceMappingURL=SynchronizationConflict.d.ts.map