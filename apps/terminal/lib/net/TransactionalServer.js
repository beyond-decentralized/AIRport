"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const terminal_map_1 = require("@airport/terminal-map");
const tower_1 = require("@airport/tower");
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
        di_1.DI.get((deleteManager, insertManager, queryManager, transactionManager, updateManager) => {
            this.deleteManager = deleteManager;
            this.insertManager = insertManager;
            this.queryManager = queryManager;
            this.transactionManager = transactionManager;
            this.updateManager = updateManager;
        }, diTokens_1.DELETE_MANAGER, diTokens_1.INSERT_MANAGER, diTokens_1.QUERY_MANAGER, terminal_map_1.TRANSACTION_MANAGER, diTokens_1.UPDATE_MANAGER);
    }
    async init() {
        await this.transactionManager.init('airport');
    }
    async transact(credentials) {
        // this.lastTransactionIndex++
        await this.transactionManager.transact(credentials);
        // this.currentTransactionIndex = this.lastTransactionIndex
    }
    async rollback(credentials) {
        await this.transactionManager.rollback(credentials);
        // this.currentTransactionIndex = null
    }
    async commit(credentials) {
        await this.transactionManager.commit(credentials);
        // this.currentTransactionIndex = null
    }
    async find(portableQuery, credentials, cachedSqlQueryId) {
        return await this.queryManager.find(portableQuery, cachedSqlQueryId);
    }
    async findOne(portableQuery, credentials, cachedSqlQueryId) {
        return await this.queryManager.findOne(portableQuery, cachedSqlQueryId);
    }
    search(portableQuery, credentials, cachedSqlQueryId) {
        return this.queryManager.search(portableQuery);
    }
    searchOne(portableQuery, credentials, cachedSqlQueryId) {
        return this.queryManager.searchOne(portableQuery);
    }
    async addRepository(name, url, platform, platformConfig, distributionStrategy, credentials) {
        return this.insertManager.addRepository(name, url, platform, platformConfig, distributionStrategy);
    }
    async insertValues(portableQuery, credentials, transactionIndex, ensureGeneratedValues // for internal use only
    ) {
        const values = portableQuery.jsonQuery.V;
        if (!values.length) {
            return 0;
        }
        const firstValuesRow = values[0];
        if (!firstValuesRow || !firstValuesRow.length) {
            return 0;
        }
        const numValuesInRow = firstValuesRow.length;
        for (let valuesRow of values) {
            if (valuesRow.length !== numValuesInRow) {
                return 0;
            }
        }
        const actor = await this.getActor(portableQuery);
        return await this.wrapInTransaction(async () => await this.insertManager.insertValues(portableQuery, actor, ensureGeneratedValues), 'INSERT', credentials);
    }
    async insertValuesGetIds(portableQuery, credentials, transactionIndex) {
        const actor = await this.getActor(portableQuery);
        return await this.wrapInTransaction(async () => await this.insertManager.insertValuesGetIds(portableQuery, actor), 'INSERT GET IDS', credentials);
    }
    async updateValues(portableQuery, credentials, transactionIndex) {
        const actor = await this.getActor(portableQuery);
        return await this.wrapInTransaction(async () => await this.updateManager.updateValues(portableQuery, actor), 'UPDATE', credentials);
    }
    async deleteWhere(portableQuery, credentials, transactionIndex) {
        const actor = await this.getActor(portableQuery);
        return await this.wrapInTransaction(async () => await this.deleteManager.deleteWhere(portableQuery, actor), 'DELETE', credentials);
    }
    async getActor(portableQuery) {
        if (this.tempActor) {
            return this.tempActor;
        }
        throw `Not Implemented`;
    }
    async wrapInTransaction(callback, operationName, credentials) {
        let transact = false;
        if (this.transactionManager.transactionInProgress) {
            if (credentials.domainAndPort !== this.transactionManager.transactionInProgress) {
                throw `${operationName}: domain: ${credentials.domainAndPort} 
				does not have an active transaction.`;
            }
        }
        else {
            await this.transact(credentials);
            transact = true;
        }
        try {
            const returnValue = await callback();
            if (transact) {
                await this.commit(credentials);
            }
            return returnValue;
        }
        catch (error) {
            // if (attachToTransaction) {
            await this.rollback(credentials);
            // }
            throw error;
        }
    }
}
exports.TransactionalServer = TransactionalServer;
di_1.DI.set(tower_1.TRANS_SERVER, TransactionalServer);
//# sourceMappingURL=TransactionalServer.js.map