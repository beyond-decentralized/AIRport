import { IEntityVDescriptor, IVNumberField, IVUntypedField } from '@airport/airbridge-validate';
import { RecordHistoryVDescriptor } from './vrecordhistory';
export interface RecordHistoryOldValueVDescriptor extends IEntityVDescriptor {
    columnIndex: number | IVNumberField;
    oldValue?: any | IVUntypedField;
    recordHistory?: RecordHistoryVDescriptor;
}
//# sourceMappingURL=vrecordhistoryoldvalue.d.ts.map