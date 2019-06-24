"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const tower_1 = require("@airport/tower");
class TransactionalConnector {
    constructor() {
        di_1.DI.get((databaseFacade, transServer) => {
            this.dbFacade = databaseFacade;
            this.transServer = transServer;
        }, air_control_1.DB_FACADE, tower_1.TRANS_SERVER);
    }
    async init() {
        this.dbFacade = await di_1.DI.getP(air_control_1.DB_FACADE);
        this.transServer = await di_1.DI.getP(tower_1.TRANS_SERVER);
        await this.transServer.init();
        await this.dbFacade.init();
    }
    async addRepository(name, url, platform, platformConfig, distributionStrategy) {
        return await this.transServer.addRepository(name, url, platform, platformConfig, distributionStrategy, {
            domainAndPort: 'test'
        });
    }
    async transact() {
        await this.transServer.transact({
            domainAndPort: 'test'
        });
    }
    async rollback() {
        await this.transServer.rollback({
            domainAndPort: 'test'
        });
    }
    async commit() {
        await this.transServer.commit({
            domainAndPort: 'test'
        });
    }
    async find(portableQuery, cachedSqlQueryId) {
        return await this.transServer.find(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId);
    }
    async findOne(portableQuery, cachedSqlQueryId) {
        return await this.transServer.findOne(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId);
    }
    search(portableQuery, cachedSqlQueryId) {
        return this.transServer.search(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId);
    }
    searchOne(portableQuery, cachedSqlQueryId) {
        return this.transServer.searchOne(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId);
    }
    async insertValues(portableQuery, transactionIndex, ensureGeneratedValues // For internal use only
    ) {
        return await this.transServer.insertValues(portableQuery, {
            domainAndPort: 'test'
        }, transactionIndex, ensureGeneratedValues);
    }
    async insertValuesGetIds(portableQuery, transactionIndex) {
        return await this.transServer.insertValuesGetIds(portableQuery, {
            domainAndPort: 'test'
        }, transactionIndex);
    }
    async updateValues(portableQuery, transactionIndex) {
        return await this.transServer.updateValues(portableQuery, {
            domainAndPort: 'test'
        }, transactionIndex);
    }
    async deleteWhere(portableQuery, transactionIndex) {
        return await this.transServer.updateValues(portableQuery, {
            domainAndPort: 'test'
        }, transactionIndex);
    }
}
exports.TransactionalConnector = TransactionalConnector;
di_1.DI.set(ground_control_1.TRANS_CONNECTOR, TransactionalConnector);
//# sourceMappingURL=TransactionalConnector.js.map