"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
class AbstractEntityOrderByParser {
    constructor(airportDb, rootSelectClauseFragment, validator, orderBy) {
        this.airportDb = airportDb;
        this.rootSelectClauseFragment = rootSelectClauseFragment;
        this.validator = validator;
        this.orderBy = orderBy;
    }
    getCommonOrderByFragment(orderByFields) {
        return orderByFields.map((orderByField) => {
            switch (orderByField.so) {
                case ground_control_1.SortOrder.ASCENDING:
                    return `${orderByField.fa} ASC`;
                case ground_control_1.SortOrder.DESCENDING:
                    return `${orderByField.fa} DESC`;
            }
        }).join(', ');
    }
}
exports.AbstractEntityOrderByParser = AbstractEntityOrderByParser;
//# sourceMappingURL=AbstractEntityOrderByParser.js.map