import {
	Actor_LocalId,
	DbColumn_Index,
	DbEntity_LocalId,
	ApplicationVersion_LocalId,
	IApplication,
	DbColumn,
	IActor,
	IDatastructureUtils,
	IRepositoryTransactionHistory,
	ISynchronizationConflict,
	ISynchronizationConflictValues,
	IRepositoryBlock,
	RepositoryTransactionType,
	Repository_LocalId,
	TransactionType,
	Dictionary,
	Repository_GUID,
	IRepository,
	RepositoryMember_PublicSigningKey,
	IRepositoryMember,
	RepositoryMemberInvitation_PublicSigningKey,
	IRepositoryMemberInvitation,
	IRepositoryMemberAcceptance
} from '@airport/ground-control'
import {
	IRecordHistoryDuo,
	IRepositoryDao,
	IRepositoryTransactionHistoryDuo,
	RepositoryMemberAcceptanceDao,
	RepositoryMemberDao,
	RepositoryMemberInvitationDao,
	RepositoryReferenceDao
} from '@airport/holding-pattern/dist/app/bundle'
// import {
// 	ISynchronizationConflictDao,
// 	ISynchronizationConflictValuesDao,
// } from '@airport/layover'
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
import { RepositoryReferenceCreator } from '../RepositoryReferenceCreator'

export interface ICrossBlockRepositoryAndMemberInfo {
	loadedRepositoryGUIDSet: Set<Repository_GUID>
	missingRepositoryMap: Map<Repository_GUID, IRepository>
	newMemberMap: Map<RepositoryMember_PublicSigningKey, IRepositoryMember>
	newRepositoryMemberInvitationMap: Map<RepositoryMemberInvitation_PublicSigningKey, IRepositoryMemberInvitation>
	newRepositoryMemberAcceptanceMap: Map<RepositoryMemberInvitation_PublicSigningKey, IRepositoryMemberAcceptance>
}

/**
 * Synchronizes incoming data and records block conflicts in two processing stages.
 */
export interface ITwoStageSyncedInDataProcessor {

	syncBlocks(
		blocks: IRepositoryBlock[],
		repositoryAndMemberInfo: ICrossBlockRepositoryAndMemberInfo,
		transaction: ITransaction,
		context: IContext
	): Promise<void>;

}

@Injected()
export class TwoStageSyncedInDataProcessor
	implements ITwoStageSyncedInDataProcessor {

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	recordHistoryDuo: IRecordHistoryDuo

	@Inject()
	repositoryDao: IRepositoryDao

	@Inject()
	repositoryMemberAcceptanceDao: RepositoryMemberAcceptanceDao

	@Inject()
	repositoryMemberDao: RepositoryMemberDao

	@Inject()
	repositoryMemberInvitationDao: RepositoryMemberInvitationDao

	@Inject()
	repositoryReferenceCreator: RepositoryReferenceCreator

	@Inject()
	repositoryReferenceDao: RepositoryReferenceDao

	@Inject()
	repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo

	@Inject()
	stage1SyncedInDataProcessor: IStage1SyncedInDataProcessor

	@Inject()
	stage2SyncedInDataProcessor: IStage2SyncedInDataProcessor

	@Inject()
	synchronizationConflictDao: any // ISynchronizationConflictDao

	@Inject()
	synchronizationConflictValuesDao: any // ISynchronizationConflictValuesDao

	/**
	 * Synchronize the data blocks coming to Terminal (new data for this TM)
	 */
	async syncBlocks(
		blocks: IRepositoryBlock[],
		repositoryAndMemberInfo: ICrossBlockRepositoryAndMemberInfo,
		transaction: ITransaction,
		context: IContext
	): Promise<void> {
		await this.insertNewRepositoryInfo(
			blocks,
			repositoryAndMemberInfo,
			context
		)
		await this.markLoadedRepositories(
			repositoryAndMemberInfo,
			context
		)

		this.aggregateHistoryRecords(blocks, transaction)

		const { actorMapByLid, repositoryTransactionHistoryMapByRepositoryLid, applicationsByApplicationVersion_LocalIdMap }
			= await this.getDataStructures(blocks)

		for (const newRepositoryMemberAcceptance of
			repositoryAndMemberInfo.newRepositoryMemberAcceptanceMap.values()) {
			await this.repositoryMemberDao.updatePublicSigningKey(
				newRepositoryMemberAcceptance.invitationPublicSigningKey,
				newRepositoryMemberAcceptance.acceptingRepositoryMember.memberPublicSigningKey,
				context)
		}

		await this.updateLocalData(
			repositoryTransactionHistoryMapByRepositoryLid, actorMapByLid,
			applicationsByApplicationVersion_LocalIdMap, context)
	}

	private async insertNewRepositoryInfo(
		blocks: IRepositoryBlock[],
		repositoryAndMemberInfo: ICrossBlockRepositoryAndMemberInfo,
		context: IContext
	): Promise<void> {
		await this.repositoryDao.insert(
			[...repositoryAndMemberInfo.missingRepositoryMap.values()],
			context)

		await this.repositoryMemberDao.insert(
			[...repositoryAndMemberInfo.newMemberMap.values()], context)
		await this.repositoryMemberInvitationDao.insert(
			[...repositoryAndMemberInfo.newRepositoryMemberInvitationMap.values()],
			context)
		await this.repositoryMemberAcceptanceDao.insert(
			[...repositoryAndMemberInfo.newRepositoryMemberAcceptanceMap.values()],
			context)

		await this.repositoryReferenceCreator.create(
			blocks, context)
	}

	private async markLoadedRepositories(
		repositoryAndMemberInfo: ICrossBlockRepositoryAndMemberInfo,
		context: IContext
	): Promise<void> {
		const loadedRepositoryGUIDs = [...repositoryAndMemberInfo.loadedRepositoryGUIDSet]
		if (loadedRepositoryGUIDs.length) {
			await this.repositoryDao.markAsLoaded(loadedRepositoryGUIDs, context)
		}
	}

	private aggregateHistoryRecords(
		blocks: any[], // IRepositoryBlock[],
		transaction: ITransaction
	): void {
		const transactionHistory = transaction.transactionHistory
		transactionHistory.transactionType = TransactionType.REMOTE_SYNC

		// split blocks by repository and record actor information
		for (const block of blocks) {
			const repositoryTransactionHistory = block.data.history
			repositoryTransactionHistory.transactionHistory = transactionHistory
			this.repositoryTransactionHistoryDuo
				.setModifiedRepository_LocalIdSet(repositoryTransactionHistory)

			transactionHistory.repositoryTransactionHistories.push(repositoryTransactionHistory)

			const columnMapByEntityLocalIdAndColumnIndex:
				Map<DbEntity_LocalId, Map<DbColumn_Index, DbColumn>>
				= new Map()

			repositoryTransactionHistory.repositoryTransactionType = RepositoryTransactionType.REMOTE
			transactionHistory.allOperationHistory = transactionHistory
				.allOperationHistory.concat(repositoryTransactionHistory.operationHistory)
			repositoryTransactionHistory.operationHistory.forEach((
				operationHistory
			) => {
				const entityColumnMapByIndex = this.datastructureUtils.ensureChildJsMap(
					columnMapByEntityLocalIdAndColumnIndex,
					operationHistory.entity._localId
				)
				for (const dbColumn of operationHistory.entity.columns) {
					entityColumnMapByIndex.set(dbColumn.index, dbColumn)
				}

				transactionHistory.allRecordHistory = transactionHistory
					.allRecordHistory.concat(operationHistory.recordHistory)
				operationHistory.recordHistory.forEach((
					recordHistory
				) => {
					if (recordHistory.newValues && recordHistory.newValues.length) {
						transactionHistory.allRecordHistoryNewValues = transactionHistory
							.allRecordHistoryNewValues.concat(recordHistory.newValues)
						for (const newValue of recordHistory.newValues) {
							const dbColumn = entityColumnMapByIndex.get(newValue.columnIndex)
							if (this.dictionary.isRepositoryRelationColumn(dbColumn)) {
								if (newValue.newValue === -1) {
									newValue.newValue = repositoryTransactionHistory.repository._localId
								} else {
									newValue.newValue = block.data
										.referencedRepositories[newValue.newValue]._localId
								}
							}
							this.recordHistoryDuo.ensureModifiedRepositoryLocalIdSet(
								recordHistory, dbColumn, newValue.newValue
							)
						}
					}
					if (recordHistory.oldValues && recordHistory.oldValues.length) {
						transactionHistory.allRecordHistoryOldValues = transactionHistory
							.allRecordHistoryOldValues.concat(recordHistory.oldValues)
						for (const oldValue of recordHistory.oldValues) {
							const dbColumn = entityColumnMapByIndex.get(oldValue.columnIndex)
							if (this.dictionary.isRepositoryRelationColumn(dbColumn)) {
								if (oldValue.oldValue === -1) {
									oldValue.oldValue = repositoryTransactionHistory.repository._localId
								} else {
									oldValue.oldValue = block.data
										.referencedRepositories[oldValue.oldValue]._localId
								}
							}
							this.recordHistoryDuo.ensureModifiedRepositoryLocalIdSet(
								recordHistory, dbColumn, oldValue.oldValue
							)
						}
					}
				})
			})
		}
	}

	private async getDataStructures(
		blocks: any[] // IRepositoryBlock[]
	): Promise<{
		actorMapByLid: Map<Actor_LocalId, IActor>
		repositoryTransactionHistoryMapByRepositoryLid: Map<Repository_LocalId, IRepositoryTransactionHistory[]>
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>
	}> {
		const repositoryTransactionHistoryMapByRepositoryLid: Map<Repository_LocalId, IRepositoryTransactionHistory[]>
			= new Map()
		const applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication> = new Map()
		const actorMapByLid: Map<number, IActor> = new Map()
		for (const block of blocks) {
			const data = block.histories
			const repoTransHistories = this.datastructureUtils.ensureChildArray(
				repositoryTransactionHistoryMapByRepositoryLid,
				data.history.repository._localId
			)
			repoTransHistories.push(data.history)
			for (const actor of data.actors) {
				actorMapByLid.set(actor._localId, actor)
			}
			for (const applicationVersion of data.applicationVersions) {
				applicationsByApplicationVersion_LocalIdMap.set(applicationVersion._localId, applicationVersion.application)
			}
		}

		for (const [_, repoTransHistories] of repositoryTransactionHistoryMapByRepositoryLid) {
			this.repositoryTransactionHistoryDuo
				.sortRepoTransHistories(repoTransHistories, actorMapByLid)
		}

		return {
			actorMapByLid,
			repositoryTransactionHistoryMapByRepositoryLid,
			applicationsByApplicationVersion_LocalIdMap
		}
	}

	private async updateLocalData(
		repositoryTransactionHistoryMapByRepositoryLid: Map<Repository_LocalId, ISyncRepoTransHistory[]>,
		actorMayByLid: Map<Actor_LocalId, IActor>,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>,
		context: IContext
	): Promise<void> {
		const stage1Result
			= await this.stage1SyncedInDataProcessor.performStage1DataProcessing(
				repositoryTransactionHistoryMapByRepositoryLid, applicationsByApplicationVersion_LocalIdMap,
				actorMayByLid, context)

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
			stage1Result, applicationsByApplicationVersion_LocalIdMap, context)


		if (allSyncConflicts.length) {
			await this.synchronizationConflictDao.insert(allSyncConflicts, context)
		}

		if (allSyncConflictValues.length) {
			await this.synchronizationConflictValuesDao.insert(allSyncConflictValues, context)
		}
	}

}
