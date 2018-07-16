import { JsonFieldQuery } from '../../query/facade/FieldQuery';
import { JSONClauseField, JSONClauseObject } from '../field/JSONClause';

/**
 * Category of a SQL contentType
 */
export enum OperationCategory {
	BOOLEAN, // Operation on a boolean field
	DATE, // Operation on a date field
	FUNCTION, // Operation containing a function call
	LOGICAL, // A logical contentType - AND | OR | NOT
	NUMBER, // Operation on a number field
	STRING, // Operation on a string field
	UNTYPED // Operation on an untyped field
}

export enum SqlOperator {
	AND,
	EQUALS,
	EXISTS,
	GREATER_THAN,
	GREATER_THAN_OR_EQUALS,
	IN,
	IS_NOT_NULL,
	IS_NULL,
	LESS_THAN,
	LESS_THAN_OR_EQUALS,
	LIKE,
	OR,
	NOT,
	NOT_EQUALS,
	NOT_IN
}

/**
 * Serialized version of a function call.
 */
export interface JSONFunctionOperation
	extends JSONBaseOperation {
	// Object
	// Function call data
	ob: JSONClauseObject;
}

/**
 * Serialized version of a value contentType.
 */
export interface JSONValueOperation
	extends JSONBaseOperation {
	// lValue
	// Value on the left side of the operator
	l: JSONClauseField;
	// rValue
	// Value on the right side of the operator
	r?: JSONClauseField | JSONClauseField[] | JsonFieldQuery;
}

/**
 * All serialized operations extend this class
 */
export interface JSONBaseOperation {
	/**
	 * Category of the IOperation.
	 */
	c: OperationCategory;
	/**
	 * Operator
	 */
	o: SqlOperator;
}

export enum CRUDOperation {
	CREATE,
	READ,
	UPDATE,
	DELETE,
}