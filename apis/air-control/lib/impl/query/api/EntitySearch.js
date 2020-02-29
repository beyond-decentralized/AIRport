import { QueryResultType } from '@airport/ground-control';
import { Observable } from '@airport/observe';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearch extends EntityLookup {
    graph(rawGraphQuery) {
        return Observable.from(this.search(rawGraphQuery, QueryResultType.ENTITY_TREE));
    }
    tree(rawTreeQuery) {
        return Observable.from(this.search(rawTreeQuery, QueryResultType.ENTITY_TREE));
    }
    search(rawEntityQuery, queryResultType) {
        return this.entityLookup(rawEntityQuery, queryResultType, true, false);
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