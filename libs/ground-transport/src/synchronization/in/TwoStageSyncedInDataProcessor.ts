import {
	AgtRepositoryId,
	RepoTransBlockSyncOutcomeType,
	TerminalMessage,
	TmSharingMessageId
} from '@airport/arrivals-n-departures'
import { container, DI } from '@airport/di'
import {
	ensureChildArray,
	SchemaVersionId,
	TransactionType
} from '@airport/ground-control'
import {
	Actor_Id,
	IActor,
	IRepositoryActorDao,
	IRepositoryTransactionHistory,
	IRepositoryTransactionHistoryDao,
	IRepositoryTransactionHistoryDuo,
	REPO_ACTOR_DAO,
	REPO_TRANS_HISTORY_DUO,
	RepositoryId,
	RepositoryTransactionType
} from '@airport/holding-pattern'
import {
	ISynchronizationConflict,
	ISynchronizationConflictDao,
	ISynchronizationConflictPendingNotification,
	ISynchronizationConflictPendingNotificationDao,
	REPO_TRANS_BLOCK_DAO,
	RepositoryTransactionBlockData,
	SYNC_CONFLICT_DAO,
	SYNC_CONFLICT_PENDING_NOTIFICATION_DAO
} from '@airport/moving-walkway'
import {
	ITransactionManager,
	TRANSACTION_MANAGER
} from '@airport/terminal-map'
import { ISchema } from '@airport/airspace'
import { parse } from 'zipson/lib'
import {
	STAGE1_SYNCED_IN_DATA_PROCESSOR,
	STAGE2_SYNCED_IN_DATA_PROCESSOR,
	SYNC_IN_CHECKER,
	TWO_STAGE_SYNCED_IN_DATA_PROCESSOR
} from '../../tokens'
import { IStage1SyncedInDataProcessor } from './Stage1SyncedInDataProcessor'
import { IStage2SyncedInDataProcessor } from './Stage2SyncedInDataProcessor'
import {
	IDataToTM,
	ISyncRepoTransHistory
} from './SyncInUtils'

/**
 * Synchronizes incoming data and records message conflicts in two processing stages.
 */
export interface ITwoStageSyncedInDataProcessor {

	syncDataMessage(
		dataMessages: TerminalMessage,
	): Promise<void>;

}

export class TwoStageSyncedInDataProcessor
	implements ITwoStageSyncedInDataProcessor {

	/**
	 * Synchronize the data messages coming to Terminal (new data for this TM)
	 */
	async syncDataMessage(
		dataMessages: TerminalMessage
	): Promise<void> {
		// TODO: remove unused injections once tested
		const [
			repositoryActorDao,
			stage1SyncedInDataProcessor,
			stage2SyncedInDataProcessor,
			synchronizationConflictDao,
			synchronizationConflictPendingNotificationDao,
			syncInChecker,
			repositoryTransactionBlockDao,
			transactionManager] = await container(this).get(REPO_ACTOR_DAO,
				STAGE1_SYNCED_IN_DATA_PROCESSOR, STAGE2_SYNCED_IN_DATA_PROCESSOR,
				SYNC_CONFLICT_DAO, SYNC_CONFLICT_PENDING_NOTIFICATION_DAO,
				SYNC_IN_CHECKER, REPO_TRANS_BLOCK_DAO,
				TRANSACTION_MANAGER)

		const {
			messageHasCompatibleSchemas,
			messageHasValidData,
		} = await syncInChecker.checkMessage(
			// consistentMessages, actorMap, sharingNodeRepositoryMap,
			// dataMessagesWithInvalidData
			dataMessages
		)

		const repoTransHistoryMapByRepositoryId
			= await this.recordSharingMessageToHistoryRecords(
				sharingMessagesWithCompatibleSchemasAndData,
				existingRepoTransBlocksWithCompatibleSchemasAndData,
				dataMessagesWithCompatibleSchemas,
				actorMapById, repositoryTransactionBlockDao,
				repoTransBlockRepoTransHistoryDao, transactionManager)


		await this.updateLocalData(repoTransHistoryMapByRepositoryId, actorMapById,
			schemasBySchemaVersionIdMap,
			repositoryActorDao, stage1SyncedInDataProcessor, stage2SyncedInDataProcessor,
			synchronizationConflictDao, synchronizationConflictPendingNotificationDao)
	}

	private async recordSharingMessageToHistoryRecords(
		sharingMessages: ISharingMessage[],
		existingRepoTransBlocksWithCompatibleSchemasAndData: IRepositoryTransactionBlock[],
		dataMessages: IDataToTM[],
		actorMapById: Map<Actor_Id, IActor>,
		repositoryTransactionBlockDao: IRepositoryTransactionBlockDao,
		repoTransBlockRepoTransHistoryDao, // TODO: figure out the type
		transactionManager: ITransactionManager
	): Promise<Map<RepositoryId, IRepositoryTransactionHistory[]>> {
		const repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>
			= await this.getRepoTransHistoryMapByRepoId(dataMessages,
				existingRepoTransBlocksWithCompatibleSchemasAndData, actorMapById)

		const repositoryTransactionBlocks: IRepositoryTransactionBlock[] = []
		const repoTransBlockRepoTransHistories: IRepoTransBlockRepoTransHistory[] = []

		const transactionHistory = transactionManager.currentTransHistory
		transactionHistory.transactionType = TransactionType.REMOTE_SYNC

		// split messages by repository and record actor information
		for (let i = 0; i < dataMessages.length; i++) {
			const sharingMessage = sharingMessages[i]
			const dataMessage = dataMessages[i]
			const data = dataMessage.data
			const repositoryTransactionBlock: IRepositoryTransactionBlock = {
				repository: data.repository,
				syncOutcomeType: RepoTransBlockSyncOutcomeType.SYNC_SUCCESSFUL
			}
			repositoryTransactionBlocks.push(repositoryTransactionBlock)
			sharingMessageRepoTransBlocks.push({
				sharingMessage,
				repositoryTransactionBlock
			})
			transactionHistory.repositoryTransactionHistories
				= transactionHistory.repositoryTransactionHistories.concat(data.repoTransHistories)
			data.repoTransHistories.forEach((
				repositoryTransactionHistory
			) => {
				repositoryTransactionHistory.repositoryTransactionType = RepositoryTransactionType.REMOTE
				repoTransBlockRepoTransHistories.push({
					repositoryTransactionHistory,
					repositoryTransactionBlock
				})
				transactionHistory.allOperationHistory = transactionHistory
					.allOperationHistory.concat(repositoryTransactionHistory.operationHistory)
				repositoryTransactionHistory.operationHistory.forEach((
					operationHistory
				) => {
					transactionHistory.allRecordHistory = transactionHistory
						.allRecordHistory.concat(operationHistory.recordHistory)
					operationHistory.recordHistory.forEach((
						recordHistory
					) => {
						transactionHistory.allRecordHistoryNewValues = transactionHistory
							.allRecordHistoryNewValues.concat(recordHistory.newValues)
						transactionHistory.allRecordHistoryOldValues = transactionHistory
							.allRecordHistoryOldValues.concat(recordHistory.oldValues)
					})
				})

			})
		}

		await repositoryTransactionBlockDao.bulkCreate(
			repositoryTransactionBlocks, false)

		await repoTransBlockRepoTransHistoryDao.bulkCreate(
			repoTransBlockRepoTransHistories, false)

		return repoTransHistoryMapByRepositoryId
	}

	private async getRepoTransHistoryMapByRepoId(
		dataMessages: IDataToTM[],
		existingRepoTransBlocksWithCompatibleSchemasAndData: IRepositoryTransactionBlock[],
		actorMapById: Map<Actor_Id, IActor>,
		repositoryTransactionBlockDao: IRepositoryTransactionBlockDao,
		repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo
	): Promise<Map<RepositoryId, IRepositoryTransactionHistory[]>> {
		const repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>
			= new Map()
		for (const dataMessage of dataMessages) {
			const data = dataMessage.data
			this.addRepoTransHistoriesToMapFromData(repoTransHistoryMapByRepositoryId, data)
		}

		const repositoryTransactionBlockIds: TmSharingMessageId[] = []
		for (const repositoryTransactionBlock
			of existingRepoTransBlocksWithCompatibleSchemasAndData) {
			const data: RepositoryTransactionBlockData = parse(repositoryTransactionBlock.contents)
			this.addRepoTransHistoriesToMapFromData(repoTransHistoryMapByRepositoryId, data)
			for (const actor of data.actors) {
				actorMapById.set(actor.id, actor)
			}
			repositoryTransactionBlockIds.push(repositoryTransactionBlock.id)
		}
		if (repositoryTransactionBlockIds.length) {
			await repositoryTransactionBlockDao.clearContentsWhereIdsIn(repositoryTransactionBlockIds)
		}

		for (const [repositoryId, repoTransHistories] of repoTransHistoryMapByRepositoryId) {
			repositoryTransactionHistoryDuo
				.sortRepoTransHistories(repoTransHistories, actorMapById)
		}

		return repoTransHistoryMapByRepositoryId
	}

	private addRepoTransHistoriesToMapFromData(
		repoTransHistoryMapByRepositoryId: Map<RepositoryId, IRepositoryTransactionHistory[]>,
		data: RepositoryTransactionBlockData
	): void {
		let repoTransHistories
			= ensureChildArray(repoTransHistoryMapByRepositoryId, data.repository.id)
		repoTransHistories = repoTransHistories.concat(data.repoTransHistories)
		repoTransHistoryMapByRepositoryId.set(data.repository.id, repoTransHistories)
	}

	private async updateLocalData(
		repoTransHistoryMapByRepositoryId: Map<RepositoryId, ISyncRepoTransHistory[]>,
		actorMayById: Map<Actor_Id, IActor>,
		schemasBySchemaVersionIdMap: Map<SchemaVersionId, ISchema>,
		repositoryActorDao: IRepositoryActorDao,
		stage1SyncedInDataProcessor: IStage1SyncedInDataProcessor,
		stage2SyncedInDataProcessor: IStage2SyncedInDataProcessor,
		synchronizationConflictDao: ISynchronizationConflictDao,
		synchronizationConflictPendingNotificationDao: ISynchronizationConflictPendingNotificationDao
	): Promise<void> {
		const stage1Result
			= await stage1SyncedInDataProcessor.performStage1DataProcessing(
				repoTransHistoryMapByRepositoryId, actorMayById)

		const actorIdMapByRepositoryId = await repositoryActorDao
			.findActorIdMapByRepositoryIdForLocalActorsWhereRepositoryIdIn(
				Array.from(stage1Result.syncConflictMapByRepoId.keys())
			)

		let allSyncConflicts: ISynchronizationConflict[] = []
		const syncConflictPendingNotifications: ISynchronizationConflictPendingNotification[] = []
		for (const [repositoryId, repoSyncConflicts] of stage1Result.syncConflictMapByRepoId) {
			allSyncConflicts = allSyncConflicts.concat(repoSyncConflicts)
			const actorIdSetForRepository = actorIdMapByRepositoryId.get(repositoryId)

			for (const synchronizationConflict of repoSyncConflicts) {
				for (const actorId of actorIdSetForRepository) {
					syncConflictPendingNotifications.push({
						acknowledged: false,
						actor: {
							id: actorId,
						},
						synchronizationConflict
					})
				}
			}
		}

		await synchronizationConflictDao.bulkCreate(allSyncConflicts, false)
		await synchronizationConflictPendingNotificationDao.bulkCreate(
			syncConflictPendingNotifications, false)

		await stage2SyncedInDataProcessor.applyChangesToDb(stage1Result, schemasBySchemaVersionIdMap)
	}

}

DI.set(TWO_STAGE_SYNCED_IN_DATA_PROCESSOR, TwoStageSyncedInDataProcessor)
