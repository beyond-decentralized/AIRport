import { container, DI } from '@airport/di';
import { TransactionType } from '@airport/ground-control';
import { REPOSITORY_TRANSACTION_HISTORY_DUO, TRANSACTION_HISTORY_DUO } from '@airport/holding-pattern';
import { HISTORY_MANAGER } from '../tokens';
export class HistoryManager {
    // private operHistoryDuo: Promise<IOperationHistoryDuo>
    // private recHistoryDuo: Promise<IRecordHistoryDuo>
    // private repoTransHistoryDuo: Promise<IRepositoryTransactionHistoryDuo>
    async getNewTransHistory(transactionType = TransactionType.LOCAL) {
        const transHistoryDuo = await container(this).get(TRANSACTION_HISTORY_DUO);
        return await transHistoryDuo.getNewRecord(transactionType);
    }
    async getNewRepositoryTransactionHistory(transactionHistory, repositoryId, context) {
        const [repositoryTransactionHistoryDuo, transactionHistoryDuo] = await container(this).get(REPOSITORY_TRANSACTION_HISTORY_DUO, TRANSACTION_HISTORY_DUO);
        return await transactionHistoryDuo.getRepositoryTransaction(transactionHistory, repositoryId, !!context.newRepository, repositoryTransactionHistoryDuo);
    }
}
DI.set(HISTORY_MANAGER, HistoryManager);
//# sourceMappingURL=HistoryManager.js.map