import {
	RepositorySynchronizationMessage
} from '@airport/arrivals-n-departures'
import { container, DI } from '@airport/di'
import {
	ApplicationVersionId,
	TransactionType
} from '@airport/ground-control'
import {
	Actor_Id,
	IActor,
	IRepositoryTransactionHistory,
	RepositoryTransactionType,
	Repository_Id,
	REPOSITORY_TRANSACTION_HISTORY_DUO
} from '@airport/holding-pattern'
import {
	ISynchronizationConflict,
	ISynchronizationConflictValues,
	SYNCHRONIZATION_CONFLICT_DAO,
	SYNCHRONIZATION_CONFLICT_VALUES_DAO,
} from '@airport/moving-walkway'
import {
	ITransaction
} from '@airport/terminal-map'
import { IApplication } from '@airport/airspace'
import {
	STAGE1_SYNCED_IN_DATA_PROCESSOR,
	STAGE2_SYNCED_IN_DATA_PROCESSOR,
	TWO_STAGE_SYNCED_IN_DATA_PROCESSOR
} from '../../tokens'
import { ISyncRepoTransHistory } from './SyncInUtils'

/**
 * Synchronizes incoming data and records message conflicts in two processing stages.
 */
export interface ITwoStageSyncedInDataProcessor {

	syncMessages(
		messages: RepositorySynchronizationMessage[],
		transaction: ITransaction
	): Promise<void>;

}

export class TwoStageSyncedInDataProcessor
	implements ITwoStageSyncedInDataProcessor {

	/**
	 * Synchronize the data messages coming to Terminal (new data for this TM)
	 */
	async syncMessages(
		messages: RepositorySynchronizationMessage[],
		transaction: ITransaction
	): Promise<void> {
		this.aggregateHistoryRecords(messages, transaction)

		const { actorMapById, repoTransHistoryMapByRepositoryId, applicationsByApplicationVersionIdMap }
			= await this.getDataStructures(messages)

		await this.updateLocalData(repoTransHistoryMapByRepositoryId, actorMapById,
			applicationsByApplicationVersionIdMap)
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
		repoTransHistoryMapByRepositoryId: Map<Repository_Id, IRepositoryTransactionHistory[]>
		applicationsByApplicationVersionIdMap: Map<ApplicationVersionId, IApplication>
	}> {
		const repositoryTransactionHistoryDuo = await container(this).get(REPOSITORY_TRANSACTION_HISTORY_DUO)
		const repoTransHistoryMapByRepositoryId: Map<Repository_Id, IRepositoryTransactionHistory[]>
			= new Map()
		const applicationsByApplicationVersionIdMap: Map<ApplicationVersionId, IApplication> = new Map()
		const actorMapById: Map<number, IActor> = new Map()
		const repoTransHistories: IRepositoryTransactionHistory[] = []
		for (const message of messages) {
			repoTransHistories.push(message.history)
			repoTransHistoryMapByRepositoryId.set(message.history.repository.id, repoTransHistories)
			for (const actor of message.actors) {
				actorMapById.set(actor.id, actor)
			}
			for (const applicationVersion of message.applicationVersions) {
				applicationsByApplicationVersionIdMap.set(applicationVersion.id, applicationVersion.application)
			}
		}

		for (const [_, repoTransHistories] of repoTransHistoryMapByRepositoryId) {
			repositoryTransactionHistoryDuo
				.sortRepoTransHistories(repoTransHistories, actorMapById)
		}

		return {
			actorMapById,
			repoTransHistoryMapByRepositoryId,
			applicationsByApplicationVersionIdMap
		}
	}

	private async updateLocalData(
		repoTransHistoryMapByRepositoryId: Map<Repository_Id, ISyncRepoTransHistory[]>,
		actorMayById: Map<Actor_Id, IActor>,
		applicationsByApplicationVersionIdMap: Map<ApplicationVersionId, IApplication>,
	): Promise<void> {
		const [stage1SyncedInDataProcessor, stage2SyncedInDataProcessor,
			synchronizationConflictDao, synchronizationConflictValuesDao]
			= await container(this).get(
				STAGE1_SYNCED_IN_DATA_PROCESSOR, STAGE2_SYNCED_IN_DATA_PROCESSOR,
				SYNCHRONIZATION_CONFLICT_DAO, SYNCHRONIZATION_CONFLICT_VALUES_DAO)
		const stage1Result
			= await stage1SyncedInDataProcessor.performStage1DataProcessing(
				repoTransHistoryMapByRepositoryId, actorMayById)

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

		await stage2SyncedInDataProcessor.applyChangesToDb(stage1Result, applicationsByApplicationVersionIdMap)


		if (allSyncConflicts.length) {
			await synchronizationConflictDao.insert(allSyncConflicts)
		}

		if (allSyncConflictValues.length) {
			await synchronizationConflictValuesDao.insert(allSyncConflictValues)
		}
	}

}

DI.set(TWO_STAGE_SYNCED_IN_DATA_PROCESSOR, TwoStageSyncedInDataProcessor)
