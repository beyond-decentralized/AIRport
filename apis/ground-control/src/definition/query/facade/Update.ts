import { JsonStatement } from './Query';
import { JSONEntityRelation } from '../../core/entity/Relation';

/**
 * Marker interface behind the UPDATE clause.
 */
export interface JsonEntityUpdateColumns {
}

/**
 * UPDATE statements are serialized in this format.
 */
export interface JsonUpdate<IEUC extends JsonEntityUpdateColumns>
	extends JsonStatement {
	/**
	 * UPDATE
	 */
	U: JSONEntityRelation;
	/**
	 * SET
	 */
	S: IEUC;
}