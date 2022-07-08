import { AbstractQuery } from './AbstractQuery';
export class AbstractUpdate extends AbstractQuery {
    constructor(rawUpdate) {
        super();
        this.rawUpdate = rawUpdate;
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        return {
            U: this.rawUpdate.update
                .__driver__.getRelationJson(this.columnAliases, queryUtils, fieldUtils, relationManager),
            S: this.setToJSON(this.rawUpdate.set, queryUtils, fieldUtils, relationManager),
            W: queryUtils.whereClauseToJSON(this.rawUpdate.where, this.columnAliases)
        };
    }
}
//# sourceMappingURL=AbstractUpdate.js.map