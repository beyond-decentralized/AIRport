"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("../diTokens");
/**
 * Keeps track of transactions, per client and validates that a given
 * transaction belongs to the provided client.  If the connection
 * information matches, passes the transaction for handling.
 *
 * All transactions are queued.  Read operations are not blocked while
 * any transaction is in progress.  Best way to make sure that you get
 * the latest state is to subscribe to a query, which is guaranteed to
 * be updated after data has changed.
 *
 *
 * Should read operations be blocked while transactions are in process?
 * Probably not since they will just get snapshot of the state at any
 * given point in time and transactionality takes care of not exposing
 * inconsistent state.  There doesn't appear to be a need to que-up
 * read transactions, since SqLite can handle it:
 *
 * https://www.skoumal.net/en/parallel-read-and-write-in-sqlite/
 *
 * Also, there doesn't appear to be a reason to prioritize remote transactions
 * over local ones, since ultimately the state needs to sync either way.
 * A single transactional queue should be enough.
 *
 */
class TransactionalServer {
    constructor() {
        this.activeTransactions = {};
        this.lastTransactionIndex = 0;
        di_1.DI.get((deleteManager, insertManager, queryManager, transactionManager, updateManager) => {
            this.deleteManager = deleteManager;
            this.insertManager = insertManager;
            this.queryManager = queryManager;
            this.transactionManager = transactionManager;
            this.updateManager = updateManager;
        }, diTokens_1.DELETE_MANAGER, diTokens_1.INSERT_MANAGER, diTokens_1.QUERY_MANAGER, terminal_map_1.TRANSACTION_MANAGER, diTokens_1.UPDATE_MANAGER);
    }
    async startTransaction() {
        this.lastTransactionIndex++;
        await this.transactionManager.startTransaction(this.lastTransactionIndex);
        this.currentTransactionIndex = this.lastTransactionIndex;
        return this.lastTransactionIndex;
    }
    async rollbackTransaction(transactionIndex) {
        await this.transactionManager.rollbackTransaction(transactionIndex);
        this.currentTransactionIndex = null;
    }
    async commitTransaction(transactionIndex) {
        await this.transactionManager.commitTransaction(transactionIndex);
        this.currentTransactionIndex = null;
    }
    async find(portableQuery, cachedSqlQueryId) {
        return await this.queryManager.find(portableQuery, cachedSqlQueryId);
    }
    async findOne(portableQuery, cachedSqlQueryId) {
        return await this.queryManager.findOne(portableQuery, cachedSqlQueryId);
    }
    search(portableQuery, cachedSqlQueryId) {
        return this.queryManager.search(portableQuery);
    }
    searchOne(portableQuery, cachedSqlQueryId) {
        return this.queryManager.searchOne(portableQuery);
    }
    async addRepository(name, url, platform, platformConfig, distributionStrategy) {
        return this.insertManager.addRepository(name, url, platform, platformConfig, distributionStrategy);
    }
    async insertValues(portableQuery, transactionIndex) {
        const actor = await this.getActor(portableQuery);
        return await this.wrapInTransaction(async () => await this.insertManager.insertValues(portableQuery, actor), 'INSERT', transactionIndex);
    }
    async insertValuesGetIds(portableQuery, transactionIndex) {
        const actor = await this.getActor(portableQuery);
        return await this.wrapInTransaction(async () => await this.insertManager.insertValuesGetIds(portableQuery, actor), 'INSERT GET IDS', transactionIndex);
    }
    async updateValues(portableQuery, transactionIndex) {
        const actor = await this.getActor(portableQuery);
        return await this.wrapInTransaction(async () => await this.updateManager.updateValues(portableQuery, actor), 'UPDATE', transactionIndex);
    }
    async deleteWhere(portableQuery, transactionIndex) {
        const actor = await this.getActor(portableQuery);
        return await this.wrapInTransaction(async () => await this.deleteManager.deleteWhere(portableQuery, actor), 'DELETE', transactionIndex);
    }
    async getActor(portableQuery) {
        throw `Not Implemented`;
    }
    async wrapInTransaction(callback, operationName, transactionIndex) {
        const attachToTransaction = !transactionIndex;
        if (attachToTransaction) {
            transactionIndex = await this.startTransaction();
        }
        else {
            if (transactionIndex !== this.currentTransactionIndex) {
                throw `${operationName}: provided Transaction Index: ${transactionIndex} 
				does not match current Transaction Index.`;
            }
        }
        try {
            const returnValue = await callback();
            if (attachToTransaction) {
                await this.commitTransaction(transactionIndex);
            }
            return returnValue;
        }
        catch (error) {
            // if (attachToTransaction) {
            await this.rollbackTransaction(transactionIndex);
            // }
            throw error;
        }
    }
}
exports.TransactionalServer = TransactionalServer;
di_1.DI.set(ground_control_1.TRANS_CONNECTOR, TransactionalServer);
//# sourceMappingURL=TransactionalServer.js.map