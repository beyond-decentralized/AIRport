import { MessageFromTMContentType } from '@airport/arrivals-n-departures';
import { container, DI } from '@airport/di';
import { CascadeOverwrite, ensureChildArray } from '@airport/ground-control';
import { REPO_TRANS_HISTORY_DAO } from '@airport/holding-pattern';
import { REPO_TRANS_BLOCK_DAO, SHARING_MESSAGE_DAO, SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO } from '@airport/moving-walkway';
import { transactional } from '@airport/tower';
import { stringify } from 'zipson/lib';
import { SYNC_OUT_SERIALIZER } from '../../tokens';
export class SyncOutSerializer {
    async serializeMessages(sharingNodeDbMap, sharingNodeMap, repoMapBySharingNodeAndRepoIds, repoTransBlockDataByRepoId, repoTransHistoryIds, terminal) {
        const [repoTransBlockDao, repoTransBlockRepoTransHistoryDao, sharingMessageDao, sharingMessageRepoTransBlockDao] = await container(this).get(REPO_TRANS_BLOCK_DAO, 
        // TODO: is this what needs to be injected
        REPO_TRANS_HISTORY_DAO, SHARING_MESSAGE_DAO, SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO);
        const messageMap = new Map();
        const lastSyncAttemptTimestamp = new Date();
        const repositoryTransactionBlocks = [];
        const repoTransBlocksByRepositoryId = new Map();
        let allTransLogRepoTransHistories = [];
        for (const [repositoryId, messageData] of repoTransBlockDataByRepoId) {
            const repositoryTransactionBlockContents = stringify(messageData);
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
            ensureChildArray(repoTransBlocksByRepositoryId, repositoryId)
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
        await transactional(async () => {
            await repoTransBlockDao.bulkCreate(repositoryTransactionBlocks, CascadeOverwrite.DEFAULT, false);
            await repoTransBlockRepoTransHistoryDao.bulkCreate(allTransLogRepoTransHistories, CascadeOverwrite.DEFAULT, false);
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
                    contentType: MessageFromTMContentType.DATA_TRANSFER,
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
            await sharingMessageDao.bulkCreate(sharingMessages, CascadeOverwrite.DEFAULT, false);
            for (const sharingMessage of sharingMessages) {
                messageMap.get(sharingMessage.sharingNode.id)[2] = sharingMessage.id;
            }
            await sharingMessageRepoTransBlockDao.bulkCreate(sharingMessageRepoTransBlocks, CascadeOverwrite.DEFAULT, false);
        });
        // await this.repositoryTransactionHistoryDao.updateSyncStatusHistory(
        // 	SyncStatus.SYNCHRONIZING, Array.from(repoTransHistoryIds)
        // );
        return messageMap;
    }
}
DI.set(SYNC_OUT_SERIALIZER, SyncOutSerializer);
//# sourceMappingURL=SyncOutSerializer.js.map