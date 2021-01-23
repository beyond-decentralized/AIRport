import { QueryResultType } from '@airport/ground-control';
import { from } from 'rxjs';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearchOne extends EntityLookup {
    graph(rawGraphQuery, context) {
        return from(this.searchOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context));
    }
    tree(rawTreeQuery, context) {
        return from(this.searchOne(rawTreeQuery, QueryResultType.ENTITY_TREE, context));
    }
    searchOne(rawEntityQuery, queryResultType, context) {
        return this.entityLookup(rawEntityQuery, queryResultType, true, true, this.ensureContext(context));
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