"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const observe_1 = require("@airport/observe");
const diTokens_1 = require("../../../diTokens");
const EntityLookup_1 = require("./EntityLookup");
/**
 * Created by Papa on 11/12/2016.
 */
class EntitySearchOne extends EntityLookup_1.EntityLookup {
    constructor(dbEntity) {
        super();
        this.dbEntity = dbEntity;
    }
    graph(rawGraphQuery) {
        return observe_1.Observable.from(this.doSearch(rawGraphQuery, ground_control_1.QueryResultType.ENTITY_GRAPH));
    }
    tree(rawTreeQuery) {
        return observe_1.Observable.from(this.doSearch(rawTreeQuery, ground_control_1.QueryResultType.ENTITY_TREE));
    }
    async doSearch(rawQuery, queryResultType) {
        const [entityUtils, dbFacade] = await di_1.DI.get(diTokens_1.ENTITY_UTILS, diTokens_1.ENTITY_MANAGER);
        const entityQuery = entityUtils.getEntityQuery(rawQuery);
        const cacheForUpdate = this.cleanNextCallState();
        return dbFacade.entity.searchOne(this.dbEntity, entityQuery, queryResultType, cacheForUpdate);
    }
}
exports.EntitySearchOne = EntitySearchOne;
//# sourceMappingURL=EntitySearchOne.js.map