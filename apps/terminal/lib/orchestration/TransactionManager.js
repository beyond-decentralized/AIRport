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
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const terminal_map_1 = require("@airport/terminal-map");
const tower_1 = require("@airport/tower");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
const ActiveQueries_1 = require("../store/ActiveQueries");
const AbstractMutationManager_1 = require("./AbstractMutationManager");
let TransactionManager = class TransactionManager extends AbstractMutationManager_1.AbstractMutationManager {
    constructor(utils, dataStore, idGenerator, offlineDeltaStore, onlineManager, 
    // @Inject(
    // 	_ => RepositoryManagerToken)
    // private repositoryManager: IRepositoryManager,
    queries, transactionHistoryDmo) {
        super(utils, dataStore);
        this.idGenerator = idGenerator;
        this.offlineDeltaStore = offlineDeltaStore;
        this.onlineManager = onlineManager;
        this.queries = queries;
        this.transactionHistoryDmo = transactionHistoryDmo;
        this.transactionInProgress = null;
        this.yieldToRunningTransaction = 100;
    }
    /**
     * Initializes the EntityManager at server load time.
     * @returns {Promise<void>}
     */
    async initialize(dbName) {
        await this.dataStore.initialize(dbName);
        // await this.repositoryManager.initialize();
    }
    async startTransaction(transactionIndex) {
        if (this.transactionInProgress) {
            this.transactionIndexQueue.push(transactionIndex);
        }
        while (!this.canRunTransaction(transactionIndex)) {
            await this.wait(this.yieldToRunningTransaction);
        }
        this.transactionInProgress = transactionIndex;
        let fieldMap = new ground_control_1.SyncSchemaMap();
        this.currentTransHistory = this.transactionHistoryDmo.getNewRecord();
        await this.dataStore.startTransaction();
    }
    async rollbackTransaction(transactionIndex) {
        if (this.transactionInProgress !== transactionIndex) {
            let foundTransactionInQueue = false;
            this.transactionIndexQueue.filter(transIndex => {
                if (transIndex === transactionIndex) {
                    foundTransactionInQueue = true;
                    return false;
                }
                return true;
            });
            if (!foundTransactionInQueue) {
                throw `Could not find transaction '${transactionIndex}' is not found`;
            }
            return;
        }
        try {
            await this.dataStore.rollbackTransaction();
        }
        finally {
            this.clearTransaction();
        }
    }
    async commitTransaction(transactionIndex) {
        if (this.transactionInProgress !== transactionIndex) {
            throw `Cannot commit inactive transaction '${transactionIndex}'.`;
        }
        let transaction = this.currentTransHistory;
        try {
            await this.saveRepositoryHistory(transaction);
            await this.dataStore.saveTransaction(transaction);
            this.queries.rerunQueries();
            await this.dataStore.commitTransaction();
        }
        finally {
            this.clearTransaction();
        }
    }
    // @Transactional()
    // private async recordRepositoryTransactionBlock(
    // 	transaction: IRepositoryTransactionHistory
    // ): Promise<void> {
    // 	if (this.onlineManager.isOnline()) {
    // 		// let repository = transaction.repository;
    // 		transaction.serialize();
    //
    // 		let deltaStore = this.repositoryManager.getDeltaStore(transaction.repository);
    // 		await deltaStore.addChanges(deltaStore.config.changeListConfig, [transaction]);
    //
    // 		transaction.deserialize(
    // 			// repository
    // 		);
    // 		await this.offlineDeltaStore.markChangesAsSynced(transaction.repository, [transaction]);
    //
    // 		this.queries.markQueriesToRerun(transaction.transactionHistory.schemaMap);
    // 	}
    // }
    clearTransaction() {
        this.currentTransHistory = null;
        this.transactionInProgress = null;
        if (this.transactionIndexQueue.length) {
            this.transactionInProgress = this.transactionIndexQueue.shift();
        }
    }
    async saveRepositoryHistory(transaction) {
        if (!transaction.allRecordHistory.length) {
            return false;
        }
        let schemaMap = transaction.schemaMap;
        schemaMap.ensureEntity(holding_pattern_1.Q.TransactionHistory.__driver__.dbEntity, true);
        transaction.id = this.idGenerator.generateTransHistoryId();
        await this.doInsertValues(holding_pattern_1.Q.TransactionHistory, [transaction]);
        schemaMap.ensureEntity(holding_pattern_1.Q.RepositoryTransactionHistory.__driver__.dbEntity, true);
        transaction.repositoryTransactionHistories.forEach((repositoryTransactionHistory) => {
            repositoryTransactionHistory.id = this.idGenerator.generateRepoTransHistoryId();
        });
        await this.doInsertValues(holding_pattern_1.Q.RepositoryTransactionHistory, transaction.repositoryTransactionHistories);
        schemaMap.ensureEntity(holding_pattern_1.Q.OperationHistory.__driver__.dbEntity, true);
        transaction.allOperationHistory.forEach((operationHistory) => {
            operationHistory.id = this.idGenerator.generateOperationHistoryId();
        });
        await this.doInsertValues(holding_pattern_1.Q.OperationHistory, transaction.allOperationHistory);
        schemaMap.ensureEntity(holding_pattern_1.Q.RecordHistory.__driver__.dbEntity, true);
        transaction.allRecordHistory.forEach((recordHistory) => {
            recordHistory.id = this.idGenerator.generateRecordHistoryId();
        });
        await this.doInsertValues(holding_pattern_1.Q.RecordHistory, transaction.allRecordHistory);
        if (transaction.allRecordHistoryNewValues.length) {
            schemaMap.ensureEntity(holding_pattern_1.Q.RecordHistoryNewValue.__driver__.dbEntity, true);
            await this.doInsertValues(holding_pattern_1.Q.RecordHistoryNewValue, transaction.allRecordHistoryNewValues);
        }
        if (transaction.allRecordHistoryOldValues.length) {
            schemaMap.ensureEntity(holding_pattern_1.Q.RecordHistoryOldValue.__driver__.dbEntity, true);
            await this.doInsertValues(holding_pattern_1.Q.RecordHistoryOldValue, transaction.allRecordHistoryOldValues);
        }
        return true;
    }
    async wait(timeoutMillis) {
        return new Promise((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve();
                }, timeoutMillis);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    canRunTransaction(transactionIndex) {
        if (this.transactionInProgress) {
            return false;
        }
        return this.transactionIndexQueue[this.transactionIndexQueue.length - 1]
            === transactionIndex;
    }
};
__decorate([
    tower_1.Transactional(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionManager.prototype, "initialize", null);
TransactionManager = __decorate([
    typedi_1.Service(terminal_map_1.TransactionManagerToken),
    __param(0, typedi_1.Inject(air_control_1.UtilsToken)),
    __param(1, typedi_1.Inject(InjectionTokens_1.StoreDriverToken)),
    __param(2, typedi_1.Inject(InjectionTokens_1.IdGeneratorToken)),
    __param(3, typedi_1.Inject(InjectionTokens_1.OfflineDeltaStoreToken)),
    __param(4, typedi_1.Inject(InjectionTokens_1.OnlineManagerToken)),
    __param(5, typedi_1.Inject(InjectionTokens_1.ActiveQueriesToken)),
    __param(6, typedi_1.Inject(holding_pattern_1.TransactionHistoryDmoToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, ActiveQueries_1.ActiveQueries, Object])
], TransactionManager);
exports.TransactionManager = TransactionManager;
//# sourceMappingURL=TransactionManager.js.map