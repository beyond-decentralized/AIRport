import { container, DI } from '@airport/di';
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
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return await transServer.addRepository(
        // url,
        // platform,
        // platformConfig,
        // distributionStrategy,
        terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async find(portableQuery, context, cachedSqlQueryId) {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return await transServer.find(portableQuery, terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return await transServer.findOne(portableQuery, terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    search(portableQuery, context, cachedSqlQueryId) {
        const [terminalStore, transServer] = container(this)
            .getSync(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return transServer.search(portableQuery, terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    searchOne(portableQuery, context, cachedSqlQueryId) {
        const [terminalStore, transServer] = container(this)
            .getSync(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return transServer.searchOne(portableQuery, terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    async save(entity, context) {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return await transServer.save(entity, terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async saveToDestination(repositoryDestination, entity, context) {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return await transServer.saveToDestination(repositoryDestination, entity, terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async insertValues(portableQuery, context, ensureGeneratedValues // For internal use only
    ) {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return await transServer.insertValues(portableQuery, terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        }, ensureGeneratedValues);
    }
    async insertValuesGetIds(portableQuery, context) {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return await transServer.insertValuesGetIds(portableQuery, terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async updateValues(portableQuery, context) {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return await transServer.updateValues(portableQuery, terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async deleteWhere(portableQuery, context) {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return await transServer.deleteWhere(portableQuery, terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async startTransaction(context) {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return await transServer.startTransaction(terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async commit(context) {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return await transServer.commit(terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    async rollback(context) {
        const [terminalStore, transServer] = await container(this)
            .get(TERMINAL_STORE, TRANSACTIONAL_SERVER);
        return await transServer.rollback(terminalStore.getInternalConnector().internalCredentials, {
            internal: true,
            ...context
        });
    }
    onMessage(callback) {
        // Nothing to do, onMessage callback was added for demo purposes for Web implementations
    }
}
DI.set(TRANSACTIONAL_CONNECTOR, InternalTransactionalConnector);
export function injectTransactionalConnector() {
    console.log('Injecting TransactionalConnector');
}
//# sourceMappingURL=InternalTransactionalConnector.js.map