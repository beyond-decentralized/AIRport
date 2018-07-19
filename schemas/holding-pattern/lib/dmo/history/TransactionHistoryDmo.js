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
const typedi_1 = require("typedi");
const ddl_1 = require("../../ddl/ddl");
const generated_1 = require("../../generated/generated");
const InjectionTokens_1 = require("../../InjectionTokens");
let TransactionHistoryDmo = class TransactionHistoryDmo extends generated_1.BaseTransactionHistoryDmo {
    constructor(repositoryTransactionHistoryDmo) {
        super();
        this.repositoryTransactionHistoryDmo = repositoryTransactionHistoryDmo;
    }
    getNewRecord(transactionType = ground_control_1.TransactionType.LOCAL) {
        let transaction = new ddl_1.TransactionHistory();
        transaction.transactionType = ground_control_1.TransactionType.LOCAL;
        return transaction;
    }
    getRepositoryTransaction(transactionHistory, repository, actor) {
        let repoTransHistory = transactionHistory.repoTransHistoryMap[repository.id];
        if (!repoTransHistory) {
            repoTransHistory = this.repositoryTransactionHistoryDmo.getNewRecord(repository, actor);
            transactionHistory.repositoryTransactionHistories.push(repoTransHistory);
            transactionHistory.repoTransHistoryMap[repository.id] = repoTransHistory;
        }
        return repoTransHistory;
    }
};
TransactionHistoryDmo = __decorate([
    typedi_1.Service(InjectionTokens_1.TransactionHistoryDmoToken),
    __param(0, typedi_1.Inject(InjectionTokens_1.RepositoryTransactionHistoryDmoToken)),
    __metadata("design:paramtypes", [Object])
], TransactionHistoryDmo);
exports.TransactionHistoryDmo = TransactionHistoryDmo;
//# sourceMappingURL=TransactionHistoryDmo.js.map