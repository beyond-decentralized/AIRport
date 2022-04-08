import { container, DI } from '@airport/di';
import { INTERNAL_DOMAIN, TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { TRANSACTIONAL_SERVER } from '@airport/terminal-map';
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
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.addRepository(
        // url,
        // platform,
        // platformConfig,
        // distributionStrategy,
        {
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
            internal: true,
            ...context
        });
    }
    async find(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.find(portableQuery, {
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.findOne(portableQuery, {
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    search(portableQuery, context, cachedSqlQueryId) {
        const transServer = container(this).getSync(TRANSACTIONAL_SERVER);
        return transServer.search(portableQuery, {
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    searchOne(portableQuery, context, cachedSqlQueryId) {
        const transServer = container(this).getSync(TRANSACTIONAL_SERVER);
        return transServer.searchOne(portableQuery, {
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    async save(entity, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.save(entity, {
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
            internal: true,
            ...context
        });
    }
    async saveToDestination(repositoryDestination, entity, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.saveToDestination(repositoryDestination, entity, {
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
            internal: true,
            ...context
        });
    }
    async insertValues(portableQuery, context, ensureGeneratedValues // For internal use only
    ) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.insertValues(portableQuery, {
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
            internal: true,
            ...context
        }, ensureGeneratedValues);
    }
    async insertValuesGetIds(portableQuery, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.insertValuesGetIds(portableQuery, {
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
            internal: true,
            ...context
        });
    }
    async updateValues(portableQuery, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.updateValues(portableQuery, {
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
            internal: true,
            ...context
        });
    }
    async deleteWhere(portableQuery, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.deleteWhere(portableQuery, {
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
            internal: true,
            ...context
        });
    }
    async startTransaction(context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.startTransaction({
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
            internal: true,
            ...context
        });
    }
    async commit(context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.commit({
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
            internal: true,
            ...context
        });
    }
    async rollback(context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.rollback({
            application: null,
            domain: INTERNAL_DOMAIN
        }, {
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