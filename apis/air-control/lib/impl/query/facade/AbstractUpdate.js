"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractQuery_1 = require("./AbstractQuery");
class AbstractUpdate extends AbstractQuery_1.AbstractQuery {
    constructor(rawUpdate) {
        super();
        this.rawUpdate = rawUpdate;
    }
    toJSON(queryUtils, fieldUtils) {
        return {
            U: this.rawUpdate.update
                .__driver__.getRelationJson(this.columnAliases, queryUtils, fieldUtils),
            S: this.setToJSON(this.rawUpdate.set, queryUtils, fieldUtils),
            W: queryUtils.whereClauseToJSON(this.rawUpdate.where, this.columnAliases, fieldUtils)
        };
    }
}
exports.AbstractUpdate = AbstractUpdate;
//# sourceMappingURL=AbstractUpdate.js.map