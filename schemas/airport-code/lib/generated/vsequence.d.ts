import { IEntityVDescriptor, IVNumberField } from '@airport/airbridge-validate';
export interface SequenceVDescriptor extends IEntityVDescriptor {
    applicationIndex: number | IVNumberField;
    tableIndex: number | IVNumberField;
    columnIndex: number | IVNumberField;
    incrementBy?: number | IVNumberField;
    currentValue?: number | IVNumberField;
}
//# sourceMappingURL=vsequence.d.ts.map