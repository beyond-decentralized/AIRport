import {
	Actor_LocalId,
	ApplicationVersion_LocalId,
	DbApplication,
	IActor,
	IRepositoryTransactionHistory,
	ISynchronizationConflict,
	ISynchronizationConflictValues,
	RepositorySynchronizationMessage,
	RepositoryTransactionType,
	Repository_GUID,
	Repository_LocalId,
	TransactionType
} from '@airport/ground-control'
import {
	IRepositoryDao,
	IRepositoryTransactionHistoryDuo,
	RepositoryMemberAcceptanceDao,
	RepositoryMemberDao
} from '@airport/holding-pattern/dist/app/bundle'
import {
	ISynchronizationConflictDao,
	ISynchronizationConflictValuesDao,
} from '@airport/layover'
import {
	ITransaction
} from '@airport/terminal-map'
import { ISyncRepoTransHistory } from './SyncInUtils'
import { IStage1SyncedInDataProcessor } from './Stage1SyncedInDataProcessor'
import { IStage2SyncedInDataProcessor } from './Stage2SyncedInDataProcessor'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { INewAndUpdatedRepositoriesAndRecords as INewAndUpdatedRepositoriesAndRecords } from './checker/SyncInRepositoryChecker'

/**
 * Synchronizes incoming data and records message conflicts in two processing stages.
 */
export interface ITwoStageSyncedInDataProcessor {

	syncMessages(
		messages: RepositorySynchronizationMessage[],
		newAndUpdatedRepositorieAndRecords: INewAndUpdatedRepositoriesAndRecords,
		repositoryGUIDMapByLocalId: Map<Repository_LocalId, Repository_GUID>,
		transaction: ITransaction,
		context: IContext
	): Promise<void>;

}

@Injected()
export class TwoStageSyncedInDataProcessor
	implements ITwoStageSyncedInDataProcessor {

	@Inject()
	repositoryDao: IRepositoryDao

	@Inject()
	repositoryMemberAcceptanceDao: RepositoryMemberAcceptanceDao

	@Inject()
	repositoryMemberDao: RepositoryMemberDao

	@Inject()
	repositoryMemberInvitationDao: RepositoryMemberAcceptanceDao

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
		newAndUpdatedRepositoriesAndRecords: INewAndUpdatedRepositoriesAndRecords,
		repositoryGUIDMapByLocalId: Map<Repository_LocalId, Repository_GUID>,
		transaction: ITransaction,
		context: IContext
	): Promise<void> {
		this.aggregateHistoryRecords(messages, transaction)

		await this.repositoryDao.insert(newAndUpdatedRepositoriesAndRecords.missingRepositories, context)
		for (const newRepository of newAndUpdatedRepositoriesAndRecords.missingRepositories) {
			repositoryGUIDMapByLocalId.set(newRepository._localId, newRepository.GUID)
		}

		const { actorMapById, repositoryTransactionHistoryMapByRepositoryId, applicationsByApplicationVersion_LocalIdMap }
			= await this.getDataStructures(messages)

		await this.repositoryMemberDao.insert(newAndUpdatedRepositoriesAndRecords.newMembers, context)
		await this.repositoryMemberInvitationDao.insert(newAndUpdatedRepositoriesAndRecords.newRepositoryMemberInvitations, context)
		await this.repositoryMemberAcceptanceDao.insert(newAndUpdatedRepositoriesAndRecords.newRepositoryMemberAcceptances, context)

		for (const newRepositoryMemberAcceptance of
			newAndUpdatedRepositoriesAndRecords.newRepositoryMemberAcceptances) {
			await this.repositoryMemberDao.updatePublicSigningKey(
				newRepositoryMemberAcceptance.invitationPublicSigningKey,
				newRepositoryMemberAcceptance.acceptingRepositoryMember.memberPublicSigningKey,
				context)
		}


		await this.updateLocalData(
			repositoryTransactionHistoryMapByRepositoryId, actorMapById,
			applicationsByApplicationVersion_LocalIdMap,
			repositoryGUIDMapByLocalId, context)
	}

	private aggregateHistoryRecords(
		messages: RepositorySynchronizationMessage[],
		transaction: ITransaction
	): void {
		const transactionHistory = transaction.transactionHistory;
		transactionHistory.transactionType = TransactionType.REMOTE_SYNC

		// split messages by repository and record actor information
		for (const message of messages) {
			const repositoryTransactionHistory = message.data.history
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
			transactionHistory.allRepositoryMembers = transactionHistory
				.allRepositoryMembers.concat(repositoryTransactionHistory.newRepositoryMembers)
			transactionHistory.allRepositoryMemberAcceptances = transactionHistory
				.allRepositoryMemberAcceptances.concat(repositoryTransactionHistory.newRepositoryMemberAcceptances)
			transactionHistory.allRepositoryMemberInvitations = transactionHistory
				.allRepositoryMemberInvitations.concat(repositoryTransactionHistory.newRepositoryMemberInvitations)
		}
	}

	private async getDataStructures(
		messages: RepositorySynchronizationMessage[]
	): Promise<{
		actorMapById: Map<number, IActor>
		repositoryTransactionHistoryMapByRepositoryId: Map<Repository_LocalId, IRepositoryTransactionHistory[]>
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, DbApplication>
	}> {
		const repositoryTransactionHistoryMapByRepositoryId: Map<Repository_LocalId, IRepositoryTransactionHistory[]>
			= new Map()
		const applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, DbApplication> = new Map()
		const actorMapById: Map<number, IActor> = new Map()
		const repoTransHistories: IRepositoryTransactionHistory[] = []
		for (const message of messages) {
			const data = message.data
			repoTransHistories.push(data.history)
			repositoryTransactionHistoryMapByRepositoryId.set(data.history.repository._localId, repoTransHistories)
			for (const actor of data.actors) {
				actorMapById.set(actor._localId, actor)
			}
			for (const applicationVersion of data.applicationVersions) {
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
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, DbApplication>,
		repositoryGUIDMapByLocalId: Map<Repository_LocalId, Repository_GUID>,
		context: IContext
	): Promise<void> {
		const stage1Result
			= await this.stage1SyncedInDataProcessor.performStage1DataProcessing(
				repositoryTransactionHistoryMapByRepositoryId, actorMayById)

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
			stage1Result, applicationsByApplicationVersion_LocalIdMap,
			repositoryGUIDMapByLocalId)


		if (allSyncConflicts.length) {
			await this.synchronizationConflictDao.insert(allSyncConflicts, context)
		}

		if (allSyncConflictValues.length) {
			await this.synchronizationConflictValuesDao.insert(allSyncConflictValues, context)
		}
	}

}
