import { container, DI } from '@airport/di';
import { TRANS_CONNECTOR } from '@airport/ground-control';
import { TRANS_SERVER } from '@airport/tower';
export class TransactionalConnector {
    async init() {
        const transServer = await container(this).get(TRANS_SERVER);
        await transServer.init();
    }
    async addRepository(name, url, platform, platformConfig, distributionStrategy) {
        const transServer = await container(this).get(TRANS_SERVER);
        return await transServer.addRepository(name, url, platform, platformConfig, distributionStrategy, {
            domainAndPort: 'test'
        });
    }
    async find(portableQuery, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANS_SERVER);
        return await transServer.find(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId);
    }
    async findOne(portableQuery, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANS_SERVER);
        return await transServer.findOne(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId);
    }
    async search(portableQuery, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANS_SERVER);
        return await transServer.search(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId);
    }
    async searchOne(portableQuery, cachedSqlQueryId) {
        const transServer = await container(this).get(TRANS_SERVER);
        return await transServer.searchOne(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId);
    }
}
DI.set(TRANS_CONNECTOR, TransactionalConnector);
export function injectTransactionalConnector() {
    console.log("Injecting TransactionalConnector");
}
//# sourceMappingURL=TransactionalConnector.js.map