import { QueryResultType } from '@airport/ground-control';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class EntityFind extends EntityLookup {
    graph(rawGraphQuery, context) {
        return this.find(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context);
    }
    tree(rawTreeQuery, context) {
        return this.find(rawTreeQuery, QueryResultType.ENTITY_TREE, context);
    }
    find(rawEntityQuery, queryResultType, context) {
        return this.entityLookup(rawEntityQuery, queryResultType, false, false, this.ensureContext(context));
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