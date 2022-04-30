var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/air-control';
let InternalTransactionalConnector = class InternalTransactionalConnector {
    callApi(_) {
        throw new Error(`InternalTransactionalConnector.callApi should never be called.
Interal Application API requests should be made directly (since
they are internal to the AIRport framework).`);
    }
    async addRepository(
    // url: string,
    // platform: PlatformType,
    // platformConfig: string,
    // distributionStrategy: DistributionStrategy,
    context) {
        return await this.transactionalServer.addRepository(
        // url,
        // platform,
        // platformConfig,
        // distributionStrategy,
        this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async find(portableQuery, context, cachedSqlQueryId) {
        return await this.transactionalServer.find(portableQuery, this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        return await this.transactionalServer.findOne(portableQuery, this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    search(portableQuery, context, cachedSqlQueryId) {
        return this.transactionalServer.search(portableQuery, this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    searchOne(portableQuery, context, cachedSqlQueryId) {
        return this.transactionalServer.searchOne(portableQuery, this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    async save(entity, context) {
        return await this.transactionalServer.save(entity, this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async saveToDestination(repositoryDestination, entity, context) {
        return await this.transactionalServer.saveToDestination(repositoryDestination, entity, this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async insertValues(portableQuery, context, ensureGeneratedValues // For internal use only
    ) {
        return await this.transactionalServer.insertValues(portableQuery, this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        }, ensureGeneratedValues);
    }
    async insertValuesGetIds(portableQuery, context) {
        return await this.transactionalServer.insertValuesGetIds(portableQuery, this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async updateValues(portableQuery, context) {
        return await this.transactionalServer.updateValues(portableQuery, this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async deleteWhere(portableQuery, context) {
        return await this.transactionalServer.deleteWhere(portableQuery, this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    onMessage(callback) {
        // Nothing to do, onMessage callback was added for demo purposes for Web implementations
    }
};
__decorate([
    Inject()
], InternalTransactionalConnector.prototype, "terminalStore", void 0);
__decorate([
    Inject()
], InternalTransactionalConnector.prototype, "transactionalServer", void 0);
InternalTransactionalConnector = __decorate([
    Injected()
], InternalTransactionalConnector);
export { InternalTransactionalConnector };
export function injectTransactionalConnector() {
    console.log('Injecting TransactionalConnector');
}
//# sourceMappingURL=InternalTransactionalConnector.js.map