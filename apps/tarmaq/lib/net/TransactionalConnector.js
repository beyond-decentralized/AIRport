"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const tower_1 = require("@airport/tower");
class TransactionalConnector {
    async init() {
        const transServer = await di_1.DI.get(tower_1.TRANS_SERVER);
        await transServer.init();
    }
    async addRepository(name, url, platform, platformConfig, distributionStrategy) {
        const transServer = await di_1.DI.get(tower_1.TRANS_SERVER);
        return await transServer.addRepository(name, url, platform, platformConfig, distributionStrategy, {
            domainAndPort: 'test'
        });
    }
    async transact() {
        const transServer = await di_1.DI.get(tower_1.TRANS_SERVER);
        return await transServer.transact({
            domainAndPort: 'test'
        });
    }
    async rollback() {
        const transServer = await di_1.DI.get(tower_1.TRANS_SERVER);
        return await transServer.rollback({
            domainAndPort: 'test'
        });
    }
    async commit() {
        const transServer = await di_1.DI.get(tower_1.TRANS_SERVER);
        return await transServer.commit({
            domainAndPort: 'test'
        });
    }
    async find(portableQuery, cachedSqlQueryId) {
        const transServer = await di_1.DI.get(tower_1.TRANS_SERVER);
        return await transServer.find(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId);
    }
    async findOne(portableQuery, cachedSqlQueryId) {
        const transServer = await di_1.DI.get(tower_1.TRANS_SERVER);
        return await transServer.findOne(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId);
    }
    async search(portableQuery, cachedSqlQueryId) {
        const transServer = await di_1.DI.get(tower_1.TRANS_SERVER);
        return await transServer.search(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId);
    }
    async searchOne(portableQuery, cachedSqlQueryId) {
        const transServer = await di_1.DI.get(tower_1.TRANS_SERVER);
        return await transServer.searchOne(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId);
    }
    async insertValues(portableQuery, transactionIndex, ensureGeneratedValues // For internal use only
    ) {
        const transServer = await di_1.DI.get(tower_1.TRANS_SERVER);
        return await transServer.insertValues(portableQuery, {
            domainAndPort: 'test'
        }, transactionIndex, ensureGeneratedValues);
    }
    async insertValuesGetIds(portableQuery, transactionIndex) {
        const transServer = await di_1.DI.get(tower_1.TRANS_SERVER);
        return await transServer.insertValuesGetIds(portableQuery, {
            domainAndPort: 'test'
        }, transactionIndex);
    }
    async updateValues(portableQuery, transactionIndex) {
        const transServer = await di_1.DI.get(tower_1.TRANS_SERVER);
        return await transServer.updateValues(portableQuery, {
            domainAndPort: 'test'
        }, transactionIndex);
    }
    async deleteWhere(portableQuery, transactionIndex) {
        const transServer = await di_1.DI.get(tower_1.TRANS_SERVER);
        return await transServer.deleteWhere(portableQuery, {
            domainAndPort: 'test'
        }, transactionIndex);
    }
}
exports.TransactionalConnector = TransactionalConnector;
di_1.DI.set(ground_control_1.TRANS_CONNECTOR, TransactionalConnector);
//# sourceMappingURL=TransactionalConnector.js.map