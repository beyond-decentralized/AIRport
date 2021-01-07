import { container, DI } from '@airport/di';
import { TRANS_CONNECTOR } from '@airport/ground-control';
import { TRANS_SERVER } from '@airport/tower';
export class TransactionalConnector {
    async init() {
        const transServer = await container(this).get(TRANS_SERVER);
        await transServer.init();
    }
    async addRepository(name, url, platform, platformConfig, distributionStrategy, context) {
        const transServer = await container(this).get(TRANS_SERVER);
        return await transServer.addRepository(name, url, platform, platformConfig, distributionStrategy, {
            domainAndPort: 'test'
        }, context);
    }
    async find(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANS_SERVER);
        return await transServer.find(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    async findOne(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANS_SERVER);
        return await transServer.findOne(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    async search(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANS_SERVER);
        return await transServer.search(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    async searchOne(portableQuery, context, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANS_SERVER);
        return await transServer.searchOne(portableQuery, {
            domainAndPort: 'test'
        }, context, cachedSqlQueryId);
    }
    save(entity, context) {
        throw new Error(`Not Implemented`);
    }
}
DI.set(TRANS_CONNECTOR, TransactionalConnector);
export function injectTransactionalConnector() {
    // console.log('Injecting TransactionalConnector')
}
//# sourceMappingURL=TransactionalConnector.js.map