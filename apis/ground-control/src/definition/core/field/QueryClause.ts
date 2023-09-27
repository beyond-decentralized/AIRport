import { Application_Index } from '../../application/IApplication'
import { DbEntity_TableIndex } from '../../application/DbEntity'
import { DbColumn_Index, DbProperty_Index } from '../../application/DbProperty'
import { QueryField } from '../../query/facade/QueryField'
import { QueryFunctionCall } from './Functions'

/**
 * All possible types of serialized JSON clauses.
 */
export enum QueryClauseObjectType {
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
	sColumn: {
		name: string
		type: 'any' | 'boolean' | 'Date' | 'number' | 'string' | 'Json'
	}
): SQLDataType {
	switch (sColumn.type) {
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
			throw new Error(`Uknown type: ${sColumn.type} for column '${sColumn.name}'`)
	}
}

/**
 * Base serialized Query clause.
 */
export interface QueryBaseClause {
	/**
	 * Applied Functions
	 * All functions applied to this clause, in order of definition
	 */
	appliedFunctions: QueryFunctionCall[];
	/**
	 * Object Type
	 * Type of clause
	 */
	objectType: QueryClauseObjectType;
	/**
	 * Data Type
	 * Data contentType of the clause (contentType of what it evaluates to)
	 */
	dataType: SQLDataType;
}

/**
 * Serialized field (as used in a query)
 */
export interface QueryFieldClause
	extends QueryBaseClause {
	/**
	 * Application index
	 */
	applicationIndex?: Application_Index;
	/**
	 * Entity Index
	 * Index of the entity to which this field belongs
	 */
	entityIndex?: DbEntity_TableIndex;
	/**
	 * Field Alias
	 * Alias of the field/column (in the query)
	 */
	fieldAlias: string;
	/**
	 * Property Index
	 * Property index (representing a property on the entity).
	 */
	propertyIndex?: DbProperty_Index;
	/**
	 * Column Index
	 * Column index (representing a column on the entity).
	 */
	columnIndex?: DbColumn_Index,
	/**
	 * Field Sub Query
	 * A reference pointer from a field to a sub-query, as defined in SELECT clause via the
	 * field function
	 */
	fieldSubQuery?: QueryField;
	/**
	 * Table Alias
	 * Alias of the table to which this field/column belongs
	 */
	tableAlias?: string,
	/**
	 * Value
	 * alias of the field/column or (a) serialized function call(s) / sub-query
	 */
	value?: string | QueryFieldClause | QueryField;
}
