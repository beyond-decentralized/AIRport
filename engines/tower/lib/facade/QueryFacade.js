var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/air-control';
let QueryFacade = class QueryFacade {
    async find(query, queryResultType, context) {
        await this.ensureContext(context);
        const result = await this.transactionalConnector.find(this.getPortableQuery(query, queryResultType, context), context);
        return result;
    }
    async findOne(query, queryResultType, context) {
        await this.ensureContext(context);
        const result = await this.transactionalConnector.findOne(this.getPortableQuery(query, queryResultType, context), context);
        return result;
    }
    getPortableQuery(query, queryResultType, context) {
        return {
            jsonQuery: query.toJSON(this.queryUtils, this.fieldUtils, this.relationManager),
            parameterMap: query.getParameters(),
            queryResultType,
            applicationIndex: context.dbEntity.applicationVersion.application.index,
            tableIndex: context.dbEntity.index,
            // values: query.values
        };
    }
    // FIXME: merge update caches on the client
    async search(query, queryResultType, context) {
        await this.ensureContext(context);
        let observable = await this.transactionalConnector.search(this.getPortableQuery(query, queryResultType, context), context);
        return observable;
    }
    async searchOne(query, queryResultType, context) {
        await this.ensureContext(context);
        let observable = await this.transactionalConnector.searchOne(this.getPortableQuery(query, queryResultType, context), context);
        return observable;
    }
    async ensureContext(context) {
    }
};
__decorate([
    Inject()
], QueryFacade.prototype, "fieldUtils", void 0);
__decorate([
    Inject()
], QueryFacade.prototype, "queryUtils", void 0);
__decorate([
    Inject()
], QueryFacade.prototype, "relationManager", void 0);
__decorate([
    Inject()
], QueryFacade.prototype, "transactionalConnector", void 0);
QueryFacade = __decorate([
    Injected()
], QueryFacade);
export { QueryFacade };
//# sourceMappingURL=QueryFacade.js.map