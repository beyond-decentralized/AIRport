var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { TransactionType } from '@airport/ground-control';
let HistoryManager = class HistoryManager {
    async getNewTransactionHistory(transactionType = TransactionType.LOCAL) {
        return await this.transactionHistoryDuo.getNewRecord(transactionType);
    }
    async getNewRepositoryTransactionHistory(transactionHistory, repositoryId, context) {
        return await this.transactionHistoryDuo.getRepositoryTransaction(transactionHistory, repositoryId, !!context.rootTransaction.newRepository);
    }
};
__decorate([
    Inject()
], HistoryManager.prototype, "transactionHistoryDuo", void 0);
HistoryManager = __decorate([
    Injected()
], HistoryManager);
export { HistoryManager };
//# sourceMappingURL=HistoryManager.js.map