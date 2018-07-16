import { JsonStatement } from './Query';
import { JSONEntityRelation } from '../../core/entity/Relation';
/**
 * INSERT statements are serialized in this format.
 */
export interface JsonInsertValues extends JsonStatement {
    /**
     * INSERT INTO
     */
    II: JSONEntityRelation;
    /**
     * COLUMNS
     */
    C: number[];
    /**
     * VALUES
     */
    V: any[][];
}
