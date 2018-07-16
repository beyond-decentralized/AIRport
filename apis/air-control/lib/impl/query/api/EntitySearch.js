import { QueryResultType } from "@airport/ground-control";
import { EntityLookup } from "./EntityLookup";
/**
 * Created by Papa on 11/12/2016.
 */
export class EntitySearch extends EntityLookup {
    constructor(dbEntity, dbFacade, utils) {
        super();
        this.dbEntity = dbEntity;
        this.dbFacade = dbFacade;
        this.utils = utils;
    }
    graph(rawGraphQuery) {
        let entityQuery = this.utils.Entity.getEntityQuery(rawGraphQuery);
        const cacheForUpdate = this.cleanNextCallState();
        return this.dbFacade.entity.search(this.dbEntity, entityQuery, QueryResultType.ENTITY_GRAPH, cacheForUpdate);
    }
    tree(rawTreeQuery) {
        let entityQuery = this.utils.Entity.getEntityQuery(rawTreeQuery);
        const cacheForUpdate = this.cleanNextCallState();
        return this.dbFacade.entity.search(this.dbEntity, entityQuery, QueryResultType.ENTITY_TREE, cacheForUpdate);
    }
}
//# sourceMappingURL=EntitySearch.js.map