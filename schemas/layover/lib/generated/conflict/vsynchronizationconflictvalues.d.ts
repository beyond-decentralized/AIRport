import { IEntityVDescriptor, IVNumberField } from '@airbridge/validate';
import { SynchronizationConflictVDescriptor } from './vsynchronizationconflict';
import { SynchronizationConflict } from '../../ddl/conflict/SynchronizationConflict';
export interface SynchronizationConflictValuesVDescriptor<T> extends IEntityVDescriptor<T> {
    columnIndex?: number | IVNumberField;
    synchronizationConflict?: SynchronizationConflictVDescriptor<SynchronizationConflict>;
}
//# sourceMappingURL=vsynchronizationconflictvalues.d.ts.map