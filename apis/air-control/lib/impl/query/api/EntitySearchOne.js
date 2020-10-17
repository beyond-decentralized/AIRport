import { QueryResultType } from '@airport/ground-control';
import { Observable } from '@airport/observe';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearchOne extends EntityLookup {
    graph(rawGraphQuery) {
        return Observable.from(this.searchOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH));
    }
    tree(rawTreeQuery) {
        return Observable.from(this.searchOne(rawTreeQuery, QueryResultType.ENTITY_TREE));
    }
    searchOne(rawEntityQuery, queryResultType) {
        return this.entityLookup(rawEntityQuery, queryResultType, true, true);
    }
    map(isMapped) {
        return this.setMap(EntitySearchOne, isMapped);
    }
    noCache() {
        return this.setNoCache(EntitySearchOne);
    }
    cache(cacheForUpdate) {
        return this.setCache(EntitySearchOne, cacheForUpdate);
    }
}
//# sourceMappingURL=EntitySearchOne.js.map