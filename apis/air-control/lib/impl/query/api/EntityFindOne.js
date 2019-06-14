"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const EntityLookup_1 = require("./EntityLookup");
/**
 * Created by Papa on 11/12/2016.
 */
class EntityFindOne extends EntityLookup_1.EntityLookup {
    constructor(dbEntity, dbFacade) {
        super();
        this.dbEntity = dbEntity;
        this.dbFacade = dbFacade;
    }
    async graph(rawGraphQuery) {
        const entityQuery = (await this.DI.get(this.UTILS)).Entity.getEntityQuery(rawGraphQuery);
        const cacheForUpdate = this.cleanNextCallState();
        return await this.dbFacade.entity.findOne(this.dbEntity, entityQuery, ground_control_1.QueryResultType.ENTITY_GRAPH, cacheForUpdate);
    }
    async tree(rawTreeQuery) {
        const entityQuery = (await this.DI.get(this.UTILS)).Entity.getEntityQuery(rawTreeQuery);
        const cacheForUpdate = this.cleanNextCallState();
        return await this.dbFacade.entity.findOne(this.dbEntity, entityQuery, ground_control_1.QueryResultType.ENTITY_TREE, cacheForUpdate);
    }
}
exports.EntityFindOne = EntityFindOne;
//# sourceMappingURL=EntityFindOne.js.map