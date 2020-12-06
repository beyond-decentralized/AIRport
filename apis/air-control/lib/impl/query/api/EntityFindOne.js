import { QueryResultType } from '@airport/ground-control';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class EntityFindOne extends EntityLookup {
    graph(rawGraphQuery, context) {
        return this.findOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context);
    }
    tree(rawTreeQuery, context) {
        return this.findOne(rawTreeQuery, QueryResultType.ENTITY_TREE, context);
    }
    findOne(rawEntityQuery, queryResultType, context) {
        return this.entityLookup(rawEntityQuery, queryResultType, false, true, this.ensureContext(context));
    }
    map(isMapped) {
        return this.setMap(EntityFindOne, isMapped);
    }
    noCache() {
        return this.setNoCache(EntityFindOne);
    }
    cache(cacheForUpdate) {
        return this.setCache(EntityFindOne, cacheForUpdate);
    }
}
//# sourceMappingURL=EntityFindOne.js.map