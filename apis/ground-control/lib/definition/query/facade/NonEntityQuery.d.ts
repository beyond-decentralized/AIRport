import { JSONFieldInGroupBy } from '../../core/field/FieldInOrderBy';
import { JsonQuery, JsonLimitedQuery } from './Query';
import { JSONBaseOperation } from '../../core/operation/Operation';
/**
 * Serialized format for the GROUP BY clauses of a query.
 */
export interface JsonGroupedQuery {
    /**
     * GROUP BY
     */
    GB?: JSONFieldInGroupBy[];
    /**
     * HAVING
     */
    H?: JSONBaseOperation;
}
/**
 * All Non-Entity queries are serialized in this format.
 */
export interface JsonNonEntityQuery extends JsonQuery, JsonGroupedQuery, JsonLimitedQuery {
}
//# sourceMappingURL=NonEntityQuery.d.ts.map