import { QueryResultType } from '@airport/ground-control';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class EntityFindOne extends EntityLookup {
    graph(rawGraphQuery, ctx) {
        return this.findOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH, ctx);
    }
    tree(rawTreeQuery, ctx) {
        return this.findOne(rawTreeQuery, QueryResultType.ENTITY_TREE, ctx);
    }
    findOne(rawEntityQuery, queryResultType, ctx) {
        return this.entityLookup(rawEntityQuery, queryResultType, false, true, this.ensureContext(ctx));
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