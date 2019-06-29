"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const diTokens_1 = require("../diTokens");
class HistoryManager {
    // private operHistoryDuo: Promise<IOperationHistoryDuo>
    // private recHistoryDuo: Promise<IRecordHistoryDuo>
    // private repoTransHistoryDuo: Promise<IRepositoryTransactionHistoryDuo>
    getNewTransHistory(transactionType = ground_control_1.TransactionType.LOCAL) {
        return di_1.DI.get(holding_pattern_1.TRANS_HISTORY_DUO).then(transHistoryDuo => transHistoryDuo.getNewRecord(transactionType));
    }
    async getNewRepoTransHistory(transactionHistory, repository, actor) {
        return di_1.DI.get(holding_pattern_1.REPO_TRANS_HISTORY_DUO, holding_pattern_1.TRANS_HISTORY_DUO).then(([repoTransHistoryDuo, transHistoryDuo]) => transHistoryDuo.getRepositoryTransaction(transactionHistory, repository, actor, repoTransHistoryDuo));
    }
}
exports.HistoryManager = HistoryManager;
di_1.DI.set(diTokens_1.HISTORY_MANAGER, HistoryManager);
//# sourceMappingURL=HistoryManager.js.map