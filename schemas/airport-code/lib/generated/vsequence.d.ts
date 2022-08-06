import { IEntityVDescriptor, IVNumberField } from '@airbridge/validate';
export interface SequenceVDescriptor<T> extends IEntityVDescriptor<T> {
    applicationIndex?: number | IVNumberField;
    tableIndex?: number | IVNumberField;
    columnIndex?: number | IVNumberField;
    incrementBy?: number | IVNumberField;
    currentValue?: number | IVNumberField;
}
//# sourceMappingURL=vsequence.d.ts.map