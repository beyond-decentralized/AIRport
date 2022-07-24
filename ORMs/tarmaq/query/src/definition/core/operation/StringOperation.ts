import { SqlOperator } from "@airport/ground-control";
import { RawFieldQuery } from '../../query/facade/FieldQuery';
import { IQStringField } from '../field/StringField';
import { IValueOperation, JSONRawValueOperation } from './Operation';

/**
 * Interface for all operation implementations with a boolean value.
 */
export interface IStringOperation
	extends IValueOperation<string, JSONRawStringOperation, IQStringField> {

	LIKE(
		lValue: IQStringField,
		rValue: string | IQStringField | RawFieldQuery<IQStringField>
	): JSONRawStringOperation;

}

/**
 * JSON representation of a boolean operation as it exists immediately after
 * defining a query (to which the operation belongs).
 */
export interface JSONRawStringOperation
	extends JSONRawValueOperation<IQStringField> {
	// String Operator
	o: SqlOperator.EQUALS
		| SqlOperator.IS_NOT_NULL
		| SqlOperator.IS_NULL
		| SqlOperator.IN
		| SqlOperator.LIKE
		| SqlOperator.NOT_EQUALS
		| SqlOperator.NOT_IN
		| SqlOperator.GREATER_THAN
		| SqlOperator.GREATER_THAN_OR_EQUALS
		| SqlOperator.LESS_THAN
		| SqlOperator.LESS_THAN_OR_EQUALS;
	// Value on the left side of the operator
	l: IQStringField;
	// Value on the right side of the operator
	r: string | IQStringField | IQStringField[] | RawFieldQuery<IQStringField> | RawFieldQuery<IQStringField>[];
}
