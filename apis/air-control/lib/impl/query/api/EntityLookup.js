import { UpdateCacheType } from '../../../lingo/core/data/UpdateCacheType';
import { LookupProxy } from './Lookup';
export class EntityLookup extends LookupProxy {
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
        return new ChildClass(this.dbEntity, UpdateCacheType.NONE, this.mapResults);
    }
    setCache(ChildClass, cacheForUpdate = UpdateCacheType.ALL_QUERY_ENTITIES) {
        return new ChildClass(this.dbEntity, cacheForUpdate, this.mapResults);
    }
    entityLookup(rawEntityQuery, queryResultType, search, one, ctx) {
        ctx.dbEntity = this.dbEntity;
        return this.lookup(rawEntityQuery, queryResultType, search, one, null, ctx, this.cacheForUpdate, this.mapResults);
    }
}
EntityLookup.cacheForUpdate = UpdateCacheType.NONE;
EntityLookup.mapResults = false;
//# sourceMappingURL=EntityLookup.js.map