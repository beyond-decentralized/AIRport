import { AbstractQuery } from "./AbstractQuery";
export class AbstractUpdate extends AbstractQuery {
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
//# sourceMappingURL=AbstractUpdate.js.map