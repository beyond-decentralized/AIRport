"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
/**
 * Created by Papa on 10/16/2016.
 */
/**
 * Will order the results exactly as specified in the Order By clause
 */
class ExactOrderByParser {
    constructor(validator) {
        this.validator = validator;
    }
    getOrderByFragment(rootSelectClauseFragment, orderBy) {
        return orderBy.map((orderByField) => {
            this.validator.validateAliasedFieldAccess(orderByField.fa);
            switch (orderByField.so) {
                case ground_control_1.SortOrder.ASCENDING:
                    return `${orderByField.fa} ASC`;
                case ground_control_1.SortOrder.DESCENDING:
                    return `${orderByField.fa} DESC`;
            }
        }).join(', ');
    }
}
exports.ExactOrderByParser = ExactOrderByParser;
//# sourceMappingURL=ExactOrderByParser.js.map