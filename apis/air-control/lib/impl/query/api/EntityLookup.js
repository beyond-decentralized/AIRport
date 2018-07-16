import { QueryResultType } from "@airport/ground-control";
import { UpdateCacheType } from "../../../lingo/query/api/EntityLookup";
export class EntityLookup {
    constructor() {
        this.saveNextCallInUpdateCache = UpdateCacheType.NONE;
        this.isMapped = false;
    }
    get mapped() {
        this.isMapped = true;
        return this;
    }
    getQueryResultType(baseQueryResultType) {
        switch (baseQueryResultType) {
            case QueryResultType.ENTITY_GRAPH:
                if (this.isMapped) {
                    return QueryResultType.MAPPED_ENTITY_GRAPH;
                }
                return QueryResultType.ENTITY_GRAPH;
            case QueryResultType.ENTITY_TREE:
                if (this.isMapped) {
                    return QueryResultType.MAPPED_ENTITY_TREE;
                }
                return QueryResultType.ENTITY_TREE;
            default:
                throw `Unexpected Base Query ResultType: '${baseQueryResultType}'.`;
        }
    }
    andCacheForUpdate(cacheForUpdateState = UpdateCacheType.ROOT_QUERY_ENTITIES) {
        this.saveNextCallInUpdateCache = cacheForUpdateState;
        return this;
    }
    cleanNextCallState() {
        const saveCurrentCallInUpdateCache = this.saveNextCallInUpdateCache;
        this.saveNextCallInUpdateCache = UpdateCacheType.NONE;
        return saveCurrentCallInUpdateCache;
    }
}
//# sourceMappingURL=EntityLookup.js.map