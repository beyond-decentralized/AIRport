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
    entityLookup(rawEntityQuery, queryResultType, search, one, context) {
        context.dbEntity = this.dbEntity;
        return this.lookup(rawEntityQuery, queryResultType, search, one, null, context, this.mapResults);
    }
}
EntityLookup.mapResults = false;
//# sourceMappingURL=EntityLookup.js.map