import { QueryResultType } from '@airport/ground-control';
import { Observable } from '@airport/observe';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearch extends EntityLookup {
    graph(rawGraphQuery, ctx) {
        return Observable.from(this.search(rawGraphQuery, QueryResultType.ENTITY_TREE, ctx));
    }
    tree(rawTreeQuery, ctx) {
        return Observable.from(this.search(rawTreeQuery, QueryResultType.ENTITY_TREE, ctx));
    }
    search(rawEntityQuery, queryResultType, ctx) {
        return this.entityLookup(rawEntityQuery, queryResultType, true, false, this.ensureContext(ctx));
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
//# sourceMappingURL=EntitySearch.js.map