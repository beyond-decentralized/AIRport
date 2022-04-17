import { DI } from '@airport/di';
import { TransactionType } from '@airport/ground-control';
import { TransactionHistory } from '../../ddl/ddl';
import { TRANSACTION_HISTORY_DUO } from '../../tokens';
import { BaseTransactionHistoryDuo, } from '../../generated/generated';
export class TransactionHistoryDuo extends BaseTransactionHistoryDuo {
    getNewRecord(transactionType = TransactionType.LOCAL) {
        let transaction = new TransactionHistory();
        transaction.transactionType = TransactionType.LOCAL;
        return transaction;
    }
    getRepositoryTransaction(transactionHistory, repositoryId, isRepositoryCreation, repositoryTransactionHistoryDuo) {
        let repositoryTransactionHistory = transactionHistory.repoTransHistoryMap[repositoryId];
        if (!repositoryTransactionHistory) {
            repositoryTransactionHistory = repositoryTransactionHistoryDuo.getNewRecord(repositoryId, isRepositoryCreation);
            transactionHistory.repositoryTransactionHistories.push(repositoryTransactionHistory);
            transactionHistory.repoTransHistoryMap[repositoryId] = repositoryTransactionHistory;
            repositoryTransactionHistory.transactionHistory = transactionHistory;
        }
        return repositoryTransactionHistory;
    }
}
DI.set(TRANSACTION_HISTORY_DUO, TransactionHistoryDuo);
//# sourceMappingURL=TransactionHistoryDuo.js.map