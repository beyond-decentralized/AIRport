"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const terminal_map_1 = require("@airport/terminal-map");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
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
let TransactionalServer = class TransactionalServer {
    constructor(deleteManager, insertManager, queryManager, transactionManager, updateManager) {
        this.deleteManager = deleteManager;
        this.insertManager = insertManager;
        this.queryManager = queryManager;
        this.transactionManager = transactionManager;
        this.updateManager = updateManager;
        this.activeTransactions = {};
        this.lastTransactionIndex = 0;
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
};
TransactionalServer = __decorate([
    typedi_1.Service(ground_control_1.TransactionalConnectorToken),
    __param(0, typedi_1.Inject(InjectionTokens_1.DeleteManagerToken)),
    __param(1, typedi_1.Inject(InjectionTokens_1.InsertManagerToken)),
    __param(2, typedi_1.Inject(InjectionTokens_1.QueryManagerToken)),
    __param(3, typedi_1.Inject(terminal_map_1.TransactionManagerToken)),
    __param(4, typedi_1.Inject(InjectionTokens_1.UpdateManagerToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], TransactionalServer);
exports.TransactionalServer = TransactionalServer;
//# sourceMappingURL=TransactionalServer.js.map