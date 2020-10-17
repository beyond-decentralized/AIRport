import { AbstractQuery } from './AbstractQuery';
export class AbstractUpdate extends AbstractQuery {
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
//# sourceMappingURL=AbstractUpdate.js.map