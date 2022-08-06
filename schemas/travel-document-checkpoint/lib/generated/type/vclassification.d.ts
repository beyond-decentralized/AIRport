import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airbridge/validate';
export interface ClassificationVDescriptor<T> extends IEntityVDescriptor<T> {
    id?: number | IVNumberField;
    name?: string | IVStringField;
}
//# sourceMappingURL=vclassification.d.ts.map