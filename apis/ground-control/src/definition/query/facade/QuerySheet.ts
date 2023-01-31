import { QueryNonEntity } from './QueryNonEntity';
import {QueryFieldClause} from "../../core/field/QueryClause";

/**
 * Sheet queries are serialized in this format.
 */
export interface QuerySheet extends QueryNonEntity {
	/**
	 * SELECT
	 */
	SELECT: QueryFieldClause[];
}
