import {JsonFieldQuery}      from '../../query/facade/FieldQuery'
import {JSONSqlFunctionCall} from './Functions'

/**
 * All possible types of serialized JSON clauses.
 */
export enum JSONClauseObjectType {
	FIELD = 'FIELD', // Regular Field (column)
	FIELD_FUNCTION = 'FIELD_FUNCTION', // Function on a field
	FIELD_QUERY = 'FIELD_QUERY', // A field backed by a sub-query
	DISTINCT_FUNCTION = 'DISTINCT_FUNCTION', // The DISTINCT clause
	EXISTS_FUNCTION = 'EXISTS_FUNCTION', // The EXISTS condition
	MANY_TO_ONE_RELATION = 'MANY_TO_ONE_RELATION' // A many-to-one relation (used in a query)
}

/**
 * Types of data
 */
export enum SQLDataType {
	// Allowing ANY allows developers to de-type their data
	ANY = 'ANY',
	BOOLEAN = 'BOOLEAN',
	DATE = 'DATE',
	// Allowing JSON allows developers to de-normalize their data
	JSON = 'JSON',
	NUMBER = 'NUMBER',
	STRING = 'STRING',
}

export function getSqlDataType(
	type: string
): SQLDataType {
	switch (type) {
		case 'any':
			return SQLDataType.ANY
		case 'boolean':
			return SQLDataType.BOOLEAN
		case 'Date':
			return SQLDataType.DATE
		case 'Json':
			return SQLDataType.JSON
		case 'number':
			return SQLDataType.NUMBER
		case 'string':
			return SQLDataType.STRING
		default:
			throw new Error(`Uknown type: ${type}`)
	}
}

/**
 * Base serialized JSON clause.
 */
export interface JSONClauseObject {
	/**
	 * Applied Functions
	 * All functions applied to this clause, in order of definition
	 */
	appliedFunctions: JSONSqlFunctionCall[];
	/**
	 * Object Type
	 * Type of clause
	 */
	ot: JSONClauseObjectType;
	/**
	 * Data Type
	 * Data contentType of the clause (contentType of what it evaluates to)
	 */
	dt: SQLDataType;
}

/**
 * Serialized field (as used in a query)
 */
export interface JSONClauseField
	extends JSONClauseObject {
	/**
	 * Application Version id
	 */
	si?: number;
	/**
	 * Table Index
	 * Index of the entity to which this field belongs
	 */
	ti?: number;
	/**
	 * Field Alias
	 * Alias of the field/column (in the query)
	 */
	fa: string;
	/**
	 * Property Index
	 * Property index (representing a property on the entity).
	 */
	pi?: number;
	/**
	 * Column Index
	 * Column index (representing a column on the entity).
	 */
	ci?: number,
	/**
	 * Field Sub Query
	 * A reference pointer from a field to a sub-query, as defined in SELECT clause via the
	 * field function
	 */
	fieldSubQuery?: JsonFieldQuery;
	/**
	 * Table Alias
	 * Alias of the table to which this field/column belongs
	 */
	ta?: string,
	/**
	 * Value
	 * alias of the field/column or (a) serialized function call(s) / sub-query
	 */
	v?: string | JSONClauseField | JsonFieldQuery;
}
