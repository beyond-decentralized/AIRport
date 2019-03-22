"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const ddl_1 = require("../../ddl/ddl");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class TransactionHistoryDmo extends generated_1.BaseTransactionHistoryDmo {
    constructor() {
        super();
        di_1.DI.get((repositoryTransactionHistoryDmo) => {
            this.repoTransHistoryDmo = repositoryTransactionHistoryDmo;
        }, diTokens_1.REPO_TRANS_HISTORY_DMO);
    }
    getNewRecord(transactionType = ground_control_1.TransactionType.LOCAL) {
        let transaction = new ddl_1.TransactionHistory();
        transaction.transactionType = ground_control_1.TransactionType.LOCAL;
        return transaction;
    }
    getRepositoryTransaction(transactionHistory, repository, actor) {
        let repoTransHistory = transactionHistory.repoTransHistoryMap[repository.id];
        if (!repoTransHistory) {
            repoTransHistory = this.repoTransHistoryDmo.getNewRecord(repository, actor);
            transactionHistory.repositoryTransactionHistories.push(repoTransHistory);
            transactionHistory.repoTransHistoryMap[repository.id] = repoTransHistory;
        }
        return repoTransHistory;
    }
}
exports.TransactionHistoryDmo = TransactionHistoryDmo;
di_1.DI.set(diTokens_1.TRANS_HISTORY_DMO, TransactionHistoryDmo);
//# sourceMappingURL=TransactionHistoryDmo.js.map