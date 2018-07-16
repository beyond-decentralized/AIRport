import { JsonNonEntityQuery } from './NonEntityQuery';
import { JSONClauseField, JSONClauseObjectType, SQLDataType } from "../../core/field/JSONClause";
/**
 * Field queries are serialized in this format.
 */
export interface JsonFieldQuery extends JsonNonEntityQuery {
    /**
     * SELECT
     */
    S: JSONClauseField;
    /**
     * Object Type
     */
    ot: JSONClauseObjectType;
    /**
     * Data Type
     */
    dt: SQLDataType;
}
