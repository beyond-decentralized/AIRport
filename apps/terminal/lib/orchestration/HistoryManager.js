"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const holding_pattern_1 = require("@airport/holding-pattern");
const TransactionType_1 = require("@airport/terminal-map/lib/TransactionType");
const typedi_1 = require("typedi");
const diTokens_1 = require("../diTokens");
let HistoryManager = class HistoryManager {
    constructor(operationHistoryDmo, recordHistoryDmo, repositoryTransactionHistoryDmo, transactionHistoryDmo) {
        this.operationHistoryDmo = operationHistoryDmo;
        this.recordHistoryDmo = recordHistoryDmo;
        this.repositoryTransactionHistoryDmo = repositoryTransactionHistoryDmo;
        this.transactionHistoryDmo = transactionHistoryDmo;
    }
    getNewTransHistory(transactionType = TransactionType_1.TransactionType.LOCAL) {
        const transactionHistory = this.transactionHistoryDmo.getNewRecord(transactionType);
        return transactionHistory;
    }
    getNewRepoTransHistory(transactionHistory, repository, actor) {
        const repoTransHistory = this.transactionHistoryDmo.getRepositoryTransaction(transactionHistory, repository, actor);
        return repoTransHistory;
    }
};
HistoryManager = __decorate([
    typedi_1.Service(diTokens_1.HISTORY_MANAGER),
    __param(0, typedi_1.Inject(_ => holding_pattern_1.OperationHistoryDmoToken)),
    __param(1, typedi_1.Inject(_ => holding_pattern_1.RecordHistoryDmoToken)),
    __param(2, typedi_1.Inject(_ => holding_pattern_1.RepositoryTransactionHistoryDmoToken)),
    __param(3, typedi_1.Inject(_ => holding_pattern_1.TransactionHistoryDmoToken))
], HistoryManager);
exports.HistoryManager = HistoryManager;
//# sourceMappingURL=HistoryManager.js.map