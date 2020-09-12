import { SqlOperator } from "@airport/ground-control";
import { RawFieldQuery } from '../../query/facade/FieldQuery';
import { IQDateField } from '../field/DateField';
import { IValueOperation, JSONRawValueOperation } from './Operation';
/**
 * Interface for all operation implementations with a Date value.
 */
export interface IDateOperation extends IValueOperation<Date, JSONRawDateOperation, IQDateField> {
}
/**
 * JSON representation of a Date operation as it exists immediately after
 * user defining a query (to which the operation belongs).
 */
export interface JSONRawDateOperation extends JSONRawValueOperation<IQDateField> {
    o: SqlOperator.EQUALS | SqlOperator.IS_NOT_NULL | SqlOperator.IS_NULL | SqlOperator.IN | SqlOperator.NOT_EQUALS | SqlOperator.NOT_IN | SqlOperator.GREATER_THAN | SqlOperator.GREATER_THAN_OR_EQUALS | SqlOperator.LESS_THAN | SqlOperator.LESS_THAN_OR_EQUALS;
    l: IQDateField;
    r: Date | IQDateField | IQDateField[] | RawFieldQuery<IQDateField> | RawFieldQuery<IQDateField>[];
}
//# sourceMappingURL=DateOperation.d.ts.map