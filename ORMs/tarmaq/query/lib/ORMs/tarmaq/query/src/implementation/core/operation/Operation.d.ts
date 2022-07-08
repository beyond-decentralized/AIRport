import { OperationCategory } from "@airport/ground-control";
import { IQOperableField } from "../../../definition/core/field/OperableField";
import { IOperation, IValueOperation, JSONRawValueOperation } from "../../../definition/core/operation/Operation";
import { RawFieldQuery } from "../../../definition/query/facade/FieldQuery";
/**
 * Created by Papa on 4/21/2016.
 */
export declare abstract class Operation implements IOperation {
    category: OperationCategory;
    constructor(category: OperationCategory);
}
export declare abstract class ValueOperation<T extends boolean | string | number | Date, JRO extends JSONRawValueOperation<IQF>, IQF extends IQOperableField<any, any, any, any>> extends Operation implements IValueOperation<T, JRO, IQF> {
    category: OperationCategory;
    constructor(category: OperationCategory);
    equals(lValue: IQF, rValue: T | IQF | RawFieldQuery<IQF>): JRO;
    greaterThan(lValue: IQF, rValue: T | IQF | RawFieldQuery<IQF>): JRO;
    greaterThanOrEquals(lValue: IQF, rValue: T | IQF | RawFieldQuery<IQF>): JRO;
    isNotNull(lValue: IQF): JRO;
    isNull(lValue: IQF): JRO;
    in(lValue: IQF, rValue: T[] | IQF | RawFieldQuery<IQF>): JRO;
    lessThan(lValue: IQF, rValue: T | IQF | RawFieldQuery<IQF>): JRO;
    lessThanOrEquals(lValue: IQF, rValue: T | IQF | RawFieldQuery<IQF>): JRO;
    notEquals(lValue: IQF, rValue: T | IQF | RawFieldQuery<IQF>): JRO;
    notIn(lValue: IQF, rValue: (T | IQF | RawFieldQuery<IQF>)[]): JRO;
}
//# sourceMappingURL=Operation.d.ts.map