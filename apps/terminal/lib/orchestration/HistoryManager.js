"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const tokens_1 = require("../tokens");
class HistoryManager {
    // private operHistoryDuo: Promise<IOperationHistoryDuo>
    // private recHistoryDuo: Promise<IRecordHistoryDuo>
    // private repoTransHistoryDuo: Promise<IRepositoryTransactionHistoryDuo>
    async getNewTransHistory(transactionType = ground_control_1.TransactionType.LOCAL) {
        const transHistoryDuo = await di_1.container(this).get(holding_pattern_1.TRANS_HISTORY_DUO);
        return await transHistoryDuo.getNewRecord(transactionType);
    }
    async getNewRepoTransHistory(transactionHistory, repositoryId, actor) {
        const [repoTransHistoryDuo, transHistoryDuo] = await di_1.container(this).get(holding_pattern_1.REPO_TRANS_HISTORY_DUO, holding_pattern_1.TRANS_HISTORY_DUO);
        return await transHistoryDuo.getRepositoryTransaction(transactionHistory, repositoryId, actor, repoTransHistoryDuo);
    }
}
exports.HistoryManager = HistoryManager;
di_1.DI.set(tokens_1.HISTORY_MANAGER, HistoryManager);
//# sourceMappingURL=HistoryManager.js.map