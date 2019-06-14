"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractQuery_1 = require("./AbstractQuery");
/**
 * Created by Papa on 10/2/2016.
 */
class Delete extends AbstractQuery_1.AbstractQuery {
    constructor(rawDelete) {
        super();
        this.rawDelete = rawDelete;
    }
    toJSON(queryUtils, fieldUtils) {
        return {
            DF: this.rawDelete.deleteFrom
                .__driver__.getRelationJson(this.columnAliases),
            W: queryUtils.whereClauseToJSON(this.rawDelete.where, this.columnAliases, fieldUtils)
        };
    }
}
exports.Delete = Delete;
//# sourceMappingURL=Delete.js.map