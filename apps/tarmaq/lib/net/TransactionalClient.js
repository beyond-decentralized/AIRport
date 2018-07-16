"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransactionalClient {
    constructor(databaseFacade) {
        this.databaseFacade = databaseFacade;
    }
    async startTransaction() {
        throw `Not implemented`;
    }
    async rollbackTransaction(transactionIndex) {
        throw `Not implemented`;
    }
    async commitTransaction(transactionIndex) {
        throw `Not implemented`;
    }
    async find(portableQuery, cachedSqlQueryId) {
        throw `Not implemented`;
    }
    async findOne(portableQuery, cachedSqlQueryId) {
        throw `Not implemented`;
    }
    async insertValues(portableQuery, transactionIndex) {
        throw `Not implemented`;
    }
    async updateValues(portableQuery, transactionIndex) {
        throw `Not implemented`;
    }
    deleteWhere(portableQuery, transactionIndex) {
        throw `Not implemented`;
    }
    search(portableQuery, cacheForUpdate) {
        this.databaseFacade.cacheForUpdate(undefined, undefined);
        this.databaseFacade.releaseCachedForUpdate(undefined, undefined);
        throw `Not implemented`;
    }
    searchOne(portableQuery, cacheForUpdate) {
        this.databaseFacade.cacheForUpdate(undefined, undefined);
        this.databaseFacade.releaseCachedForUpdate(undefined, undefined);
        throw `Not implemented`;
    }
    addRepository(name, url, platform, platformConfig, distributionStrategy) {
        throw `Not implemented`;
    }
}
exports.TransactionalClient = TransactionalClient;
//# sourceMappingURL=TransactionalClient.js.map