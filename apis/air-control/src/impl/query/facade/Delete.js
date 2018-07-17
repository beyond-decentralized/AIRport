import { AbstractQuery } from "./AbstractQuery";
/**
 * Created by Papa on 10/2/2016.
 */
export class Delete extends AbstractQuery {
    constructor(rawDelete, utils) {
        super();
        this.rawDelete = rawDelete;
        this.utils = utils;
    }
    toJSON() {
        return {
            DF: this.rawDelete.deleteFrom
                .__driver__.getRelationJson(this.columnAliases),
            W: this.utils.Query.whereClauseToJSON(this.rawDelete.where, this.columnAliases)
        };
    }
}
//# sourceMappingURL=Delete.js.map