"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const EntityLookup_1 = require("./EntityLookup");
/**
 * Created by Papa on 11/12/2016.
 */
class EntityFind extends EntityLookup_1.EntityLookup {
    constructor(dbEntity, dbFacade, utils) {
        super();
        this.dbEntity = dbEntity;
        this.dbFacade = dbFacade;
        this.utils = utils;
    }
    async graph(rawGraphQuery) {
        const entityQuery = this.utils.Entity.getEntityQuery(rawGraphQuery);
        const cacheForUpdate = this.cleanNextCallState();
        return await this.dbFacade.entity.find(this.dbEntity, entityQuery, this.getQueryResultType(ground_control_1.QueryResultType.ENTITY_GRAPH), cacheForUpdate);
    }
    async tree(rawTreeQuery) {
        const entityQuery = this.utils.Entity.getEntityQuery(rawTreeQuery);
        const cacheForUpdate = this.cleanNextCallState();
        return await this.dbFacade.entity.find(this.dbEntity, entityQuery, this.getQueryResultType(ground_control_1.QueryResultType.ENTITY_TREE), cacheForUpdate);
    }
}
exports.EntityFind = EntityFind;
//# sourceMappingURL=EntityFind.js.map