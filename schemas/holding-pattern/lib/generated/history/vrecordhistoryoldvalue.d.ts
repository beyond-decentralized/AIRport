import { IEntityVDescriptor, IVNumberField, IVUntypedField } from '@airbridge/validate';
import { RecordHistoryVDescriptor } from './vrecordhistory';
import { RecordHistory } from '../../ddl/history/RecordHistory';
export interface RecordHistoryOldValueVDescriptor<T> extends IEntityVDescriptor<T> {
    columnIndex?: number | IVNumberField;
    oldValue?: any | IVUntypedField;
    recordHistory?: RecordHistoryVDescriptor<RecordHistory>;
}
//# sourceMappingURL=vrecordhistoryoldvalue.d.ts.map