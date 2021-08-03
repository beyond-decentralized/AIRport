import { QueryResultType } from '@airport/ground-control';
import { from } from 'rxjs';
import { EntityLookup } from './EntityLookup';
/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearch extends EntityLookup {
    graph(rawGraphQuery, context) {
        return from(this.search(rawGraphQuery, QueryResultType.ENTITY_TREE, context));
    }
    tree(rawTreeQuery, context) {
        return from(this.search(rawTreeQuery, QueryResultType.ENTITY_TREE, context));
    }
    async search(rawEntityQuery, queryResultType, context) {
        return await this.entityLookup(rawEntityQuery, queryResultType, true, false, this.ensureContext(context));
    }
    map(isMapped) {
        return this.setMap(EntitySearch, isMapped);
    }
    noCache() {
        return this.setNoCache(EntitySearch);
    }
}
//# sourceMappingURL=EntitySearch.js.map