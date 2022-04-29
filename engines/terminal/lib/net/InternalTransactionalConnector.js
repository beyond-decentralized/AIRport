import { DEPENDENCY_INJECTION } from '@airport/direction-indicator';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { TERMINAL_STORE, TRANSACTIONAL_SERVER } from '@airport/terminal-map';
export class InternalTransactionalConnector {
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
    async startTransaction(context) {
        return await this.transactionalServer.startTransaction(this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async commit(context) {
        return await this.transactionalServer.commit(this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async rollback(context) {
        return await this.transactionalServer.rollback(this.terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    onMessage(callback) {
        // Nothing to do, onMessage callback was added for demo purposes for Web implementations
    }
}
DEPENDENCY_INJECTION.set(TRANSACTIONAL_CONNECTOR, InternalTransactionalConnector);
TRANSACTIONAL_CONNECTOR.setDependencies({
    terminalStore: TERMINAL_STORE,
    transactionalServer: TRANSACTIONAL_SERVER
});
export function injectTransactionalConnector() {
    console.log('Injecting TransactionalConnector');
}
//# sourceMappingURL=InternalTransactionalConnector.js.map