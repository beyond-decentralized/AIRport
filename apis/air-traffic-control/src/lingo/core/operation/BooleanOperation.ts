import { SqlOperator } from "@airport/ground-control";
import { RawFieldQuery } from '../../query/facade/FieldQuery';
import { IQBooleanField } from '../field/BooleanField';
import { IValueOperation, JSONRawValueOperation } from './Operation';


/**
 * Interface for all operation implementations with a boolean value.
 */
export interface IBooleanOperation
	extends IValueOperation<boolean, JSONRawBooleanOperation, IQBooleanField> {
}

export interface JSONRawBooleanOperation
	extends JSONRawValueOperation<IQBooleanField> {
	// Boolean Operator
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
	l: IQBooleanField;
	// Value on the right side of the operator
	r: boolean | IQBooleanField | IQBooleanField[] | RawFieldQuery<IQBooleanField> | RawFieldQuery<IQBooleanField>[];
}