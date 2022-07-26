import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { ClassificationVDescriptor } from './vclassification';
import { TypeVDescriptor } from './vtype';
export interface TypeClassificationVDescriptor extends IEntityVDescriptor {
    classification?: ClassificationVDescriptor;
    type?: TypeVDescriptor;
}
//# sourceMappingURL=vtypeclassification.d.ts.map