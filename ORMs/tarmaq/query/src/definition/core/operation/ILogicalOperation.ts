import {QueryBaseOperation, SqlOperator} from "@airport/ground-control";
import {IOperation} from './IValueOperation';

/**
 * Serialized version of a logical operation. Same as exists immediately
 * after defining a query (to which the operation belongs) - values
 * are serialized subsequently.
 */
export interface QueryLogicalOperation
	extends QueryBaseOperation {
	// Logical Operator
	o: SqlOperator.AND
		| SqlOperator.OR
		| SqlOperator.NOT;
	// Value(s) operated on by the logical operator
	v: QueryBaseOperation | QueryBaseOperation[];
}

/**
 * Type of globally exported 'AND' function
 */
export interface andOperator {
	(
		...ops: QueryBaseOperation[]
	): QueryLogicalOperation;
}

/**
 * Type of globally exported 'OR' function
 */
export interface orOperator {
	(
		...ops: QueryBaseOperation[]
	): QueryLogicalOperation;
}

/**
 * Type of globally exported 'NOT' function
 */
export interface notOperator {
	(
		op: QueryBaseOperation
	): QueryLogicalOperation;
}

/**
 * Interface for all logical operation implementations.
 */
export interface ILogicalOperation
	extends IOperation {

	/**
	 * A AND B
	 */
	AND(
		ops: QueryBaseOperation[]
	): QueryLogicalOperation;

	/**
	 * A OR B
	 */
	OR(
		ops: QueryBaseOperation[]
	): QueryLogicalOperation;

	/**
	 * NOT A
	 */
	NOT(
		op: QueryBaseOperation
	): QueryLogicalOperation;

}