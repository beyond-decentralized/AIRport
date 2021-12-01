import { DI } from '@airport/di';
import { v4 as uuidv4 } from "uuid";
import { Repository, RepositoryTransactionHistory } from '../../ddl/ddl';
import { REPOSITORY_TRANSACTION_HISTORY_DUO } from '../../tokens';
import { BaseRepositoryTransactionHistoryDuo, } from '../../generated/generated';
export class RepositoryTransactionHistoryDuo extends BaseRepositoryTransactionHistoryDuo {
    getNewRecord(repositoryId, actor) {
        let repositoryTransactionHistory = new RepositoryTransactionHistory();
        let saveTimestamp = new Date().getTime();
        repositoryTransactionHistory.saveTimestamp = saveTimestamp;
        repositoryTransactionHistory.uuId = uuidv4();
        repositoryTransactionHistory.repository = new Repository();
        repositoryTransactionHistory.repository.id = repositoryId;
        repositoryTransactionHistory.actor = actor;
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
            const saveTimeComparison = this.compareNumbers(repoTransHistory1.saveTimestamp, repoTransHistory2.saveTimestamp);
            if (saveTimeComparison) {
                return saveTimeComparison;
            }
            const actor1 = actorMapById.get(repoTransHistory1.actor.id);
            const actor2 = actorMapById.get(repoTransHistory2.actor.id);
            const userIdComparison = actor1.user.uuId.localeCompare(actor2.user.uuId);
            if (userIdComparison) {
                return userIdComparison;
            }
            const databaseUuidComparison = actor1.terminal.uuId.localeCompare(actor2.terminal.uuId);
            if (databaseUuidComparison) {
                return databaseUuidComparison;
            }
            const databaseOwnerComparison = actor1.terminal.owner.uuId.localeCompare(actor2.terminal.owner.uuId);
            if (databaseOwnerComparison) {
                return databaseOwnerComparison;
            }
            const actorRandomIdComparison = actor1.uuId.localeCompare(actor2.uuId);
            return actorRandomIdComparison;
        });
    }
    startOperation(repositoryTransactionHistory, systemWideOperationId, entityChangeType, dbEntity, operHistoryDuo) {
        let operationHistory = operHistoryDuo.getNewRecord(entityChangeType, dbEntity, repositoryTransactionHistory, systemWideOperationId);
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
DI.set(REPOSITORY_TRANSACTION_HISTORY_DUO, RepositoryTransactionHistoryDuo);
//# sourceMappingURL=RepositoryTransactionHistoryDuo.js.map