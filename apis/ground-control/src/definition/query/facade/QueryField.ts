import { QueryNonEntity } from './QueryNonEntity';
import {QueryFieldClause, QueryClauseObjectType, SQLDataType} from "../../core/field/QueryClause";

/**
 * Field queries are serialized in this format.
 */
export interface QueryField extends QueryNonEntity {
	/**
	 * SELECT
	 */
	S: QueryFieldClause;
	/**
	 * Object Type
	 */
	ot: QueryClauseObjectType;
	/**
	 * Data Type
	 */
	dt: SQLDataType;
}