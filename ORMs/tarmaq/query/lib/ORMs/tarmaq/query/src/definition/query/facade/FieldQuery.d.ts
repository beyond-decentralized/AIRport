import { IQOrderableField } from '../../core/field/Field';
import { IQDistinctFunction } from '../../core/field/Functions';
import { RawNonEntityQuery } from './NonEntityQuery';
/**
 * Field queries are defined in this format.
 */
export interface RawFieldQuery<IQF extends IQOrderableField<IQF>> extends RawNonEntityQuery {
    select: IQF | IQDistinctFunction<IQF>;
}
//# sourceMappingURL=FieldQuery.d.ts.map