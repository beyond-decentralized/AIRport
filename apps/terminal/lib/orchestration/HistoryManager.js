"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const diTokens_1 = require("../diTokens");
class HistoryManager {
    constructor() {
        // this.operHistoryDmo      = DI.cache(OPER_HISTORY_DMO,)
        // this.recHistoryDmo       = DI.cache(REC_HISTORY_DMO)
        // this.repoTransHistoryDmo = DI.cache(REPO_TRANS_HISTORY_DMO)
        this.transHistoryDmo = di_1.DI.cache(holding_pattern_1.TRANS_HISTORY_DMO);
    }
    async getNewTransHistory(transactionType = ground_control_1.TransactionType.LOCAL) {
        const transactionHistory = (await this.transHistoryDmo.get()).getNewRecord(transactionType);
        return transactionHistory;
    }
    async getNewRepoTransHistory(transactionHistory, repository, actor) {
        const repoTransHistory = (await this.transHistoryDmo.get()).getRepositoryTransaction(transactionHistory, repository, actor);
        return repoTransHistory;
    }
}
exports.HistoryManager = HistoryManager;
di_1.DI.set(diTokens_1.HISTORY_MANAGER, HistoryManager);
//# sourceMappingURL=HistoryManager.js.map