import { container, DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { TRANSACTIONAL_SERVER } from '@airport/terminal-map';
export class TransactionalConnector {
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
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        });
    }
    async getApplicationRepositories(context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.getApplicationRepositories({
            applicationSignature: 'internal'
        }, context);
    }
    async find(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.find(portableQuery, {
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.findOne(portableQuery, {
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    search(portableQuery, context, cachedSqlQueryId) {
        const transServer = container(this).getSync(TRANSACTIONAL_SERVER);
        return transServer.search(portableQuery, {
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    searchOne(portableQuery, context, cachedSqlQueryId) {
        const transServer = container(this).getSync(TRANSACTIONAL_SERVER);
        return transServer.searchOne(portableQuery, {
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    async save(entity, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.save(entity, {
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        });
    }
    async saveToDestination(repositoryDestination, entity, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.saveToDestination(repositoryDestination, entity, {
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        });
    }
    async insertValues(portableQuery, context, ensureGeneratedValues // For internal use only
    ) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.insertValues(portableQuery, {
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        }, ensureGeneratedValues);
    }
    async insertValuesGetIds(portableQuery, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.insertValuesGetIds(portableQuery, {
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        });
    }
    async updateValues(portableQuery, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.updateValues(portableQuery, {
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        });
    }
    async deleteWhere(portableQuery, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.deleteWhere(portableQuery, {
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        });
    }
    async startTransaction(context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.startTransaction({
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        });
    }
    async commit(context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.commit({
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        });
    }
    async rollback(context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.rollback({
            applicationSignature: 'internal'
        }, {
            internal: true,
            ...context
        });
    }
    onMessage(callback) {
        // Nothing to do, onMessage callback was added for demo purposes for Web implementations
    }
}
DI.set(TRANSACTIONAL_CONNECTOR, TransactionalConnector);
export function injectTransactionalConnector() {
    console.log('Injecting TransactionalConnector');
}
//# sourceMappingURL=InternalTransactionalConnector.js.map