import { DbApplication_Index } from "../../application/DbApplication";

/**
 * Order of a sorted field, as specified in the ORDER BY clause.
 */
export enum QuerySortOrder {
	ASCENDING = 'ASCENDING',
	DESCENDING = 'DESCENDING'
}

/**
 * A serialized version of a query field as specified in the GROUP BY clause.
 */
export interface QueryFieldInGroupBy {
	// Field Alias
	fieldAlias: string;
}

/**
 * A serialized version of a query field as specified in the ORDER BY clause.
 */
export interface QueryFieldInOrderBy
	extends QueryFieldInGroupBy {
	// Sort Order
	sortOrder: QuerySortOrder;
}

/**
 * A serialized version of an entity field (column) as specified in the ORDER BY clause.
 */
export interface QueryEntityFieldInOrderBy
	extends QueryFieldInOrderBy {
	// Application Version Id
	applicationIndex: DbApplication_Index,
	// Entity Index
	entityIndex: number,
	// Property Index
	propertyIndex: number,
	// Column Index
	columnIndex: number
}