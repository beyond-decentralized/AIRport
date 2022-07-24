import { EntityAliases } from '../../core/entity/Aliases';
import { MappableQuery } from './MappableQuery';
export class TreeQuery extends MappableQuery {
    constructor(rawQuery, entityAliases = new EntityAliases()) {
        super(entityAliases);
        this.rawQuery = rawQuery;
    }
    toJSON(queryUtils, fieldUtils, relationManager) {
        let jsonMappedQuery = this.getNonEntityQuery(this.rawQuery, {}, (jsonQuery) => {
            jsonQuery.S = this.selectClauseToJSON(this.rawQuery.SELECT, queryUtils, fieldUtils, relationManager);
            jsonQuery.forUpdate = this.rawQuery.FOR_UPDATE;
        }, queryUtils, fieldUtils, relationManager);
        return jsonMappedQuery;
    }
}
//# sourceMappingURL=TreeQuery.js.map