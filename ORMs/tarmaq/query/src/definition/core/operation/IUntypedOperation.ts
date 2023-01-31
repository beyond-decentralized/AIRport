import { SqlOperator } from "@airport/ground-control";
import { RawFieldQuery } from "../../query/facade/RawFieldQuery";
import { IQUntypedField } from "../field/IQUntypedField";
import { IValueOperation, RawValueOperation } from "./IValueOperation";

/**
 * Created by papa on 7/13/17.
 */

/**
 * Interface for all operation implementations with a boolean value.
 */
export interface IUntypedOperation
	extends IValueOperation<any, RawUntypedOperation, IQUntypedField> {

	LIKE(
		lValue: IQUntypedField,
		rValue: string | IQUntypedField | RawFieldQuery<IQUntypedField>
	): RawUntypedOperation;

}

/**
 * JSON representation of a boolean operation as it exists immediately after
 * defining a query (to which the operation belongs).
 */
export interface RawUntypedOperation
	extends RawValueOperation<IQUntypedField> {
	// Untyped Operator
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
	l: IQUntypedField;
	// Value on the right side of the operator
	r: any | IQUntypedField | IQUntypedField[] | RawFieldQuery<IQUntypedField> | RawFieldQuery<IQUntypedField>[];
}