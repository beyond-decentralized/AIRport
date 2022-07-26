import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { TypeClassificationVDescriptor } from './vtypeclassification';
import { TypeClassification } from '../../ddl/type/TypeClassification';
export interface TypeVDescriptor<T> extends IEntityVDescriptor<T> {
    id?: number | IVNumberField;
    name?: string | IVStringField;
    typeClassifications?: TypeClassificationVDescriptor<TypeClassification>;
}
//# sourceMappingURL=vtype.d.ts.map