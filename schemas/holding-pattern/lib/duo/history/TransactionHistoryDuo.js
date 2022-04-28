import { TransactionType } from '@airport/ground-control';
import { TransactionHistory } from '../../ddl/ddl';
import { BaseTransactionHistoryDuo, } from '../../generated/generated';
export class TransactionHistoryDuo extends BaseTransactionHistoryDuo {
    getNewRecord(transactionType = TransactionType.LOCAL) {
        let transaction = new TransactionHistory();
        transaction.transactionType = TransactionType.LOCAL;
        return transaction;
    }
    getRepositoryTransaction(transactionHistory, repositoryId, isRepositoryCreation) {
        let repositoryTransactionHistory = transactionHistory.repositoryTransactionHistoryMap[repositoryId];
        if (!repositoryTransactionHistory) {
            repositoryTransactionHistory = this.repositoryTransactionHistoryDuo.getNewRecord(repositoryId, isRepositoryCreation);
            transactionHistory.repositoryTransactionHistories.push(repositoryTransactionHistory);
            transactionHistory.repositoryTransactionHistoryMap[repositoryId] = repositoryTransactionHistory;
            repositoryTransactionHistory.transactionHistory = transactionHistory;
        }
        return repositoryTransactionHistory;
    }
}
//# sourceMappingURL=TransactionHistoryDuo.js.map