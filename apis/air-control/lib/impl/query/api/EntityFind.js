import { QueryResultType } from "@airport/ground-control";
import { EntityLookup } from "./EntityLookup";
/**
 * Created by Papa on 11/12/2016.
 */
export class EntityFind extends EntityLookup {
    constructor(dbEntity, dbFacade, utils) {
        super();
        this.dbEntity = dbEntity;
        this.dbFacade = dbFacade;
        this.utils = utils;
    }
    async graph(rawGraphQuery) {
        const entityQuery = this.utils.Entity.getEntityQuery(rawGraphQuery);
        const cacheForUpdate = this.cleanNextCallState();
        return await this.dbFacade.entity.find(this.dbEntity, entityQuery, this.getQueryResultType(QueryResultType.ENTITY_GRAPH), cacheForUpdate);
    }
    async tree(rawTreeQuery) {
        const entityQuery = this.utils.Entity.getEntityQuery(rawTreeQuery);
        const cacheForUpdate = this.cleanNextCallState();
        return await this.dbFacade.entity.find(this.dbEntity, entityQuery, this.getQueryResultType(QueryResultType.ENTITY_TREE), cacheForUpdate);
    }
}
//# sourceMappingURL=EntityFind.js.map