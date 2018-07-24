import {
	IUtils,
	UtilsToken
}                                     from "@airport/air-control";
import {SchemaVersionId} from "@airport/ground-control";
import {
	ActorId,
	IActor,
	IRepositoryActorDao,
	IRepositoryTransactionHistory,
	IRepositoryTransactionHistoryDmo,
	RepositoryActorDaoToken,
	RepositoryId,
	RepositoryTransactionHistoryDmoToken,
	RepositoryTransactionType
}                                     from "@airport/holding-pattern";
import {
	IRepositoryTransactionBlock,
	IRepositoryTransactionBlockDao,
	ISharingMessage,
	ISharingMessageDao,
	ISharingMessageRepoTransBlock,
	ISharingMessageRepoTransBlockDao,
	ISynchronizationConflict,
	ISynchronizationConflictDao,
	ISynchronizationConflictPendingNotification,
	ISynchronizationConflictPendingNotificationDao,
	RepositoryTransactionBlockDaoToken,
	RepositoryTransactionBlockData,
	SharingMessageDaoToken,
	SharingMessageRepoTransBlockDaoToken,
	SharingNodeId,
	SynchronizationConflictPendingNotificationDaoToken
}                                     from "@airport/moving-walkway";
import {
	ITransactionManager,
	TransactionManagerToken
}                                     from "@airport/terminal-map";
import {ISchema} from "@airport/traffic-pattern";
import {
	Inject,
	Service
}                                     from "typedi";
import {parse}                        from "zipson/lib";
import {
	Stage1SyncedInDataProcessorToken,
	Stage2SyncedInDataProcessorToken,
	SyncInCheckerToken,
	TwoStageSyncedInDataProcessorToken
}                                     from "../../InjectionTokens";
import {ISyncInChecker}               from "./checker/SyncInChecker";
import {IStage1SyncedInDataProcessor} from "./Stage1SyncedInDataProcessor";
import {IStage2SyncedInDataProcessor} from "./Stage2SyncedInDataProcessor";
import {
	IDataToTM,
	ISyncRepoTransHistory
}                                     from "./SyncInUtils";

/**
 * Synchronizes incoming data and records message conflicts in two processing stages.
 */
export interface ITwoStageSyncedInDataProcessor {

	syncDataMessages(
		dataMessages: IDataToTM[],
		// sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>
		sharingNodeRepositoryMap: Map<SharingNodeId, Set<RepositoryId>>
	): Promise<void>;

}

@Service(TwoStageSyncedInDataProcessorToken)
export class TwoStageSyncedInDataProcessor
	implements ITwoStageSyncedInDataProcessor {

	constructor(
		@Inject(RepositoryActorDaoToken)
		private repositoryActorDao: IRepositoryActorDao,
		@Inject(RepositoryTransactionHistoryDmoToken)
		private repositoryTransactionHistoryDmo: IRepositoryTransactionHistoryDmo,
		@Inject(SharingMessageDaoToken)
		private sharingMessageDao: ISharingMessageDao,
		@Inject(SharingMessageRepoTransBlockDaoToken)
		private sharingMessageRepoTransBlockDao: ISharingMessageRepoTransBlockDao,
		@Inject(Stage1SyncedInDataProcessorToken)
		private stage1SyncedInDataProcessor: IStage1SyncedInDataProcessor,
		@Inject(Stage2SyncedInDataProcessorToken)
		private stage2SyncedInDataProcessor: IStage2SyncedInDataProcessor,
		private synchronizationConflictDao: ISynchronizationConflictDao,
		@Inject(SynchronizationConflictPendingNotificationDaoToken)
		private synchronizationConflictPendingNotificationDao
			: ISynchronizationConflictPendingNotificationDao,
		@Inject(SyncInCheckerToken)
		private syncInChecker: ISyncInChecker,
		@Inject(RepositoryTransactionBlockDaoToken)
		private repositoryTransactionBlockDao: IRepositoryTransactionBlockDao,
		// @Inject(RepoTransBlockRepoTransHistoryDaoToken)
		// private repoTransBlockRepoTransHistoryDao: IRepoTransBlockRepoTransHistoryDao,
		@Inject(TransactionManagerToken)
		private transactionManager: ITransactionManager,
		@Inject(UtilsToken)
		private utils: IUtils,
	) {

	}

	/**
	 * Synchronize the data messages coming from AGT (new data for this TM).
	 * @param {IDataToTM[]} dataMessages  Incoming data messages.
	 * @param {Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>} sharingNodeRepositoryMap
	 *      Local (TM) repository Id Map.
	 * @returns {Promise<void>}
	 */
	async syncDataMessages(
		dataMessages: IDataToTM[],
		// sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>
		sharingNodeRepositoryMap: Map<SharingNodeId, Set<RepositoryId>>
	): Promise<void> {
		const {
			actorMap,
			actorMapById,
			consistentMessages
		} = await this.syncInChecker.actorChecker.ensureActorsAndGetAsMaps(dataMessages);

		const [
			sharingMessagesWithCompatibleSchemasAndData,
			existingRepoTransBlocksWithCompatibleSchemasAndData,
			messagesWithCompatibleSchemas,
			usedSchemaVersionIdSet
		] = await this.syncInChecker.checkSchemasAndDataAndRecordSharingMessages(
			consistentMessages, actorMap, sharingNodeRepositoryMap
		);

		const repoTransHistoryMapByRepositoryId
			= await this.recordSharingMessageToHistoryRecords(
			sharingMessagesWithCompatibleSchemasAndData,
			existingRepoTransBlocksWithCompatibleSchemasAndData,
			messagesWithCompatibleSchemas,
			actorMapById);


		await this.updateLocalData(repoTransHistoryMapByRepositoryId, actorMapById);
	}

	private async recordSharingMessageToHistoryRecords(
		sharingMessages: ISharingMessage[],
		existingRepoTransBlocksWithCompatibleSchemasAndData: IRepositoryTransactionBlock[],
		dataMessages: IDataToTM[],
		actorMapById: Map<ActorId, IActor>
	): Promise<Map<RepositoryId, IRepositoryTransactionHistory[]>> {
		const repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>
			= await this.getRepoTransHistoryMapByRepoId(dataMessages,
			existingRepoTransBlocksWithCompatibleSchemasAndData, actorMapById);

		const repositoryTransactionBlocks: IRepositoryTransactionBlock[] = [];
		const sharingMessageRepoTransBlocks: ISharingMessageRepoTransBlock[] = [];
		const repoTransBlockRepoTransHistories: IRepoTransBlockRepoTransHistory[] = [];

		const transactionHistory = this.transactionManager.currentTransHistory;
		transactionHistory.transactionType = TransactionType.REMOTE_SYNC;

		// split messages by repository and record actor information
		for (let i = 0; i < dataMessages.length; i++) {
			const sharingMessage = sharingMessages[i];
			const dataMessage = dataMessages[i];
			const data = dataMessage.data;
			const repositoryTransactionBlock: IRepositoryTransactionBlock = {
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
			data.repoTransHistories.forEach((
				repositoryTransactionHistory
			) => {
				repositoryTransactionHistory.repositoryTransactionType = RepositoryTransactionType.REMOTE;
				repoTransBlockRepoTransHistories.push({
					repositoryTransactionHistory,
					repositoryTransactionBlock
				});
				transactionHistory.allOperationHistory = transactionHistory
					.allOperationHistory.concat(repositoryTransactionHistory.operationHistory);
				repositoryTransactionHistory.operationHistory.forEach((
					operationHistory
				) => {
					transactionHistory.allRecordHistory = transactionHistory
						.allRecordHistory.concat(operationHistory.recordHistory);
					operationHistory.recordHistory.forEach((
						recordHistory
					) => {
						transactionHistory.allRecordHistoryNewValues = transactionHistory
							.allRecordHistoryNewValues.concat(recordHistory.newValues);
						transactionHistory.allRecordHistoryOldValues = transactionHistory
							.allRecordHistoryOldValues.concat(recordHistory.oldValues);
					});
				});

			});
		}

		await this.repositoryTransactionBlockDao.bulkCreate(repositoryTransactionBlocks, false, false);
		await this.sharingMessageRepoTransBlockDao.bulkCreate(
			sharingMessageRepoTransBlocks, false, false);
		await this.repoTransBlockRepoTransHistoryDao.bulkCreate(
			repoTransBlockRepoTransHistories, false, false);

		return repoTransHistoryMapByRepositoryId;
	}

	private async getRepoTransHistoryMapByRepoId(
		dataMessages: IDataToTM[],
		existingRepoTransBlocksWithCompatibleSchemasAndData: IRepositoryTransactionBlock[],
		actorMapById: Map<ActorId, IActor>
	): Promise<Map<RepositoryId, IRepositoryTransactionHistory[]>> {
		const repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>
			= new Map();
		for (const dataMessage of dataMessages) {
			const data = dataMessage.data;
			this.addRepoTransHistoriesToMapFromData(repoTransHistoryMapByRepositoryId, data);
		}

		const repositoryTransactionBlockIds: TmSharingMessageId[] = [];
		for (const repositoryTransactionBlock
			of existingRepoTransBlocksWithCompatibleSchemasAndData) {
			const data: RepositoryTransactionBlockData = parse(repositoryTransactionBlock.contents);
			this.addRepoTransHistoriesToMapFromData(repoTransHistoryMapByRepositoryId, data);
			for (const actor of data.actors) {
				actorMapById.set(actor.id, actor);
			}
			repositoryTransactionBlockIds.push(repositoryTransactionBlock.id);
		}
		if (repositoryTransactionBlockIds.length) {
			await this.repositoryTransactionBlockDao.clearContentsWhereIdsIn(repositoryTransactionBlockIds);
		}

		for (const [repositoryId, repoTransHistories] of repoTransHistoryMapByRepositoryId) {
			this.repositoryTransactionHistoryDmo
				.sortRepoTransHistories(repoTransHistories, actorMapById);
		}

		return repoTransHistoryMapByRepositoryId;
	}

	private addRepoTransHistoriesToMapFromData(
		repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>,
		data: RepositoryTransactionBlockData
	): void {
		let repoTransHistories
			= this.utils.ensureChildArray(repoTransHistoryMapByRepositoryId, data.repository.id);
		repoTransHistories = repoTransHistories.concat(data.repoTransHistories);
		repoTransHistoryMapByRepositoryId.set(data.repository.id, repoTransHistories);
	}


	private async updateLocalData(
		repoTransHistoryMapByRepositoryId: Map<RepositoryId, ISyncRepoTransHistory[]>,
		actorMayById: Map<ActorId, IActor>,
		schemasBySchemaVersionIdMap: Map<SchemaVersionId, ISchema>
	): Promise<void> {
		const stage1Result
			= await this.stage1SyncedInDataProcessor.performStage1DataProcessing(
			repoTransHistoryMapByRepositoryId, actorMayById);

		const actorIdMapByRepositoryId = await this.repositoryActorDao
			.findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(
				Array.from(stage1Result.syncConflictMapByRepoId.keys())
			);

		let allSyncConflicts: ISynchronizationConflict[] = [];
		const syncConflictPendingNotifications: ISynchronizationConflictPendingNotification[] = [];
		for (const [repositoryId, repoSyncConflicts] of stage1Result.syncConflictMapByRepoId) {
			allSyncConflicts = allSyncConflicts.concat(repoSyncConflicts);
			const actorIdSetForRepository = actorIdMapByRepositoryId.get(repositoryId);

			for (const synchronizationConflict of repoSyncConflicts) {
				for (const actorId of actorIdSetForRepository) {
					syncConflictPendingNotifications.push({
						acknowledged: false,
						actor: {
							id: actorId,
						},
						synchronizationConflict
					});
				}
			}
		}

		await this.synchronizationConflictDao
			.bulkCreate(allSyncConflicts, false, false);
		await this.synchronizationConflictPendingNotificationDao
			.bulkCreate(syncConflictPendingNotifications, false, false);

		await this.stage2SyncedInDataProcessor.applyChangesToDb(stage1Result, schemasBySchemaVersionIdMap);
	}

}
