import { QueryWhereBase } from './Query';
import {QueryEntityRelation} from '../../core/entity/QueryRelation';

/**
 * INSERT statements are serialized in this format.
 */
export interface QueryInsertValues
	extends QueryWhereBase {
	/**
	 * INSERT INTO
 	 */
	INSERT_INTO: QueryEntityRelation;
	/**
	 * COLUMNS
 	 */
	COLUMNS: number[];
	/**
	 * VALUES
	 */
	VALUES: any[][];
}