import { IRepository, IRecordHistory } from '@airport/holding-pattern';
import { ISynchronizationConflictValues } from './synchronizationconflictvalues';
export interface ISynchronizationConflict {
    _localId: number;
    type?: string;
    acknowledged?: boolean;
    repository?: IRepository;
    overwrittenRecordHistory?: IRecordHistory;
    overwritingRecordHistory?: IRecordHistory;
    values?: ISynchronizationConflictValues[];
}
//# sourceMappingURL=synchronizationconflict.d.ts.map