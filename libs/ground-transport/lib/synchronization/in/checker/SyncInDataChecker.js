import { container, DI } from '@airport/di';
import { CascadeOverwrite, ChangeType, ensureChildJsMap, ensureChildJsSet } from '@airport/ground-control';
import { REPO_TRANS_HISTORY_DAO } from '@airport/holding-pattern';
import { MISSING_RECORD_DAO, MISSING_RECORD_REPO_TRANS_BLOCK_DAO, MissingRecordStatus, REPO_TRANS_BLOCK_DAO, SHARING_MESSAGE_DAO } from '@airport/moving-walkway';
import { TERMINAL_STORE } from '@airport/terminal-map';
import { SYNC_IN_DATA_CHECKER, SYNC_IN_REPO_TRANS_BLOCK_CREATOR, SYNC_IN_UTILS } from '../../../tokens';
export class SyncInDataChecker {
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleSchemas
     * @returns {DataCheckResults}
     */
    async checkData(dataMessagesWithCompatibleSchemas) {
        // TODO: remove unneeded dependencies once tested
        const [missingRecordDao, missingRecordRepoTransBlockDao, repositoryTransactionBlockDao, repositoryTransactionHistoryDao, sharingMessageDao, syncInRepositoryTransactionBlockCreator, syncInUtils, terminalStore] = await container(this).get(MISSING_RECORD_DAO, MISSING_RECORD_REPO_TRANS_BLOCK_DAO, REPO_TRANS_BLOCK_DAO, REPO_TRANS_HISTORY_DAO, SHARING_MESSAGE_DAO, SYNC_IN_REPO_TRANS_BLOCK_CREATOR, SYNC_IN_UTILS, TERMINAL_STORE);
        const { messageIndexMapByRecordToUpdateIds, recordsToUpdateMap } = this.getDataStructuresForChanges(dataMessagesWithCompatibleSchemas, syncInUtils);
        const existingRecordIdMap = await repositoryTransactionHistoryDao.findExistingRecordIdMap(recordsToUpdateMap);
        const dataMessagesWithIncompatibleData = [];
        const { compatibleDataMessageFlags, missingRecordDataToTMs, } = await this.determineMissingRecords(dataMessagesWithCompatibleSchemas, dataMessagesWithIncompatibleData, recordsToUpdateMap, existingRecordIdMap, messageIndexMapByRecordToUpdateIds, missingRecordDao);
        const dataMessagesWithCompatibleSchemasAndData = [];
        // filter out data messages with records that do not exist
        for (let i = 0; i < compatibleDataMessageFlags.length; i++) {
            const dataMessage = dataMessagesWithCompatibleSchemas[i];
            if (compatibleDataMessageFlags[i]) {
                dataMessagesWithCompatibleSchemasAndData.push(dataMessage);
            }
        }
        const toBeInsertedRecordMap = this.getRecordsToInsertMap(dataMessagesWithCompatibleSchemasAndData);
        const foundMissingRecordIds = await missingRecordDao.setStatusWhereIdsInAndReturnIds(toBeInsertedRecordMap, MissingRecordStatus.MISSING);
        // Find repository transaction blocks that now can be processed
        const existingRepoTransBlocksWithCompatibleSchemasAndData = await this.getExistingRepoTransBlocksWithCompatibleSchemasAndData(foundMissingRecordIds, missingRecordDao, missingRecordRepoTransBlockDao, repositoryTransactionBlockDao);
        return {
            dataMessagesWithCompatibleSchemasAndData,
            dataMessagesWithIncompatibleData,
            existingRepoTransBlocksWithCompatibleSchemasAndData,
            missingRecordDataToTMs
        };
    }
    getDataStructuresForChanges(dataMessagesWithCompatibleSchemas, syncInUtils) {
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
                        const recordToInsertMapForSchemaInRepo = recordToInsertMapForRepo.get(operationHistory.entity.schemaVersion.id);
                        if (recordToInsertMapForSchemaInRepo) {
                            recordToInsertMapForEntityInRepo
                                = recordToInsertMapForSchemaInRepo.get(operationHistory.entity.id);
                        }
                    }
                    switch (operationHistory.changeType) {
                        case ChangeType.DELETE_ROWS:
                        case ChangeType.UPDATE_ROWS:
                            for (const recordHistory of operationHistory.recordHistory) {
                                let recordToInsertSetForActor;
                                if (recordToInsertMapForEntityInRepo) {
                                    recordToInsertSetForActor
                                        = recordToInsertMapForEntityInRepo.get(recordHistory.actor.id);
                                }
                                if (!recordToInsertSetForActor
                                    || !recordToInsertSetForActor.has(recordHistory.actorRecordId)) {
                                    const recordToUpdateMapForRepoInTable = syncInUtils
                                        .ensureRecordMapForRepoInTable(repositoryId, operationHistory, recordsToUpdateMap);
                                    this.ensureRecordId(recordHistory, recordToUpdateMapForRepoInTable, recordHistory.actorRecordId);
                                    ensureChildJsSet(ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(messageIndexMapByRecordToUpdateIds, repositoryId), operationHistory.entity.schemaVersion.id), operationHistory.entity.id), recordHistory.actor.id), recordHistory.actorRecordId)
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
    async determineMissingRecords(dataMessagesWithCompatibleSchemas, dataMessagesWithIncompatibleData, recordToUpdateMap, existingRecordIdMap, messageIndexMapByRecordToUpdateIds, missingRecordDao) {
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
            await missingRecordDao.bulkCreate(missingRecords, CascadeOverwrite.DEFAULT, false);
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
                        case ChangeType.INSERT_VALUES:
                            for (const recordHistory of operationHistory.recordHistory) {
                                ensureChildJsSet(ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(recordsToInsertMap, repositoryId), operationHistory.entity.schemaVersion.id), operationHistory.entity.id), recordHistory.actor.id)
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
        ensureChildJsSet(actorRecordIdSetByActor, recordHistory.actor.id).add(actorRecordId);
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
            status: MissingRecordStatus.MISSING
        };
    }
    async getExistingRepoTransBlocksWithCompatibleSchemasAndData(foundMissingRecordIds, missingRecordDao, missingRecordRepoTransBlockDao, repositoryTransactionBlockDao) {
        if (foundMissingRecordIds.length) {
            return [];
        }
        const existingRepoTransBlocksWithCompatibleSchemasAndData = await repositoryTransactionBlockDao.findWithMissingRecordIdsAndNoMissingRecordsWithStatus(foundMissingRecordIds, MissingRecordStatus.MISSING);
        await missingRecordRepoTransBlockDao.deleteWhereMissingRecordIdsIn(foundMissingRecordIds);
        await missingRecordDao.deleteWhereIdsIn(foundMissingRecordIds);
        return existingRepoTransBlocksWithCompatibleSchemasAndData;
    }
}
DI.set(SYNC_IN_DATA_CHECKER, SyncInDataChecker);
//# sourceMappingURL=SyncInDataChecker.js.map