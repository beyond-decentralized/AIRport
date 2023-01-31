import { QueryEntityRelation } from '../../core/entity/QueryRelation';
import { QueryWhereBase } from './Query';

/**
 * DELETE statements are serialized in this format.
 */
export interface QueryDelete extends QueryWhereBase {
	/**
	 * DELETE FROM
	 */
	DF: QueryEntityRelation;
}