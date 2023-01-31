import { SqlOperator } from "@airport/ground-control";
import { RawFieldQuery } from '../../query/facade/RawFieldQuery';
import { IQNumberField } from '../field/IQNumberField';
import { IValueOperation, RawValueOperation } from './IValueOperation';

/**
 * Interface for all operation implementations with a number value.
 */
export interface INumberOperation
	extends IValueOperation<number, RawNumberOperation, IQNumberField> {
}

/**
 * JSON representation of a number operation as it exists immediately after
 * defining a query (to which the operation belongs).
 */
export interface RawNumberOperation
	extends RawValueOperation<IQNumberField> {
	// Number Operator
	operator: SqlOperator.EQUALS
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
	leftSideValue: IQNumberField;
	// Value on the right side of the operator
	rightSideValue: number | IQNumberField | IQNumberField[] | RawFieldQuery<IQNumberField> | RawFieldQuery<IQNumberField>[];
}