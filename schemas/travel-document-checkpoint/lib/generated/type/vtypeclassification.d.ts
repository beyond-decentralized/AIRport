import { IEntityVDescriptor } from '@airbridge/validate';
import { ClassificationVDescriptor } from './vclassification';
import { Classification } from '../../ddl/type/Classification';
import { TypeVDescriptor } from './vtype';
import { Type } from '../../ddl/type/Type';
export interface TypeClassificationVDescriptor<T> extends IEntityVDescriptor<T> {
    classification?: ClassificationVDescriptor<Classification>;
    type?: TypeVDescriptor<Type>;
}
//# sourceMappingURL=vtypeclassification.d.ts.map