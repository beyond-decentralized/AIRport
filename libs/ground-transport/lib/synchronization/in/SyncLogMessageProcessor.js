"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const moving_walkway_1 = require("@airport/moving-walkway");
const tokens_1 = require("../../tokens");
class SyncLogMessageProcessor {
    // private sharingMessageDao: ISharingMessageDao
    // private sharingNodeRepoTransBlockDao: ISharingNodeRepoTransBlockDao
    // private sharingNodeRepoTransBlockStageDao: ISharingNodeRepoTransBlockStageDao
    // private repositoryTransactionBlockDao: IRepositoryTransactionBlockDao
    // private repoTransBlockResponseStageDao: IRepoTransBlockResponseStageDao
    /**
     *
     * Record Synchronization Log messages coming from AGT (messages replying back with
     * status of sync logs sent from this TM).
     *
     * @param {ISyncLogToTM[]} syncLogMessages   Sync log messages from AGT
     * @returns {Promise<void>}
     */
    async recordSyncLogMessages(syncLogMessages) {
        if (!syncLogMessages.length) {
            return;
        }
        // TODO: remove unused dependencies once tested
        const [sharingMessageDao, sharingNodeRepoTransBlockDao, sharingNodeRepoTransBlockStageDao, repositoryTransactionBlockDao, repoTransBlockResponseStageDao] = await di_1.container(this).get(moving_walkway_1.SHARING_MESSAGE_DAO, moving_walkway_1.SHARING_NODE_REPO_TRANS_BLOCK_DAO, moving_walkway_1.SHARING_NODE_REPO_TRANS_BLOCK_STAGE_DAO, moving_walkway_1.REPO_TRANS_BLOCK_DAO, moving_walkway_1.REPO_TRANS_BLOCK_RESPONSE_STAGE_DAO);
        const { repoTransBlockIdSet, sharingNodeRepoTransBlockStageValues, repoTransBlockSyncOutcomeMapBySharingNodeId, 
        // sharingMessageResponseStageValues,
        sharingNodeIdSet } = this.generateSyncLogDataStructures(syncLogMessages);
        // All of the SharingNodeRepoTransBlocks should already exist
        // They were created on the sync out to AGT
        // await this.updateExistingSharingNodeRepoTransBlocks(
        // 	sharingNodeIdSet,
        // 	repoTransBlockIdSet,
        // 	repoTransBlockSyncOutcomeMapBySharingNodeId
        // );
        await sharingNodeRepoTransBlockStageDao
            .insertValues(sharingNodeRepoTransBlockStageValues);
        await sharingNodeRepoTransBlockDao.updateFromResponseStage();
        await sharingNodeRepoTransBlockStageDao.delete();
        // // If for some reason they don't insert them
        // await this.insertNewSharingNodeRepoTransBlocks(
        // 	repoTransBlockSyncOutcomeMapBySharingNodeId, sharingNodeRepoTransBlockDao);
        // Update SharingMessages with data from AGT
        // await
        // this.sharingMessageResponseStageDao.insertValues(sharingMessageResponseStageValues);
        // await this.sharingMessageDao.updateFromResponseStage(); await
        // this.sharingMessageResponseStageDao.delete();
        // Update RepoTransBlocks with data from AGT
        // await
        // this.repoTransBlockResponseStageDao.insertValues(repoTransBlockResponseStageValues);
        // await this.repositoryTransactionBlockDao.updateFromResponseStage(); await
        // this.repoTransBlockResponseStageDao.delete();
    }
    generateSyncLogDataStructures(syncLogMessages) {
        // const sharingMessageResponseStageValues: SharingMessageResponseStageValues[] = [];
        let sharingNodeRepoTransBlockStageValues = [];
        const sharingNodeIdSet = new Set();
        const repoTransBlockIdSet = new Set();
        const repoTransBlockSyncOutcomeMapBySharingNodeId = new Map();
        for (const syncLogMessage of syncLogMessages) {
            // sharingMessageResponseStageValues.push([
            // 	syncLogMessage.tmSharingMessageId,
            // 	syncLogMessage.agtTerminalSyncLogId,
            // 	syncLogMessage.syncDatetime
            // ]);
            const sharingNodeId = syncLogMessage.sharingNode.id;
            sharingNodeIdSet.add(sharingNodeId);
            const messageRepoTransBlockResponseStageValues = [];
            for (const outcome of syncLogMessage.outcomes) {
                const tmRepositoryTransactionBlockId = outcome.tmRepositoryTransactionBlockId;
                repoTransBlockIdSet.add(tmRepositoryTransactionBlockId);
                ground_control_1.ensureChildJsMap(repoTransBlockSyncOutcomeMapBySharingNodeId, sharingNodeId)
                    .set(tmRepositoryTransactionBlockId, outcome);
                messageRepoTransBlockResponseStageValues.push([
                    sharingNodeId,
                    outcome.tmRepositoryTransactionBlockId,
                    outcome.syncStatus
                ]);
            }
            sharingNodeRepoTransBlockStageValues
                = sharingNodeRepoTransBlockStageValues.concat(messageRepoTransBlockResponseStageValues);
        }
        return {
            repoTransBlockIdSet,
            sharingNodeRepoTransBlockStageValues,
            repoTransBlockSyncOutcomeMapBySharingNodeId,
            // sharingMessageResponseStageValues,
            sharingNodeIdSet
        };
    }
    // private async updateExistingSharingNodeRepoTransBlocks(
    // 	sharingNodeIdSet: Set<SharingNodeId>,
    // 	repoTransBlockIdSet: Set<TmRepositoryTransactionBlockId>,
    // 	repoTransBlockSyncOutcomeMapBySharingNodeId: Map<SharingNodeId,
    // 		Map<TmRepositoryTransactionBlockId, RepoTransBlockSyncStatus>>
    // ): Promise<void> {
    // 	const existingSharingNodeRepoTransBlockMap = await
    // this.sharingNodeRepoTransBlockDao
    // .findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(
    // Array.from(sharingNodeIdSet), Array.from(repoTransBlockIdSet) );  const
    // sharingNodeTransBlockStageValues: SharingNodeRepoTransBlockStageValues[] = [];  for
    // (const [sharingNodeId, repoTransBlocksForSharingNodeById] of
    // existingSharingNodeRepoTransBlockMap) { const
    // repoTransBlockSyncOutcomesForSharingNodeId =
    // repoTransBlockSyncOutcomeMapBySharingNodeId.get(sharingNodeId); for (const
    // [tmRepositoryTransactionBlockId, repositoryTransactionBlock] of
    // repoTransBlocksForSharingNodeById) { const repoTransBlockSyncOutcome =
    // repoTransBlockSyncOutcomesForSharingNodeId.get(tmRepositoryTransactionBlockId);
    // repoTransBlockSyncOutcomesForSharingNodeId.delete(tmRepositoryTransactionBlockId);
    // sharingNodeTransBlockStageValues.push([ sharingNodeId,
    // tmRepositoryTransactionBlockId, repoTransBlockSyncOutcome.syncOutcomeType ]); } }
    // await
    // this.sharingNodeRepoTransBlockStageDao.insertValues(sharingNodeTransBlockStageValues);
    // await this.sharingNodeRepoTransBlockDao.updateFromResponseStage(); await
    // this.sharingNodeRepoTransBlockStageDao.delete(); }
    async insertNewSharingNodeRepoTransBlocks(repoTransBlockSyncOutcomeMapBySharingNodeId, sharingNodeRepoTransBlockDao) {
        const sharingNodeTransBlockValues = [];
        const sharingMessageSyncTimestamp = new Date();
        for (const [sharingNodeId, repoTransBlockSyncOutcomesForSharingNodeId] of repoTransBlockSyncOutcomeMapBySharingNodeId) {
            for (const [tmRepositoryTransactionBlockId, repoTransBlockSyncOutcome] of repoTransBlockSyncOutcomesForSharingNodeId) {
                sharingNodeTransBlockValues.push([
                    sharingNodeId,
                    tmRepositoryTransactionBlockId,
                    // sharingMessageSyncTimestamp,
                    repoTransBlockSyncOutcome.syncStatus,
                ]);
            }
        }
        await sharingNodeRepoTransBlockDao.insertValues(sharingNodeTransBlockValues);
    }
}
exports.SyncLogMessageProcessor = SyncLogMessageProcessor;
di_1.DI.set(tokens_1.SYNC_LOG_MESSAGE_PROCESSOR, SyncLogMessageProcessor);
//# sourceMappingURL=SyncLogMessageProcessor.js.map