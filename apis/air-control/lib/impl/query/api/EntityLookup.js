import { LookupProxy } from './Lookup';
export class EntityLookup extends LookupProxy {
    constructor(dbEntity, updateCacheManager, mapResults = EntityLookup.mapResults) {
        super();
        this.dbEntity = dbEntity;
        this.updateCacheManager = updateCacheManager;
        this.mapResults = mapResults;
    }
    setMap(MappedChildClass, isMapped = true) {
        return new MappedChildClass(this.dbEntity, this.updateCacheManager, isMapped);
    }
    setNoCache(ChildClass) {
        return new ChildClass(this.dbEntity, this.updateCacheManager, this.mapResults);
    }
    async entityLookup(rawEntityQuery, queryResultType, search, one, context) {
        context.dbEntity = this.dbEntity;
        const result = await this.lookup(rawEntityQuery, queryResultType, search, one, null, context, this.mapResults);
        if (search) {
            throw new Error(`Search operations are not yet supported`);
        }
        else {
            this.updateCacheManager.saveOriginalValues(result, context.dbEntity);
        }
        return result;
    }
}
EntityLookup.mapResults = false;
//# sourceMappingURL=EntityLookup.js.map