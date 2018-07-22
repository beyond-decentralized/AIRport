import {
	IUtils,
	UtilsToken
}                                      from "@airport/air-control";
import {
	ChangeType,
	ColumnIndex,
	SchemaIndex,
	SchemaVersionId,
	TableIndex
} from "@airport/ground-control";
import {
	ActorId,
	IActor,
	IActorDao,
	IChangedRecordIdsForRepository,
	IOperationHistory,
	IRecordHistory,
	IRepositoryTransactionHistoryDao,
	IRepositoryTransactionHistoryDmo,
	RecordHistoryActorRecordId,
	RecordHistoryId,
	RepositoryEntityActorRecordId,
	RepositoryId,
	RepositoryTransactionHistoryDaoToken,
	RepositoryTransactionHistoryDmoToken
}                                      from "@airport/holding-pattern";
import {IRepositoryTransactionHistory} from "@airport/holding-pattern/lib/generated/generated";
import {
	ISynchronizationConflict,
	SynchronizationConflictType
}                                      from "@airport/moving-walkway";
import {ISchema}                       from "@airport/traffic-pattern";
import {
	Inject,
	Service
}                                      from "typedi";
import {
	Stage1SyncedInDataProcessorToken,
	SyncInUtilsToken
}                                      from "../../InjectionTokens";
import {
	ISyncInUtils,
	ISyncRepoTransHistory,
	RecordUpdate,
	Stage1SyncedInDataProcessingResult
}                                      from "./SyncInUtils";

/**
 * Stage 1 data processor is used to
 *
 *  1)  Generate unique create/update/delete statement datastructures
 *  2)  Generate synchronization conflict datastructure
 */
export interface IStage1SyncedInDataProcessor {

	performStage1DataProcessing(
		repoTransHistoryMapByRepositoryId: Map<RepositoryId, ISyncRepoTransHistory[]>,
		actorMayById: Map<ActorId, IActor>
	): Promise<Stage1SyncedInDataProcessingResult>;

}

@Service(Stage1SyncedInDataProcessorToken)
export class Stage1SyncedInDataProcessor
	implements IStage1SyncedInDataProcessor {

	constructor(
		private actorDao: IActorDao,
		@Inject(RepositoryTransactionHistoryDaoToken)
		private repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao,
		@Inject(RepositoryTransactionHistoryDmoToken)
		private repositoryTransactionHistoryDmo: IRepositoryTransactionHistoryDmo,
		@Inject(SyncInUtilsToken)
		private syncInUtils: ISyncInUtils,
		@Inject(UtilsToken)
		private utils: IUtils,
	) {
	}

	/**
	 * In stage one:
	 *
	 *  1)  Unique create/update/delete statement datastructures are generated
	 *  2)  Synchronization conflict datastructure is generated
	 *
	 * @param {Map<RepositoryId, ISyncRepoTransHistory[]>} repoTransHistoryMapByRepositoryId
	 * @param {Map<ActorId, IActor>} actorMayById
	 * @returns {Promise<void>}
	 */
	async performStage1DataProcessing(
		repoTransHistoryMapByRepositoryId: Map<RepositoryId, ISyncRepoTransHistory[]>,
		actorMayById: Map<ActorId, IActor>
	): Promise<Stage1SyncedInDataProcessingResult> {
		// query for all local operations on records in a repository (since the earliest
		// received change time).  Get the
		// changes by repository ids or by the actual tables and records in those tables
		// that will be updated or deleted.

		const changedRecordIds: Map<RepositoryId, IChangedRecordIdsForRepository> = new Map();

		for (const [repositoryId, repoTransHistoriesForRepo]
			of repoTransHistoryMapByRepositoryId) {
			const changedRecordsForRepo: IChangedRecordIdsForRepository = {
				ids: new Map(),
				firstChangeTime: new Date(new Date().getTime() + 10000000000),
			};
			changedRecordIds.set(repositoryId, changedRecordsForRepo);
			for (const repoTransHistory of repoTransHistoriesForRepo) {
				// determine the earliest change time of incoming history records

				const saveMillis = repoTransHistory.saveTimestamp.getTime();
				if (saveMillis
					< changedRecordsForRepo.firstChangeTime.getTime()) {
					changedRecordsForRepo.firstChangeTime = repoTransHistory.saveTimestamp;
				}
				for (const operationHistory of repoTransHistory.operationHistory) {
					// Collect the Actor related ids
					const idsForEntity: Map<ActorId, Set<RecordHistoryActorRecordId>>
						= this.utils.ensureChildJsMap(
						this.utils.ensureChildJsMap(changedRecordsForRepo.ids,
							operationHistory.schemaVersion.id),
						operationHistory.entity.index);
					for (const recordHistory of operationHistory.recordHistory) {
						// Collect the Actor related ids
						this.utils.ensureChildJsSet(idsForEntity, recordHistory.actor.id)
							.add(recordHistory.actorRecordId);
						// add a map of new values
						const newValueMap = new Map();
						recordHistory.newValueMap = newValueMap;
						for (const newValue of recordHistory.newValues) {
							newValueMap.set(newValue.columnIndex, newValue);
						}
					}
				}
			}
		}

		const allRepoTransHistoryMapByRepoId: Map<RepositoryId, ISyncRepoTransHistory[]>
			= new Map();

		const allRemoteRecordDeletions = this.getDeletedRecordIds(
			allRepoTransHistoryMapByRepoId, repoTransHistoryMapByRepositoryId);

		// find local history for the matching repositories and corresponding time period
		const localRepoTransHistoryMapByRepositoryId
			: Map<RepositoryId, IRepositoryTransactionHistory[]>
			= await this.repositoryTransactionHistoryDao
			.findAllLocalChangesForRecordIds(changedRecordIds);
		const allLocalRecordDeletions = this.getDeletedRecordIds(
			allRepoTransHistoryMapByRepoId, localRepoTransHistoryMapByRepositoryId, true);

		// Find all actors that modified the locally recorded history, which are not already in the
		// actorMapById
		// collect actors not already in cache
		const newlyFoundActorSet: Set<ActorId> = new Set();
		for (const [repositoryId, repoTransHistoriesForRepository]
			of localRepoTransHistoryMapByRepositoryId) {
			for (const repoTransHistory of repoTransHistoriesForRepository) {
				const actorId = repoTransHistory.actor.id;
				if (actorMayById.get(actorId) === undefined) {
					newlyFoundActorSet.add(actorId);
				}
			}
		}
		if (newlyFoundActorSet.size) {
			// cache remaining actors
			const newActors = await this.actorDao.findWithDetailsAndGlobalIdsByIds(Array.from(newlyFoundActorSet));
			for (const newActor of newActors) {
				actorMayById.set(newActor.id, newActor);
			}
		}

		// sort all repository histories in processing order
		for (const [repositoryId, repoTransHistoriesForRepository]
			of allRepoTransHistoryMapByRepoId) {
			this.repositoryTransactionHistoryDmo
				.sortRepoTransHistories(repoTransHistoriesForRepository, actorMayById);
		}

		const recordCreations: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>>>> = new Map();
		const recordUpdates: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>> = new Map();
		const recordDeletions: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Set<RepositoryEntityActorRecordId>>>>> = new Map();

		const syncConflictMapByRepoId: Map<RepositoryId, ISynchronizationConflict[]> = new Map();

		// FIXME: add code to ensure that remote records coming in are performed only
		// by the actors that claim the operation AND that the records created are
		// created only by the actors that perform the operation (actorIds match)

		for (const [repositoryId, repoTransHistoriesForRepo] of allRepoTransHistoryMapByRepoId) {
			for (const repoTransHistory of repoTransHistoriesForRepo) {
				for (const operationHistory of repoTransHistory.operationHistory) {
					switch (operationHistory.changeType) {
						case ChangeType.INSERT_VALUES:
							this.processCreation(repositoryId, operationHistory, repoTransHistory.isLocal,
								recordCreations, recordUpdates, recordDeletions,
								allRemoteRecordDeletions, allLocalRecordDeletions,
								syncConflictMapByRepoId);
							break;
						case ChangeType.UPDATE_ROWS:
							this.processUpdate(repositoryId, operationHistory, repoTransHistory.isLocal,
								recordCreations, recordUpdates,
								allRemoteRecordDeletions, allLocalRecordDeletions,
								syncConflictMapByRepoId);
							break;
						case ChangeType.DELETE_ROWS:
							this.processDeletion(repositoryId, operationHistory,
								recordCreations, recordUpdates, recordDeletions,
								allLocalRecordDeletions);
							break;
					}
				}
			}
		}

		return {
			recordCreations,
			recordDeletions,
			recordUpdates,
			syncConflictMapByRepoId
		};
	}

	private getDeletedRecordIds(
		allRepoTransHistoryMapByRepoId: Map<RepositoryId, ISyncRepoTransHistory[]>,
		repoTransHistoryMapByRepoId: Map<RepositoryId, ISyncRepoTransHistory[]>,
		schemaMapBySchemaVersionId: Map<SchemaVersionId, ISchema>,
		isLocal = false
	): Map<SchemaIndex, Map<TableIndex, Map<RepositoryId, Map<ActorId,
		Map<RepositoryEntityActorRecordId, RecordHistoryId>>>>> {
		const recordDeletions: Map<SchemaIndex, Map<TableIndex, Map<RepositoryId, Map<ActorId,
			Map<RepositoryEntityActorRecordId, RecordHistoryId>>>>> = new Map();
		for (const [repositoryId, repoTransHistories] of repoTransHistoryMapByRepoId) {
			this.mergeArraysInMap(allRepoTransHistoryMapByRepoId, repositoryId, repoTransHistories);
			for (const repoTransHistory of repoTransHistories) {
				repoTransHistory.isLocal = isLocal;
				for (const operationHistory of repoTransHistory.operationHistory) {
					switch (operationHistory.changeType) {
						case ChangeType.DELETE_ROWS:
							for (const recordHistory of operationHistory.recordHistory) {
								this.ensureRecordHistoryId(recordHistory, this.syncInUtils
									.ensureRecordMapForRepoInTable(
										repositoryId, operationHistory, recordDeletions));
							}
							break;
					}
				}
			}
		}

		return recordDeletions;
	}

	private mergeArraysInMap(
		map: Map<any, any[]>,
		key: any,
		array: any[]
	): void {
		let targetArray = map[key];
		if (!targetArray) {
			targetArray = array;
		} else {
			targetArray = targetArray.concat(array);
		}
	}


	/*
	NOTE: local creates are not inputted into this processing.
	 */
	private processCreation(
		repositoryId: RepositoryId,
		operationHistory: IOperationHistory,
		isLocal: boolean,
		recordCreations: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>>>>,
		recordUpdates: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>,
		recordDeletions: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Set<RepositoryEntityActorRecordId>>>>>,
		allRemoteRecordDeletions: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, RecordHistoryId>>>>>,
		allLocalRecordDeletions: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, RecordHistoryId>>>>>,
		syncConflictMapByRepoId: Map<RepositoryId, ISynchronizationConflict[]>
	): void {

		const recordUpdatesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, recordUpdates);
		const recordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, recordDeletions);
		const allRemoteRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, allRemoteRecordDeletions);
		const allLocalRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, allLocalRecordDeletions);

		const insertsForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(repositoryId,
			operationHistory, recordCreations);

		for (const recordHistory of operationHistory.recordHistory) {
			if (this.getRecord(recordHistory, insertsForEntityInRepo)) {
				throw new Error(`A record is being created more than once.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`);
			}

			if (isLocal) {
				throw new Error(`Remotely mutated record is being created locally.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if changes are never sent to originating TMs.
					`);
			}

			if (this.hasRecordId(recordHistory, recordDeletesForRepoInTable)) {
				throw new Error(`
				Remotely created record is being deleted remotely before it's been created.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if all server clocks are synced.
					`);
			}

			if (this.getRecordHistoryId(recordHistory, allLocalRecordDeletesForRepoInTable)) {
				throw new Error(`Remotely created record is being deleted locally.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`);
			}

			const remoteDeleteRecordHistoryId
				= this.getRecordHistoryId(recordHistory, allRemoteRecordDeletesForRepoInTable)
			if (remoteDeleteRecordHistoryId) {
				// remotely created record has been remotely deleted
				this.addSyncConflict(
					SynchronizationConflictType.REMOTE_CREATE_REMOTELY_DELETED,
					repositoryId,
					recordHistory,
					{
						id: remoteDeleteRecordHistoryId
					},
					syncConflictMapByRepoId
				);
				// If the record has been deleted, do not process the create
				continue;
			}

			const createdRecord = this.ensureColumnValueMap(recordHistory, insertsForEntityInRepo);

			if (this.getRecord(recordHistory, recordUpdatesForRepoInTable)) {
				throw new Error(`Remotely created record is being updated BEFORE it is created.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if all server clocks are synced.
					`);
			}

			// Record the creation of the record
			for (const newValue of recordHistory.newValues) {
				createdRecord.set(newValue.columnIndex, newValue.newValue);
			}
		}
	}

	/*
	NOTE: local updates to records NOT in incoming changes do not get inputted into
	this processing.
	 */
	private processUpdate(
		repositoryId: RepositoryId,
		operationHistory: IOperationHistory,
		isLocal: boolean,
		recordCreations: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>>>>,
		recordUpdates: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>,
		allRemoteRecordDeletions: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, RecordHistoryId>>>>>,
		allLocalRecordDeletions: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, RecordHistoryId>>>>>,
		syncConflictMapByRepoId: Map<RepositoryId, ISynchronizationConflict[]>
	): void {
		const recordCreationsForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, recordCreations);
		const allRemoteRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, allRemoteRecordDeletions);
		const allLocalRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, allLocalRecordDeletions);
		const updatesForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(
			repositoryId, operationHistory, recordUpdates);

		for (const recordHistory of operationHistory.recordHistory) {
			const localDeleteRecordHistoryId
				= this.getRecordHistoryId(recordHistory, allLocalRecordDeletesForRepoInTable);
			if (localDeleteRecordHistoryId) {
				if (!isLocal) {
					// A remote update to a record has been locally deleted
					this.addSyncConflict(
						SynchronizationConflictType.REMOTE_UPDATE_LOCALLY_DELETED,
						repositoryId,
						recordHistory,
						{
							id: localDeleteRecordHistoryId
						},
						syncConflictMapByRepoId
					);
				}
				// else {a local update to a record has been locally deleted - nothing to do}

				// If the record has been deleted, do not process the update
				continue;
			}
			const remoteDeleteRecordHistoryId
				= this.getRecordHistoryId(recordHistory, allRemoteRecordDeletesForRepoInTable)
			if (remoteDeleteRecordHistoryId) {
				if (isLocal) {
					// A local update for a record that has been deleted remotely
					this.addSyncConflict(
						SynchronizationConflictType.LOCAL_UPDATE_REMOTELY_DELETED,
						repositoryId,
						recordHistory,
						{
							id: remoteDeleteRecordHistoryId
						},
						syncConflictMapByRepoId
					);
				}
				// else {remote deletions do not cause conflicts for remotely updated records}

				// If the record has been deleted, do not process the update
				continue;
			}

			// If the record has been created, update the creation record instead
			let createdRecord = this.getRecord(recordHistory, recordCreationsForRepoInTable);
			if (createdRecord) {
				if (isLocal) {
					throw new Error(`Remotely created records are being updated locally.
					${this.getRecordInfo(repositoryId, operationHistory, recordHistory)}
					This is not possible if every remote change is only processed once.
					`);
				} else {
					// remotely created record is being updated remotely - normal flow
					for (const newValue of recordHistory.newValues) {
						createdRecord.set(newValue.columnIndex, newValue.newValue);
					}
				}

				// No need to record updates, already taken into account in the create
				continue;
			}

			// record update
			let updatedRecord = this.ensureRecord(recordHistory, updatesForEntityInRepo);
			let synchronizationConflict: ISynchronizationConflict;
			for (const newValue of recordHistory.newValues) {
				if (isLocal) {
					const columnIndex = newValue.columnIndex;
					const recordUpdate: RecordUpdate = updatedRecord.get(columnIndex);
					if (recordUpdate) {
						// remotely updated record value is being updated locally
						if (!synchronizationConflict) {
							synchronizationConflict = this.addSyncConflict(
								SynchronizationConflictType.REMOTE_UPDATE_LOCALLY_UPDATED,
								repositoryId,
								{
									id: recordUpdate.recordHistoryId,
								},
								{
									id: remoteDeleteRecordHistoryId
								},
								syncConflictMapByRepoId
							);
							synchronizationConflict.values = [];
						}
						synchronizationConflict.values.push({
							columnIndex,
							synchronizationConflict
						});

						// no need to update since the value is already there
						// Remove the update
						updatedRecord.delete(newValue.columnIndex);
					}
				} else {
					// remotely updated record value is being updated remotely - normal flow
					// replace the older update with the newer one
					updatedRecord.set(newValue.columnIndex, {
						newValue: newValue.newValue,
						recordHistoryId: recordHistory.id
					});
				}
			}
		}

	}

	/*
	NOTE: local deletes of records NOT in incoming changes do not get inputted into
	this processing.
	 */
	private processDeletion(
		repositoryId: RepositoryId,
		operationHistory: IOperationHistory,
		recordCreations: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>>>>,
		recordUpdates: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>>>>,
		recordDeletions: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Set<RepositoryEntityActorRecordId>>>>>,
		allLocalRecordDeletions: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, RecordHistoryId>>>>>
	): void {
		const recordCreationsForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, recordCreations);
		const recordUpdatesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, recordUpdates);
		const allLocalRecordDeletesForRepoInTable
			= this.getRecordsForRepoInTable(repositoryId, operationHistory, allLocalRecordDeletions);
		const deletesForEntityInRepo = this.syncInUtils.ensureRecordMapForRepoInTable(
			repositoryId, operationHistory, recordDeletions);

		for (const recordHistory of operationHistory.recordHistory) {
			let recordCreationsForActorInRepoInTable = this.getRecordsForActor(
				recordHistory, recordCreationsForRepoInTable);
			// If a remotely deleted record was also created remotely
			if (recordCreationsForActorInRepoInTable
				&& recordCreationsForActorInRepoInTable.get(recordHistory.actorRecordId)) {
				// remote deletions do not cause conflicts for remotely created records

				// Remove the creation of the record
				recordCreationsForActorInRepoInTable.delete(recordHistory.actorRecordId);

				// No need to record a deletion for a record that was also created (remotely)
				continue;
			}

			let recordUpdatesForActorInRepoInTable = this.getRecordsForActor(
				recordHistory, recordUpdatesForRepoInTable);
			// If a remotely deleted record has been updated (remotely)
			if (recordUpdatesForActorInRepoInTable
				&& recordUpdatesForActorInRepoInTable.get(recordHistory.actorRecordId)) {
				// remote deletions do not cause conflicts for remotely updated records

				// Remove record updates for deleted records
				recordUpdatesForActorInRepoInTable.delete(recordHistory.actorRecordId);
			}

			if (this.getRecordHistoryId(recordHistory, allLocalRecordDeletesForRepoInTable)) {

				// If the record has been deleted locally, no need to add another delete operation
				continue;
			}

			// record deletion
			this.utils.ensureChildJsSet(deletesForEntityInRepo, recordHistory.actor.id)
				.add(recordHistory.actorRecordId);
		}
	}

	private getRecordsForRepoInTable<T>(
		repositoryId: RepositoryId,
		operationHistory: IOperationHistory,
		recordMapBySchemaTableAndRepository: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, T>>>
	): T {
		const recordMapForSchema = recordMapBySchemaTableAndRepository
			.get(operationHistory.schema.index);
		let recordMapForTable: Map<RepositoryId, T>;
		if (recordMapForSchema) {
			recordMapForTable = recordMapForSchema.get(operationHistory.entity.index);
		}
		let recordMapForRepoInTable: T;
		if (recordMapForTable) {
			recordMapForRepoInTable = recordMapForTable.get(repositoryId);
		}

		return recordMapForRepoInTable;
	}

	private getRecord(
		recordHistory: IRecordHistory,
		recordMapByActor:
			Map<ActorId, Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>
	): Map<ColumnIndex, any> {
		let recordsForActor = this.getRecordsForActor(recordHistory, recordMapByActor);
		if (!recordsForActor) {
			return null;
		}
		return recordsForActor.get(recordHistory.actorRecordId);
	}

	private hasRecordId(
		recordHistory: IRecordHistory,
		actorRecordIdSetByActor:
			Map<ActorId, Set<RepositoryEntityActorRecordId>>
	): boolean {
		let actorRecordIdsForActor = this.getRecordsForActor(recordHistory, actorRecordIdSetByActor);
		if (!actorRecordIdsForActor) {
			return false;
		}
		return actorRecordIdsForActor.has(recordHistory.actorRecordId);
	}

	private getRecordHistoryId(
		recordHistory: IRecordHistory,
		actorRecordIdSetByActor:
			Map<ActorId, Map<RepositoryEntityActorRecordId, RecordHistoryId>>
	): RecordHistoryId {
		let actorRecordIdsForActor = this.getRecordsForActor(recordHistory, actorRecordIdSetByActor);
		if (!actorRecordIdsForActor) {
			return null;
		}
		return actorRecordIdsForActor.get(recordHistory.actorRecordId);
	}

	private getRecordsForActor<T>(
		recordHistory: IRecordHistory,
		recordMapByActor: Map<ActorId, T>
	): T {
		let recordsForActor: T;
		if (recordMapByActor) {
			recordsForActor = recordMapByActor.get(recordHistory.actor.id);
		}

		return recordsForActor;
	}

	ensureRecordHistoryId(
		recordHistory: IRecordHistory,
		actorRecordIdSetByActor: Map<ActorId, Map<RepositoryEntityActorRecordId, RecordHistoryId>>,
		actorRecordId: RepositoryEntityActorRecordId = recordHistory.actorRecordId
	): void {
		this.utils.ensureChildJsMap(
			actorRecordIdSetByActor, recordHistory.actor.id)
			.set(actorRecordId, recordHistory.id);
	}

	private getRecordInfo(
		repositoryId: RepositoryId,
		operationHistory: IOperationHistory,
		recordHistory: IRecordHistory
	): string {
		return `
		Schema Index:     ${operationHistory.schema.index}
		Table Index:      ${operationHistory.entity.index}
		Repository ID:    ${repositoryId}
		Actor ID:         ${recordHistory.actor.id}
		Actor Record ID:  ${recordHistory.actorRecordId}
		`;
	}

	private addSyncConflict(
		synchronizationConflictType: SynchronizationConflictType,
		repositoryId: RepositoryId,
		overwrittenRecordHistory: IRecordHistory,
		overwritingRecordHistory: IRecordHistory,
		syncConflictMapByRepoId: Map<RepositoryId, ISynchronizationConflict[]>
	): ISynchronizationConflict {
		const syncConflict = this.createSynchronizationConflict(
			synchronizationConflictType,
			repositoryId,
			overwrittenRecordHistory,
			overwritingRecordHistory
		);
		this.utils.ensureChildArray(syncConflictMapByRepoId, repositoryId).push(syncConflict);

		return syncConflict;
	}

	private createSynchronizationConflict(
		synchronizationConflictType: SynchronizationConflictType,
		repositoryId: RepositoryId,
		overwrittenRecordHistory: IRecordHistory,
		overwritingRecordHistory: IRecordHistory
	): ISynchronizationConflict {
		return {
			overwrittenRecordHistory,
			overwritingRecordHistory,
			repository: {
				id: repositoryId
			},
			type: synchronizationConflictType
		};
	}

	private ensureColumnValueMap(
		recordHistory: IRecordHistory,
		dataMap: Map<ActorId, Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>
	): Map<ColumnIndex, any> {
		return <any>this.utils.ensureChildJsMap(
			this.utils.ensureChildJsMap(
				dataMap,
				recordHistory.actor.id),
			recordHistory.actorRecordId);
	}

	private ensureRecord(
		recordHistory: IRecordHistory,
		recordMapByActor:
			Map<ActorId, Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>
	): Map<ColumnIndex, any> {
		return <any>this.utils.ensureChildJsMap(
			this.utils.ensureChildJsMap(
				recordMapByActor, recordHistory.actor.id),
			recordHistory.actorRecordId);
	}

}