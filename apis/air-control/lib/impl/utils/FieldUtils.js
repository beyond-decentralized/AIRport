export class FieldUtils {
    constructor(utils) {
        this.utils = utils;
    }
    getFieldQueryJson(fieldSubQuery, entityAliases) {
        if (!this.FieldQuery) {
            this.FieldQuery = require('../query/facade/FieldQuery').FieldQuery;
        }
        let subSelectQuery = new this.FieldQuery(fieldSubQuery, this.utils, entityAliases);
        return subSelectQuery.toJSON();
    }
}
//# sourceMappingURL=FieldUtils.js.map