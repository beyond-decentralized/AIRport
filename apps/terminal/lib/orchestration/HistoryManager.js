"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const diTokens_1 = require("../diTokens");
class HistoryManager {
    constructor() {
        di_1.DI.get((operationHistoryDmo, recordHistoryDmo, repositoryTransactionHistoryDmo, transactionHistoryDmo) => {
            this.operHistoryDmo = operationHistoryDmo;
            this.recHistoryDmo = recordHistoryDmo;
            this.repoTransHistoryDmo = repositoryTransactionHistoryDmo;
            this.transHistoryDmo = transactionHistoryDmo;
        }, holding_pattern_1.OPER_HISTORY_DMO, holding_pattern_1.REC_HISTORY_DMO, holding_pattern_1.REPO_TRANS_HISTORY_DMO, holding_pattern_1.TRANS_HISTORY_DMO);
    }
    getNewTransHistory(transactionType = ground_control_1.TransactionType.LOCAL) {
        const transactionHistory = this.transHistoryDmo.getNewRecord(transactionType);
        return transactionHistory;
    }
    getNewRepoTransHistory(transactionHistory, repository, actor) {
        const repoTransHistory = this.transHistoryDmo.getRepositoryTransaction(transactionHistory, repository, actor);
        return repoTransHistory;
    }
}
exports.HistoryManager = HistoryManager;
di_1.DI.set(diTokens_1.HISTORY_MANAGER, HistoryManager);
//# sourceMappingURL=HistoryManager.js.map