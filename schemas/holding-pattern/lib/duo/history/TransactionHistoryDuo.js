var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { TransactionType } from '@airport/ground-control';
import { TransactionHistory } from '../../ddl/ddl';
import { BaseTransactionHistoryDuo, } from '../../generated/generated';
let TransactionHistoryDuo = class TransactionHistoryDuo extends BaseTransactionHistoryDuo {
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
};
__decorate([
    Inject()
], TransactionHistoryDuo.prototype, "repositoryTransactionHistoryDuo", void 0);
TransactionHistoryDuo = __decorate([
    Injected()
], TransactionHistoryDuo);
export { TransactionHistoryDuo };
//# sourceMappingURL=TransactionHistoryDuo.js.map