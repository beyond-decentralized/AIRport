"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const EntityLookup_1 = require("../../../lingo/query/api/EntityLookup");
class EntityLookup {
    constructor() {
        this.isMapped = false;
        this.saveNextCallInUpdateCache = EntityLookup_1.UpdateCacheType.NONE;
    }
    get mapped() {
        this.isMapped = true;
        return this;
    }
    getQueryResultType(baseQueryResultType) {
        switch (baseQueryResultType) {
            case ground_control_1.QueryResultType.ENTITY_GRAPH:
                if (this.isMapped) {
                    return ground_control_1.QueryResultType.MAPPED_ENTITY_GRAPH;
                }
                return ground_control_1.QueryResultType.ENTITY_GRAPH;
            case ground_control_1.QueryResultType.ENTITY_TREE:
                if (this.isMapped) {
                    return ground_control_1.QueryResultType.MAPPED_ENTITY_TREE;
                }
                return ground_control_1.QueryResultType.ENTITY_TREE;
            default:
                throw `Unexpected Base Query ResultType: '${baseQueryResultType}'.`;
        }
    }
    andCacheForUpdate(cacheForUpdateState = EntityLookup_1.UpdateCacheType.ROOT_QUERY_ENTITIES) {
        this.saveNextCallInUpdateCache = cacheForUpdateState;
        return this;
    }
    cleanNextCallState() {
        const saveCurrentCallInUpdateCache = this.saveNextCallInUpdateCache;
        this.saveNextCallInUpdateCache = EntityLookup_1.UpdateCacheType.NONE;
        return saveCurrentCallInUpdateCache;
    }
}
exports.EntityLookup = EntityLookup;
//# sourceMappingURL=EntityLookup.js.map