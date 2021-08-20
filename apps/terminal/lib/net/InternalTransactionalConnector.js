import { container, DI } from '@airport/di';
import { TRANSACTIONAL_CONNECTOR } from '@airport/ground-control';
import { TRANSACTIONAL_SERVER } from '@airport/terminal-map';
var _isServer = false;
export function setIsServer() {
    _isServer = true;
}
export function isServer() {
    return _isServer;
}
export class TransactionalConnector {
    async init() {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        await transServer.init();
    }
    async addRepository(name, url, platform, platformConfig, distributionStrategy, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.addRepository(name, url, platform, platformConfig, distributionStrategy, {
            domainAndPort: 'test'
        }, context);
    }
    async find(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.find(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.findOne(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    async search(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.search(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    async searchOne(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.searchOne(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    async save(entity, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.save(entity, null, context);
    }
    async insertValues(portableQuery, context, ensureGeneratedValues // For internal use only
    ) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.insertValues(portableQuery, null, context, ensureGeneratedValues);
    }
    async insertValuesGetIds(portableQuery, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.insertValuesGetIds(portableQuery, null, context);
    }
    async updateValues(portableQuery, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.updateValues(portableQuery, null, context);
    }
    async deleteWhere(portableQuery, context) {
        const transServer = await container(this).get(TRANSACTIONAL_SERVER);
        return await transServer.deleteWhere(portableQuery, null, context);
    }
}
DI.set(TRANSACTIONAL_CONNECTOR, TransactionalConnector);
export function injectTransactionalConnector() {
    // console.log('Injecting TransactionalConnector')
}
//# sourceMappingURL=InternalTransactionalConnector.js.map