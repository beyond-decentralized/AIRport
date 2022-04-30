var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { v4 as uuidv4 } from "uuid";
import { Repository, RepositoryTransactionHistory } from '../../ddl/ddl';
import { BaseRepositoryTransactionHistoryDuo, } from '../../generated/generated';
let RepositoryTransactionHistoryDuo = class RepositoryTransactionHistoryDuo extends BaseRepositoryTransactionHistoryDuo {
    getNewRecord(repositoryId, isRepositoryCreation) {
        let repositoryTransactionHistory = new RepositoryTransactionHistory();
        let saveTimestamp = new Date().getTime();
        repositoryTransactionHistory.saveTimestamp = saveTimestamp;
        repositoryTransactionHistory.uuId = uuidv4();
        repositoryTransactionHistory.isRepositoryCreation = isRepositoryCreation;
        repositoryTransactionHistory.repository = new Repository();
        repositoryTransactionHistory.repository.id = repositoryId;
        return repositoryTransactionHistory;
    }
    newRecord(data) {
        if (!data) {
            return null;
        }
        return { ...data };
    }
    sortRepoTransHistories(repoTransHistories, actorMapById) {
        repoTransHistories.sort((repoTransHistory1, repoTransHistory2) => {
            const syncTimeComparison = this.compareNumbers(repoTransHistory1.syncTimestamp, repoTransHistory2.syncTimestamp);
            if (syncTimeComparison) {
                return syncTimeComparison;
            }
            const saveTimeComparison = this.compareNumbers(repoTransHistory1.saveTimestamp, repoTransHistory2.saveTimestamp);
            if (saveTimeComparison) {
                return saveTimeComparison;
            }
            return 0;
        });
    }
    startOperation(repositoryTransactionHistory, systemWideOperationId, entityChangeType, dbEntity, actor, rootTransaction) {
        let operationHistory = this.operationHistoryDuo.getNewRecord(entityChangeType, dbEntity, actor, repositoryTransactionHistory, systemWideOperationId, rootTransaction);
        repositoryTransactionHistory.operationHistory.push(operationHistory);
        repositoryTransactionHistory
            .transactionHistory.allOperationHistory.push(operationHistory);
        return operationHistory;
    }
    compareDates(date1, date2) {
        const time1 = date1 ? date1.getTime() : -1;
        const time2 = date2 ? date2.getTime() : -1;
        return this.compareNumbers(time1, time2);
    }
    compareNumbers(number1, number2) {
        if (number1 < number2) {
            return -1;
        }
        if (number2 > number1) {
            return 1;
        }
        return 0;
    }
};
__decorate([
    Inject()
], RepositoryTransactionHistoryDuo.prototype, "operationHistoryDuo", void 0);
RepositoryTransactionHistoryDuo = __decorate([
    Injected()
], RepositoryTransactionHistoryDuo);
export { RepositoryTransactionHistoryDuo };
//# sourceMappingURL=RepositoryTransactionHistoryDuo.js.map