"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FieldUtils {
    constructor(utils) {
        this.utils = utils;
    }
    getFieldQueryJson(fieldSubQuery, entityAliases, queryUtils) {
        if (!this.FieldQuery) {
            this.FieldQuery = require('../query/facade/FieldQuery').FieldQuery;
        }
        let subSelectQuery = new this.FieldQuery(fieldSubQuery, entityAliases);
        return subSelectQuery.toJSON(queryUtils, this);
    }
}
exports.FieldUtils = FieldUtils;
//# sourceMappingURL=FieldUtils.js.map