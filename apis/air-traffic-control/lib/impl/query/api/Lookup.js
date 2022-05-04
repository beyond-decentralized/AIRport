var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { QueryResultType } from '@airport/ground-control';
import { Inject, Injected } from '@airport/direction-indicator';
export class LookupProxy {
    constructor(dao) {
        this.dao = dao;
    }
    ensureContext(context) {
        return doEnsureContext(context);
    }
    async lookup(rawQuery, queryResultType, search, one, QueryClass, context, mapResults) {
        return await this.dao.lookup.lookup(rawQuery, queryResultType, search, one, QueryClass, context, mapResults);
    }
}
let Lookup = class Lookup {
    ensureContext(context) {
        return doEnsureContext(context);
    }
    async lookup(rawQuery, queryResultType, search, one, QueryClass, context, mapResults) {
        let query;
        if (QueryClass) {
            const rawNonEntityQuery = this.entityUtils.getQuery(rawQuery);
            query = new QueryClass(rawNonEntityQuery);
        }
        else {
            query = this.entityUtils.getEntityQuery(rawQuery);
            queryResultType = this.getQueryResultType(queryResultType, mapResults);
        }
        let queryMethod;
        if (search) {
            if (one) {
                queryMethod = this.queryFacade.searchOne;
            }
            else {
                queryMethod = this.queryFacade.search;
            }
        }
        else {
            if (one) {
                queryMethod = this.queryFacade.findOne;
            }
            else {
                queryMethod = this.queryFacade.find;
            }
        }
        let result = await queryMethod.call(this.queryFacade, query, this.getQueryResultType(queryResultType, mapResults), context);
        if (!one && !result) {
            result = [];
        }
        return result;
    }
    getQueryResultType(baseQueryResultType, mapResults) {
        switch (baseQueryResultType) {
            case QueryResultType.ENTITY_GRAPH:
                if (mapResults) {
                    return QueryResultType.MAPPED_ENTITY_GRAPH;
                }
                return QueryResultType.ENTITY_GRAPH;
            case QueryResultType.ENTITY_TREE:
                if (mapResults) {
                    return QueryResultType.MAPPED_ENTITY_TREE;
                }
                return QueryResultType.ENTITY_TREE;
            case QueryResultType.FIELD:
            case QueryResultType.RAW:
            case QueryResultType.TREE:
            case QueryResultType.SHEET:
                return baseQueryResultType;
            default:
                throw new Error(`Unexpected Base Query ResultType: '${baseQueryResultType}'.`);
        }
    }
};
__decorate([
    Inject()
], Lookup.prototype, "entityUtils", void 0);
__decorate([
    Inject()
], Lookup.prototype, "queryFacade", void 0);
Lookup = __decorate([
    Injected()
], Lookup);
export { Lookup };
export function doEnsureContext(context) {
    if (!context) {
        context = {};
    }
    if (!context.startedAt) {
        context.startedAt = new Date();
    }
    return context;
}
//# sourceMappingURL=Lookup.js.map