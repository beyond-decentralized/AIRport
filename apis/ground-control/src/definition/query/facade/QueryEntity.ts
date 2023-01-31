import { QueryEntityFieldInOrderBy } from '../../core/field/QueryFieldInOrderBy';
import { QueryEntityRelation } from '../../core/entity/QueryRelation';
import { Query, LimitedQuery } from './Query';

/**
 * Marker interface behind the SELECT clause.
 */
export interface QueryEntityProperties {
	// When specified with value of null selects all fields in current
	// entity
	'*'?: true | any;
}

/**
 * Entity queries are serialized in this format.
 */
export interface QueryEntity<IEP extends QueryEntityProperties> extends Query {
	/**
	 * FROM
	 */
	FROM?: QueryEntityRelation[];
	/**
	 * ORDER BY
	 */
	ORDER_BY?: QueryEntityFieldInOrderBy[];
	/**
	 * SELECT
	 */
	SELECT: IEP;
}

/**
 * Entity queries can specify the LIMIT and OFFSET clauses
 */
export interface QueryEntityLimited<IEP extends QueryEntityProperties>
	extends QueryEntity<IEP>, LimitedQuery {
}