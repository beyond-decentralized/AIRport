import {
	IUtils,
	UtilsToken
}                                     from "@airport/air-control";
import {
	RepoTransBlockSyncStatus,
	TmRepositoryTransactionBlockId
}                                     from "@airport/arrivals-n-departures";
import {
	IRepositoryTransactionBlockDao,
	IRepoTransBlockResponseStageDao,
	ISharingMessageDao,
	ISharingNodeRepoTransBlockDao,
	ISharingNodeRepoTransBlockStageDao,
	RepositoryTransactionBlockDaoToken,
	RepoTransBlockResponseStageDaoToken,
	SharingMessageDaoToken,
	SharingMessageSyncTimestamp,
	SharingNodeId,
	SharingNodeRepoTransBlockDaoToken,
	SharingNodeRepoTransBlockStageDaoToken,
	SharingNodeRepoTransBlockStageValues,
	SharingNodeRepoTransBlockValues
}                                     from "@airport/moving-walkway";
import {
	Inject,
	Service
}                                     from "typedi";
import {SyncLogMessageProcessorToken} from "../../InjectionTokens";
import {ISyncLogToTM}                 from "./SynchronizationInManager";

export interface ISyncLogMessageProcessor {

	recordSyncLogMessages(
		syncLogMessages: ISyncLogToTM[]
	): Promise<void>;

}

@Service(SyncLogMessageProcessorToken)
export class SyncLogMessageProcessor
	implements ISyncLogMessageProcessor {

	constructor(
		@Inject(SharingMessageDaoToken)
		private sharingMessageDao: ISharingMessageDao,
		// @Inject(SharingMessageResponseStageDaoToken)
		// private sharingMessageResponseStageDao: ISharingMessageResponseStageDao,
		@Inject(SharingNodeRepoTransBlockDaoToken)
		private sharingNodeRepoTransBlockDao: ISharingNodeRepoTransBlockDao,
		@Inject(SharingNodeRepoTransBlockStageDaoToken)
		private sharingNodeRepoTransBlockStageDao: ISharingNodeRepoTransBlockStageDao,
		@Inject(RepositoryTransactionBlockDaoToken)
		private repositoryTransactionBlockDao: IRepositoryTransactionBlockDao,
		@Inject(RepoTransBlockResponseStageDaoToken)
		private repoTransBlockResponseStageDao: IRepoTransBlockResponseStageDao,
		@Inject(UtilsToken)
		private utils: IUtils,
	) {
	}


	/**
	 *
	 * Record Synchronization Log messages coming from AGT (messages replying back with status
	 * of sync logs sent from this TM).
	 *
	 * @param {ISyncLogToTM[]} syncLogMessages   Sync log messages from AGT
	 * @returns {Promise<void>}
	 */
	async recordSyncLogMessages(
		syncLogMessages: ISyncLogToTM[]
	): Promise<void> {
		if (!syncLogMessages.length) {
			return;
		}

		const {
			repoTransBlockIdSet,
			sharingNodeRepoTransBlockStageValues,
			repoTransBlockSyncOutcomeMapBySharingNodeId,
			// sharingMessageResponseStageValues,
			sharingNodeIdSet
		} = this.generateSyncLogDataStructures(syncLogMessages);

		// All of the SharingNodeRepoTransBlocks should already exist
		// They were created on the sync out to AGT
		// await this.updateExistingSharingNodeRepoTransBlocks(
		// 	sharingNodeIdSet,
		// 	repoTransBlockIdSet,
		// 	repoTransBlockSyncOutcomeMapBySharingNodeId
		// );

		await this.sharingNodeRepoTransBlockStageDao
			.insertValues(sharingNodeRepoTransBlockStageValues);
		await this.sharingNodeRepoTransBlockDao.updateFromResponseStage();
		await this.sharingNodeRepoTransBlockStageDao.delete();

		// // If for some reason they don't insert them
		// await this.insertNewSharingNodeRepoTransBlocks(
		// 	repoTransBlockSyncOutcomeMapBySharingNodeId);

		// Update SharingMessages with data from AGT
		// await this.sharingMessageResponseStageDao.insertValues(sharingMessageResponseStageValues);
		// await this.sharingMessageDao.updateFromResponseStage();
		// await this.sharingMessageResponseStageDao.delete();

		// Update RepoTransBlocks with data from AGT
		// await this.repoTransBlockResponseStageDao.insertValues(repoTransBlockResponseStageValues);
		// await this.repositoryTransactionBlockDao.updateFromResponseStage();
		// await this.repoTransBlockResponseStageDao.delete();
	}

	private generateSyncLogDataStructures(
		syncLogMessages: ISyncLogToTM[]
	): {
		repoTransBlockIdSet: Set<TmRepositoryTransactionBlockId>;
		sharingNodeRepoTransBlockStageValues: SharingNodeRepoTransBlockStageValues[];
		repoTransBlockSyncOutcomeMapBySharingNodeId: Map<SharingNodeId,
			Map<TmRepositoryTransactionBlockId, RepoTransBlockSyncStatus>>;
		// sharingMessageResponseStageValues: SharingMessageResponseStageValues[];
		sharingNodeIdSet: Set<SharingNodeId>;
	} {
		// const sharingMessageResponseStageValues: SharingMessageResponseStageValues[] = [];
		let sharingNodeRepoTransBlockStageValues: SharingNodeRepoTransBlockStageValues[] = [];
		const sharingNodeIdSet: Set<SharingNodeId> = new Set();
		const repoTransBlockIdSet: Set<TmRepositoryTransactionBlockId> = new Set();

		const repoTransBlockSyncOutcomeMapBySharingNodeId: Map<SharingNodeId,
			Map<TmRepositoryTransactionBlockId, RepoTransBlockSyncStatus>> = new Map();

		for (const syncLogMessage of syncLogMessages) {
			// sharingMessageResponseStageValues.push([
			// 	syncLogMessage.tmSharingMessageId,
			// 	syncLogMessage.agtTerminalSyncLogId,
			// 	syncLogMessage.syncDatetime
			// ]);

			const sharingNodeId = syncLogMessage.sharingNode.id;
			sharingNodeIdSet.add(sharingNodeId);
			const messageRepoTransBlockResponseStageValues: SharingNodeRepoTransBlockStageValues[] = [];
			for (const outcome of syncLogMessage.outcomes) {
				const tmRepositoryTransactionBlockId = outcome.tmRepositoryTransactionBlockId;
				repoTransBlockIdSet.add(tmRepositoryTransactionBlockId);
				this.utils.ensureChildJsMap(repoTransBlockSyncOutcomeMapBySharingNodeId, sharingNodeId)
					.set(tmRepositoryTransactionBlockId, outcome);
				messageRepoTransBlockResponseStageValues.push([
					sharingNodeId,
					outcome.tmRepositoryTransactionBlockId,
					outcome.syncStatus
				])
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
	// 	const existingSharingNodeRepoTransBlockMap = await this.sharingNodeRepoTransBlockDao
	// 		.findMapBySharingNodeIdWhereSharingNodeIdInAndRepoTransBlockIdIn(
	// 			Array.from(sharingNodeIdSet), Array.from(repoTransBlockIdSet)
	// 		);
	//
	// 	const sharingNodeTransBlockStageValues: SharingNodeRepoTransBlockStageValues[] = [];
	//
	// 	for (const [sharingNodeId, repoTransBlocksForSharingNodeById]
	// 		of existingSharingNodeRepoTransBlockMap) {
	// 		const repoTransBlockSyncOutcomesForSharingNodeId
	// 			= repoTransBlockSyncOutcomeMapBySharingNodeId.get(sharingNodeId);
	// 		for (const [tmRepositoryTransactionBlockId, repositoryTransactionBlock]
	// 			of repoTransBlocksForSharingNodeById) {
	// 			const repoTransBlockSyncOutcome
	// 				= repoTransBlockSyncOutcomesForSharingNodeId.get(tmRepositoryTransactionBlockId);
	// 			repoTransBlockSyncOutcomesForSharingNodeId.delete(tmRepositoryTransactionBlockId);
	//
	// 			sharingNodeTransBlockStageValues.push([
	// 				sharingNodeId,
	// 				tmRepositoryTransactionBlockId,
	// 				repoTransBlockSyncOutcome.syncOutcomeType
	// 			]);
	// 		}
	// 	}
	//
	// 	await this.sharingNodeRepoTransBlockStageDao.insertValues(sharingNodeTransBlockStageValues);
	// 	await this.sharingNodeRepoTransBlockDao.updateFromResponseStage();
	// 	await this.sharingNodeRepoTransBlockStageDao.delete();
	// }

	private async insertNewSharingNodeRepoTransBlocks(
		repoTransBlockSyncOutcomeMapBySharingNodeId: Map<SharingNodeId,
			Map<TmRepositoryTransactionBlockId, RepoTransBlockSyncStatus>>
	): Promise<void> {
		const sharingNodeTransBlockValues: SharingNodeRepoTransBlockValues[] = [];
		const sharingMessageSyncTimestamp: SharingMessageSyncTimestamp = new Date();
		for (const [sharingNodeId, repoTransBlockSyncOutcomesForSharingNodeId]
			of repoTransBlockSyncOutcomeMapBySharingNodeId) {
			for (const [tmRepositoryTransactionBlockId, repoTransBlockSyncOutcome]
				of repoTransBlockSyncOutcomesForSharingNodeId) {

				sharingNodeTransBlockValues.push([
					sharingNodeId,
					tmRepositoryTransactionBlockId,
					// sharingMessageSyncTimestamp,
					repoTransBlockSyncOutcome.syncStatus,
					// DataOrigin.LOCAL,
					// BlockSyncStatus.SYNCHRONIZED
				]);
			}
		}

		await this.sharingNodeRepoTransBlockDao.insertValues(sharingNodeTransBlockValues);
	}

}