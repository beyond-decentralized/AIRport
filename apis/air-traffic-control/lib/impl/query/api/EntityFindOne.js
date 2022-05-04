import { QueryResultType } from '@airport/ground-control';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class EntityFindOne extends EntityLookup {
    async graph(rawGraphQuery, context) {
        return await this.findOne(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context);
    }
    async tree(rawTreeQuery, context) {
        return await this.findOne(rawTreeQuery, QueryResultType.ENTITY_TREE, context);
    }
    // TODO: return Observable from deep within the framework
    // and detect changes to the underlying data
    async findOne(rawEntityQuery, queryResultType, context) {
        return await this.entityLookup(rawEntityQuery, queryResultType, false, true, this.ensureContext(context));
    }
    map(isMapped) {
        return this.setMap(EntityFindOne, isMapped);
    }
    noCache() {
        return this.setNoCache(EntityFindOne);
    }
}
//# sourceMappingURL=EntityFindOne.js.map