"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ddl_1 = require("../../ddl/ddl");
const diTokens_1 = require("../../diTokens");
const generated_1 = require("../../generated/generated");
class RepositoryTransactionHistoryDmo extends generated_1.BaseRepositoryTransactionHistoryDmo {
    constructor() {
        super();
        di_1.DI.get((operationHistoryDmo) => {
            this.operHistoryDmo = operationHistoryDmo;
        }, diTokens_1.OPERATION_HISTORY_DMO);
    }
    getNewRecord(repository, actor) {
        let transaction = new ddl_1.RepositoryTransactionHistory();
        let saveTimestamp = new Date();
        transaction.saveTimestamp = saveTimestamp;
        transaction.repository = repository;
        transaction.actor = actor;
        // transaction.syncStatus = SyncStatus.SYNC_PENDING;
        return transaction;
    }
    newRecord(data) {
        if (!data) {
            return null;
        }
        return { ...data };
    }
    sortRepoTransHistories(repoTransHistories, actorMapById) {
        repoTransHistories.sort((repoTransHistory1, repoTransHistory2) => {
            const saveTimeComparison = this.compareDates(repoTransHistory1.saveTimestamp, repoTransHistory2.saveTimestamp);
            if (saveTimeComparison) {
                return saveTimeComparison;
            }
            const actor1 = actorMapById.get(repoTransHistory1.actor.id);
            const actor2 = actorMapById.get(repoTransHistory2.actor.id);
            const userIdComparison = actor1.user.uniqueId.localeCompare(actor2.user.uniqueId);
            if (userIdComparison) {
                return userIdComparison;
            }
            const databaseNameComparison = actor1.terminal.name.localeCompare(actor2.terminal.name);
            if (databaseNameComparison) {
                return databaseNameComparison;
            }
            const databaseSecondIdComparison = this.compareNumbers(actor1.terminal.secondId, actor2.terminal.secondId);
            if (databaseSecondIdComparison) {
                return databaseSecondIdComparison;
            }
            const databaseOwnerComparison = actor1.terminal.owner.uniqueId.localeCompare(actor2.terminal.owner.uniqueId);
            if (databaseOwnerComparison) {
                return databaseOwnerComparison;
            }
            const actorRandomIdComparison = this.compareNumbers(actor1.randomId, actor2.randomId);
            return actorRandomIdComparison;
        });
    }
    startOperation(repositoryTransactionHistory, entityChangeType, dbEntity) {
        let operationHistory = this.operHistoryDmo.getNewRecord(entityChangeType, dbEntity, repositoryTransactionHistory);
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
}
exports.RepositoryTransactionHistoryDmo = RepositoryTransactionHistoryDmo;
di_1.DI.set(diTokens_1.REPOSITORY_TRANSACTION_HISTORY_DMO, RepositoryTransactionHistoryDmo);
//# sourceMappingURL=RepositoryTransactionHistoryDmo.js.map