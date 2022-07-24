import { AbstractQuery } from './AbstractQuery';
export class AbstractUpdate extends AbstractQuery {
    constructor(rawUpdate) {
        super();
        this.rawUpdate = rawUpdate;
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        return {
            U: this.rawUpdate.UPDATE
                .__driver__.getRelationJson(this.columnAliases, queryUtils, fieldUtils, relationManager),
            S: this.setToJSON(this.rawUpdate.SET, queryUtils, fieldUtils, relationManager),
            W: queryUtils.whereClauseToJSON(this.rawUpdate.WHERE, this.columnAliases)
        };
    }
}
//# sourceMappingURL=AbstractUpdate.js.map