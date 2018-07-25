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
        const insertedRecordMap = this.getInsertedRecordMap(dataMessagesWithCompatibleSchemas);
        const updatedRecordMap = new Map();
        const messageIndexMapByUpdatedRecordIds = new Map();
        for (let i = 0; i < dataMessagesWithCompatibleSchemas.length; i++) {
            const dataMessages = dataMessagesWithCompatibleSchemas[i];
            for (const repoTransHistory of dataMessages.data.repoTransHistories) {
                const repositoryId = repoTransHistory.repository.id;
                const insertedRecordMapForRepo = insertedRecordMap.get(repositoryId);
                for (const operationHistory of repoTransHistory.operationHistory) {
                    let insertedRecordMapForEntityInRepo;
                    if (insertedRecordMapForRepo) {
                        const insertedRecordMapForSchemaInRepo = insertedRecordMapForRepo.get(operationHistory.schemaVersion.id);
                        if (insertedRecordMapForSchemaInRepo) {
                            insertedRecordMapForEntityInRepo
                                = insertedRecordMapForSchemaInRepo.get(operationHistory.entity.index);
                        }
                    }
                    switch (operationHistory.changeType) {
                        case ground_control_1.ChangeType.DELETE_ROWS:
                        case ground_control_1.ChangeType.UPDATE_ROWS:
                            for (const recordHistory of operationHistory.recordHistory) {
                                let insertedRecordSetForActor;
                                if (insertedRecordMapForEntityInRepo) {
                                    insertedRecordSetForActor
                                        = insertedRecordMapForEntityInRepo.get(recordHistory.actor.id);
                                }
                                if (!insertedRecordSetForActor
                                    || !insertedRecordSetForActor.has(recordHistory.actorRecordId)) {
                                    const updatedRecordMapForRepoInTable = this.syncInUtils
                                        .ensureRecordMapForRepoInTable(repositoryId, operationHistory, updatedRecordMap);
                                    this.ensureRecordId(recordHistory, updatedRecordMapForRepoInTable, recordHistory.actorRecordId);
                                    this.utils.ensureChildJsSet(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(messageIndexMapByUpdatedRecordIds, repositoryId), operationHistory.schemaVersion.id), operationHistory.entity.index), recordHistory.actor.id), recordHistory.actorRecordId)
                                        .add(i);
                                }
                            }
                            break;
                    }
                }
            }
        }
        const existingRecordIdMap = await this.repositoryTransactionHistoryDao.findExistingRecordIdMap(updatedRecordMap);
        const compatibleDataMessageFlags = dataMessagesWithCompatibleSchemas.map(dataMessage => true);
        const sharingMessagesWithIncompatibleData = [];
        const sparseSharingMessagesWithIncompatibleData = [];
        const missingRecords = [];
        const missingRecordSharingMessages = [];
        for (const [repositoryId, updatedRecordMapForRepository] of updatedRecordMap) {
            const existingRecordMapForRepository = existingRecordIdMap.get(repositoryId);
            const messageIndexMapForRepository = messageIndexMapByUpdatedRecordIds.get(repositoryId);
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
                                    this.recordMissingRecordAndSharingMessageRelations(repositoryId, schemaIndex, tableIndex, actorId, actorRecordId, missingRecords, compatibleDataMessageFlags, messageIndexMapForActor, dataMessagesWithCompatibleSchemas, sharingMessagesWithIncompatibleData, sparseSharingMessagesWithIncompatibleData, missingRecordSharingMessages);
                                }
                            }
                        }
                        else {
                            for (const actorRecordId of actorRecordIds) {
                                this.recordMissingRecordAndSharingMessageRelations(repositoryId, schemaIndex, tableIndex, actorId, actorRecordId, missingRecords, compatibleDataMessageFlags, messageIndexMapForActor, dataMessagesWithCompatibleSchemas, sharingMessagesWithIncompatibleData, sparseSharingMessagesWithIncompatibleData, missingRecordSharingMessages);
                            }
                        }
                    }
                }
            }
        }
        if (missingRecords.length) {
            await this.missingRecordDao.bulkCreate(missingRecords, false, false);
        }
        const dataMessagesWithCompatibleSchemasAndData = [];
        // filter out data messages with records that do no exist
        for (let i = 0; i < compatibleDataMessageFlags.length; i++) {
            const dataMessage = dataMessagesWithCompatibleSchemas[i];
            if (compatibleDataMessageFlags[i]) {
                dataMessagesWithCompatibleSchemasAndData.push(dataMessage);
            }
        }
        const toBeInsertedRecordMap = this.getInsertedRecordMap(dataMessagesWithCompatibleSchemasAndData);
        const foundMissingRecordIds = await this.missingRecordDao.setStatusWhereIdsInAndReturnIds(toBeInsertedRecordMap);
        const existingRepoTransBlocksWithCompatibleSchemasAndData = await this.getExistingRepoTransBlocksWithCompatibleSchemasAndData(foundMissingRecordIds);
        return {
            dataMessagesWithCompatibleSchemasAndData,
            existingRepoTransBlocksWithCompatibleSchemasAndData,
            missingRecordSharingMessages,
            sharingMessagesWithIncompatibleData
        };
    }
    getInsertedRecordMap(dataMessages) {
        const insertedRecordMap = new Map();
        for (let i = 0; i < dataMessages.length; i++) {
            const dataMessage = dataMessages[i];
            for (const repoTransHistory of dataMessage.data.repoTransHistories) {
                const repositoryId = repoTransHistory.repository.id;
                for (const operationHistory of repoTransHistory.operationHistory) {
                    switch (operationHistory.changeType) {
                        case ground_control_1.ChangeType.INSERT_VALUES:
                            for (const recordHistory of operationHistory.recordHistory) {
                                this.utils.ensureChildJsSet(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(insertedRecordMap, repositoryId), operationHistory.schemaVersion.id), operationHistory.entity.index), recordHistory.actor.id)
                                    .add(recordHistory.actorRecordId);
                            }
                            break;
                    }
                }
            }
        }
        return insertedRecordMap;
    }
    ensureRecordId(recordHistory, actorRecordIdSetByActor, actorRecordId = recordHistory.actorRecordId) {
        this.utils.ensureChildJsSet(actorRecordIdSetByActor, recordHistory.actor.id).add(actorRecordId);
    }
    recordMissingRecordAndSharingMessageRelations(repositoryId, schemaIndex, tableIndex, actorId, actorRecordId, missingRecords, compatibleDataMessageFlags, messageIndexMapForActor, dataMessagesWithCompatibleSchemas, sharingMessagesWithIncompatibleData, sparseSharingMessagesWithIncompatibleData, missingRecordSharingMessages) {
        const missingRecord = this.createMissingRecord(repositoryId, schemaIndex, tableIndex, actorId, actorRecordId);
        missingRecords.push(missingRecord);
        for (const messageIndex of messageIndexMapForActor.get(actorRecordId)) {
            let sharingMessage;
            if (compatibleDataMessageFlags[messageIndex]) {
                const dataMessage = dataMessagesWithCompatibleSchemas[messageIndex];
                sharingMessage = this.syncInUtils.createSharingMessage(dataMessage, moving_walkway_1.SharingMessageProcessingStatus.NEEDS_ADDITIONAL_DATA, true);
                sparseSharingMessagesWithIncompatibleData[messageIndex]
                    = sharingMessage;
                sharingMessagesWithIncompatibleData.push(sharingMessage);
                compatibleDataMessageFlags[messageIndex] = false;
            }
            else {
                sharingMessage
                    = sparseSharingMessagesWithIncompatibleData[messageIndex];
            }
            missingRecordSharingMessages.push({
                missingRecord,
                sharingMessage
            });
        }
    }
    createMissingRecord(repositoryId, schemaIndex, tableIndex, actorId, actorRecordId) {
        return {
            schema: {
                index: schemaIndex
            },
            entity: {
                index: tableIndex,
                schema: {
                    index: schemaIndex
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
    __param(5, typedi_1.Inject(SyncInUtilsToken)),
    __param(6, typedi_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object])
], SyncInDataChecker);
exports.SyncInDataChecker = SyncInDataChecker;
//# sourceMappingURL=SyncInDataChecker.js.map