"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrivals_n_departures_1 = require("@airport/arrivals-n-departures");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const moving_walkway_1 = require("@airport/moving-walkway");
const tower_1 = require("@airport/tower");
const lib_1 = require("zipson/lib");
const tokens_1 = require("../../tokens");
class SyncOutSerializer {
    async serializeMessages(sharingNodeDbMap, sharingNodeMap, repoMapBySharingNodeAndRepoIds, repoTransBlockDataByRepoId, repoTransHistoryIds, terminal) {
        const [repoTransBlockDao, repoTransBlockRepoTransHistoryDao, sharingMessageDao, sharingMessageRepoTransBlockDao] = await di_1.container(this).get(moving_walkway_1.REPO_TRANS_BLOCK_DAO, 
        // TODO: is this what needs to be injected
        holding_pattern_1.REPO_TRANS_HISTORY_DAO, moving_walkway_1.SHARING_MESSAGE_DAO, moving_walkway_1.SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO);
        const messageMap = new Map();
        const lastSyncAttemptTimestamp = new Date();
        const repositoryTransactionBlocks = [];
        const repoTransBlocksByRepositoryId = new Map();
        let allTransLogRepoTransHistories = [];
        for (const [repositoryId, messageData] of repoTransBlockDataByRepoId) {
            const repositoryTransactionBlockContents = lib_1.stringify(messageData);
            const repoTransBlockRepoTransHistories = [];
            const repositoryTransactionBlock = {
                lastSyncAttemptTimestamp,
                repository: {
                    id: repositoryId
                },
                source: {
                    name: terminal.name,
                    secondId: terminal.secondId,
                    owner: {
                        uniqueId: terminal.owner.uniqueId
                    }
                },
                contents: repositoryTransactionBlockContents,
                repoTransBlockRepoTransHistories,
            };
            ground_control_1.ensureChildArray(repoTransBlocksByRepositoryId, repositoryId)
                .push(repositoryTransactionBlock);
            for (const repositoryTransactionHistory of messageData.repoTransHistories) {
                repoTransBlockRepoTransHistories.push({
                    repositoryTransactionHistory,
                    repositoryTransactionBlock
                });
            }
            allTransLogRepoTransHistories
                = allTransLogRepoTransHistories.concat(repoTransBlockRepoTransHistories);
            repositoryTransactionBlocks.push(repositoryTransactionBlock);
        }
        await tower_1.transactional(async () => {
            await repoTransBlockDao.bulkCreate(repositoryTransactionBlocks, ground_control_1.CascadeOverwrite.DEFAULT, false);
            await repoTransBlockRepoTransHistoryDao.bulkCreate(allTransLogRepoTransHistories, ground_control_1.CascadeOverwrite.DEFAULT, false);
            const sharingMessages = [];
            const sharingMessageRepoTransBlocks = [];
            for (const [sharingNodeId, repositoryMapById] of repoMapBySharingNodeAndRepoIds) {
                const repositoryUpdateRequests = [];
                const sharingNodeDb = sharingNodeDbMap.get(sharingNodeId);
                const terminalCredentials = {
                    terminalId: sharingNodeDb.agtTerminalId,
                    terminalPassword: sharingNodeDb.agtTerminalPassword
                };
                // FIXME: add sync ACKS
                const message = {
                    protocolVersion: 0,
                    contentType: arrivals_n_departures_1.MessageFromTMContentType.DATA_TRANSFER,
                    terminalCredentials,
                    tmSharingMessageId: null,
                    repositoryUpdateRequests,
                    terminalSyncAcks: []
                };
                messageMap.set(sharingNodeId, message);
                const sharingMessage = {
                    sharingNode: sharingNodeMap.get(sharingNodeId)
                };
                sharingMessages.push(sharingMessage);
                for (const [repositoryId, repositoryAndAgtRepositoryId] of repositoryMapById) {
                    const repositoryTransactionBlock = repoTransBlocksByRepositoryId.get(repositoryId);
                    repositoryUpdateRequests.push({
                        agtRepositoryId: repositoryAndAgtRepositoryId[1],
                        tmRepositoryTransactionBlockId: repositoryTransactionBlock.id,
                        repositoryTransactionBlockContents: repositoryTransactionBlock.contents
                    });
                    const sharingMessageRepoTransBlock = {
                        sharingMessage,
                        repositoryTransactionBlock,
                    };
                    sharingMessageRepoTransBlocks.push(sharingMessageRepoTransBlock);
                }
            }
            await sharingMessageDao.bulkCreate(sharingMessages, ground_control_1.CascadeOverwrite.DEFAULT, false);
            for (const sharingMessage of sharingMessages) {
                messageMap.get(sharingMessage.sharingNode.id)[2] = sharingMessage.id;
            }
            await sharingMessageRepoTransBlockDao.bulkCreate(sharingMessageRepoTransBlocks, ground_control_1.CascadeOverwrite.DEFAULT, false);
        });
        // await this.repositoryTransactionHistoryDao.updateSyncStatusHistory(
        // 	SyncStatus.SYNCHRONIZING, Array.from(repoTransHistoryIds)
        // );
        return messageMap;
    }
}
exports.SyncOutSerializer = SyncOutSerializer;
di_1.DI.set(tokens_1.SYNC_OUT_SERIALIZER, SyncOutSerializer);
//# sourceMappingURL=SyncOutSerializer.js.map