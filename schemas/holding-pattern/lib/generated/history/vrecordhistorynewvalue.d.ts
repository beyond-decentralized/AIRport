import { IEntityVDescriptor, IVNumberField, IVUntypedField } from '@airport/airbridge-validate';
import { RecordHistoryVDescriptor } from './vrecordhistory';
export interface RecordHistoryNewValueVDescriptor extends IEntityVDescriptor {
    columnIndex: number | IVNumberField;
    newValue?: any | IVUntypedField;
    recordHistory?: RecordHistoryVDescriptor;
}
//# sourceMappingURL=vrecordhistorynewvalue.d.ts.map