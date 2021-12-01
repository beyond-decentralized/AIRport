import { container, DI } from '@airport/di';
import { TransactionType } from '@airport/ground-control';
import { RepositoryTransactionType, REPOSITORY_TRANSACTION_HISTORY_DUO } from '@airport/holding-pattern';
import { SYNCHRONIZATION_CONFLICT_DAO, SYNCHRONIZATION_CONFLICT_VALUES_DAO, } from '@airport/moving-walkway';
import { STAGE1_SYNCED_IN_DATA_PROCESSOR, STAGE2_SYNCED_IN_DATA_PROCESSOR, TWO_STAGE_SYNCED_IN_DATA_PROCESSOR } from '../../tokens';
export class TwoStageSyncedInDataProcessor {
    /**
     * Synchronize the data messages coming to Terminal (new data for this TM)
     */
    async syncMessages(messages, transaction) {
        this.aggregateHistoryRecords(messages, transaction);
        const { actorMapById, repoTransHistoryMapByRepositoryId, applicationsByApplicationVersionIdMap } = await this.getDataStructures(messages);
        await this.updateLocalData(repoTransHistoryMapByRepositoryId, actorMapById, applicationsByApplicationVersionIdMap);
    }
    aggregateHistoryRecords(messages, transaction) {
        const transactionHistory = transaction.transHistory;
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
                    transactionHistory.allRecordHistoryNewValues = transactionHistory
                        .allRecordHistoryNewValues.concat(recordHistory.newValues);
                    transactionHistory.allRecordHistoryOldValues = transactionHistory
                        .allRecordHistoryOldValues.concat(recordHistory.oldValues);
                });
            });
        }
    }
    async getDataStructures(messages) {
        const repositoryTransactionHistoryDuo = await container(this).get(REPOSITORY_TRANSACTION_HISTORY_DUO);
        const repoTransHistoryMapByRepositoryId = new Map();
        const applicationsByApplicationVersionIdMap = new Map();
        const actorMapById = new Map();
        const repoTransHistories = [];
        for (const message of messages) {
            repoTransHistories.push(message.history);
            repoTransHistoryMapByRepositoryId.set(message.history.repository.id, repoTransHistories);
            for (const actor of message.actors) {
                actorMapById.set(actor.id, actor);
            }
            for (const applicationVersion of message.applicationVersions) {
                applicationsByApplicationVersionIdMap.set(applicationVersion.id, applicationVersion.application);
            }
        }
        for (const [_, repoTransHistories] of repoTransHistoryMapByRepositoryId) {
            repositoryTransactionHistoryDuo
                .sortRepoTransHistories(repoTransHistories, actorMapById);
        }
        return {
            actorMapById,
            repoTransHistoryMapByRepositoryId,
            applicationsByApplicationVersionIdMap
        };
    }
    async updateLocalData(repoTransHistoryMapByRepositoryId, actorMayById, applicationsByApplicationVersionIdMap) {
        const [stage1SyncedInDataProcessor, stage2SyncedInDataProcessor, synchronizationConflictDao, synchronizationConflictValuesDao] = await container(this).get(STAGE1_SYNCED_IN_DATA_PROCESSOR, STAGE2_SYNCED_IN_DATA_PROCESSOR, SYNCHRONIZATION_CONFLICT_DAO, SYNCHRONIZATION_CONFLICT_VALUES_DAO);
        const stage1Result = await stage1SyncedInDataProcessor.performStage1DataProcessing(repoTransHistoryMapByRepositoryId, actorMayById);
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
        await stage2SyncedInDataProcessor.applyChangesToDb(stage1Result, applicationsByApplicationVersionIdMap);
        if (allSyncConflicts.length) {
            await synchronizationConflictDao.insert(allSyncConflicts);
        }
        if (allSyncConflictValues.length) {
            await synchronizationConflictValuesDao.insert(allSyncConflictValues);
        }
    }
}
DI.set(TWO_STAGE_SYNCED_IN_DATA_PROCESSOR, TwoStageSyncedInDataProcessor);
//# sourceMappingURL=TwoStageSyncedInDataProcessor.js.map