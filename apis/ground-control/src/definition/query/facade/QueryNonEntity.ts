import { QueryFieldInGroupBy } from '../../core/field/QueryFieldInOrderBy';
import { Query, LimitedQuery } from './Query';
import { QueryBaseOperation } from '../../core/operation/Operation';

/**
 * Serialized format for the GROUP BY clauses of a query.
 */
export interface QueryGroupedBy {
	/**
	 * GROUP BY
	 */
	GROUP_BY?: QueryFieldInGroupBy[];
	/**
	 * HAVING
	 */
	HAVING?: QueryBaseOperation;
}

/**
 * All Non-Entity queries are serialized in this format.
 */
export interface QueryNonEntity extends Query, QueryGroupedBy, LimitedQuery {
}
