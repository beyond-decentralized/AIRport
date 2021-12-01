import { DI } from '@airport/di';
import { ENTITY_STATE_MANAGER } from '@airport/ground-control';
import { APPLICATION_UTILS, UPDATE_CACHE_MANAGER } from '../../../tokens';
import { LookupProxy } from './Lookup';
export class EntityLookup extends LookupProxy {
    constructor(dbEntity, mapResults = EntityLookup.mapResults, repositorySource = null, repositoryUuid = null) {
        super(repositorySource, repositoryUuid);
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
        context.repositorySource = this.repositorySource;
        context.repositoryUuid = this.repositoryUuid;
        const result = await this.lookup(rawEntityQuery, queryResultType, search, one, null, context, this.mapResults);
        const [entityStateManager, applicationUtils, updateCacheManager] = await DI.db().get(ENTITY_STATE_MANAGER, APPLICATION_UTILS, UPDATE_CACHE_MANAGER);
        if (search) {
            throw new Error(`Search operations are not yet supported`);
        }
        else {
            updateCacheManager.saveOriginalValues(result, context.dbEntity, entityStateManager, applicationUtils);
        }
        return result;
    }
}
EntityLookup.mapResults = false;
//# sourceMappingURL=EntityLookup.js.map