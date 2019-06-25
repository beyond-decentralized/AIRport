"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const moving_walkway_1 = require("@airport/moving-walkway");
const lib_1 = require("zipson/lib");
const diTokens_1 = require("../../../diTokens");
class SyncInRepositoryTransactionBlockCreator {
    async createRepositoryTransBlocks(dataMessagesWithIncompatibleSchemas, dataMessagesWithIncompatibleData, dataMessagesToBeUpgraded, dataMessagesWithCompatibleSchemasAndData, dataMessagesWithInvalidData) {
        // TODO: remove unneeded dependencies once tested
        const [repositoryTransactionBlockDao, missingRecordRepoTransBlockDao, sharingMessageRepoTransBlockDao] = await di_1.DI.get(moving_walkway_1.REPO_TRANS_BLOCK_DAO, moving_walkway_1.MISSING_RECORD_REPO_TRANS_BLOCK_DAO, moving_walkway_1.SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO);
        let allRepositoryTransactionBlocks = [];
        const repoTransBlocksNeedingSchemaChanges = this.createRepositoryTransactionBlocks(dataMessagesWithIncompatibleSchemas, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_SCHEMA_CHANGES, true);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksNeedingSchemaChanges);
        const repoTransBlocksNeedingDataUpgrades = this.createRepositoryTransactionBlocks(dataMessagesToBeUpgraded, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_DATA_UPGRADES, true);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksNeedingDataUpgrades);
        const repoTransBlocksNeedingAdditionalData = this.createRepositoryTransactionBlocks(dataMessagesWithIncompatibleData, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_ADDITIONAL_DATA, true);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksNeedingAdditionalData);
        const repoTransBlocksWithInvalidData = this.createRepositoryTransactionBlocks(dataMessagesWithInvalidData, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_INVALID_DATA);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksWithInvalidData);
        const repoTransBlocksWithValidDataAndSchemas = this.createRepositoryTransactionBlocks(dataMessagesWithCompatibleSchemasAndData, arrivals_n_departures_1.RepoTransBlockSyncOutcomeType.SYNC_TO_TM_SUCCESSFUL);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksWithValidDataAndSchemas);
        await repositoryTransactionBlockDao.bulkCreate(allRepositoryTransactionBlocks, false, false);
        let allDataToTM = [];
        allDataToTM = allDataToTM.concat(dataMessagesWithIncompatibleSchemas);
        allDataToTM = allDataToTM.concat(dataMessagesWithIncompatibleData);
        allDataToTM = allDataToTM.concat(dataMessagesToBeUpgraded);
        allDataToTM = allDataToTM.concat(dataMessagesWithCompatibleSchemasAndData);
        allDataToTM = allDataToTM.concat(dataMessagesWithInvalidData);
        return allDataToTM;
    }
    createRepositoryTransactionBlocks(dataMessages, syncOutcomeType, recordContents = false) {
        const repositoryTransactionBlocks = [];
        for (const dataMessage of dataMessages) {
            const data = dataMessage.data;
            const repositoryTransactionBlock = {
                contents: recordContents ? lib_1.stringify(data) : null,
                hash: null,
                repository: data.repository,
                source: data.terminal,
                syncOutcomeType,
            };
            dataMessage.repositoryTransactionBlock = repositoryTransactionBlock;
            repositoryTransactionBlocks.push(repositoryTransactionBlock);
        }
        return repositoryTransactionBlocks;
    }
    async createMissingRecordRepoTransBlocks(missingRecordDataToTMs, missingRecordRepoTransBlockDao) {
        const missingRecordRepoTransBlocks = missingRecordDataToTMs.map(missingRecordDataToTM => ({
            missingRecord: missingRecordDataToTM.missingRecord,
            repositoryTransactionBlock: missingRecordDataToTM
                .dataMessage.repositoryTransactionBlock
        }));
        if (missingRecordRepoTransBlocks.length) {
            await missingRecordRepoTransBlockDao.bulkCreate(missingRecordRepoTransBlocks, false, false);
        }
    }
    async createSharingMessageRepoTransBlocks(allDataToTM, sharingMessageRepoTransBlockDao) {
        const sharingMessageRepoTransBlocks = allDataToTM.map(dataToTM => ({
            sharingMessage: dataToTM.sharingMessage,
            repositoryTransactionBlock: dataToTM.repositoryTransactionBlock
        }));
        await sharingMessageRepoTransBlockDao.bulkCreate(sharingMessageRepoTransBlocks, false, false);
    }
    async recordSharingMessageToHistoryRecords(sharingMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, dataMessages, actorMapById, repositoryTransactionBlockDao, sharingMessageRepoTransBlockDao, transactionManager) {
        const repoTransHistoryMapByRepositoryId = await this.getRepoTransHistoryMapByRepoId(dataMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, actorMapById);
        const repositoryTransactionBlocks = [];
        const sharingMessageRepoTransBlocks = [];
        // const repoTransBlockRepoTransHistories: IRepoTransBlockRepoTransHistory[] = [];
        const transactionHistory = transactionManager.currentTransHistory;
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
        await repositoryTransactionBlockDao.bulkCreate(repositoryTransactionBlocks, false, false);
        await sharingMessageRepoTransBlockDao.bulkCreate(sharingMessageRepoTransBlocks, false, false);
        // await this.repoTransBlockRepoTransHistoryDao.bulkCreate(
        // 	repoTransBlockRepoTransHistories, false, false);
        return repoTransHistoryMapByRepositoryId;
    }
    createSharingNodeRepoTransBlocks(allDataToTM) {
        throw `Not Implemented`;
    }
}
exports.SyncInRepositoryTransactionBlockCreator = SyncInRepositoryTransactionBlockCreator;
di_1.DI.get(diTokens_1.SYNC_IN_REPO_TRANS_BLOCK_CREATOR, SyncInRepositoryTransactionBlockCreator);
//# sourceMappingURL=SyncInRepositoryTransactionBlockCreator.js.map