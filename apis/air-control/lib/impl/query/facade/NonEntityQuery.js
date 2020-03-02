"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Functions_1 = require("../../core/field/Functions");
const AbstractQuery_1 = require("./AbstractQuery");
/**
 * Created by Papa on 10/24/2016.
 */
exports.NON_ENTITY_SELECT_ERROR_MESSAGE = `Unsupported entry in Non-Entity SELECT clause, must be a(n): Entity Field | ManyToOne Relation | primitive wrapped by "bool","date","num","str" | query wrapped by "field"`;
class DistinguishableQuery extends AbstractQuery_1.AbstractQuery {
    constructor(entityAliases) {
        super(entityAliases);
        this.isHierarchicalEntityQuery = false;
    }
    selectClauseToJSON(rawSelect, queryUtils, fieldUtils) {
        if (rawSelect instanceof Functions_1.QDistinctFunction) {
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
exports.DistinguishableQuery = DistinguishableQuery;
//# sourceMappingURL=NonEntityQuery.js.map