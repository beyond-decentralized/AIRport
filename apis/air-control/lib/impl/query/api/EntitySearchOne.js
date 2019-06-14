"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const observe_1 = require("@airport/observe");
const EntityLookup_1 = require("./EntityLookup");
/**
 * Created by Papa on 11/12/2016.
 */
class EntitySearchOne extends EntityLookup_1.EntityLookup {
    constructor(dbEntity, dbFacade) {
        super();
        this.dbEntity = dbEntity;
        this.dbFacade = dbFacade;
    }
    graph(rawGraphQuery) {
        return observe_1.Observable.from(this.doSearch(rawGraphQuery, ground_control_1.QueryResultType.ENTITY_GRAPH));
    }
    tree(rawTreeQuery) {
        return observe_1.Observable.from(this.doSearch(rawTreeQuery, ground_control_1.QueryResultType.ENTITY_TREE));
    }
    async doSearch(rawTreeQuery, queryResultType) {
        let entityQuery = (await this.DI.get(this.UTILS)).Entity.getEntityQuery(rawTreeQuery);
        const cacheForUpdate = this.cleanNextCallState();
        return this.dbFacade.entity.searchOne(this.dbEntity, entityQuery, queryResultType, cacheForUpdate);
    }
}
exports.EntitySearchOne = EntitySearchOne;
//# sourceMappingURL=EntitySearchOne.js.map