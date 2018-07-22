"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const InjectionTokens_1 = require("@airport/holding-pattern/lib/InjectionTokens");
const moving_walkway_1 = require("@airport/moving-walkway");
const terminal_map_1 = require("@airport/terminal-map");
const typedi_1 = require("typedi");
const lib_1 = require("zipson/lib");
const InjectionTokens_2 = require("../../../../apps/terminal/src/InjectionTokens");
const TransactionManager_1 = require("../../../../apps/terminal/src/orchestration/TransactionManager");
let TwoStageSyncedInDataProcessor = class TwoStageSyncedInDataProcessor {
    constructor(repositoryActorDao, repositoryTransactionHistoryDmo, sharingMessageDao, sharingMessageRepoTransBlockDao, stage1SyncedInDataProcessor, stage2SyncedInDataProcessor, synchronizationConflictDao, synchronizationConflictPendingNotificationDao, syncInChecker, repositoryTransactionBlockDao, repoTransBlockRepoTransHistoryDao, transactionManager, utils) {
        this.repositoryActorDao = repositoryActorDao;
        this.repositoryTransactionHistoryDmo = repositoryTransactionHistoryDmo;
        this.sharingMessageDao = sharingMessageDao;
        this.sharingMessageRepoTransBlockDao = sharingMessageRepoTransBlockDao;
        this.stage1SyncedInDataProcessor = stage1SyncedInDataProcessor;
        this.stage2SyncedInDataProcessor = stage2SyncedInDataProcessor;
        this.synchronizationConflictDao = synchronizationConflictDao;
        this.synchronizationConflictPendingNotificationDao = synchronizationConflictPendingNotificationDao;
        this.syncInChecker = syncInChecker;
        this.repositoryTransactionBlockDao = repositoryTransactionBlockDao;
        this.repoTransBlockRepoTransHistoryDao = repoTransBlockRepoTransHistoryDao;
        this.transactionManager = transactionManager;
        this.utils = utils;
    }
    /**
     * Synchronize the data messages coming from AGT (new data for this TM).
     * @param {IDataToTM[]} dataMessages  Incoming data messages.
     * @param {Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>} sharingNodeRepositoryMap
     *      Local (TM) repository Id Map.
     * @returns {Promise<void>}
     */
    async syncDataMessages(dataMessages, 
    // sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>
    sharingNodeRepositoryMap) {
        const { actorMap, actorMapById, consistentMessages } = await this.syncInChecker.actorChecker.ensureActorsAndGetAsMaps(dataMessages);
        const [sharingMessagesWithCompatibleSchemasAndData, existingRepoTransBlocksWithCompatibleSchemasAndData, messagesWithCompatibleSchemas, usedSchemaIdSet] = await this.syncInChecker.checkSchemasAndDataAndRecordSharingMessages(consistentMessages, actorMap, sharingNodeRepositoryMap);
        const repoTransHistoryMapByRepositoryId = await this.recordSharingMessageToHistoryRecords(sharingMessagesWithCompatibleSchemasAndData, existingRepoTransBlocksWithCompatibleSchemasAndData, messagesWithCompatibleSchemas, actorMapById);
        await this.updateLocalData(repoTransHistoryMapByRepositoryId, actorMapById);
    }
    async recordSharingMessageToHistoryRecords(sharingMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, dataMessages, actorMapById) {
        const repoTransHistoryMapByRepositoryId = await this.getRepoTransHistoryMapByRepoId(dataMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, actorMapById);
        const repositoryTransactionBlocks = [];
        const sharingMessageRepoTransBlocks = [];
        const repoTransBlockRepoTransHistories = [];
        const transactionHistory = this.transactionManager.currentTransHistory;
        transactionHistory.transactionType = terminal_map_1.TransactionType.REMOTE_SYNC;
        // split messages by repository and record actor information
        for (let i = 0; i < dataMessages.length; i++) {
            const sharingMessage = sharingMessages[i];
            const dataMessage = dataMessages[i];
            const data = dataMessage.data;
            const repositoryTransactionBlock = {
                repository: data.repository,
                syncOutcomeType: ground_control_1.RepoTransBlockSyncOutcomeType.SYNC_SUCCESSFUL
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
        await this.sharingMessageRepoTransBlockDao.bulkCreate(sharingMessageRepoTransBlocks, false, false);
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
            this.repositoryTransactionHistoryDmo
                .sortRepoTransHistories(repoTransHistories, actorMapById);
        }
        return repoTransHistoryMapByRepositoryId;
    }
    addRepoTransHistoriesToMapFromData(repoTransHistoryMapByRepositoryId, data) {
        let repoTransHistories = this.utils.ensureChildArray(repoTransHistoryMapByRepositoryId, data.repository.id);
        repoTransHistories = repoTransHistories.concat(data.repoTransHistories);
        repoTransHistoryMapByRepositoryId.set(data.repository.id, repoTransHistories);
    }
    async updateLocalData(repoTransHistoryMapByRepositoryId, actorMayById) {
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
        await this.stage2SyncedInDataProcessor.applyChangesToDb(stage1Result);
    }
};
TwoStageSyncedInDataProcessor = __decorate([
    typedi_1.Service(InjectionTokens_2.TwoStageSyncedInDataProcessorToken),
    __param(0, typedi_1.Inject(InjectionTokens_1.RepositoryActorDaoToken)),
    __param(1, typedi_1.Inject(InjectionTokens_1.RepositoryTransactionHistoryDmoToken)),
    __param(2, typedi_1.Inject(moving_walkway_1.SharingMessageDaoToken)),
    __param(3, typedi_1.Inject(moving_walkway_1.SharingMessageRepoTransBlockDaoToken)),
    __param(4, typedi_1.Inject(InjectionTokens_2.Stage1SyncedInDataProcessorToken)),
    __param(5, typedi_1.Inject(InjectionTokens_2.Stage2SyncedInDataProcessorToken)),
    __param(7, typedi_1.Inject(moving_walkway_1.SynchronizationConflictPendingNotificationDaoToken)),
    __param(8, typedi_1.Inject(InjectionTokens_2.SyncInCheckerToken)),
    __param(9, typedi_1.Inject(moving_walkway_1.RepositoryTransactionBlockDaoToken)),
    __param(10, typedi_1.Inject(moving_walkway_1.RepoTransBlockRepoTransHistoryDaoToken)),
    __param(11, typedi_1.Inject(InjectionTokens_2.TransactionManagerToken)),
    __param(12, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object, typeof (_a = typeof moving_walkway_1.IRepoTransBlockRepoTransHistoryDao !== "undefined" && moving_walkway_1.IRepoTransBlockRepoTransHistoryDao) === "function" && _a || Object, typeof (_b = typeof TransactionManager_1.ITransactionManager !== "undefined" && TransactionManager_1.ITransactionManager) === "function" && _b || Object, Object])
], TwoStageSyncedInDataProcessor);
exports.TwoStageSyncedInDataProcessor = TwoStageSyncedInDataProcessor;
var _a, _b;
//# sourceMappingURL=TwoStageSyncedInDataProcessor.js.map