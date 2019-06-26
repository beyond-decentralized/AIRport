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
    addRepository(name, url, platform, platformConfig, distributionStrategy) {
        return di_1.DI.get(tower_1.TRANS_SERVER).then(transServer => transServer.addRepository(name, url, platform, platformConfig, distributionStrategy, {
            domainAndPort: 'test'
        }));
    }
    transact() {
        return di_1.DI.get(tower_1.TRANS_SERVER).then(transServer => transServer.transact({
            domainAndPort: 'test'
        }));
    }
    rollback() {
        return di_1.DI.get(tower_1.TRANS_SERVER).then(transServer => transServer.rollback({
            domainAndPort: 'test'
        }));
    }
    commit() {
        return di_1.DI.get(tower_1.TRANS_SERVER).then(transServer => transServer.commit({
            domainAndPort: 'test'
        }));
    }
    find(portableQuery, cachedSqlQueryId) {
        return di_1.DI.get(tower_1.TRANS_SERVER).then(transServer => transServer.find(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId));
    }
    findOne(portableQuery, cachedSqlQueryId) {
        return di_1.DI.get(tower_1.TRANS_SERVER).then(transServer => transServer.findOne(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId));
    }
    search(portableQuery, cachedSqlQueryId) {
        return di_1.DI.get(tower_1.TRANS_SERVER).then(transServer => transServer.search(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId));
    }
    searchOne(portableQuery, cachedSqlQueryId) {
        return di_1.DI.get(tower_1.TRANS_SERVER).then(transServer => transServer.searchOne(portableQuery, {
            domainAndPort: 'test'
        }, cachedSqlQueryId));
    }
    insertValues(portableQuery, transactionIndex, ensureGeneratedValues // For internal use only
    ) {
        return di_1.DI.get(tower_1.TRANS_SERVER).then(transServer => transServer.insertValues(portableQuery, {
            domainAndPort: 'test'
        }, transactionIndex, ensureGeneratedValues));
    }
    insertValuesGetIds(portableQuery, transactionIndex) {
        return di_1.DI.get(tower_1.TRANS_SERVER).then(transServer => transServer.insertValuesGetIds(portableQuery, {
            domainAndPort: 'test'
        }, transactionIndex));
    }
    updateValues(portableQuery, transactionIndex) {
        return di_1.DI.get(tower_1.TRANS_SERVER).then(transServer => transServer.updateValues(portableQuery, {
            domainAndPort: 'test'
        }, transactionIndex));
    }
    deleteWhere(portableQuery, transactionIndex) {
        return di_1.DI.get(tower_1.TRANS_SERVER).then(transServer => transServer.updateValues(portableQuery, {
            domainAndPort: 'test'
        }, transactionIndex));
    }
}
exports.TransactionalConnector = TransactionalConnector;
di_1.DI.set(ground_control_1.TRANS_CONNECTOR, TransactionalConnector);
//# sourceMappingURL=TransactionalConnector.js.map