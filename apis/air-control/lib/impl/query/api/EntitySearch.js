import { QueryResultType } from '@airport/ground-control';
import { Observable } from '@airport/observe';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearch extends EntityLookup {
    graph(rawGraphQuery, context) {
        return Observable.from(this.search(rawGraphQuery, QueryResultType.ENTITY_TREE, context));
    }
    tree(rawTreeQuery, context) {
        return Observable.from(this.search(rawTreeQuery, QueryResultType.ENTITY_TREE, context));
    }
    search(rawEntityQuery, queryResultType, context) {
        return this.entityLookup(rawEntityQuery, queryResultType, true, false, this.ensureContext(context));
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