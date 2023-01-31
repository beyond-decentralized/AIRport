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
	fa: string;
}

/**
 * A serialized version of a query field as specified in the ORDER BY clause.
 */
export interface QueryFieldInOrderBy
	extends QueryFieldInGroupBy {
	// Sort Order
	so: QuerySortOrder;
}

/**
 * A serialized version of an entity field (column) as specified in the ORDER BY clause.
 */
export interface QueryEntityFieldInOrderBy
	extends QueryFieldInOrderBy {
	// Application Version Id
	si: number,
	// Entity Type Index
	ti: number,
	// Property Index
	pi: number,
	// Column Index
	ci: number
}