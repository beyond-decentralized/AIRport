import { QueryResultType } from '@airport/ground-control';
import { Observable } from '@airport/observe';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearchOne extends EntityLookup {
    graph(rawGraphQuery, ctx) {
        return Observable.from(this.searchOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH, ctx));
    }
    tree(rawTreeQuery, ctx) {
        return Observable.from(this.searchOne(rawTreeQuery, QueryResultType.ENTITY_TREE, ctx));
    }
    searchOne(rawEntityQuery, queryResultType, ctx) {
        return this.entityLookup(rawEntityQuery, queryResultType, true, true, this.ensureContext(ctx));
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