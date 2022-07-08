import {JSONBaseOperation, SqlOperator} from "@airport/ground-control";
import {IOperation} from './Operation';

/**
 * Serialized version of a logical operation. Same as exists immediately
 * after defining a query (to which the operation belongs) - values
 * are serialized subsequently.
 */
export interface JSONLogicalOperation
	extends JSONBaseOperation {
	// Logical Operator
	o: SqlOperator.AND
		| SqlOperator.OR
		| SqlOperator.NOT;
	// Value(s) operated on by the logical operator
	v: JSONBaseOperation | JSONBaseOperation[];
}

/**
 * Type of globally exported 'AND' function
 */
export interface andOperator {
	(
		...ops: JSONBaseOperation[]
	): JSONLogicalOperation;
}

/**
 * Type of globally exported 'OR' function
 */
export interface orOperator {
	(
		...ops: JSONBaseOperation[]
	): JSONLogicalOperation;
}

/**
 * Type of globally exported 'NOT' function
 */
export interface notOperator {
	(
		op: JSONBaseOperation
	): JSONLogicalOperation;
}

/**
 * Interface for all logical operation implementations.
 */
export interface ILogicalOperation
	extends IOperation {

	/**
	 * A AND B
	 */
	and(
		ops: JSONBaseOperation[]
	): JSONLogicalOperation;

	/**
	 * A OR B
	 */
	or(
		ops: JSONBaseOperation[]
	): JSONLogicalOperation;

	/**
	 * NOT A
	 */
	not(
		op: JSONBaseOperation
	): JSONLogicalOperation;

}