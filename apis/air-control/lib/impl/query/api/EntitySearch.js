"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const observe_1 = require("@airport/observe");
const EntityLookup_1 = require("./EntityLookup");
/**
 * Created by Papa on 11/12/2016.
 */
class EntitySearch extends EntityLookup_1.EntityLookup {
    graph(rawGraphQuery) {
        return observe_1.Observable.from(this.search(rawGraphQuery, ground_control_1.QueryResultType.ENTITY_TREE));
    }
    tree(rawTreeQuery) {
        return observe_1.Observable.from(this.search(rawTreeQuery, ground_control_1.QueryResultType.ENTITY_TREE));
    }
    search(rawEntityQuery, queryResultType) {
        return this.entityLookup(rawEntityQuery, queryResultType, true, false);
    }
    map(isMapped) {
        return this.setMap(EntitySearch, isMapped);
    }
    noCache() {
        return this.setNoCache(EntitySearch);
    }
    cache(cacheForUpdate) {
        return this.setCache(EntitySearch, cacheForUpdate);
    }
}
exports.EntitySearch = EntitySearch;
//# sourceMappingURL=EntitySearch.js.map