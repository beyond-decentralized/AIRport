import { JSONEntityFieldInOrderBy } from '../../core/field/FieldInOrderBy';
import { JSONEntityRelation } from '../../core/entity/Relation';
import { JsonQuery, JsonLimitedQuery } from './Query';
/**
 * Marker interface behind the SELECT clause.
 */
export interface JsonEntityProperties {
    '*'?: null | undefined;
}
/**
 * Entity queries are serialized in this format.
 */
export interface JsonEntityQuery<IEP extends JsonEntityProperties> extends JsonQuery {
    /**
     * FROM
     */
    F?: JSONEntityRelation[];
    /**
     * ORDER BY
     */
    OB?: JSONEntityFieldInOrderBy[];
    /**
     * SELECT
     */
    S: IEP;
}
/**
 * Entity queries can specify the LIMIT and OFFSET clauses
 */
export interface JsonLimitedEntityQuery<IEP extends JsonEntityProperties> extends JsonEntityQuery<IEP>, JsonLimitedQuery {
}
//# sourceMappingURL=EntityQuery.d.ts.map