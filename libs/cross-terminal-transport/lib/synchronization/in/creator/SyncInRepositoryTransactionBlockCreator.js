import { RepoTransBlockSyncOutcomeType } from '@airport/arrivals-n-departures';
import { container, DI } from '@airport/di';
import { TransactionType } from '@airport/ground-control';
import { RepositoryTransactionType } from '@airport/holding-pattern';
import { MISSING_RECORD_REPO_TRANS_BLOCK_DAO, REPO_TRANS_BLOCK_DAO, SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO } from '@airport/moving-walkway';
import { stringify } from 'zipson/lib';
import { SYNC_IN_REPO_TRANS_BLOCK_CREATOR } from '../../../tokens';
export class SyncInRepositoryTransactionBlockCreator {
    async createRepositoryTransBlocks(dataMessagesWithIncompatibleApplications, dataMessagesWithIncompatibleData, dataMessagesToBeUpgraded, dataMessagesWithCompatibleApplicationsAndData, dataMessagesWithInvalidData) {
        // TODO: remove unneeded dependencies once tested
        const [repositoryTransactionBlockDao, missingRecordRepoTransBlockDao, sharingMessageRepoTransBlockDao] = await container(this).get(REPO_TRANS_BLOCK_DAO, MISSING_RECORD_REPO_TRANS_BLOCK_DAO, SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO);
        let allRepositoryTransactionBlocks = [];
        const repoTransBlocksNeedingApplicationChanges = this.createRepositoryTransactionBlocks(dataMessagesWithIncompatibleApplications, RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_SCHEMA_CHANGES, true);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksNeedingApplicationChanges);
        const repoTransBlocksNeedingDataUpgrades = this.createRepositoryTransactionBlocks(dataMessagesToBeUpgraded, RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_DATA_UPGRADES, true);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksNeedingDataUpgrades);
        const repoTransBlocksNeedingAdditionalData = this.createRepositoryTransactionBlocks(dataMessagesWithIncompatibleData, RepoTransBlockSyncOutcomeType.SYNC_TO_TM_NEEDS_ADDITIONAL_DATA, true);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksNeedingAdditionalData);
        const repoTransBlocksWithInvalidData = this.createRepositoryTransactionBlocks(dataMessagesWithInvalidData, RepoTransBlockSyncOutcomeType.SYNC_TO_TM_INVALID_DATA);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksWithInvalidData);
        const repoTransBlocksWithValidDataAndApplications = this.createRepositoryTransactionBlocks(dataMessagesWithCompatibleApplicationsAndData, RepoTransBlockSyncOutcomeType.SYNC_TO_TM_SUCCESSFUL);
        allRepositoryTransactionBlocks = allRepositoryTransactionBlocks.concat(repoTransBlocksWithValidDataAndApplications);
        await repositoryTransactionBlockDao.bulkCreate(allRepositoryTransactionBlocks, false);
        let allDataToTM = [];
        allDataToTM = allDataToTM.concat(dataMessagesWithIncompatibleApplications);
        allDataToTM = allDataToTM.concat(dataMessagesWithIncompatibleData);
        allDataToTM = allDataToTM.concat(dataMessagesToBeUpgraded);
        allDataToTM = allDataToTM.concat(dataMessagesWithCompatibleApplicationsAndData);
        allDataToTM = allDataToTM.concat(dataMessagesWithInvalidData);
        return allDataToTM;
    }
    createRepositoryTransactionBlocks(dataMessages, syncOutcomeType, recordContents = false) {
        const repositoryTransactionBlocks = [];
        for (const dataMessage of dataMessages) {
            const data = dataMessage.data;
            const repositoryTransactionBlock = {
                contents: recordContents ? stringify(data) : null,
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
            await missingRecordRepoTransBlockDao.bulkCreate(missingRecordRepoTransBlocks, false);
        }
    }
    async createSharingMessageRepoTransBlocks(allDataToTM, sharingMessageRepoTransBlockDao) {
        const sharingMessageRepoTransBlocks = allDataToTM.map(dataToTM => ({
            sharingMessage: dataToTM.sharingMessage,
            repositoryTransactionBlock: dataToTM.repositoryTransactionBlock
        }));
        await sharingMessageRepoTransBlockDao.bulkCreate(sharingMessageRepoTransBlocks, false);
    }
    async recordSharingMessageToHistoryRecords(sharingMessages, existingRepoTransBlocksWithCompatibleApplicationsAndData, dataMessages, actorMapById, repositoryTransactionBlockDao, sharingMessageRepoTransBlockDao, transactionManager) {
        const repoTransHistoryMapByRepositoryId = await this.getRepoTransHistoryMapByRepoId(dataMessages, existingRepoTransBlocksWithCompatibleApplicationsAndData, actorMapById);
        const repositoryTransactionBlocks = [];
        const sharingMessageRepoTransBlocks = [];
        // const repoTransBlockRepoTransHistories: IRepoTransBlockRepoTransHistory[] = [];
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
        await sharingMessageRepoTransBlockDao.bulkCreate(sharingMessageRepoTransBlocks, false);
        // await this.repoTransBlockRepoTransHistoryDao.bulkCreate(
        // 	repoTransBlockRepoTransHistories, false);
        return repoTransHistoryMapByRepositoryId;
    }
    createSharingNodeRepoTransBlocks(allDataToTM) {
        throw new Error(`Not Implemented`);
    }
}
DI.set(SYNC_IN_REPO_TRANS_BLOCK_CREATOR, SyncInRepositoryTransactionBlockCreator);
//# sourceMappingURL=SyncInRepositoryTransactionBlockCreator.js.map