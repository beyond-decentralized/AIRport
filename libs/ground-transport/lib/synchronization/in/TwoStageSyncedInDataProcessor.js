import { TransactionType } from '@airport/ground-control';
import { RepositoryTransactionType } from '@airport/holding-pattern';
export class TwoStageSyncedInDataProcessor {
    /**
     * Synchronize the data messages coming to Terminal (new data for this TM)
     */
    async syncMessages(messages, transaction) {
        this.aggregateHistoryRecords(messages, transaction);
        const { actorMapById, repositoryTransactionHistoryMapByRepositoryId, applicationsByApplicationVersionIdMap } = await this.getDataStructures(messages);
        await this.updateLocalData(repositoryTransactionHistoryMapByRepositoryId, actorMapById, applicationsByApplicationVersionIdMap);
    }
    aggregateHistoryRecords(messages, transaction) {
        const transactionHistory = transaction.transactionHistory;
        transactionHistory.transactionType = TransactionType.REMOTE_SYNC;
        // split messages by repository and record actor information
        for (const message of messages) {
            const repositoryTransactionHistory = message.history;
            transactionHistory.repositoryTransactionHistories.push(repositoryTransactionHistory);
            repositoryTransactionHistory.repositoryTransactionType = RepositoryTransactionType.REMOTE;
            transactionHistory.allOperationHistory = transactionHistory
                .allOperationHistory.concat(repositoryTransactionHistory.operationHistory);
            repositoryTransactionHistory.operationHistory.forEach((operationHistory) => {
                transactionHistory.allRecordHistory = transactionHistory
                    .allRecordHistory.concat(operationHistory.recordHistory);
                operationHistory.recordHistory.forEach((recordHistory) => {
                    if (recordHistory.newValues && recordHistory.newValues.length) {
                        transactionHistory.allRecordHistoryNewValues = transactionHistory
                            .allRecordHistoryNewValues.concat(recordHistory.newValues);
                    }
                    if (recordHistory.oldValues && recordHistory.oldValues.length) {
                        transactionHistory.allRecordHistoryOldValues = transactionHistory
                            .allRecordHistoryOldValues.concat(recordHistory.oldValues);
                    }
                });
            });
        }
    }
    async getDataStructures(messages) {
        const repositoryTransactionHistoryMapByRepositoryId = new Map();
        const applicationsByApplicationVersionIdMap = new Map();
        const actorMapById = new Map();
        const repoTransHistories = [];
        for (const message of messages) {
            repoTransHistories.push(message.history);
            repositoryTransactionHistoryMapByRepositoryId.set(message.history.repository.id, repoTransHistories);
            for (const actor of message.actors) {
                actorMapById.set(actor.id, actor);
            }
            for (const applicationVersion of message.applicationVersions) {
                applicationsByApplicationVersionIdMap.set(applicationVersion.id, applicationVersion.application);
            }
        }
        for (const [_, repoTransHistories] of repositoryTransactionHistoryMapByRepositoryId) {
            this.repositoryTransactionHistoryDuo
                .sortRepoTransHistories(repoTransHistories, actorMapById);
        }
        return {
            actorMapById,
            repositoryTransactionHistoryMapByRepositoryId,
            applicationsByApplicationVersionIdMap
        };
    }
    async updateLocalData(repositoryTransactionHistoryMapByRepositoryId, actorMayById, applicationsByApplicationVersionIdMap) {
        const stage1Result = await this.stage1SyncedInDataProcessor.performStage1DataProcessing(repositoryTransactionHistoryMapByRepositoryId, actorMayById);
        let allSyncConflicts = [];
        let allSyncConflictValues = [];
        for (const [_, synchronizationConflicts] of stage1Result.syncConflictMapByRepoId) {
            allSyncConflicts = allSyncConflicts.concat(synchronizationConflicts);
            for (const synchronizationConflict of synchronizationConflicts) {
                if (synchronizationConflict.values.length) {
                    allSyncConflictValues = allSyncConflictValues.concat(synchronizationConflict.values);
                }
            }
        }
        await this.stage2SyncedInDataProcessor.applyChangesToDb(stage1Result, applicationsByApplicationVersionIdMap);
        if (allSyncConflicts.length) {
            await this.synchronizationConflictDao.insert(allSyncConflicts);
        }
        if (allSyncConflictValues.length) {
            await this.synchronizationConflictValuesDao.insert(allSyncConflictValues);
        }
    }
}
//# sourceMappingURL=TwoStageSyncedInDataProcessor.js.map