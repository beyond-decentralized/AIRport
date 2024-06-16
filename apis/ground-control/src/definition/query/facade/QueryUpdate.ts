import { QueryWhereBase } from './Query';
import { QueryEntityRelation } from '../../core/entity/QueryRelation';

/**
 * Marker interface behind the UPDATE clause.
 */
export interface QueryUpdateColumns {
}

/**
 * UPDATE statements are serialized in this format.
 */
export interface QueryUpdate<IEUC extends QueryUpdateColumns>
	extends QueryWhereBase {
	/**
	 * UPDATE
	 */
	UPDATE: QueryEntityRelation;
	/**
	 * SET
	 */
	SET: IEUC;
}