"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const EntityLookup_1 = require("./EntityLookup");
/**
 * Created by Papa on 11/12/2016.
 */
class EntitySearchOne extends EntityLookup_1.EntityLookup {
    constructor(dbEntity, dbFacade, utils) {
        super();
        this.dbEntity = dbEntity;
        this.dbFacade = dbFacade;
        this.utils = utils;
    }
    graph(rawGraphQuery) {
        let entityQuery = this.utils.Entity.getEntityQuery(rawGraphQuery);
        const cacheForUpdate = this.cleanNextCallState();
        return this.dbFacade.entity.searchOne(this.dbEntity, entityQuery, ground_control_1.QueryResultType.ENTITY_GRAPH, cacheForUpdate);
    }
    tree(rawTreeQuery) {
        let entityQuery = this.utils.Entity.getEntityQuery(rawTreeQuery);
        const cacheForUpdate = this.cleanNextCallState();
        return this.dbFacade.entity.searchOne(this.dbEntity, entityQuery, ground_control_1.QueryResultType.ENTITY_TREE, cacheForUpdate);
    }
}
exports.EntitySearchOne = EntitySearchOne;
//# sourceMappingURL=EntitySearchOne.js.map