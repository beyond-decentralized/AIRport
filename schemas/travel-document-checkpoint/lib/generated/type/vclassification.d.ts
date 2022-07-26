import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
export interface ClassificationVDescriptor extends IEntityVDescriptor {
    id: number | IVNumberField;
    name?: string | IVStringField;
}
//# sourceMappingURL=vclassification.d.ts.map