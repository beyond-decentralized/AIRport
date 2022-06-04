import { QueryResultType } from '@airport/ground-control';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class EntityFind extends EntityLookup {
    async graph(rawGraphQuery, context) {
        return await this.find(rawGraphQuery, QueryResultType.ENTITY_GRAPH, context);
    }
    async tree(rawTreeQuery, context) {
        return await this.find(rawTreeQuery, QueryResultType.ENTITY_TREE, context);
    }
    async find(rawEntityQuery, queryResultType, context) {
        return await this.entityLookup(rawEntityQuery, queryResultType, false, false, this.ensureContext(context));
    }
    noCache() {
        return this.setNoCache(EntityFind);
    }
}
//# sourceMappingURL=EntityFind.js.map