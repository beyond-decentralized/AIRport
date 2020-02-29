import { QDistinctFunction } from '../../core/field/Functions';
import { AbstractQuery } from './AbstractQuery';
/**
 * Created by Papa on 10/24/2016.
 */
export const NON_ENTITY_SELECT_ERROR_MESSAGE = `Unsupported entry in Non-Entity SELECT clause, must be a(n): Entity Field | ManyToOne Relation | primitive wrapped by "bool","date","num","str" | query wrapped by "field"`;
export class DistinguishableQuery extends AbstractQuery {
    constructor(entityAliases) {
        super(entityAliases);
        this.isHierarchicalEntityQuery = false;
    }
    selectClauseToJSON(rawSelect, queryUtils, fieldUtils) {
        if (rawSelect instanceof QDistinctFunction) {
            if (this.isHierarchicalEntityQuery) {
                throw new Error(`Distinct cannot be used in SELECT of Hierarchical/Bridged Entity queries.`);
            }
            let rawInnerSelect = rawSelect.getSelectClause();
            let innerSelect = this.nonDistinctSelectClauseToJSON(rawInnerSelect, queryUtils, fieldUtils);
            return rawSelect.toJSON(innerSelect);
        }
        else {
            return this.nonDistinctSelectClauseToJSON(rawSelect, queryUtils, fieldUtils);
        }
    }
}
//# sourceMappingURL=NonEntityQuery.js.map