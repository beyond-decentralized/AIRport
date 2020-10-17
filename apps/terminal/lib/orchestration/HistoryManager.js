import { container, DI } from '@airport/di';
import { TransactionType } from '@airport/ground-control';
import { REPO_TRANS_HISTORY_DUO, TRANS_HISTORY_DUO } from '@airport/holding-pattern';
import { HISTORY_MANAGER } from '../tokens';
export class HistoryManager {
    // private operHistoryDuo: Promise<IOperationHistoryDuo>
    // private recHistoryDuo: Promise<IRecordHistoryDuo>
    // private repoTransHistoryDuo: Promise<IRepositoryTransactionHistoryDuo>
    async getNewTransHistory(transactionType = TransactionType.LOCAL) {
        const transHistoryDuo = await container(this).get(TRANS_HISTORY_DUO);
        return await transHistoryDuo.getNewRecord(transactionType);
    }
    async getNewRepoTransHistory(transactionHistory, repositoryId, actor) {
        const [repoTransHistoryDuo, transHistoryDuo] = await container(this).get(REPO_TRANS_HISTORY_DUO, TRANS_HISTORY_DUO);
        return await transHistoryDuo.getRepositoryTransaction(transactionHistory, repositoryId, actor, repoTransHistoryDuo);
    }
}
DI.set(HISTORY_MANAGER, HistoryManager);
//# sourceMappingURL=HistoryManager.js.map