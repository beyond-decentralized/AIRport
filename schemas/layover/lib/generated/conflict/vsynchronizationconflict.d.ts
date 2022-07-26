import { IEntityVDescriptor, IVBooleanField, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { RepositoryVDescriptor, Repository, RecordHistoryVDescriptor, RecordHistory } from '@airport/holding-pattern/lib/to_be_generated/runtime-index';
import { SynchronizationConflictValuesVDescriptor } from './vsynchronizationconflictvalues';
import { SynchronizationConflictValues } from '../../ddl/conflict/SynchronizationConflictValues';
export interface SynchronizationConflictVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    type?: string | IVStringField;
    acknowledged?: boolean | IVBooleanField;
    repository?: RepositoryVDescriptor<Repository>;
    overwrittenRecordHistory?: RecordHistoryVDescriptor<RecordHistory>;
    overwritingRecordHistory?: RecordHistoryVDescriptor<RecordHistory>;
    values?: SynchronizationConflictValuesVDescriptor<SynchronizationConflictValues>;
}
//# sourceMappingURL=vsynchronizationconflict.d.ts.map