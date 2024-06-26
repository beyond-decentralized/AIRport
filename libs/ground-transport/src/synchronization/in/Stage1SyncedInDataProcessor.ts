import {
	IAirportDatabase,
	DbSystemWideOperationIdUtils,
} from '@airport/air-traffic-control'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ChangeType,
	DbColumn_Index,
	DbEntity_LocalId,
	ApplicationVersion_LocalId,
	DbEntity_TableIndex,
	IDatastructureUtils,
	Repository_LocalId,
	Actor_LocalId,
	ActorRecordId,
	RecordHistory_LocalId,
	IActor,
	IRecordHistory,
	IOperationHistory,
	ISynchronizationConflict,
	SynchronizationConflict_Type,
	Dictionary,
	IApplication
} from '@airport/ground-control'
import {
	IChangedRecordIdsForRepository,
	IActorDao,
	IRepositoryTransactionHistoryDao,
	IRepositoryTransactionHistoryDuo,
	RecordHistoryNewValue
} from '@airport/holding-pattern/dist/app/bundle'
import {
	ISyncInUtils,
	ISyncRepoTransHistory,
	RecordUpdate,
	Stage1SyncedInDataProcessingResult
} from './SyncInUtils'

/**
 * Stage 1 data processor is used to
 *
 *  1)  Generate unique create/update/delete statement datastructures
 *  2)  Generate synchronization conflict datastructure
 */
export interface IStage1SyncedInDataProcessor {

	performStage1DataProcessing(
		repositoryTransactionHistoryMapByRepositoryLocalId: Map<Repository_LocalId, ISyncRepoTransHistory[]>,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>,
		actorMayByLid: Map<Actor_LocalId, IActor>,
		context: IContext
	): Promise<Stage1SyncedInDataProcessingResult>;

}

@Injected()
export class Stage1SyncedInDataProcessor
	implements IStage1SyncedInDataProcessor {

	@Inject()
	actorDao: IActorDao

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao

	@Inject()
	repositoryTransactionHistoryDuo: IRepositoryTransactionHistoryDuo

	@Inject()
	syncInUtils: ISyncInUtils

	@Inject()
	systemWideOperationIdUtils: DbSystemWideOperationIdUtils

	/**
	 * In stage one:
	 *
	 *  1)  Unique create/update/delete statement datastructures are generated
	 *  2)  Synchronization conflict datastructure is generated
	 *
	 * @param {Map<repositoryLocalId, ISyncRepoTransHistory[]>} repositoryTransactionHistoryMapByRepositoryLocalId
	 * @param {Map<Actor_LocalId, IActor>} actorMayById
	 * @returns {Promise<void>}
	 */
	async performStage1DataProcessing(
		repositoryTransactionHistoryMapByRepositoryLocalId: Map<Repository_LocalId, ISyncRepoTransHistory[]>,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>,
		actorMayByLid: Map<Actor_LocalId, IActor>,
		context: IContext
	): Promise<Stage1SyncedInDataProcessingResult> {
		await this.populateSystemWideOperationIds(repositoryTransactionHistoryMapByRepositoryLocalId,
			applicationsByApplicationVersion_LocalIdMap)

		const changedRecordIds: Map<Repository_LocalId, IChangedRecordIdsForRepository> = new Map()

		// query for all local operations on records in a repository (since the earliest
		// received change time).  Get the
		// changes by repository _localIds or by the actual tables and records in those tables
		// that will be updated or deleted.

		for (const [repositoryLocalId, repoTransHistoriesForRepo]
			of repositoryTransactionHistoryMapByRepositoryLocalId) {
			const changedRecordsForRepo: IChangedRecordIdsForRepository = {
				actorRecordIdsByLocalIds: new Map(),
				firstChangeTime: new Date().getTime() + 10000000000
			}
			changedRecordIds.set(repositoryLocalId, changedRecordsForRepo)
			for (const repoTransHistory of repoTransHistoriesForRepo) {
				// determine the earliest change time of incoming history records

				const saveMillis = repoTransHistory.saveTimestamp
				if (saveMillis
					< changedRecordsForRepo.firstChangeTime) {
					changedRecordsForRepo.firstChangeTime = repoTransHistory.saveTimestamp
				}
				for (const operationHistory of repoTransHistory.operationHistory) {
					// Collect the Entity related localIds
					const idsForEntity: Map<Actor_LocalId, Set<ActorRecordId>>
						= this.datastructureUtils.ensureChildJsMap(changedRecordsForRepo.actorRecordIdsByLocalIds,
							operationHistory.entity._localId)
					for (const recordHistory of operationHistory.recordHistory) {
						// Collect the Actor related localIds
						this.datastructureUtils.ensureChildJsSet(idsForEntity, recordHistory.actor._localId)
							.add(recordHistory._actorRecordId)
						// add a map of new values
						const newValueMap = new Map()
						recordHistory.newValueMap = newValueMap
						for (const newValue of recordHistory.newValues) {
							newValueMap.set(newValue.columnIndex, newValue)
						}
					}
				}
			}
		}

		const allRepoTransHistoryMapByRepoLid: Map<Repository_LocalId, ISyncRepoTransHistory[]>
			= new Map()

		const allRemoteRecordDeletions = this.getDeletedRecordIdsAndPopulateAllHistoryMap(
			allRepoTransHistoryMapByRepoLid, repositoryTransactionHistoryMapByRepositoryLocalId)

		// find local history for the matching repositories and corresponding time period
		const localRepoTransHistoryMapByrepositoryLocalId
			: Map<Repository_LocalId, ISyncRepoTransHistory[]>
			= await this.repositoryTransactionHistoryDao
				.findAllLocalChangesForRecordIds(changedRecordIds, context)
		const allLocalRecordDeletions = this.getDeletedRecordIdsAndPopulateAllHistoryMap(
			allRepoTransHistoryMapByRepoLid, localRepoTransHistoryMapByrepositoryLocalId,
			true)

		// Find all actors that modified the locally recorded history, which are not already
		// in the actorMapById collect actors not already in cache
		const newlyFoundActorSet: Set<Actor_LocalId> = new Set()
		for (const [_repositoryLocalId, repositoryTransactionHistoriesForRepository]
			of localRepoTransHistoryMapByrepositoryLocalId) {
			for (const repositoryTransactionHistory of repositoryTransactionHistoriesForRepository) {
				for (const operationHistory of repositoryTransactionHistory.operationHistory) {
					const actorLid = operationHistory.actor._localId
					if (actorMayByLid.get(actorLid) === undefined) {
						newlyFoundActorSet.add(actorLid)
					}
				}
			}
		}
		if (newlyFoundActorSet.size) {
			// cache remaining actors
			const newActors = await this.actorDao.findWithDetailsAndGlobalIdsByIds(
				Array.from(newlyFoundActorSet), context)
			for (const newActor of newActors) {
				actorMayByLid.set(newActor._localId, newActor)
				actorMayByLid.set(newActor._localId, newActor)
			}
		}

		// sort all repository histories in processing order
		for (const [_repositoryLocalId, repoTransHistoriesForRepository]
			of allRepoTransHistoryMapByRepoLid) {
			this.repositoryTransactionHistoryDuo
				.sortRepoTransHistories(repoTransHistoriesForRepository, actorMayByLid)
		}

		const recordCreations: Map<ApplicationVersion_LocalId,
			Map<DbEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, Map<DbColumn_Index, any>>>>>> = new Map()
		const recordUpdates: Map<ApplicationVersion_LocalId,
			Map<DbEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, Map<DbColumn_Index, RecordUpdate>>>>>> = new Map()
		const recordDeletions: Map<ApplicationVersion_LocalId,
			Map<DbEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Set<ActorRecordId>>>>> = new Map()

		const syncConflictMapByRepoId: Map<Repository_LocalId, ISynchronizationConflict[]> = new Map()

		// FIXME: add code to ensure that remote records coming in are performed only
		// by the actors that claim the operation AND that the records created are
		// created only by the actors that perform the operation (actorLids match)

		for (const [repositoryLocalId, repoTransHistoriesForRepo] of allRepoTransHistoryMapByRepoLid) {
			for (const repoTransHistory of repoTransHistoriesForRepo) {
				for (const operationHistory of repoTransHistory.operationHistory) {
					switch (operationHistory.changeType) {
						case ChangeType.INSERT_VALUES:
							this.processCreation(repositoryLocalId, operationHistory, repoTransHistory.isLocal,
								recordCreations, recordUpdates, recordDeletions,
								allRemoteRecordDeletions, allLocalRecordDeletions,
								syncConflictMapByRepoId)
							break
						case ChangeType.UPDATE_ROWS:
							this.processUpdate(repositoryLocalId, operationHistory, repoTransHistory.isLocal,
								recordCreations, recordUpdates,
								allRemoteRecordDeletions, allLocalRecordDeletions,
								syncConflictMapByRepoId)
							break
						case ChangeType.DELETE_ROWS:
							this.processDeletion(repositoryLocalId, operationHistory,
								recordCreations, recordUpdates, recordDeletions,
								allLocalRecordDeletions)
							break
					}
				}
			}
		}

		return {
			recordCreations,
			recordDeletions,
			recordUpdates,
			syncConflictMapByRepoId
		}
	}

	private async populateSystemWideOperationIds(
		repositoryTransactionHistoryMapByrepositoryLocalId: Map<Repository_LocalId, ISyncRepoTransHistory[]>,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>,
	): Promise<void> {

		let numSystemWideOperationIds = 0
		for (const [_, repoTransHistoriesForRepo] of repositoryTransactionHistoryMapByrepositoryLocalId) {
			for (const repositoryTransactionHistory of repoTransHistoriesForRepo) {
				numSystemWideOperationIds += repositoryTransactionHistory
					.operationHistory.length
			}
		}
		const systemWideOperationIds = await this.systemWideOperationIdUtils
			.getSysWideOpIds(numSystemWideOperationIds)

		let i = 0
		for (const [_, repoTransHistoriesForRepo] of repositoryTransactionHistoryMapByrepositoryLocalId) {
			for (const repositoryTransactionHistory of repoTransHistoriesForRepo) {
				for (const operationHistory of repositoryTransactionHistory.operationHistory) {
					operationHistory.systemWideOperationId = systemWideOperationIds[i]

					const applicationIndex = applicationsByApplicationVersion_LocalIdMap
						.get(operationHistory.entity.applicationVersion._localId).index
					const dbEntity = this.airportDatabase.applications[applicationIndex].currentVersion[0]
						.applicationVersion.entities[operationHistory.entity.index]
					const sysWideOperationIdDbColumn = dbEntity.columnMap[
						this.dictionary.AirEntityFields.columns.SYSTEM_WIDE_OPERATION_LID]

					for (const recordHistory of operationHistory.recordHistory) {
						if (recordHistory.newValues.length) {
							const systemWideOperationIdNewValue = new RecordHistoryNewValue()
							// systemWideOperationIdNewValue.recordHistory = recordHistory
							systemWideOperationIdNewValue.columnIndex = sysWideOperationIdDbColumn.index
							systemWideOperationIdNewValue.newValue = operationHistory.systemWideOperationId
							recordHistory.newValues.push(systemWideOperationIdNewValue)
						}
					}
					i++
				}
			}
		}
	}

	ensureRecordHistoryLocalId(
		recordHistory: IRecordHistory,
		actorRecordLocalIdSetByActor: Map<Actor_LocalId, Map<ActorRecordId, RecordHistory_LocalId>>,
		_actorRecordId: ActorRecordId = recordHistory._actorRecordId
	): void {
		this.datastructureUtils.ensureChildJsMap(
			actorRecordLocalIdSetByActor, recordHistory.actor._localId)
			.set(_actorRecordId, recordHistory._localId)
	}

	private getDeletedRecordIdsAndPopulateAllHistoryMap(
		allRepoTransHistoryMapByRepoLid: Map<Repository_LocalId, ISyncRepoTransHistory[]>,
		repositoryTransactionHistoryMapByRepoLid: Map<Repository_LocalId, ISyncRepoTransHistory[]>,
		isLocal = false
	): Map<ApplicationVersion_LocalId, Map<DbEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
		Map<ActorRecordId, RecordHistory_LocalId>>>>> {
		const recordDeletions: Map<ApplicationVersion_LocalId, Map<DbEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
			Map<ActorRecordId, RecordHistory_LocalId>>>>> = new Map()
		for (const [repositoryLocalId, repoTransHistories] of repositoryTransactionHistoryMapByRepoLid) {
			this.mergeArraysInMap(allRepoTransHistoryMapByRepoLid, repositoryLocalId, repoTransHistories)
			for (const repoTransHistory of repoTransHistories) {
				repoTransHistory.isLocal = isLocal
				for (const operationHistory of repoTransHistory.operationHistory) {
					switch (operationHistory.changeType) {
						case ChangeType.DELETE_ROWS:
							for (const recordHistory of operationHistory.recordHistory) {
								this.ensureRecordHistoryLocalId(recordHistory, this.syncInUtils
									.ensureRecordMapForRepoInTable(
										repositoryLocalId, operationHistory, recordDeletions))
							}
							break
					}
				}
			}
		}

		return recordDeletions
	}

	private mergeArraysInMap(
		map: Map<any, any[]>,
		key: any,
		array: any[]
	): void {
		let targetArray = map.get(key)
		if (!targetArray) {
			targetArray = array
		} else {
			targetArray = targetArray.concat(array)
		}
		map.set(key, targetArray)
	}

	/*
	NOTE: local creates are not inputted into this processing.
	 */
	private processCreation(
		repositoryLocalId: Repository_LocalId,
		operationHistory: IOperationHistory,
		isLocal: boolean,
		recordCreations: Map<ApplicationVersion_LocalId,
			Map<DbEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, Map<DbColumn_Index, any>>>>>>,
		recordUpdates: Map<ApplicationVersion_LocalId,
			Map<DbEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, Map<DbColumn_Index, RecordUpdate>>>>>>,
		recordDeletions: Map<ApplicationVersion_LocalId,
			Map<DbEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Set<ActorRecordId>>>>>,
		allRemoteRecordDeletions: Map<ApplicationVersion_LocalId,
			Map<DbEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, RecordHistory_LocalId>>>>>,
		allLocalRecordDeletions: Map<ApplicationVersion_LocalId,
			Map<DbEntity_LocalId, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, RecordHistory_LocalId>>>>>,
		syncConflictMapByRepoId: Map<Repository_LocalId, ISynchronizationConflict[]>
	): void {

		const recordUpdatesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, recordUpdates)
		const recordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, recordDeletions)
		const allRemoteRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, allRemoteRecordDeletions)
		const allLocalRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, allLocalRecordDeletions)

		const insertsForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(repositoryLocalId,
			operationHistory, recordCreations)

		for (const recordHistory of operationHistory.recordHistory) {
			if (this.getRecord(recordHistory, insertsForEntityInRepo)) {
				throw new Error(`A record is being created more than once.
					${this.getRecordInfo(repositoryLocalId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`)
			}

			if (isLocal) {
				throw new Error(`Remotely mutated record is being created locally.
					${this.getRecordInfo(repositoryLocalId, operationHistory, recordHistory)}
					This is not possible if changes are never sent to originating TMs.
					`)
			}

			if (this.hasRecordId(recordHistory, recordDeletesForRepoInTable)) {
				throw new Error(`
				Remotely created record is being deleted remotely before it's been created.
					${this.getRecordInfo(repositoryLocalId, operationHistory, recordHistory)}
					This is not possible if all server clocks are synced.
					`)
			}

			if (this.getRecordHistoryLocalId(recordHistory, allLocalRecordDeletesForRepoInTable)) {
				throw new Error(`Remotely created record is being deleted locally.
					${this.getRecordInfo(repositoryLocalId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`)
			}

			const remoteDeleteRecordHistoryLocalId
				= this.getRecordHistoryLocalId(recordHistory, allRemoteRecordDeletesForRepoInTable)
			if (remoteDeleteRecordHistoryLocalId) {
				// remotely created record has been remotely deleted
				this.addSyncConflict(
					SynchronizationConflict_Type.REMOTE_CREATE_REMOTELY_DELETED,
					repositoryLocalId,
					recordHistory,
					{
						_actorRecordId: null,
						_localId: remoteDeleteRecordHistoryLocalId,
						actor: null,
						operationHistory: null
					},
					syncConflictMapByRepoId
				)
				// If the record has been deleted, do not process the create
				continue
			}

			const createdRecord = this.ensureColumnValueMap(recordHistory, insertsForEntityInRepo)

			if (this.getRecord(recordHistory, recordUpdatesForRepoInTable)) {
				throw new Error(`Remotely created record is being updated BEFORE it is created.
					${this.getRecordInfo(repositoryLocalId, operationHistory, recordHistory)}
					This is not possible if all server clocks are synced.
					`)
			}

			// Record the creation of the record
			for (const newValue of recordHistory.newValues) {
				createdRecord.set(newValue.columnIndex, newValue.newValue)
			}
		}
	}

	/*
	NOTE: local updates to records NOT in incoming changes do not get inputted into
	this processing.
	 */
	private processUpdate(
		repositoryLocalId: Repository_LocalId,
		operationHistory: IOperationHistory,
		isLocal: boolean,
		recordCreations: Map<ApplicationVersion_LocalId,
			Map<DbEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, Map<DbColumn_Index, any>>>>>>,
		recordUpdates: Map<ApplicationVersion_LocalId,
			Map<DbEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, Map<DbColumn_Index, RecordUpdate>>>>>>,
		allRemoteRecordDeletions: Map<ApplicationVersion_LocalId,
			Map<DbEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, RecordHistory_LocalId>>>>>,
		allLocalRecordDeletions: Map<ApplicationVersion_LocalId,
			Map<DbEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, RecordHistory_LocalId>>>>>,
		syncConflictMapByRepoId: Map<Repository_LocalId, ISynchronizationConflict[]>
	): void {
		const recordCreationsForRepoInTable
			= this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, recordCreations)
		const allRemoteRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, allRemoteRecordDeletions)
		const allLocalRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, allLocalRecordDeletions)
		const updatesForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(
			repositoryLocalId, operationHistory, recordUpdates)

		for (const recordHistory of operationHistory.recordHistory) {
			const localDeleteRecordHistoryLocalId
				= this.getRecordHistoryLocalId(recordHistory, allLocalRecordDeletesForRepoInTable)
			if (localDeleteRecordHistoryLocalId) {
				if (!isLocal) {
					// A remote update to a record has been locally deleted
					this.addSyncConflict(
						SynchronizationConflict_Type.REMOTE_UPDATE_LOCALLY_DELETED,
						repositoryLocalId,
						recordHistory,
						{
							_actorRecordId: null,
							_localId: localDeleteRecordHistoryLocalId,
							actor: null,
							operationHistory: null
						},
						syncConflictMapByRepoId
					)
				}
				// else {a local update to a record has been locally deleted - nothing to do}

				// If the record has been deleted, do not process the update
				continue
			}
			const remoteDeleteRecordHistoryLocalId
				= this.getRecordHistoryLocalId(recordHistory, allRemoteRecordDeletesForRepoInTable)
			if (remoteDeleteRecordHistoryLocalId) {
				if (isLocal) {
					// A local update for a record that has been deleted remotely
					this.addSyncConflict(
						SynchronizationConflict_Type.LOCAL_UPDATE_REMOTELY_DELETED,
						repositoryLocalId,
						recordHistory,
						{
							_actorRecordId: null,
							_localId: remoteDeleteRecordHistoryLocalId,
							actor: null,
							operationHistory: null
						},
						syncConflictMapByRepoId
					)
				}
				// else {remote deletions do not cause conflicts for remotely updated records}

				// If the record has been deleted, do not process the update
				continue
			}

			// If the record has been created, update the creation record instead
			let createdRecord = this.getRecord(recordHistory, recordCreationsForRepoInTable)
			if (createdRecord) {
				if (isLocal) {
					throw new Error(`Remotely created records are being updated locally.
					${this.getRecordInfo(repositoryLocalId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`)
				} else {
					// remotely created record is being updated remotely - normal flow
					for (const newValue of recordHistory.newValues) {
						createdRecord.set(newValue.columnIndex, newValue.newValue)
					}
				}

				// No need to record updates, already taken into account in the create
				continue
			}

			// record update
			let updatedRecord = this.ensureRecord(recordHistory, updatesForEntityInRepo)
			let synchronizationConflict: ISynchronizationConflict
			for (const newValue of recordHistory.newValues) {
				if (isLocal) {
					const columnIndex = newValue.columnIndex
					const recordUpdate: RecordUpdate = updatedRecord.get(columnIndex)
					if (recordUpdate) {
						// remotely updated record value is being updated locally
						if (!synchronizationConflict) {
							synchronizationConflict = this.addSyncConflict(
								SynchronizationConflict_Type.REMOTE_UPDATE_LOCALLY_UPDATED,
								repositoryLocalId,
								{
									_actorRecordId: null,
									_localId: recordUpdate.recordHistoryLocalId,
									actor: null,
									operationHistory: null
								},
								{
									_actorRecordId: null,
									_localId: remoteDeleteRecordHistoryLocalId,
									actor: null,
									operationHistory: null
								},
								syncConflictMapByRepoId
							)
							synchronizationConflict.values = []
						}
						synchronizationConflict.values.push({
							columnIndex,
							synchronizationConflict
						})

						// no need to update since the value is already there
						// Remove the update
						updatedRecord.delete(newValue.columnIndex)
					}
				} else {
					// remotely updated record value is being updated remotely - normal flow
					// replace the older update with the newer one
					updatedRecord.set(newValue.columnIndex, {
						newValue: newValue.newValue,
						recordHistoryLocalId: recordHistory._localId
					})
				}
			}
		}

	}

	/*
	NOTE: local deletes of records NOT in incoming changes do not get inputted into
	this processing.
	 */
	private processDeletion(
		repositoryLocalId: Repository_LocalId,
		operationHistory: IOperationHistory,
		recordCreations: Map<ApplicationVersion_LocalId,
			Map<DbEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, Map<DbColumn_Index, any>>>>>>,
		recordUpdates: Map<ApplicationVersion_LocalId,
			Map<DbEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, Map<DbColumn_Index, any>>>>>>,
		recordDeletions: Map<ApplicationVersion_LocalId,
			Map<DbEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Set<ActorRecordId>>>>>,
		allLocalRecordDeletions: Map<ApplicationVersion_LocalId,
			Map<DbEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, RecordHistory_LocalId>>>>>,
	): void {
		const recordCreationsForRepoInTable
			= this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, recordCreations)
		const recordUpdatesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, recordUpdates)
		const allLocalRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryLocalId, operationHistory, allLocalRecordDeletions)
		const deletesForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(
			repositoryLocalId, operationHistory, recordDeletions)

		for (const recordHistory of operationHistory.recordHistory) {
			let recordCreationsForActorInRepoInTable = this.getRecordsForActor(
				recordHistory, recordCreationsForRepoInTable)
			// If a remotely deleted record was also created remotely
			if (recordCreationsForActorInRepoInTable
				&& recordCreationsForActorInRepoInTable.get(recordHistory._actorRecordId)) {
				// remote deletions do not cause conflicts for remotely created records

				// Remove the creation of the record
				recordCreationsForActorInRepoInTable.delete(recordHistory._actorRecordId)

				// No need to record a deletion for a record that was also created (remotely)
				continue
			}

			let recordUpdatesForActorInRepoInTable = this.getRecordsForActor(
				recordHistory, recordUpdatesForRepoInTable)
			// If a remotely deleted record has been updated (remotely)
			if (recordUpdatesForActorInRepoInTable
				&& recordUpdatesForActorInRepoInTable.get(recordHistory._actorRecordId)) {
				// remote deletions do not cause conflicts for remotely updated records

				// Remove record updates for deleted records
				recordUpdatesForActorInRepoInTable.delete(recordHistory._actorRecordId)
			}

			if (this.getRecordHistoryLocalId(recordHistory, allLocalRecordDeletesForRepoInTable)) {

				// If the record has been deleted locally, no need to add another delete operation
				continue
			}

			// record deletion
			this.datastructureUtils.ensureChildJsSet(deletesForEntityInRepo, recordHistory.actor._localId)
				.add(recordHistory._actorRecordId)
		}
	}

	private getRecordsForRepoInTable<T>(
		repositoryLocalId: Repository_LocalId,
		operationHistory: IOperationHistory,
		recordMapByApplicationTableAndRepository: Map<ApplicationVersion_LocalId,
			Map<DbEntity_LocalId, Map<Repository_LocalId, T>>>
	): T {
		const recordMapForApplication = recordMapByApplicationTableAndRepository
			.get(operationHistory.entity.applicationVersion._localId)
		let recordMapForTable: Map<Repository_LocalId, T>
		if (recordMapForApplication) {
			recordMapForTable = recordMapForApplication.get(operationHistory.entity._localId)
		}
		let recordMapForRepoInTable: T
		if (recordMapForTable) {
			recordMapForRepoInTable = recordMapForTable.get(repositoryLocalId)
		}

		return recordMapForRepoInTable
	}

	private getRecord(
		recordHistory: IRecordHistory,
		recordMapByActor:
			Map<Actor_LocalId, Map<ActorRecordId, Map<DbColumn_Index, any>>>
	): Map<DbColumn_Index, any> {
		let recordsForActor = this.getRecordsForActor(recordHistory, recordMapByActor)
		if (!recordsForActor) {
			return null
		}
		return recordsForActor.get(recordHistory._actorRecordId)
	}

	private hasRecordId(
		recordHistory: IRecordHistory,
		actorRecordLocalIdSetByActor:
			Map<Actor_LocalId, Set<ActorRecordId>>
	): boolean {
		let actorRecordIdsForActor = this.getRecordsForActor(recordHistory, actorRecordLocalIdSetByActor)
		if (!actorRecordIdsForActor) {
			return false
		}
		return actorRecordIdsForActor.has(recordHistory._actorRecordId)
	}

	private getRecordHistoryLocalId(
		recordHistory: IRecordHistory,
		actorRecordLocalIdSetByActor:
			Map<Actor_LocalId, Map<ActorRecordId, RecordHistory_LocalId>>
	): RecordHistory_LocalId {
		let actorRecordIdsForActor = this.getRecordsForActor(recordHistory, actorRecordLocalIdSetByActor)
		if (!actorRecordIdsForActor) {
			return null
		}
		return actorRecordIdsForActor.get(recordHistory._actorRecordId)
	}

	private getRecordsForActor<T>(
		recordHistory: IRecordHistory,
		recordMapByActor: Map<Actor_LocalId, T>
	): T {
		let recordsForActor: T
		if (recordMapByActor) {
			recordsForActor = recordMapByActor.get(recordHistory.actor._localId)
		}

		return recordsForActor
	}

	private getRecordInfo(
		repositoryLocalId: Repository_LocalId,
		operationHistory: IOperationHistory,
		recordHistory: IRecordHistory
	): string {
		return `
		Application Version ID: ${operationHistory.entity.applicationVersion._localId}
		Entity ID:         ${operationHistory.entity._localId}
		Repository ID:     ${repositoryLocalId}
		Actor ID:          ${recordHistory.actor._localId}
		Actor Record ID:   ${recordHistory._actorRecordId}
		`
	}

	private addSyncConflict(
		synchronizationConflictType: SynchronizationConflict_Type,
		repositoryLocalId: Repository_LocalId,
		overwrittenRecordHistory: IRecordHistory,
		overwritingRecordHistory: IRecordHistory,
		syncConflictMapByRepoId: Map<Repository_LocalId, ISynchronizationConflict[]>
	): ISynchronizationConflict {
		const syncConflict = this.createSynchronizationConflict(
			synchronizationConflictType,
			repositoryLocalId,
			overwrittenRecordHistory,
			overwritingRecordHistory
		)
		this.datastructureUtils.ensureChildArray(
			syncConflictMapByRepoId, repositoryLocalId).push(syncConflict)

		return syncConflict
	}

	private createSynchronizationConflict(
		synchronizationConflictType: SynchronizationConflict_Type,
		repositoryLocalId: Repository_LocalId,
		overwrittenRecordHistory: IRecordHistory,
		overwritingRecordHistory: IRecordHistory
	): ISynchronizationConflict {
		let repository: any = {
			_localId: repositoryLocalId
		}
		return {
			_localId: null,
			acknowledged: false,
			overwrittenRecordHistory,
			overwritingRecordHistory,
			repository,
			type: synchronizationConflictType,
			values: []
		}
	}

	private ensureColumnValueMap(
		recordHistory: IRecordHistory,
		dataMap: Map<Actor_LocalId, Map<ActorRecordId, Map<DbColumn_Index, any>>>
	): Map<DbColumn_Index, any> {
		return <any>this.datastructureUtils.ensureChildJsMap(
			this.datastructureUtils.ensureChildJsMap(
				dataMap,
				recordHistory.actor._localId),
			recordHistory._actorRecordId)
	}

	private ensureRecord(
		recordHistory: IRecordHistory,
		recordMapByActor:
			Map<Actor_LocalId, Map<ActorRecordId, Map<DbColumn_Index, any>>>
	): Map<DbColumn_Index, any> {
		return <any>this.datastructureUtils.ensureChildJsMap(
			this.datastructureUtils.ensureChildJsMap(
				recordMapByActor, recordHistory.actor._localId),
			recordHistory._actorRecordId)
	}

}
