import { QueryNonEntity } from './QueryNonEntity';
import {QueryFieldClause, QueryClauseObjectType, SQLDataType} from "../../core/field/QueryClause";

/**
 * Field queries are serialized in this format.
 */
export interface QueryField extends QueryNonEntity {
	/**
	 * SELECT
	 */
	SELECT: QueryFieldClause;
	/**
	 * Object Type
	 */
	objectType: QueryClauseObjectType;
	/**
	 * Data Type
	 */
	dataType: SQLDataType;
}