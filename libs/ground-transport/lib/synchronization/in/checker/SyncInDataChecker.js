"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const moving_walkway_1 = require("@airport/moving-walkway");
const terminal_map_1 = require("@airport/terminal-map");
const diTokens_1 = require("../../../diTokens");
class SyncInDataChecker {
    constructor() {
        di_1.DI.get((missingRecordDao, missingRecordRepoTransBlockDao, repositoryTransactionBlockDao, repositoryTransactionHistoryDao, sharingMessageDao, syncInRepositoryTransactionBlockCreator, syncInUtils, terminalStore, utils) => {
            this.missingRecordDao = missingRecordDao;
            this.missingRecordRepoTransBlockDao = missingRecordRepoTransBlockDao;
            this.repositoryTransactionBlockDao = repositoryTransactionBlockDao;
            this.repositoryTransactionHistoryDao = repositoryTransactionHistoryDao;
            this.sharingMessageDao = sharingMessageDao;
            this.syncInRepositoryTransactionBlockCreator = syncInRepositoryTransactionBlockCreator;
            this.syncInUtils = syncInUtils;
            this.terminalStore = terminalStore;
            this.utils = utils;
        }, moving_walkway_1.MISSING_RECORD_DAO, moving_walkway_1.MISSING_RECORD_REPO_TRANS_BLOCK_DAO, moving_walkway_1.REPO_TRANS_BLOCK_DAO, holding_pattern_1.REPO_TRANS_HISTORY_DAO, moving_walkway_1.SHARING_MESSAGE_DAO, diTokens_1.SYNC_IN_REPO_TRANS_BLOCK_CREATOR, diTokens_1.SYNC_IN_UTILS, terminal_map_1.TERMINAL_STORE, air_control_1.UTILS);
    }
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleSchemas
     * @returns {DataCheckResults}
     */
    async checkData(dataMessagesWithCompatibleSchemas) {
        const { messageIndexMapByRecordToUpdateIds, recordsToUpdateMap } = this.getDataStructuresForChanges(dataMessagesWithCompatibleSchemas);
        const existingRecordIdMap = await this.repositoryTransactionHistoryDao.findExistingRecordIdMap(recordsToUpdateMap);
        const dataMessagesWithIncompatibleData = [];
        const { compatibleDataMessageFlags, missingRecordDataToTMs, } = await this.determineMissingRecords(dataMessagesWithCompatibleSchemas, dataMessagesWithIncompatibleData, recordsToUpdateMap, existingRecordIdMap, messageIndexMapByRecordToUpdateIds);
        const dataMessagesWithCompatibleSchemasAndData = [];
        // filter out data messages with records that do not exist
        for (let i = 0; i < compatibleDataMessageFlags.length; i++) {
            const dataMessage = dataMessagesWithCompatibleSchemas[i];
            if (compatibleDataMessageFlags[i]) {
                dataMessagesWithCompatibleSchemasAndData.push(dataMessage);
            }
        }
        const toBeInsertedRecordMap = this.getRecordsToInsertMap(dataMessagesWithCompatibleSchemasAndData);
        const foundMissingRecordIds = await this.missingRecordDao.setStatusWhereIdsInAndReturnIds(toBeInsertedRecordMap, moving_walkway_1.MissingRecordStatus.MISSING);
        // Find repository transaction blocks that now can be processed
        const existingRepoTransBlocksWithCompatibleSchemasAndData = await this.getExistingRepoTransBlocksWithCompatibleSchemasAndData(foundMissingRecordIds);
        return {
            dataMessagesWithCompatibleSchemasAndData,
            dataMessagesWithIncompatibleData,
            existingRepoTransBlocksWithCompatibleSchemasAndData,
            missingRecordDataToTMs
        };
    }
    getDataStructuresForChanges(dataMessagesWithCompatibleSchemas) {
        const recordsToInsertMap = this.getRecordsToInsertMap(dataMessagesWithCompatibleSchemas);
        const recordsToUpdateMap = new Map();
        const messageIndexMapByRecordToUpdateIds = new Map();
        for (let i = 0; i < dataMessagesWithCompatibleSchemas.length; i++) {
            const dataMessages = dataMessagesWithCompatibleSchemas[i];
            dataMessages.data.repoTransHistories.sort((repoTransHistory1, repoTransHistory2) => repoTransHistory1.saveTimestamp.getTime() - repoTransHistory2.saveTimestamp.getTime());
            for (const repoTransHistory of dataMessages.data.repoTransHistories) {
                const repositoryId = repoTransHistory.repository.id;
                const recordToInsertMapForRepo = recordsToInsertMap.get(repositoryId);
                repoTransHistory.operationHistory.sort((operationHistory1, operationHistory2) => operationHistory1.orderNumber - operationHistory2.orderNumber);
                for (const operationHistory of repoTransHistory.operationHistory) {
                    let recordToInsertMapForEntityInRepo;
                    if (recordToInsertMapForRepo) {
                        const recordToInsertMapForSchemaInRepo = recordToInsertMapForRepo.get(operationHistory.schemaVersion.id);
                        if (recordToInsertMapForSchemaInRepo) {
                            recordToInsertMapForEntityInRepo
                                = recordToInsertMapForSchemaInRepo.get(operationHistory.entity.id);
                        }
                    }
                    switch (operationHistory.changeType) {
                        case ground_control_1.ChangeType.DELETE_ROWS:
                        case ground_control_1.ChangeType.UPDATE_ROWS:
                            for (const recordHistory of operationHistory.recordHistory) {
                                let recordToInsertSetForActor;
                                if (recordToInsertMapForEntityInRepo) {
                                    recordToInsertSetForActor
                                        = recordToInsertMapForEntityInRepo.get(recordHistory.actor.id);
                                }
                                if (!recordToInsertSetForActor
                                    || !recordToInsertSetForActor.has(recordHistory.actorRecordId)) {
                                    const recordToUpdateMapForRepoInTable = this.syncInUtils
                                        .ensureRecordMapForRepoInTable(repositoryId, operationHistory, recordsToUpdateMap);
                                    this.ensureRecordId(recordHistory, recordToUpdateMapForRepoInTable, recordHistory.actorRecordId);
                                    this.utils.ensureChildJsSet(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(messageIndexMapByRecordToUpdateIds, repositoryId), operationHistory.schemaVersion.id), operationHistory.entity.id), recordHistory.actor.id), recordHistory.actorRecordId)
                                        .add(i);
                                }
                            }
                            break;
                    }
                }
            }
        }
        return {
            messageIndexMapByRecordToUpdateIds,
            recordsToUpdateMap
        };
    }
    async determineMissingRecords(dataMessagesWithCompatibleSchemas, dataMessagesWithIncompatibleData, recordToUpdateMap, existingRecordIdMap, messageIndexMapByRecordToUpdateIds) {
        const compatibleDataMessageFlags = dataMessagesWithCompatibleSchemas.map(_ => true);
        const missingRecords = [];
        const missingRecordDataToTMs = [];
        const sparseDataMessagesWithIncompatibleData = [];
        for (const [repositoryId, updatedRecordMapForRepository] of recordToUpdateMap) {
            const existingRecordMapForRepository = existingRecordIdMap.get(repositoryId);
            const messageIndexMapForRepository = messageIndexMapByRecordToUpdateIds.get(repositoryId);
            for (const [schemaIndex, updatedRecordMapForSchemaInRepo] of updatedRecordMapForRepository) {
                let existingRecordMapForSchemaInRepo;
                if (existingRecordMapForRepository) {
                    existingRecordMapForSchemaInRepo = existingRecordMapForRepository.get(schemaIndex);
                }
                const messageIndexMapForSchemaIndRepo = messageIndexMapForRepository.get(schemaIndex);
                for (const [entityId, updatedRecordMapForTableInRepo] of updatedRecordMapForSchemaInRepo) {
                    let existingRecordMapForTableInSchema;
                    if (existingRecordMapForSchemaInRepo) {
                        existingRecordMapForTableInSchema = existingRecordMapForSchemaInRepo.get(entityId);
                    }
                    const messageIndexMapForTableInSchema = messageIndexMapForSchemaIndRepo.get(entityId);
                    for (const [actorId, actorRecordIds] of updatedRecordMapForTableInRepo) {
                        let existingRecordIdSetForActor;
                        if (existingRecordMapForTableInSchema) {
                            existingRecordIdSetForActor = existingRecordMapForTableInSchema.get(actorId);
                        }
                        const messageIndexMapForActor = messageIndexMapForTableInSchema.get(actorId);
                        if (existingRecordIdSetForActor) {
                            for (const actorRecordId of actorRecordIds) {
                                if (!existingRecordIdSetForActor.has(actorRecordId)) {
                                    this.recordMissingRecordAndRepoTransBlockRelations(repositoryId, schemaIndex, entityId, actorId, actorRecordId, missingRecords, compatibleDataMessageFlags, messageIndexMapForActor, dataMessagesWithCompatibleSchemas, dataMessagesWithIncompatibleData, sparseDataMessagesWithIncompatibleData, missingRecordDataToTMs);
                                }
                            }
                        }
                        else {
                            for (const actorRecordId of actorRecordIds) {
                                this.recordMissingRecordAndRepoTransBlockRelations(repositoryId, schemaIndex, entityId, actorId, actorRecordId, missingRecords, compatibleDataMessageFlags, messageIndexMapForActor, dataMessagesWithCompatibleSchemas, dataMessagesWithIncompatibleData, sparseDataMessagesWithIncompatibleData, missingRecordDataToTMs);
                            }
                        }
                    }
                }
            }
        }
        if (missingRecords.length) {
            await this.missingRecordDao.bulkCreate(missingRecords, false, false);
        }
        return {
            compatibleDataMessageFlags,
            missingRecordDataToTMs
        };
    }
    getRecordsToInsertMap(dataMessages) {
        const recordsToInsertMap = new Map();
        for (let i = 0; i < dataMessages.length; i++) {
            const dataMessage = dataMessages[i];
            for (const repoTransHistory of dataMessage.data.repoTransHistories) {
                const repositoryId = repoTransHistory.repository.id;
                for (const operationHistory of repoTransHistory.operationHistory) {
                    switch (operationHistory.changeType) {
                        case ground_control_1.ChangeType.INSERT_VALUES:
                            for (const recordHistory of operationHistory.recordHistory) {
                                this.utils.ensureChildJsSet(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(recordsToInsertMap, repositoryId), operationHistory.schemaVersion.id), operationHistory.entity.id), recordHistory.actor.id)
                                    .add(recordHistory.actorRecordId);
                            }
                            break;
                    }
                }
            }
        }
        return recordsToInsertMap;
    }
    ensureRecordId(recordHistory, actorRecordIdSetByActor, actorRecordId = recordHistory.actorRecordId) {
        this.utils.ensureChildJsSet(actorRecordIdSetByActor, recordHistory.actor.id).add(actorRecordId);
    }
    recordMissingRecordAndRepoTransBlockRelations(repositoryId, schemaVersionId, entityId, actorId, actorRecordId, missingRecords, compatibleDataMessageFlags, messageIndexMapForActor, dataMessagesWithCompatibleSchemas, dataMessagesWithIncompatibleData, sparseDataMessagesWithIncompatibleData, missingRecordDataToTMs) {
        const missingRecord = this.createMissingRecord(repositoryId, schemaVersionId, entityId, actorId, actorRecordId);
        missingRecords.push(missingRecord);
        for (const messageIndex of messageIndexMapForActor.get(actorRecordId)) {
            let dataMessage;
            if (compatibleDataMessageFlags[messageIndex]) {
                const dataMessage = dataMessagesWithCompatibleSchemas[messageIndex];
                sparseDataMessagesWithIncompatibleData[messageIndex]
                    = dataMessage;
                dataMessagesWithIncompatibleData.push(dataMessage);
                compatibleDataMessageFlags[messageIndex] = false;
            }
            else {
                dataMessage
                    = sparseDataMessagesWithIncompatibleData[messageIndex];
            }
            missingRecordDataToTMs.push({
                missingRecord,
                dataMessage
            });
        }
    }
    createMissingRecord(repositoryId, schemaVersionId, entityId, actorId, actorRecordId) {
        return {
            schemaVersion: {
                id: schemaVersionId
            },
            entity: {
                id: entityId
            },
            repository: {
                id: repositoryId
            },
            actor: {
                id: actorId
            },
            actorRecordId,
            status: moving_walkway_1.MissingRecordStatus.MISSING
        };
    }
    async getExistingRepoTransBlocksWithCompatibleSchemasAndData(foundMissingRecordIds) {
        if (foundMissingRecordIds.length) {
            return [];
        }
        const existingRepoTransBlocksWithCompatibleSchemasAndData = await this.repositoryTransactionBlockDao.findWithMissingRecordIdsAndNoMissingRecordsWithStatus(foundMissingRecordIds, moving_walkway_1.MissingRecordStatus.MISSING);
        await this.missingRecordRepoTransBlockDao.deleteWhereMissingRecordIdsIn(foundMissingRecordIds);
        await this.missingRecordDao.deleteWhereIdsIn(foundMissingRecordIds);
        return existingRepoTransBlocksWithCompatibleSchemasAndData;
    }
}
exports.SyncInDataChecker = SyncInDataChecker;
di_1.DI.set(diTokens_1.SYNC_IN_DATA_CHECKER, SyncInDataChecker);
//# sourceMappingURL=SyncInDataChecker.js.map