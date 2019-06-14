"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const observe_1 = require("@airport/observe");
const EntityLookup_1 = require("./EntityLookup");
/**
 * Created by Papa on 11/12/2016.
 */
class EntitySearch extends EntityLookup_1.EntityLookup {
    constructor(dbEntity, dbFacade) {
        super();
        this.dbEntity = dbEntity;
        this.dbFacade = dbFacade;
    }
    graph(rawGraphQuery) {
        return observe_1.Observable.from(this.doSearch(rawGraphQuery, ground_control_1.QueryResultType.ENTITY_TREE));
    }
    tree(rawTreeQuery) {
        return observe_1.Observable.from(this.doSearch(rawTreeQuery, ground_control_1.QueryResultType.ENTITY_TREE));
    }
    async doSearch(rawTreeQuery, queryResultType) {
        let entityQuery = (await this.DI.get(this.UTILS)).Entity.getEntityQuery(rawTreeQuery);
        const cacheForUpdate = this.cleanNextCallState();
        return this.dbFacade.entity.search(this.dbEntity, entityQuery, queryResultType, cacheForUpdate);
    }
}
exports.EntitySearch = EntitySearch;
//# sourceMappingURL=EntitySearch.js.map