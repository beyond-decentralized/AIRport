import { QueryRelation } from '../../core/entity/QueryRelation'
import { QueryFieldInOrderBy } from '../../core/field/QueryFieldInOrderBy'
import { QueryBaseOperation } from '../../core/operation/Operation'

export enum QueryStatementType {
	ENTITY_QUERY = 'ENTITY_QUERY',
	NON_ENTITY_QUERY = 'NON_ENTITY_QUERY'
}

/**
 * All JSON Statements extend this object (have an optional WHERE clause)
 */
export interface QueryWhereBase {
	/**
	 * Type of statement
	 */
	// T: QueryStatementType
	/**
	 * WHERE
	 */
	WHERE?: QueryBaseOperation
}

/**
 * Internal query format used to serialize queries (in JSON).
 */
export interface Query
	extends QueryWhereBase {
	/**
	 * FROM
	 */
	FROM?: QueryRelation[];
	forUpdate?: boolean;
	/**
	 * ORDER BY
	 */
	ORDER_BY?: QueryFieldInOrderBy[];
	/**
	 * SELECT
	 */
	SELECT: any;
}

/**
 * Serialized format for the LIMIT, OFFSET clauses of a query.
 */
export interface LimitedQuery {
	/**
	 * LIMIT
	 */
	LIMIT?: number;
	/**
	 * OFFSET
	 */
	OFFSET?: number;
}
