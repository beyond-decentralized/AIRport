import { JSONEntityRelation } from '../../core/entity/Relation';
import { JsonStatement } from './Query';
/**
 * DELETE statements are serialized in this format.
 */
export interface JsonDelete extends JsonStatement {
    /**
     * DELETE FROM
     */
    DF: JSONEntityRelation;
}
