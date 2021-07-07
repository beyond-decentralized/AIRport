import { RepoTransBlockSyncOutcomeType } from '@airport/arrivals-n-departures';
import { container, DI } from '@airport/di';
import { ensureChildArray, TransactionType } from '@airport/ground-control';
import { REPO_ACTOR_DAO, REPO_TRANS_HISTORY_DUO, RepositoryTransactionType } from '@airport/holding-pattern';
import { REPO_TRANS_BLOCK_DAO, SHARING_MESSAGE_DAO, SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO, SYNC_CONFLICT_DAO, SYNC_CONFLICT_PENDING_NOTIFICATION_DAO } from '@airport/moving-walkway';
import { TRANSACTION_MANAGER } from '@airport/terminal-map';
import { parse } from 'zipson/lib';
import { STAGE1_SYNCED_IN_DATA_PROCESSOR, STAGE2_SYNCED_IN_DATA_PROCESSOR, SYNC_IN_CHECKER, TWO_STAGE_SYNCED_IN_DATA_PROCESSOR } from '../../tokens';
export class TwoStageSyncedInDataProcessor {
    /**
     * Synchronize the data messages coming from AGT (new data for this TM).
     * @param {IDataToTM[]} dataMessages  Incoming data messages.
     * @param {Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>}
     *   sharingNodeRepositoryMap Local (TM) repository Id Map.
     * @returns {Promise<void>}
     */
    async syncDataMessages(dataMessages //,
    // sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>
    // sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>,
    // dataMessagesWithInvalidData: IDataToTM[]
    ) {
        // TODO: remove unused injections once tested
        const [repositoryActorDao, repositoryTransactionHistoryDuo, sharingMessageDao, sharingMessageRepoTransBlockDao, stage1SyncedInDataProcessor, stage2SyncedInDataProcessor, synchronizationConflictDao, synchronizationConflictPendingNotificationDao, syncInChecker, repositoryTransactionBlockDao, transactionManager] = await container(this).get(REPO_ACTOR_DAO, REPO_TRANS_HISTORY_DUO, SHARING_MESSAGE_DAO, SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO, STAGE1_SYNCED_IN_DATA_PROCESSOR, STAGE2_SYNCED_IN_DATA_PROCESSOR, SYNC_CONFLICT_DAO, SYNC_CONFLICT_PENDING_NOTIFICATION_DAO, SYNC_IN_CHECKER, REPO_TRANS_BLOCK_DAO, TRANSACTION_MANAGER);
        const [actorMapById, existingRepoTransBlocksWithCompatibleSchemasAndData, dataMessagesWithCompatibleSchemas, sharingMessagesWithCompatibleSchemasAndData,
        // usedSchemaVersionIdSet
        ] = await syncInChecker.checkSchemasAndDataAndRecordRepoTransBlocks(
        // consistentMessages, actorMap, sharingNodeRepositoryMap,
        // dataMessagesWithInvalidData
        dataMessages);
        const repoTransHistoryMapByRepositoryId = await this.recordSharingMessageToHistoryRecords(sharingMessagesWithCompatibleSchemasAndData, existingRepoTransBlocksWithCompatibleSchemasAndData, dataMessagesWithCompatibleSchemas, actorMapById, repositoryTransactionBlockDao, repoTransBlockRepoTransHistoryDao, transactionManager);
        await this.updateLocalData(repoTransHistoryMapByRepositoryId, actorMapById, schemasBySchemaVersionIdMap, repositoryActorDao, stage1SyncedInDataProcessor, stage2SyncedInDataProcessor, synchronizationConflictDao, synchronizationConflictPendingNotificationDao);
    }
    async recordSharingMessageToHistoryRecords(sharingMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, dataMessages, actorMapById, repositoryTransactionBlockDao, repoTransBlockRepoTransHistoryDao, // TODO: figure out the type
    transactionManager) {
        const repoTransHistoryMapByRepositoryId = await this.getRepoTransHistoryMapByRepoId(dataMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, actorMapById);
        const repositoryTransactionBlocks = [];
        const repoTransBlockRepoTransHistories = [];
        const transactionHistory = transactionManager.currentTransHistory;
        transactionHistory.transactionType = TransactionType.REMOTE_SYNC;
        // split messages by repository and record actor information
        for (let i = 0; i < dataMessages.length; i++) {
            const sharingMessage = sharingMessages[i];
            const dataMessage = dataMessages[i];
            const data = dataMessage.data;
            const repositoryTransactionBlock = {
                repository: data.repository,
                syncOutcomeType: RepoTransBlockSyncOutcomeType.SYNC_SUCCESSFUL
            };
            repositoryTransactionBlocks.push(repositoryTransactionBlock);
            sharingMessageRepoTransBlocks.push({
                sharingMessage,
                repositoryTransactionBlock
            });
            transactionHistory.repositoryTransactionHistories
                = transactionHistory.repositoryTransactionHistories.concat(data.repoTransHistories);
            data.repoTransHistories.forEach((repositoryTransactionHistory) => {
                repositoryTransactionHistory.repositoryTransactionType = RepositoryTransactionType.REMOTE;
                repoTransBlockRepoTransHistories.push({
                    repositoryTransactionHistory,
                    repositoryTransactionBlock
                });
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
            });
        }
        await repositoryTransactionBlockDao.bulkCreate(repositoryTransactionBlocks, false);
        await repoTransBlockRepoTransHistoryDao.bulkCreate(repoTransBlockRepoTransHistories, false);
        return repoTransHistoryMapByRepositoryId;
    }
    async getRepoTransHistoryMapByRepoId(dataMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, actorMapById, repositoryTransactionBlockDao, repositoryTransactionHistoryDuo) {
        const repoTransHistoryMapByRepositoryId = new Map();
        for (const dataMessage of dataMessages) {
            const data = dataMessage.data;
            this.addRepoTransHistoriesToMapFromData(repoTransHistoryMapByRepositoryId, data);
        }
        const repositoryTransactionBlockIds = [];
        for (const repositoryTransactionBlock of existingRepoTransBlocksWithCompatibleSchemasAndData) {
            const data = parse(repositoryTransactionBlock.contents);
            this.addRepoTransHistoriesToMapFromData(repoTransHistoryMapByRepositoryId, data);
            for (const actor of data.actors) {
                actorMapById.set(actor.id, actor);
            }
            repositoryTransactionBlockIds.push(repositoryTransactionBlock.id);
        }
        if (repositoryTransactionBlockIds.length) {
            await repositoryTransactionBlockDao.clearContentsWhereIdsIn(repositoryTransactionBlockIds);
        }
        for (const [repositoryId, repoTransHistories] of repoTransHistoryMapByRepositoryId) {
            repositoryTransactionHistoryDuo
                .sortRepoTransHistories(repoTransHistories, actorMapById);
        }
        return repoTransHistoryMapByRepositoryId;
    }
    addRepoTransHistoriesToMapFromData(repoTransHistoryMapByRepositoryId, data) {
        let repoTransHistories = ensureChildArray(repoTransHistoryMapByRepositoryId, data.repository.id);
        repoTransHistories = repoTransHistories.concat(data.repoTransHistories);
        repoTransHistoryMapByRepositoryId.set(data.repository.id, repoTransHistories);
    }
    async updateLocalData(repoTransHistoryMapByRepositoryId, actorMayById, schemasBySchemaVersionIdMap, repositoryActorDao, stage1SyncedInDataProcessor, stage2SyncedInDataProcessor, synchronizationConflictDao, synchronizationConflictPendingNotificationDao) {
        const stage1Result = await stage1SyncedInDataProcessor.performStage1DataProcessing(repoTransHistoryMapByRepositoryId, actorMayById);
        const actorIdMapByRepositoryId = await repositoryActorDao
            .findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(Array.from(stage1Result.syncConflictMapByRepoId.keys()));
        let allSyncConflicts = [];
        const syncConflictPendingNotifications = [];
        for (const [repositoryId, repoSyncConflicts] of stage1Result.syncConflictMapByRepoId) {
            allSyncConflicts = allSyncConflicts.concat(repoSyncConflicts);
            const actorIdSetForRepository = actorIdMapByRepositoryId.get(repositoryId);
            for (const synchronizationConflict of repoSyncConflicts) {
                for (const actorId of actorIdSetForRepository) {
                    syncConflictPendingNotifications.push({
                        acknowledged: false,
                        actor: {
                            id: actorId,
                        },
                        synchronizationConflict
                    });
                }
            }
        }
        await synchronizationConflictDao.bulkCreate(allSyncConflicts, false);
        await synchronizationConflictPendingNotificationDao.bulkCreate(syncConflictPendingNotifications, false);
        await stage2SyncedInDataProcessor.applyChangesToDb(stage1Result, schemasBySchemaVersionIdMap);
    }
}
DI.set(TWO_STAGE_SYNCED_IN_DATA_PROCESSOR, TwoStageSyncedInDataProcessor);
//# sourceMappingURL=TwoStageSyncedInDataProcessor.js.map