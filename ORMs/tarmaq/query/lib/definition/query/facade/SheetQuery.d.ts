import { Primitive } from "@airport/ground-control";
import { IQOrderableField } from '../../core/field/Field';
import { IQDistinctFunction } from '../../core/field/Functions';
import { RawNonEntityQuery } from './NonEntityQuery';
/**
 * Sheet query format.
 */
export interface RawSheetQuery extends RawNonEntityQuery {
    SELECT: (IQOrderableField<any> | Primitive)[] | IQDistinctFunction<IQOrderableField<any>[]>;
}
//# sourceMappingURL=SheetQuery.d.ts.map