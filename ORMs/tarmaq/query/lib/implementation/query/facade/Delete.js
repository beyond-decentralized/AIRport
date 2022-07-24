import { AbstractQuery } from './AbstractQuery';
/**
 * Created by Papa on 10/2/2016.
 */
export class Delete extends AbstractQuery {
    constructor(rawDelete) {
        super();
        this.rawDelete = rawDelete;
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        return {
            DF: this.rawDelete.DELETE_FROM
                .__driver__.getRelationJson(this.columnAliases, queryUtils, fieldUtils, relationManager),
            W: queryUtils.whereClauseToJSON(this.rawDelete.WHERE, this.columnAliases)
        };
    }
}
//# sourceMappingURL=Delete.js.map