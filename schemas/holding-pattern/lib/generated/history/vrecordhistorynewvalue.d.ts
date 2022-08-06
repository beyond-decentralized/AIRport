import { IEntityVDescriptor, IVNumberField, IVUntypedField } from '@airbridge/validate';
import { RecordHistoryVDescriptor } from './vrecordhistory';
import { RecordHistory } from '../../ddl/history/RecordHistory';
export interface RecordHistoryNewValueVDescriptor<T> extends IEntityVDescriptor<T> {
    columnIndex?: number | IVNumberField;
    newValue?: any | IVUntypedField;
    recordHistory?: RecordHistoryVDescriptor<RecordHistory>;
}
//# sourceMappingURL=vrecordhistorynewvalue.d.ts.map