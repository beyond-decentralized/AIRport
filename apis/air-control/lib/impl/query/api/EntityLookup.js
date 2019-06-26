"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UpdateCacheType_1 = require("../../../lingo/core/data/UpdateCacheType");
const Lookup_1 = require("./Lookup");
class EntityLookup extends Lookup_1.LookupProxy {
    constructor(dbEntity, cacheForUpdate = EntityLookup.cacheForUpdate, mapResults = EntityLookup.mapResults) {
        super();
        this.dbEntity = dbEntity;
        this.cacheForUpdate = cacheForUpdate;
        this.mapResults = mapResults;
    }
    setMap(MappedChildClass, isMapped = true) {
        return new MappedChildClass(this.dbEntity, this.cacheForUpdate, isMapped);
    }
    setNoCache(ChildClass) {
        return new ChildClass(this.dbEntity, UpdateCacheType_1.UpdateCacheType.NONE, this.mapResults);
    }
    setCache(ChildClass, cacheForUpdate = UpdateCacheType_1.UpdateCacheType.ALL_QUERY_ENTITIES) {
        return new ChildClass(this.dbEntity, cacheForUpdate, this.mapResults);
    }
    entityLookup(rawEntityQuery, queryResultType, search, one) {
        return this.lookup(rawEntityQuery, queryResultType, search, one, null, this.dbEntity, this.cacheForUpdate, this.mapResults);
    }
}
EntityLookup.cacheForUpdate = UpdateCacheType_1.UpdateCacheType.NONE;
EntityLookup.mapResults = false;
exports.EntityLookup = EntityLookup;
//# sourceMappingURL=EntityLookup.js.map