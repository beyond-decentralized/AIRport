"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractQuery_1 = require("./AbstractQuery");
class AbstractUpdate extends AbstractQuery_1.AbstractQuery {
    constructor(rawUpdate, utils) {
        super();
        this.rawUpdate = rawUpdate;
        this.utils = utils;
    }
    toJSON() {
        return {
            U: this.rawUpdate.update
                .__driver__.getRelationJson(this.columnAliases),
            S: this.setToJSON(this.rawUpdate.set),
            W: this.utils.Query.whereClauseToJSON(this.rawUpdate.where, this.columnAliases)
        };
    }
}
exports.AbstractUpdate = AbstractUpdate;
//# sourceMappingURL=AbstractUpdate.js.map