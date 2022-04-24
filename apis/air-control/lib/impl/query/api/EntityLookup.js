import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { UPDATE_CACHE_MANAGER } from '../../../tokens';
import { LookupProxy } from './Lookup';
export class EntityLookup extends LookupProxy {
    constructor(dbEntity, mapResults = EntityLookup.mapResults) {
        super();
        this.dbEntity = dbEntity;
        this.mapResults = mapResults;
    }
    setMap(MappedChildClass, isMapped = true) {
        return new MappedChildClass(this.dbEntity, isMapped);
    }
    setNoCache(ChildClass) {
        return new ChildClass(this.dbEntity, this.mapResults);
    }
    async entityLookup(rawEntityQuery, queryResultType, search, one, context) {
        context.dbEntity = this.dbEntity;
        const result = await this.lookup(rawEntityQuery, queryResultType, search, one, null, context, this.mapResults);
        const updateCacheManager = await DEPENDENCY_INJECTION.db().get(UPDATE_CACHE_MANAGER);
        if (search) {
            throw new Error(`Search operations are not yet supported`);
        }
        else {
            updateCacheManager.saveOriginalValues(result, context.dbEntity);
        }
        return result;
    }
}
EntityLookup.mapResults = false;
//# sourceMappingURL=EntityLookup.js.map