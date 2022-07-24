import { JSONBaseOperation, OperationCategory, SqlOperator } from "@airport/ground-control";
import { RawFieldQuery } from '../../query/facade/FieldQuery';
import { IQOperableField } from '../field/OperableField';
/**
 * Marker interface for all Operation implementations
 */
export interface IOperation {
}
export declare type WhereJoiner = SqlOperator.AND | SqlOperator.OR;
/**
 * Interface for all operation implementations with a value assigned via an operator.
 */
export interface IValueOperation<T, JRO extends JSONBaseOperation, IQF extends IQOperableField<any, JRO, any, any>> extends IOperation {
    category: OperationCategory;
    /**
     * A.B = C
     */
    equals(lValue: IQF, rValue: T | IQF | RawFieldQuery<IQF>): JRO;
    /**
     * A.B > C
     */
    greaterThan(lValue: IQF, rValue: T | IQF | RawFieldQuery<IQF>): JRO;
    /**
     * A.B >= C
     */
    greaterThanOrEquals(lValue: IQF, rValue: T | IQF | RawFieldQuery<IQF>): JRO;
    /**
     * A.B IN (C)
     */
    IN(lValue: IQF, rValue: T[] | IQF | RawFieldQuery<IQF>): JRO;
    /**
     * A.B < C
     */
    lessThan(lValue: IQF, rValue: T | IQF | RawFieldQuery<IQF>): JRO;
    /**
     * A.B <= C
     */
    lessThanOrEquals(lValue: IQF, rValue: T | IQF | RawFieldQuery<IQF>): JRO;
    /**
     * A.B IS NOT NULL
     */
    IS_NOT_NULL(lValue: IQF): JRO;
    /**
     * A.B IS NULL
     */
    IS_NULL(lValue: IQF): JRO;
    /**
     * A.B != C
     */
    notEquals(lValue: IQF, rValue: T | IQF | RawFieldQuery<IQF>): JRO;
    /**
     * A.B NOT IN (C)
     */
    NOT_IN(lValue: IQF, rValue: (T | IQF | RawFieldQuery<IQF>)[]): JRO;
}
/**
 * JSON representation of an operation as it exists immediately after
 * defining a query (to which the operation belongs).
 *
 * All operations with a value assigned via an operator use this.
 */
export interface JSONRawValueOperation<IQF extends IQOperableField<any, any, any, any>> extends JSONBaseOperation {
    l?: IQF;
    r?: boolean | number | string | Date | IQF | IQF[] | RawFieldQuery<IQF> | RawFieldQuery<IQF>[];
}
//# sourceMappingURL=Operation.d.ts.map