"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const moving_walkway_1 = require("@airport/moving-walkway");
const terminal_map_1 = require("@airport/terminal-map");
const lib_1 = require("zipson/lib");
const diTokens_1 = require("../../diTokens");
class TwoStageSyncedInDataProcessor {
    constructor(repositoryActorDao, repositoryTransactionHistoryDuo, sharingMessageDao, sharingMessageRepoTransBlockDao, stage1SyncedInDataProcessor, stage2SyncedInDataProcessor, synchronizationConflictDao, synchronizationConflictPendingNotificationDao, syncInChecker, repositoryTransactionBlockDao, 
    // private repoTransBlockRepoTransHistoryDao: IRepoTransBlockRepoTransHistoryDao,
    transactionManager, utils) {
        this.repositoryActorDao = repositoryActorDao;
        this.repositoryTransactionHistoryDuo = repositoryTransactionHistoryDuo;
        this.sharingMessageDao = sharingMessageDao;
        this.sharingMessageRepoTransBlockDao = sharingMessageRepoTransBlockDao;
        this.stage1SyncedInDataProcessor = stage1SyncedInDataProcessor;
        this.stage2SyncedInDataProcessor = stage2SyncedInDataProcessor;
        this.synchronizationConflictDao = synchronizationConflictDao;
        this.synchronizationConflictPendingNotificationDao = synchronizationConflictPendingNotificationDao;
        this.syncInChecker = syncInChecker;
        this.repositoryTransactionBlockDao = repositoryTransactionBlockDao;
        this.transactionManager = transactionManager;
        this.utils = utils;
        di_1.DI.get((repositoryActorDao, repositoryTransactionHistoryDuo, sharingMessageDao, sharingMessageRepoTransBlockDao, stage1SyncedInDataProcessor, stage2SyncedInDataProcessor, synchronizationConflictDao, synchronizationConflictPendingNotificationDao, syncInChecker, repositoryTransactionBlockDao, transactionManager, utils) => {
            this.repositoryActorDao = repositoryActorDao;
            this.repositoryTransactionHistoryDuo = repositoryTransactionHistoryDuo;
            this.sharingMessageDao = sharingMessageDao;
            this.sharingMessageRepoTransBlockDao = sharingMessageRepoTransBlockDao;
            this.stage1SyncedInDataProcessor = stage1SyncedInDataProcessor;
            this.stage2SyncedInDataProcessor = stage2SyncedInDataProcessor;
            this.synchronizationConflictDao = synchronizationConflictDao;
            this.synchronizationConflictPendingNotificationDao = synchronizationConflictPendingNotificationDao;
            this.syncInChecker = syncInChecker;
            this.repositoryTransactionBlockDao = repositoryTransactionBlockDao;
            this.transactionManager = transactionManager;
            this.utils = utils;
        }, holding_pattern_1.REPO_ACTOR_DAO, holding_pattern_1.REPO_TRANS_HISTORY_DUO, moving_walkway_1.SHARING_MESSAGE_DAO, moving_walkway_1.SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO, diTokens_1.STAGE1_SYNCED_IN_DATA_PROCESSOR, diTokens_1.STAGE2_SYNCED_IN_DATA_PROCESSOR, moving_walkway_1.SYNC_CONFLICT_DAO, moving_walkway_1.SYNC_CONFLICT_PENDING_NOTIFICATION_DAO, diTokens_1.SYNC_IN_CHECKER, moving_walkway_1.REPO_TRANS_BLOCK_DAO, terminal_map_1.TRANSACTION_MANAGER, air_control_1.UTILS);
    }
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
        const [actorMapById, existingRepoTransBlocksWithCompatibleSchemasAndData, dataMessagesWithCompatibleSchemas, sharingMessagesWithCompatibleSchemasAndData,] = await this.syncInChecker.checkSchemasAndDataAndRecordRepoTransBlocks(
        // consistentMessages, actorMap, sharingNodeRepositoryMap,
        // dataMessagesWithInvalidData
        dataMessages);
        const repoTransHistoryMapByRepositoryId = await this.recordSharingMessageToHistoryRecords(sharingMessagesWithCompatibleSchemasAndData, existingRepoTransBlocksWithCompatibleSchemasAndData, dataMessagesWithCompatibleSchemas, actorMapById);
        await this.updateLocalData(repoTransHistoryMapByRepositoryId, actorMapById);
    }
    async recordSharingMessageToHistoryRecords(sharingMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, dataMessages, actorMapById) {
        const repoTransHistoryMapByRepositoryId = await this.getRepoTransHistoryMapByRepoId(dataMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, actorMapById);
        const repositoryTransactionBlocks = [];
        const repoTransBlockRepoTransHistories = [];
        const transactionHistory = this.transactionManager.currentTransHistory;
        transactionHistory.transactionType = ground_control_1.TransactionType.REMOTE_SYNC;
        // split messages by repository and record actor information
        for (let i = 0; i < dataMessages.length; i++) {
            const sharingMessage = sharingMessages[i];
            const dataMessage = dataMessages[i];
            const data = dataMessage.data;
            const repositoryTransactionBlock = {
                repository: data.repository,
                syncOutcomeType: arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_SUCCESSFUL
            };
            repositoryTransactionBlocks.push(repositoryTransactionBlock);
            sharingMessageRepoTransBlocks.push({
                sharingMessage,
                repositoryTransactionBlock
            });
            transactionHistory.repositoryTransactionHistories
                = transactionHistory.repositoryTransactionHistories.concat(data.repoTransHistories);
            data.repoTransHistories.forEach((repositoryTransactionHistory) => {
                repositoryTransactionHistory.repositoryTransactionType = holding_pattern_1.RepositoryTransactionType.REMOTE;
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
        await this.repositoryTransactionBlockDao.bulkCreate(repositoryTransactionBlocks, false, false);
        await this.repoTransBlockRepoTransHistoryDao.bulkCreate(repoTransBlockRepoTransHistories, false, false);
        return repoTransHistoryMapByRepositoryId;
    }
    async getRepoTransHistoryMapByRepoId(dataMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, actorMapById) {
        const repoTransHistoryMapByRepositoryId = new Map();
        for (const dataMessage of dataMessages) {
            const data = dataMessage.data;
            this.addRepoTransHistoriesToMapFromData(repoTransHistoryMapByRepositoryId, data);
        }
        const repositoryTransactionBlockIds = [];
        for (const repositoryTransactionBlock of existingRepoTransBlocksWithCompatibleSchemasAndData) {
            const data = lib_1.parse(repositoryTransactionBlock.contents);
            this.addRepoTransHistoriesToMapFromData(repoTransHistoryMapByRepositoryId, data);
            for (const actor of data.actors) {
                actorMapById.set(actor.id, actor);
            }
            repositoryTransactionBlockIds.push(repositoryTransactionBlock.id);
        }
        if (repositoryTransactionBlockIds.length) {
            await this.repositoryTransactionBlockDao.clearContentsWhereIdsIn(repositoryTransactionBlockIds);
        }
        for (const [repositoryId, repoTransHistories] of repoTransHistoryMapByRepositoryId) {
            this.repositoryTransactionHistoryDuo
                .sortRepoTransHistories(repoTransHistories, actorMapById);
        }
        return repoTransHistoryMapByRepositoryId;
    }
    addRepoTransHistoriesToMapFromData(repoTransHistoryMapByRepositoryId, data) {
        let repoTransHistories = this.utils.ensureChildArray(repoTransHistoryMapByRepositoryId, data.repository.id);
        repoTransHistories = repoTransHistories.concat(data.repoTransHistories);
        repoTransHistoryMapByRepositoryId.set(data.repository.id, repoTransHistories);
    }
    async updateLocalData(repoTransHistoryMapByRepositoryId, actorMayById, schemasBySchemaVersionIdMap) {
        const stage1Result = await this.stage1SyncedInDataProcessor.performStage1DataProcessing(repoTransHistoryMapByRepositoryId, actorMayById);
        const actorIdMapByRepositoryId = await this.repositoryActorDao
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
        await this.synchronizationConflictDao
            .bulkCreate(allSyncConflicts, false, false);
        await this.synchronizationConflictPendingNotificationDao
            .bulkCreate(syncConflictPendingNotifications, false, false);
        await this.stage2SyncedInDataProcessor.applyChangesToDb(stage1Result, schemasBySchemaVersionIdMap);
    }
}
exports.TwoStageSyncedInDataProcessor = TwoStageSyncedInDataProcessor;
di_1.DI.set(diTokens_1.TWO_STAGE_SYNCED_IN_DATA_PROCESSOR, TwoStageSyncedInDataProcessor);
//# sourceMappingURL=TwoStageSyncedInDataProcessor.js.map