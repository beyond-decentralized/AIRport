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
 * defining a query (to which the operation belongs).
 */
export interface JSONRawDateOperation extends JSONRawValueOperation<IQDateField> {
	// Date Operator
	o: SqlOperator.EQUALS
		| SqlOperator.IS_NOT_NULL
		| SqlOperator.IS_NULL
		| SqlOperator.IN
		| SqlOperator.NOT_EQUALS
		| SqlOperator.NOT_IN
		| SqlOperator.GREATER_THAN
		| SqlOperator.GREATER_THAN_OR_EQUALS
		| SqlOperator.LESS_THAN
		| SqlOperator.LESS_THAN_OR_EQUALS;
	// Value on the left side of the operator
	l: IQDateField;
	// Value on the right side of the operator
	r: Date | IQDateField | IQDateField[] | RawFieldQuery<IQDateField> | RawFieldQuery<IQDateField>[];
}