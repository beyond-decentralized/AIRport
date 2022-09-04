var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TransactionType } from '@airport/ground-control';
import { RepositoryTransactionType } from '@airport/holding-pattern/dist/app/bundle';
import { Inject, Injected } from '@airport/direction-indicator';
let TwoStageSyncedInDataProcessor = class TwoStageSyncedInDataProcessor {
    /**
     * Synchronize the data messages coming to Terminal (new data for this TM)
     */
    async syncMessages(messages, transaction, context) {
        this.aggregateHistoryRecords(messages, transaction);
        const { actorMapById, repositoryTransactionHistoryMapByRepositoryId, applicationsByApplicationVersion_LocalIdMap } = await this.getDataStructures(messages);
        await this.updateLocalData(repositoryTransactionHistoryMapByRepositoryId, actorMapById, applicationsByApplicationVersion_LocalIdMap, context);
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
        const applicationsByApplicationVersion_LocalIdMap = new Map();
        const actorMapById = new Map();
        const repoTransHistories = [];
        for (const message of messages) {
            repoTransHistories.push(message.history);
            repositoryTransactionHistoryMapByRepositoryId.set(message.history.repository._localId, repoTransHistories);
            for (const actor of message.actors) {
                actorMapById.set(actor._localId, actor);
            }
            for (const applicationVersion of message.applicationVersions) {
                applicationsByApplicationVersion_LocalIdMap.set(applicationVersion._localId, applicationVersion.application);
            }
        }
        for (const [_, repoTransHistories] of repositoryTransactionHistoryMapByRepositoryId) {
            this.repositoryTransactionHistoryDuo
                .sortRepoTransHistories(repoTransHistories, actorMapById);
        }
        return {
            actorMapById,
            repositoryTransactionHistoryMapByRepositoryId,
            applicationsByApplicationVersion_LocalIdMap
        };
    }
    async updateLocalData(repositoryTransactionHistoryMapByRepositoryId, actorMayById, applicationsByApplicationVersion_LocalIdMap, context) {
        const stage1Result = await this.stage1SyncedInDataProcessor.performStage1DataProcessing(repositoryTransactionHistoryMapByRepositoryId, actorMayById, context);
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
        await this.stage2SyncedInDataProcessor.applyChangesToDb(stage1Result, applicationsByApplicationVersion_LocalIdMap);
        if (allSyncConflicts.length) {
            await this.synchronizationConflictDao.insert(allSyncConflicts, context);
        }
        if (allSyncConflictValues.length) {
            await this.synchronizationConflictValuesDao.insert(allSyncConflictValues, context);
        }
    }
};
__decorate([
    Inject()
], TwoStageSyncedInDataProcessor.prototype, "repositoryTransactionHistoryDuo", void 0);
__decorate([
    Inject()
], TwoStageSyncedInDataProcessor.prototype, "stage1SyncedInDataProcessor", void 0);
__decorate([
    Inject()
], TwoStageSyncedInDataProcessor.prototype, "stage2SyncedInDataProcessor", void 0);
__decorate([
    Inject()
], TwoStageSyncedInDataProcessor.prototype, "synchronizationConflictDao", void 0);
__decorate([
    Inject()
], TwoStageSyncedInDataProcessor.prototype, "synchronizationConflictValuesDao", void 0);
TwoStageSyncedInDataProcessor = __decorate([
    Injected()
], TwoStageSyncedInDataProcessor);
export { TwoStageSyncedInDataProcessor };
//# sourceMappingURL=TwoStageSyncedInDataProcessor.js.map