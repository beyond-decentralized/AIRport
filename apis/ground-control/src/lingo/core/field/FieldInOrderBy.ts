/**
 * Order of a sorted field, as specified in the ORDER BY clause.
 */
export enum SortOrder {
	ASCENDING,
	DESCENDING
}

/**
 * A serialized version of a query field as specified in the GROUP BY clause.
 */
export interface JSONFieldInGroupBy {
	// Field Alias
	fa: string;
}

/**
 * A serialized version of a query field as specified in the ORDER BY clause.
 */
export interface JSONFieldInOrderBy
	extends JSONFieldInGroupBy {
	// Sort Order
	so: SortOrder;
}

/**
 * A serialized version of an entity field (column) as specified in the ORDER BY clause.
 */
export interface JSONEntityFieldInOrderBy
	extends JSONFieldInOrderBy {
	// Schema Version Id
	si: number,
	// Entity Type Index
	ti: number,
	// Property Index
	pi: number,
	// Column Index
	ci: number
}