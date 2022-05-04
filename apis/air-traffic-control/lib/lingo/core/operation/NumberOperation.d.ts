import { SqlOperator } from "@airport/ground-control";
import { RawFieldQuery } from '../../query/facade/FieldQuery';
import { IQNumberField } from '../field/NumberField';
import { IValueOperation, JSONRawValueOperation } from './Operation';
/**
 * Interface for all operation implementations with a number value.
 */
export interface INumberOperation extends IValueOperation<number, JSONRawNumberOperation, IQNumberField> {
}
/**
 * JSON representation of a number operation as it exists immediately after
 * user defining a query (to which the operation belongs).
 */
export interface JSONRawNumberOperation extends JSONRawValueOperation<IQNumberField> {
    o: SqlOperator.EQUALS | SqlOperator.IS_NOT_NULL | SqlOperator.IS_NULL | SqlOperator.IN | SqlOperator.NOT_EQUALS | SqlOperator.NOT_IN | SqlOperator.GREATER_THAN | SqlOperator.GREATER_THAN_OR_EQUALS | SqlOperator.LESS_THAN | SqlOperator.LESS_THAN_OR_EQUALS;
    l: IQNumberField;
    r: number | IQNumberField | IQNumberField[] | RawFieldQuery<IQNumberField> | RawFieldQuery<IQNumberField>[];
}
//# sourceMappingURL=NumberOperation.d.ts.map