var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let QueryManager = class QueryManager {
    async find(portableQuery, context, cachedSqlQueryId) {
        await this.ensureRepositoryPresenceAndCurrentState(context);
        return await this.storeDriver.find(portableQuery, {}, context, cachedSqlQueryId);
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        await this.ensureRepositoryPresenceAndCurrentState(context);
        return await this.storeDriver.findOne(portableQuery, {}, context, cachedSqlQueryId);
    }
    search(portableQuery, context, cachedSqlQueryId) {
        // TODO: checking for presence of a repository in in an observable
        // await this.ensureRepositoryPresenceAndCurrentState(context)
        return this.storeDriver.search(portableQuery, {}, context, cachedSqlQueryId);
    }
    searchOne(portableQuery, context, cachedSqlQueryId) {
        // TODO: checking for presence of a repository in in an observable
        // await this.ensureRepositoryPresenceAndCurrentState(context)
        return this.storeDriver.searchOne(portableQuery, {}, context, cachedSqlQueryId);
    }
    async ensureRepositoryPresenceAndCurrentState(context) {
        if (context.repository && context.repository.source && context.repository.GUID) {
            await this.repositoryLoader.loadRepository(context.repository.source, context.repository.GUID, context);
        }
    }
};
__decorate([
    Inject()
], QueryManager.prototype, "repositoryLoader", void 0);
__decorate([
    Inject()
], QueryManager.prototype, "storeDriver", void 0);
QueryManager = __decorate([
    Injected()
], QueryManager);
export { QueryManager };
//# sourceMappingURL=QueryManager.js.map