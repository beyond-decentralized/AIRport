"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateCacheType_1 = require("../../../lingo/core/data/UpdateCacheType");
const Lookup_1 = require("./Lookup");
class EntityLookup extends Lookup_1.LookupProxy {
    constructor(dbEntity) {
        super();
        this.dbEntity = dbEntity;
        this.mapResults = EntityLookup.mapResults;
        this.cacheForUpdate = EntityLookup.cacheForUpdate;
    }
    map(isMapped) {
        this.mapResults = true;
        return this;
    }
    noCache() {
        this.cache(UpdateCacheType_1.UpdateCacheType.NONE);
        return this;
    }
    cache(cacheForUpdate = UpdateCacheType_1.UpdateCacheType.ROOT_QUERY_ENTITIES) {
        this.cacheForUpdate = cacheForUpdate;
        return this;
    }
    entityLookup(rawEntityQuery, queryResultType, search, one) {
        return this.lookup(rawEntityQuery, queryResultType, search, one, null, this.dbEntity, this.cacheForUpdate, this.mapResults);
    }
}
EntityLookup.cacheForUpdate = UpdateCacheType_1.UpdateCacheType.NONE;
EntityLookup.mapResults = false;
exports.EntityLookup = EntityLookup;
//# sourceMappingURL=EntityLookup.js.map