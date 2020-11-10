import { QueryResultType } from '@airport/ground-control';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class EntityFind extends EntityLookup {
    graph(rawGraphQuery, ctx) {
        return this.find(rawGraphQuery, QueryResultType.ENTITY_GRAPH, ctx);
    }
    tree(rawTreeQuery, ctx) {
        return this.find(rawTreeQuery, QueryResultType.ENTITY_TREE, ctx);
    }
    find(rawEntityQuery, queryResultType, ctx) {
        return this.entityLookup(rawEntityQuery, queryResultType, false, false, this.ensureContext(ctx));
    }
    map(isMapped) {
        return this.setMap(EntityFind, isMapped);
    }
    noCache() {
        return this.setNoCache(EntityFind);
    }
    cache(cacheForUpdate) {
        return this.setCache(EntityFind, cacheForUpdate);
    }
}
//# sourceMappingURL=EntityFind.js.map