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
const moving_walkway_1 = require("@airport/moving-walkway");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../../../InjectionTokens");
let SyncInDataChecker = class SyncInDataChecker {
    constructor(missingRecordDao, missingRecordRepoTransBlockDao, repositoryTransactionHistoryDao, sharingMessageDao, syncInRepositoryTransactionBlockCreator, syncInUtils, utils) {
        this.missingRecordDao = missingRecordDao;
        this.missingRecordRepoTransBlockDao = missingRecordRepoTransBlockDao;
        this.repositoryTransactionHistoryDao = repositoryTransactionHistoryDao;
        this.sharingMessageDao = sharingMessageDao;
        this.syncInRepositoryTransactionBlockCreator = syncInRepositoryTransactionBlockCreator;
        this.syncInUtils = syncInUtils;
        this.utils = utils;
    }
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleSchemas
     * @returns {DataCheckResults}
     */
    async checkData(dataMessagesWithCompatibleSchemas) {
        const recordsToInsert = this.getRecordsToInsertMap(dataMessagesWithCompatibleSchemas);
        const recordToUpdateMap = new Map();
        const messageIndexMapByRecordToUpdateIds = new Map();
        for (let i = 0; i < dataMessagesWithCompatibleSchemas.length; i++) {
            const dataMessages = dataMessagesWithCompatibleSchemas[i];
            for (const repoTransHistory of dataMessages.data.repoTransHistories) {
                const repositoryId = repoTransHistory.repository.id;
                const recordToInsertMapForRepo = recordsToInsert.get(repositoryId);
                for (const operationHistory of repoTransHistory.operationHistory) {
                    let recordToInsertMapForEntityInRepo;
                    if (recordToInsertMapForRepo) {
                        const recordToInsertMapForSchemaInRepo = recordToInsertMapForRepo.get(operationHistory.schemaVersion.id);
                        if (recordToInsertMapForSchemaInRepo) {
                            recordToInsertMapForEntityInRepo
                                = recordToInsertMapForSchemaInRepo.get(operationHistory.entity.index);
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
                                        .ensureRecordMapForRepoInTable(repositoryId, operationHistory, recordToUpdateMap);
                                    this.ensureRecordId(recordHistory, recordToUpdateMapForRepoInTable, recordHistory.actorRecordId);
                                    this.utils.ensureChildJsSet(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(messageIndexMapByRecordToUpdateIds, repositoryId), operationHistory.schemaVersion.id), operationHistory.entity.index), recordHistory.actor.id), recordHistory.actorRecordId)
                                        .add(i);
                                }
                            }
                            break;
                    }
                }
            }
        }
        const existingRecordIdMap = await this.repositoryTransactionHistoryDao.findExistingRecordIdMap(recordToUpdateMap);
        const compatibleDataMessageFlags = dataMessagesWithCompatibleSchemas.map(dataMessage => true);
        const dataMessagesWithIncompatibleData = [];
        const sparseDataMessagesWithIncompatibleData = [];
        const dataMessagesWithCompatibleSchemasAndData = [];
        // filter out data messages with records that do no exist
        for (let i = 0; i < compatibleDataMessageFlags.length; i++) {
            const dataMessage = dataMessagesWithCompatibleSchemas[i];
            if (compatibleDataMessageFlags[i]) {
                dataMessagesWithCompatibleSchemasAndData.push(dataMessage);
            }
        }
        const toBeInsertedRecordMap = this.getRecordsToInsertMap(dataMessagesWithCompatibleSchemasAndData);
        const foundMissingRecordIds = await this.missingRecordDao.setStatusWhereIdsInAndReturnIds(toBeInsertedRecordMap);
        // Find repository transaction blocks that now can be processed
        const existingRepoTransBlocksWithCompatibleSchemasAndData = await this.getExistingRepoTransBlocksWithCompatibleSchemasAndData(foundMissingRecordIds);
        return {
            dataMessagesWithCompatibleSchemasAndData,
            existingRepoTransBlocksWithCompatibleSchemasAndData,
            missingRecordRepoTransBlocks,
            dataMessagesWithIncompatibleData
        };
    }
    determineMissingRecords() {
        const missingRecords = [];
        const missingRecordRepoTransBlock = [];
        for (const [repositoryId, updatedRecordMapForRepository] of recordToUpdateMap) {
            const existingRecordMapForRepository = existingRecordIdMap.get(repositoryId);
            const messageIndexMapForRepository = messageIndexMapByRecordToUpdateIds.get(repositoryId);
            for (const [schemaIndex, updatedRecordMapForSchemaInRepo] of updatedRecordMapForRepository) {
                let existingRecordMapForSchemaInRepo;
                if (existingRecordMapForRepository) {
                    existingRecordMapForSchemaInRepo = existingRecordMapForRepository.get(schemaIndex);
                }
                const messageIndexMapForSchemaIndRepo = messageIndexMapForRepository.get(schemaIndex);
                for (const [tableIndex, updatedRecordMapForTableInRepo] of updatedRecordMapForSchemaInRepo) {
                    let existingRecordMapForTableInSchema;
                    if (existingRecordMapForSchemaInRepo) {
                        existingRecordMapForTableInSchema = existingRecordMapForSchemaInRepo.get(tableIndex);
                    }
                    const messageIndexMapForTableInSchema = messageIndexMapForSchemaIndRepo.get(tableIndex);
                    for (const [actorId, actorRecordIds] of updatedRecordMapForTableInRepo) {
                        let existingRecordIdSetForActor;
                        if (existingRecordMapForTableInSchema) {
                            existingRecordIdSetForActor = existingRecordMapForTableInSchema.get(actorId);
                        }
                        const messageIndexMapForActor = messageIndexMapForTableInSchema.get(actorId);
                        if (existingRecordIdSetForActor) {
                            for (const actorRecordId of actorRecordIds) {
                                if (!existingRecordIdSetForActor.has(actorRecordId)) {
                                    this.recordMissingRecordAndRepoTransBlockRelations(repositoryId, schemaIndex, tableIndex, actorId, actorRecordId, missingRecords, compatibleDataMessageFlags, messageIndexMapForActor, dataMessagesWithCompatibleSchemas, dataMessagesWithIncompatibleData, sparseDataMessagesWithIncompatibleData, missingRecordRepoTransBlock);
                                }
                            }
                        }
                        else {
                            for (const actorRecordId of actorRecordIds) {
                                this.recordMissingRecordAndRepoTransBlockRelations(repositoryId, schemaIndex, tableIndex, actorId, actorRecordId, missingRecords, compatibleDataMessageFlags, messageIndexMapForActor, dataMessagesWithCompatibleSchemas, dataMessagesWithIncompatibleData, sparseDataMessagesWithIncompatibleData, missingRecordRepoTransBlock);
                            }
                        }
                    }
                }
            }
        }
        if (missingRecords.length) {
            await this.missingRecordDao.bulkCreate(missingRecords, false, false);
        }
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
                                this.utils.ensureChildJsSet(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(recordsToInsertMap, repositoryId), operationHistory.schemaVersion.id), operationHistory.entity.index), recordHistory.actor.id)
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
    recordMissingRecordAndRepoTransBlockRelations(repositoryId, schemaVersionId, tableIndex, actorId, actorRecordId, missingRecords, compatibleDataMessageFlags, messageIndexMapForActor, dataMessagesWithCompatibleSchemas, dataMessagesWithIncompatibleData, sparseDataMessagesWithIncompatibleData, missingRecordRepoTransBlocks) {
        const missingRecord = this.createMissingRecord(repositoryId, schemaVersionId, tableIndex, actorId, actorRecordId);
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
            missingRecordRepoTransBlocks.push({
                missingRecord,
                sharingMessage
            });
        }
    }
    createMissingRecord(repositoryId, schemaVersionId, tableIndex, actorId, actorRecordId) {
        return {
            schemaVersion: {
                id: schemaVersionId
            },
            entity: {
                index: tableIndex,
                schemaVersion: {
                    id: schemaVersionId
                }
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
        const existingRepoTransBlocksWithCompatibleSchemasAndData = await this.sharingMessageDao.findWithMissingRecordIdsAndNoMissingRecordsWithStatus(foundMissingRecordIds, moving_walkway_1.MissingRecordStatus.MISSING);
        await this.missingRecordRepoTransBlockDao.deleteWhereMissingRecordIdsIn(foundMissingRecordIds);
        await this.missingRecordDao.deleteWhereIdsIn(foundMissingRecordIds);
        return existingRepoTransBlocksWithCompatibleSchemasAndData;
    }
};
SyncInDataChecker = __decorate([
    typedi_1.Service(InjectionTokens_1.SyncInDataCheckerToken),
    __param(0, typedi_1.Inject(moving_walkway_1.MissingRecordDaoToken)),
    __param(1, typedi_1.Inject(moving_walkway_1.MissingRecordRepoTransBlockDaoToken)),
    __param(2, typedi_1.Inject(holding_pattern_1.RepositoryTransactionHistoryDaoToken)),
    __param(3, typedi_1.Inject(moving_walkway_1.SharingMessageDaoToken)),
    __param(4, typedi_1.Inject(InjectionTokens_1.SyncInRepositoryTransactionBlockCreatorToken)),
    __param(5, typedi_1.Inject(InjectionTokens_1.SyncInUtilsToken)),
    __param(6, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], SyncInDataChecker);
exports.SyncInDataChecker = SyncInDataChecker;
//# sourceMappingURL=SyncInDataChecker.js.map