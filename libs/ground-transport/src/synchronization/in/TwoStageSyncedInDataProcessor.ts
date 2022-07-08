import {
	RepositorySynchronizationMessage
} from '@airport/arrivals-n-departures'
import {
	ApplicationVersion_LocalId,
	TransactionType
} from '@airport/ground-control'
import {
	Actor_LocalId,
	IActor,
	IRepositoryTransactionHistory,
	IRepositoryTransactionHistoryDuo,
	RepositoryTransactionType,
	Repository_LocalId
} from '@airport/holding-pattern/lib/to_be_generated/runtime-index'
import {
	ISynchronizationConflict,
	ISynchronizationConflictDao,
	ISynchronizationConflictValues,
	ISynchronizationConflictValuesDao,
} from '@airport/layover'
import {
	ITransaction
} from '@airport/terminal-map'
import { IApplication } from '@airport/airspace'
import { ISyncRepoTransHistory } from './SyncInUtils'
import { IStage1SyncedInDataProcessor } from './Stage1SyncedInDataProcessor'
import { IStage2SyncedInDataProcessor } from './Stage2SyncedInDataProcessor'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'

/**
 * Synchronizes incoming data and records message conflicts in two processing stages.
 */
export interface ITwoStageSyncedInDataProcessor {

	syncMessages(
		messages: RepositorySynchronizationMessage[],
		transaction: ITransaction,
		context: IContext
	): Promise<void>;

}

@Injected()
export class TwoStageSyncedInDataProcessor
	implements ITwoStageSyncedInDataProcessor {

	@Inject()
	repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo

	@Inject()
	stage1SyncedInDataProcessor: IStage1SyncedInDataProcessor

	@Inject()
	stage2SyncedInDataProcessor: IStage2SyncedInDataProcessor

	@Inject()
	synchronizationConflictDao: ISynchronizationConflictDao

	@Inject()
	synchronizationConflictValuesDao: ISynchronizationConflictValuesDao

	/**
	 * Synchronize the data messages coming to Terminal (new data for this TM)
	 */
	async syncMessages(
		messages: RepositorySynchronizationMessage[],
		transaction: ITransaction,
		context: IContext
	): Promise<void> {
		this.aggregateHistoryRecords(messages, transaction)

		const { actorMapById, repositoryTransactionHistoryMapByRepositoryId, applicationsByApplicationVersion_LocalIdMap }
			= await this.getDataStructures(messages)

		await this.updateLocalData(repositoryTransactionHistoryMapByRepositoryId, actorMapById,
			applicationsByApplicationVersion_LocalIdMap, context)
	}

	private aggregateHistoryRecords(
		messages: RepositorySynchronizationMessage[],
		transaction: ITransaction
	): void {

		const transactionHistory = transaction.transactionHistory;
		transactionHistory.transactionType = TransactionType.REMOTE_SYNC

		// split messages by repository and record actor information
		for (const message of messages) {
			const repositoryTransactionHistory = message.history
			transactionHistory.repositoryTransactionHistories.push(repositoryTransactionHistory)

			repositoryTransactionHistory.repositoryTransactionType = RepositoryTransactionType.REMOTE
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
					if (recordHistory.newValues && recordHistory.newValues.length) {
						transactionHistory.allRecordHistoryNewValues = transactionHistory
							.allRecordHistoryNewValues.concat(recordHistory.newValues)
					}
					if (recordHistory.oldValues && recordHistory.oldValues.length) {
						transactionHistory.allRecordHistoryOldValues = transactionHistory
							.allRecordHistoryOldValues.concat(recordHistory.oldValues)
					}
				})
			})

		}
	}

	private async getDataStructures(
		messages: RepositorySynchronizationMessage[]
	): Promise<{
		actorMapById: Map<number, IActor>
		repositoryTransactionHistoryMapByRepositoryId: Map<Repository_LocalId, IRepositoryTransactionHistory[]>
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>
	}> {
		const repositoryTransactionHistoryMapByRepositoryId: Map<Repository_LocalId, IRepositoryTransactionHistory[]>
			= new Map()
		const applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication> = new Map()
		const actorMapById: Map<number, IActor> = new Map()
		const repoTransHistories: IRepositoryTransactionHistory[] = []
		for (const message of messages) {
			repoTransHistories.push(message.history)
			repositoryTransactionHistoryMapByRepositoryId.set(message.history.repository._localId, repoTransHistories)
			for (const actor of message.actors) {
				actorMapById.set(actor._localId, actor)
			}
			for (const applicationVersion of message.applicationVersions) {
				applicationsByApplicationVersion_LocalIdMap.set(applicationVersion._localId, applicationVersion.application)
			}
		}

		for (const [_, repoTransHistories] of repositoryTransactionHistoryMapByRepositoryId) {
			this.repositoryTransactionHistoryDuo
				.sortRepoTransHistories(repoTransHistories, actorMapById)
		}

		return {
			actorMapById,
			repositoryTransactionHistoryMapByRepositoryId,
			applicationsByApplicationVersion_LocalIdMap
		}
	}

	private async updateLocalData(
		repositoryTransactionHistoryMapByRepositoryId: Map<Repository_LocalId, ISyncRepoTransHistory[]>,
		actorMayById: Map<Actor_LocalId, IActor>,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>,
		context: IContext
	): Promise<void> {
		const stage1Result
			= await this.stage1SyncedInDataProcessor.performStage1DataProcessing(
				repositoryTransactionHistoryMapByRepositoryId, actorMayById, context)

		let allSyncConflicts: ISynchronizationConflict[] = []
		let allSyncConflictValues: ISynchronizationConflictValues[] = []
		for (const [_, synchronizationConflicts] of stage1Result.syncConflictMapByRepoId) {
			allSyncConflicts = allSyncConflicts.concat(synchronizationConflicts)
			for (const synchronizationConflict of synchronizationConflicts) {
				if (synchronizationConflict.values.length) {
					allSyncConflictValues = allSyncConflictValues.concat(synchronizationConflict.values)
				}
			}
		}

		await this.stage2SyncedInDataProcessor.applyChangesToDb(
			stage1Result, applicationsByApplicationVersion_LocalIdMap)


		if (allSyncConflicts.length) {
			await this.synchronizationConflictDao.insert(allSyncConflicts, context)
		}

		if (allSyncConflictValues.length) {
			await this.synchronizationConflictValuesDao.insert(allSyncConflictValues, context)
		}
	}

}
