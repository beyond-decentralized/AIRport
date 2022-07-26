import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { TypeClassificationVDescriptor } from './vtypeclassification';
export interface TypeVDescriptor extends IEntityVDescriptor {
    id: number | IVNumberField;
    name?: string | IVStringField;
    typeClassifications?: TypeClassificationVDescriptor;
}
//# sourceMappingURL=vtype.d.ts.map