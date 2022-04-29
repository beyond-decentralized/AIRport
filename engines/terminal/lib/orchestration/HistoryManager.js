import { TransactionType } from '@airport/ground-control';
export class HistoryManager {
    async getNewTransactionHistory(transactionType = TransactionType.LOCAL) {
        return await this.transactionHistoryDuo.getNewRecord(transactionType);
    }
    async getNewRepositoryTransactionHistory(transactionHistory, repositoryId, context) {
        return await this.transactionHistoryDuo.getRepositoryTransaction(transactionHistory, repositoryId, !!context.newRepository);
    }
}
//# sourceMappingURL=HistoryManager.js.map