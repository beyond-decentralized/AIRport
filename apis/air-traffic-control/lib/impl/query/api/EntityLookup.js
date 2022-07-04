import { IOC } from '@airport/direction-indicator';
import { LookupProxy } from './Lookup';
import { ENTITY_UTILS } from '../../../core-tokens';
export class EntityLookup extends LookupProxy {
    constructor(dbEntity, dao, mapResults = EntityLookup.mapResults) {
        super(dao);
        this.dbEntity = dbEntity;
        this.mapResults = mapResults;
    }
    setNoCache(ChildClass) {
        return new ChildClass(this.dbEntity, this.dao, this.mapResults);
    }
    async entityLookup(rawEntityQuery, queryResultType, search, one, context) {
        context.dbEntity = this.dbEntity;
        rawEntityQuery = IOC.getSync(ENTITY_UTILS)
            .ensureId(rawEntityQuery);
        const result = await this.lookup(rawEntityQuery, queryResultType, search, one, null, context, this.mapResults);
        if (search) {
            throw new Error(`Search operations are not yet supported`);
        }
        else {
            this.dao.updateCacheManager.saveOriginalValues(result, context.dbEntity);
        }
        return result;
    }
}
EntityLookup.mapResults = false;
//# sourceMappingURL=EntityLookup.js.map