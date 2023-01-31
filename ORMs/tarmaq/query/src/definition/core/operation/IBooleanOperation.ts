import { SqlOperator } from "@airport/ground-control";
import { RawFieldQuery } from '../../query/facade/RawFieldQuery';
import { IQBooleanField } from '../field/IQBooleanField';
import { IValueOperation, RawValueOperation } from './IValueOperation';


/**
 * Interface for all operation implementations with a boolean value.
 */
export interface IBooleanOperation
	extends IValueOperation<boolean, RawBooleanOperation, IQBooleanField> {
}

export interface RawBooleanOperation
	extends RawValueOperation<IQBooleanField> {
	// Boolean Operator
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
	leftSideValue: IQBooleanField;
	// Value on the right side of the operator
	rightSideValue: boolean | IQBooleanField | IQBooleanField[] | RawFieldQuery<IQBooleanField> | RawFieldQuery<IQBooleanField>[];
}