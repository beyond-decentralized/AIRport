import { container, DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { TRANSACTIONAL_SERVER } from '@airport/terminal-map';
export class TransactionalConnector {
    async addRepository(name, url, platform, platformConfig, distributionStrategy, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.addRepository(name, url, platform, platformConfig, distributionStrategy, {
            domainAndPort: 'test'
        }, {
            internal: true,
            ...context
        });
    }
    async find(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.find(portableQuery, {
            domainAndPort: 'test'
        }, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.findOne(portableQuery, {
            domainAndPort: 'test'
        }, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    search(portableQuery, context, cachedSqlQueryId) {
        const transServer = container(this).getSync(TRANSACTIONAL_SERVER);
        return transServer.search(portableQuery, {
            domainAndPort: 'test'
        }, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    searchOne(portableQuery, context, cachedSqlQueryId) {
        const transServer = container(this).getSync(TRANSACTIONAL_SERVER);
        return transServer.searchOne(portableQuery, {
            domainAndPort: 'test'
        }, {
            internal: true,
            ...context
        }, cachedSqlQueryId);
    }
    async save(entity, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.save(entity, null, {
            internal: true,
            ...context
        });
    }
    async insertValues(portableQuery, context, ensureGeneratedValues // For internal use only
    ) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.insertValues(portableQuery, null, {
            internal: true,
            ...context
        }, ensureGeneratedValues);
    }
    async insertValuesGetIds(portableQuery, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.insertValuesGetIds(portableQuery, null, {
            internal: true,
            ...context
        });
    }
    async updateValues(portableQuery, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.updateValues(portableQuery, null, {
            internal: true,
            ...context
        });
    }
    async deleteWhere(portableQuery, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.deleteWhere(portableQuery, null, {
            internal: true,
            ...context
        });
    }
    async startTransaction(context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.startTransaction(null, {
            internal: true,
            ...context
        });
    }
    async commit(context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.commit(null, {
            internal: true,
            ...context
        });
    }
    async rollback(context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.rollback(null, {
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