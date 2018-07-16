/**
 * Order of a sorted field, as specified in the ORDER BY clause.
 */
export declare enum SortOrder {
    ASCENDING = 0,
    DESCENDING = 1
}
/**
 * A serialized version of a query field as specified in the GROUP BY clause.
 */
export interface JSONFieldInGroupBy {
    fa: string;
}
/**
 * A serialized version of a query field as specified in the ORDER BY clause.
 */
export interface JSONFieldInOrderBy extends JSONFieldInGroupBy {
    so: SortOrder;
}
/**
 * A serialized version of an entity field (column) as specified in the ORDER BY clause.
 */
export interface JSONEntityFieldInOrderBy extends JSONFieldInOrderBy {
    si: number;
    ti: number;
    pi: number;
    ci: number;
}
