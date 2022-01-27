import { container, DI } from '@airport/di';
import { ChangeType, ensureChildJsMap, ensureChildJsSet } from '@airport/ground-control';
import { REPO_TRANS_HISTORY_DAO } from '@airport/holding-pattern';
import { MISSING_RECORD_DAO, MISSING_RECORD_REPO_TRANS_BLOCK_DAO, MissingRecordStatus, REPO_TRANS_BLOCK_DAO, SHARING_MESSAGE_DAO } from '@airport/moving-walkway';
import { TERMINAL_STORE } from '@airport/terminal-map';
import { SYNC_IN_DATA_CHECKER, SYNC_IN_REPO_TRANS_BLOCK_CREATOR, SYNC_IN_UTILS } from '../../../tokens';
export class SyncInDataChecker {
    /**
     * Every dataMessage.data.repoTransHistories array must be sorted before entering
     * this method.
     *
     * @param {IDataToTM[]} dataMessagesWithCompatibleApplications
     * @returns {DataCheckResults}
     */
    async checkData(dataMessagesWithCompatibleApplications) {
        // TODO: remove unneeded dependencies once tested
        const [missingRecordDao, missingRecordRepoTransBlockDao, repositoryTransactionBlockDao, repositoryTransactionHistoryDao, sharingMessageDao, syncInRepositoryTransactionBlockCreator, syncInUtils, terminalStore] = await container(this).get(MISSING_RECORD_DAO, MISSING_RECORD_REPO_TRANS_BLOCK_DAO, REPO_TRANS_BLOCK_DAO, REPO_TRANS_HISTORY_DAO, SHARING_MESSAGE_DAO, SYNC_IN_REPO_TRANS_BLOCK_CREATOR, SYNC_IN_UTILS, TERMINAL_STORE);
        const { messageIndexMapByRecordToUpdateIds, recordsToUpdateMap } = this.getDataStructuresForChanges(dataMessagesWithCompatibleApplications, syncInUtils);
        const existingRecordIdMap = await repositoryTransactionHistoryDao.findExistingRecordIdMap(recordsToUpdateMap);
        const dataMessagesWithIncompatibleData = [];
        const { compatibleDataMessageFlags, missingRecordDataToTMs, } = await this.determineMissingRecords(dataMessagesWithCompatibleApplications, dataMessagesWithIncompatibleData, recordsToUpdateMap, existingRecordIdMap, messageIndexMapByRecordToUpdateIds, missingRecordDao);
        const dataMessagesWithCompatibleApplicationsAndData = [];
        // filter out data messages with records that do not exist
        for (let i = 0; i < compatibleDataMessageFlags.length; i++) {
            const dataMessage = dataMessagesWithCompatibleApplications[i];
            if (compatibleDataMessageFlags[i]) {
                dataMessagesWithCompatibleApplicationsAndData.push(dataMessage);
            }
        }
        const toBeInsertedRecordMap = this.getRecordsToInsertMap(dataMessagesWithCompatibleApplicationsAndData);
        const foundMissingRecordIds = await missingRecordDao.setStatusWhereIdsInAndReturnIds(toBeInsertedRecordMap, MissingRecordStatus.MISSING);
        // Find repository transaction blocks that now can be processed
        const existingRepoTransBlocksWithCompatibleApplicationsAndData = await this.getExistingRepoTransBlocksWithCompatibleApplicationsAndData(foundMissingRecordIds, missingRecordDao, missingRecordRepoTransBlockDao, repositoryTransactionBlockDao);
        return {
            dataMessagesWithCompatibleApplicationsAndData,
            dataMessagesWithIncompatibleData,
            existingRepoTransBlocksWithCompatibleApplicationsAndData,
            missingRecordDataToTMs
        };
    }
    getDataStructuresForChanges(dataMessagesWithCompatibleApplications, syncInUtils) {
        const recordsToInsertMap = this.getRecordsToInsertMap(dataMessagesWithCompatibleApplications);
        const recordsToUpdateMap = new Map();
        const messageIndexMapByRecordToUpdateIds = new Map();
        for (let i = 0; i < dataMessagesWithCompatibleApplications.length; i++) {
            const dataMessages = dataMessagesWithCompatibleApplications[i];
            dataMessages.data.repoTransHistories.sort((repoTransHistory1, repoTransHistory2) => repoTransHistory1.saveTimestamp.getTime() - repoTransHistory2.saveTimestamp.getTime());
            for (const repoTransHistory of dataMessages.data.repoTransHistories) {
                const repositoryId = repoTransHistory.repository.id;
                const recordToInsertMapForRepo = recordsToInsertMap.get(repositoryId);
                repoTransHistory.operationHistory.sort((operationHistory1, operationHistory2) => operationHistory1.orderNumber - operationHistory2.orderNumber);
                for (const operationHistory of repoTransHistory.operationHistory) {
                    let recordToInsertMapForEntityInRepo;
                    if (recordToInsertMapForRepo) {
                        const recordToInsertMapForApplicationInRepo = recordToInsertMapForRepo.get(operationHistory.entity.applicationVersion.id);
                        if (recordToInsertMapForApplicationInRepo) {
                            recordToInsertMapForEntityInRepo
                                = recordToInsertMapForApplicationInRepo.get(operationHistory.entity.id);
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
                                    ensureChildJsSet(ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(messageIndexMapByRecordToUpdateIds, repositoryId), repoTransHistory.actor.id), operationHistory.entity.applicationVersion.id), operationHistory.entity.id), recordHistory.actorRecordId)
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
    async determineMissingRecords(dataMessagesWithCompatibleApplications, dataMessagesWithIncompatibleData, recordToUpdateMap, existingRecordIdMap, messageIndexMapByRecordToUpdateIds, missingRecordDao) {
        const compatibleDataMessageFlags = dataMessagesWithCompatibleApplications.map(_ => true);
        const missingRecords = [];
        const missingRecordDataToTMs = [];
        const sparseDataMessagesWithIncompatibleData = [];
        for (const [repositoryId, updatedRecordMapForRepository] of recordToUpdateMap) {
            const existingRecordMapForRepository = existingRecordIdMap.get(repositoryId);
            const messageIndexMapForRepository = messageIndexMapByRecordToUpdateIds.get(repositoryId);
            for (const [applicationIndex, updatedRecordMapForApplicationInRepo] of updatedRecordMapForRepository) {
                let existingRecordMapForApplicationInRepo;
                if (existingRecordMapForRepository) {
                    existingRecordMapForApplicationInRepo = existingRecordMapForRepository.get(applicationIndex);
                }
                const messageIndexMapForApplicationIndRepo = messageIndexMapForRepository.get(applicationIndex);
                for (const [entityId, updatedRecordMapForTableInRepo] of updatedRecordMapForApplicationInRepo) {
                    let existingRecordMapForTableInApplication;
                    if (existingRecordMapForApplicationInRepo) {
                        existingRecordMapForTableInApplication = existingRecordMapForApplicationInRepo.get(entityId);
                    }
                    const messageIndexMapForTableInApplication = messageIndexMapForApplicationIndRepo.get(entityId);
                    for (const [actorId, actorRecordIds] of updatedRecordMapForTableInRepo) {
                        let existingRecordIdSetForActor;
                        if (existingRecordMapForTableInApplication) {
                            existingRecordIdSetForActor = existingRecordMapForTableInApplication.get(actorId);
                        }
                        const messageIndexMapForActor = messageIndexMapForTableInApplication.get(actorId);
                        if (existingRecordIdSetForActor) {
                            for (const actorRecordId of actorRecordIds) {
                                if (!existingRecordIdSetForActor.has(actorRecordId)) {
                                    this.recordMissingRecordAndRepoTransBlockRelations(repositoryId, applicationIndex, entityId, actorId, actorRecordId, missingRecords, compatibleDataMessageFlags, messageIndexMapForActor, dataMessagesWithCompatibleApplications, dataMessagesWithIncompatibleData, sparseDataMessagesWithIncompatibleData, missingRecordDataToTMs);
                                }
                            }
                        }
                        else {
                            for (const actorRecordId of actorRecordIds) {
                                this.recordMissingRecordAndRepoTransBlockRelations(repositoryId, applicationIndex, entityId, actorId, actorRecordId, missingRecords, compatibleDataMessageFlags, messageIndexMapForActor, dataMessagesWithCompatibleApplications, dataMessagesWithIncompatibleData, sparseDataMessagesWithIncompatibleData, missingRecordDataToTMs);
                            }
                        }
                    }
                }
            }
        }
        if (missingRecords.length) {
            await missingRecordDao.bulkCreate(missingRecords, false);
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
                                ensureChildJsSet(ensureChildJsMap(ensureChildJsMap(ensureChildJsMap(recordsToInsertMap, repositoryId), operationHistory.entity.applicationVersion.id), operationHistory.entity.id), recordHistory.actor.id)
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
    recordMissingRecordAndRepoTransBlockRelations(repositoryId, applicationVersionId, entityId, actorId, actorRecordId, missingRecords, compatibleDataMessageFlags, messageIndexMapForActor, dataMessagesWithCompatibleApplications, dataMessagesWithIncompatibleData, sparseDataMessagesWithIncompatibleData, missingRecordDataToTMs) {
        const missingRecord = this.createMissingRecord(repositoryId, applicationVersionId, entityId, actorId, actorRecordId);
        missingRecords.push(missingRecord);
        for (const messageIndex of messageIndexMapForActor.get(actorRecordId)) {
            let dataMessage;
            if (compatibleDataMessageFlags[messageIndex]) {
                const dataMessage = dataMessagesWithCompatibleApplications[messageIndex];
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
    createMissingRecord(repositoryId, applicationVersionId, entityId, actorId, actorRecordId) {
        return {
            applicationVersion: {
                id: applicationVersionId
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
    async getExistingRepoTransBlocksWithCompatibleApplicationsAndData(foundMissingRecordIds, missingRecordDao, missingRecordRepoTransBlockDao, repositoryTransactionBlockDao) {
        if (foundMissingRecordIds.length) {
            return [];
        }
        const existingRepoTransBlocksWithCompatibleApplicationsAndData = await repositoryTransactionBlockDao.findWithMissingRecordIdsAndNoMissingRecordsWithStatus(foundMissingRecordIds, MissingRecordStatus.MISSING);
        await missingRecordRepoTransBlockDao.deleteWhereMissingRecordIdsIn(foundMissingRecordIds);
        await missingRecordDao.deleteWhereIdsIn(foundMissingRecordIds);
        return existingRepoTransBlocksWithCompatibleApplicationsAndData;
    }
}
DI.set(SYNC_IN_DATA_CHECKER, SyncInDataChecker);
//# sourceMappingURL=SyncInDataChecker.js.map