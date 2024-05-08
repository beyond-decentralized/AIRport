import {
	IAirportDatabase,
	IUtils,
} from '@airport/air-traffic-control'
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	DbColumn_Index,
	QueryBaseOperation,
	Application_Index,
	ApplicationVersion_LocalId,
	DbEntity_TableIndex,
	DbColumn,
	DbEntity,
	Dictionary,
	IDatastructureUtils,
	Repository_LocalId,
	Actor_LocalId,
	ActorRecordId,
	IApplication,
	Repository_GUID
} from '@airport/ground-control'
import {
	IRecordUpdateStageDao,
	RecordUpdateStageValues
} from '@airport/layover'
import {
	RecordUpdate,
	Stage1SyncedInDataProcessingResult
} from './SyncInUtils'
import { IDatabaseFacade } from '@airport/tarmaq-dao'
import { AND, IQEntityInternal, IQOperableFieldInternal, OR } from '@airport/tarmaq-query'

/**
 * Stage 2 data processor is used to optimize the number of required
 * I/O operations to do applyChangesToDb the terminal I/O (Creates, Updates, Deletes)
 */
export interface IStage2SyncedInDataProcessor {

	applyChangesToDb(
		stage1Result: Stage1SyncedInDataProcessingResult,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>,
		context: IContext
	): Promise<void>;

}

interface ColumnValueUpdate {
	childColumnUpdateKeyMap: ColumnUpdateKeyMap;
	recordKeyMap: RecordKeyMap;
	updatedColumns: DbColumn_Index[];
}

interface ColumnUpdateKeyMap
	extends Map<DbColumn_Index, ColumnValueUpdate> {
}

interface RecordKeyMap
	extends Map<Repository_LocalId, Map<Actor_LocalId, Set<ActorRecordId>>> {
}

type ColumnIndexAndValue = [DbColumn_Index, any];

@Injected()
export class Stage2SyncedInDataProcessor
	implements IStage2SyncedInDataProcessor {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	databaseFacade: IDatabaseFacade

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	dictionary: Dictionary

	@Inject()
	recordUpdateStageDao: IRecordUpdateStageDao

	@Inject()
	utils: IUtils

	async applyChangesToDb(
		stage1Result: Stage1SyncedInDataProcessingResult,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>,
		context: IContext
	): Promise<void> {
		await this.performCreates(stage1Result.recordCreations,
			applicationsByApplicationVersion_LocalIdMap, context)
		await this.performUpdates(stage1Result.recordUpdates,
			applicationsByApplicationVersion_LocalIdMap, context)
		await this.performDeletes(stage1Result.recordDeletions,
			applicationsByApplicationVersion_LocalIdMap, context)
	}

	/**
	 * Remote changes come in with ApplicationVersion_LocalIds not Application_Indexes, so it makes
	 * sense to keep this structure.  NOTE: only one version of a given application is
	 * processed at one time:
	 *
	 *  Changes for a application version below the one in this Terminal must first be upgraded.
	 *  Terminal itself must first be upgraded to newer application versions, before changes
	 *  for that application version are processed.
	 *
	 *  To tie in a given ApplicationVersion_LocalId to its Application_Index an additional mapping data
	 *  structure is passed in.
	 */

	private async performCreates(
		recordCreations: Map<ApplicationVersion_LocalId,
			Map<DbEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, Map<DbColumn_Index, any>>>>>>,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>,
		context: IContext
	): Promise<void> {
		for (const [applicationVersionId, creationInApplicationMap] of recordCreations) {
			const applicationIndex = applicationsByApplicationVersion_LocalIdMap
				.get(applicationVersionId).index

			for (const [entityIndex, creationInTableMap] of creationInApplicationMap) {
				const dbEntity = this.airportDatabase.applications[applicationIndex].currentVersion[0]
					.applicationVersion.entities[entityIndex]
				const qEntity = this.airportDatabase.qApplications[applicationIndex][dbEntity.name]
				const columns = [
					qEntity.repository._localId,
					qEntity.actor._localId,
					qEntity._actorRecordId
				]
				const nonIdColumns = this.getNonIdColumnsInIndexOrder(dbEntity)
				let creatingColumns = true
				let numInserts = 0
				const VALUES: any[][] = []

				for (const [repositoryLid, creationForRepositoryMap] of creationInTableMap) {
					for (const [actorLid, creationForActorMap] of creationForRepositoryMap) {
						for (const [_actorRecordId, creationOfRowMap] of creationForActorMap) {
							const rowValues = [
								repositoryLid,
								actorLid,
								_actorRecordId
							]
							const columnIndexedValues: ColumnIndexAndValue[] = []
							for (const [columnIndex, columnValue] of creationOfRowMap) {
								columnIndexedValues.push([columnIndex, columnValue])
							}
							if (columnIndexedValues.length) {
								numInserts++
							}

							columnIndexedValues.sort((
								col1IndexAndValue: ColumnIndexAndValue,
								col2IndexAndValue: ColumnIndexAndValue
							) => {
								return this.utils.compareNumbers(
									col1IndexAndValue[0], col2IndexAndValue[0])
							})
							let currentNonIdColumnArrayIndex = 0
							for (const [columnIndex, columnValue] of columnIndexedValues) {
								let nonIdColumn = nonIdColumns[currentNonIdColumnArrayIndex]
								while (nonIdColumn.index < columnIndex) {
									if (creatingColumns) {
										columns.push(qEntity.__driver__.allColumns[nonIdColumn.index])
									}
									rowValues.push(null)
									currentNonIdColumnArrayIndex++
									nonIdColumn = nonIdColumns[currentNonIdColumnArrayIndex]
								}
								const qColumn: IQOperableFieldInternal<any, QueryBaseOperation, any, any>
									= qEntity.__driver__.allColumns[columnIndex]
								if (creatingColumns) {
									columns.push(qColumn)
								}
								rowValues.push(columnValue)
								currentNonIdColumnArrayIndex++
							}
							if (columnIndexedValues.length) {
								VALUES.push(rowValues)
							}
							creatingColumns = false
						}
					}
				}

				if (numInserts) {
					const previousDbEntity = context.dbEntity
					context.dbEntity = (qEntity as IQEntityInternal)
						.__driver__.dbEntity
					try {
						await this.databaseFacade.insertValues({
							INSERT_INTO: qEntity,
							columns,
							VALUES
						}, context)
					} finally {
						context.dbEntity = previousDbEntity
					}
				}
			}
		}
	}

	private getNonIdColumnsInIndexOrder(
		dbEntity: DbEntity
	): DbColumn[] {
		const nonIdColumns = []
		const airEntityColumns = this.dictionary.AirEntityId.columns
		for (const column of dbEntity.columns) {
			switch (column.name) {
				case airEntityColumns.ACTOR_LID:
				case airEntityColumns.ACTOR_RECORD_ID:
				case airEntityColumns.REPOSITORY_LID:
					continue
			}
			nonIdColumns.push(column)
		}
		nonIdColumns.sort((
			column1: DbColumn,
			column2: DbColumn
		) => {
			return this.utils.compareNumbers(column1.index, column2.index)
		})

		return nonIdColumns
	}

	private async performUpdates(
		recordUpdates: Map<ApplicationVersion_LocalId,
			Map<DbEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, Map<DbColumn_Index, RecordUpdate>>>>>>,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>,
		context: IContext
	): Promise<void> {
		const trackedRepoGUIDSet: Set<Repository_GUID> = new Set()
		const finalUpdateMap: Map<ApplicationVersion_LocalId, Map<DbEntity_TableIndex, ColumnUpdateKeyMap>> = new Map()
		const recordUpdateStage: RecordUpdateStageValues[] = []

		// Build the final update data structure
		for (const [applicationVersionId, applicationUpdateMap] of recordUpdates) {
			const finalApplicationUpdateMap = this.datastructureUtils.ensureChildJsMap(
				finalUpdateMap, applicationVersionId)
			const applicationIndex = applicationsByApplicationVersion_LocalIdMap
				.get(applicationVersionId).index

			for (const [entityIndex, tableUpdateMap] of applicationUpdateMap) {
				const finalTableUpdateMap = this.datastructureUtils.ensureChildJsMap(
					finalApplicationUpdateMap, entityIndex)
				const dbEntity = this.airportDatabase.applications[applicationIndex].currentVersion[0]
					.applicationVersion.entities[entityIndex]

				for (const [repositoryLid, repositoryUpdateMap] of tableUpdateMap) {

					for (const [actorLid, actorUpdates] of repositoryUpdateMap) {
						for (const [_actorRecordId, recordUpdateMap] of actorUpdates) {
							const recordKeyMap = this.getRecordKeyMap(recordUpdateMap, finalTableUpdateMap)

							this.datastructureUtils.ensureChildJsSet(
								this.datastructureUtils.ensureChildJsMap(
									recordKeyMap, repositoryLid),
								actorLid)
								.add(_actorRecordId)
							for (const [columnIndex, columnUpdate] of recordUpdateMap) {
								const dbColumn = dbEntity.columns[columnIndex]

								recordUpdateStage.push([
									applicationVersionId,
									entityIndex,
									repositoryLid,
									actorLid,
									_actorRecordId,
									columnIndex,
									columnUpdate.newValue
								])
							}
						}
					}
				}
			}
		}

		if (!recordUpdateStage.length) {
			return
		}

		await this.recordUpdateStageDao.insertValues(recordUpdateStage, context)

		// Perform the updates
		for (const [applicationVersionId, updateMapForApplication] of finalUpdateMap) {
			const application = applicationsByApplicationVersion_LocalIdMap.get(applicationVersionId)
			for (const [entityIndex, updateMapForTable] of updateMapForApplication) {
				await this.runUpdatesForTable(application.index, applicationVersionId,
					entityIndex, updateMapForTable, context)
			}
		}

		await this.recordUpdateStageDao.delete(context)
	}

	private async performDeletes(
		recordDeletions: Map<ApplicationVersion_LocalId,
			Map<DbEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Set<ActorRecordId>>>>>,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>,
		context: IContext
	): Promise<void> {
		const trackedRepoGUIDSet: Set<Repository_GUID> = new Set()

		for (const [applicationVersionId, deletionInApplicationMap] of recordDeletions) {
			const application = applicationsByApplicationVersion_LocalIdMap.get(applicationVersionId)

			for (const [entityIndex, deletionInTableMap] of deletionInApplicationMap) {
				const dbEntity = this.airportDatabase.applications[application.index].currentVersion[0]
					.applicationVersion.entities[entityIndex]
				const qEntity = this.airportDatabase.qApplications[application.index][dbEntity.name]
				let numClauses = 0
				let repositoryWhereFragments: QueryBaseOperation[] = []

				for (const [repositoryLid, deletionForRepositoryMap] of deletionInTableMap) {
					let actorWhereFragments: QueryBaseOperation[] = []

					for (const [actorLid, actorRecordIdSet] of deletionForRepositoryMap) {
						numClauses++

						actorWhereFragments.push(AND(
							qEntity._actorRecordId.IN(Array.from(actorRecordIdSet)),
							qEntity.actor._localId.equals(actorLid)
						))
					}

					repositoryWhereFragments.push(AND(
						qEntity.repository._localId.equals(repositoryLid),
						OR(...actorWhereFragments)
					))
				}

				if (numClauses) {
					const previousDbEntity = context.dbEntity
					context.dbEntity = (qEntity as IQEntityInternal)
						.__driver__.dbEntity
					try {
						await this.databaseFacade.deleteWhere({
							DELETE_FROM: qEntity,
							WHERE: OR(...repositoryWhereFragments)
						}, context, trackedRepoGUIDSet)
					} finally {
						context.dbEntity = previousDbEntity
					}
				}
			}
		}
	}

	/**
	 * Get the record key map (RecordKeyMap = RepositoryId -> Actor_LocalId
	 * -> ActorRecordId) for the recordUpdateMap (the specified combination
	 * of columns/values being updated)
	 * @param {Map<DbColumn_Index, RecordUpdate>} recordUpdateMap
	 * @param {ColumnUpdateKeyMap} finalTableUpdarecordKeyMapteMap
	 * @returns {RecordKeyMap}
	 */
	private getRecordKeyMap(
		recordUpdateMap: Map<DbColumn_Index, RecordUpdate>, // combination of columns/values
		// being updated
		finalTableUpdateMap: ColumnUpdateKeyMap, // the map of updates for a table
	): RecordKeyMap {
		const updatedColumns: DbColumn_Index[] = []
		for (const columnIndex of recordUpdateMap.keys()) {
			updatedColumns.push(columnIndex)
		}
		// Sort the updated columns by column index, to ensure that all records with the
		// same combination of updated columns are grouped
		updatedColumns.sort(this.utils.compareNumbers)


		// Navigate down the table UpdateKeyMap to find the matching combination of
		// columns being updated
		let columnValueUpdate: ColumnValueUpdate
		let updateKeyMap = finalTableUpdateMap
		for (const columnIndex of updatedColumns) {
			columnValueUpdate = updateKeyMap.get(columnIndex)

			// If no update statements with the specified combination of columns exist yet
			if (!columnValueUpdate) {
				columnValueUpdate = {
					childColumnUpdateKeyMap: new Map(),
					recordKeyMap: new Map(),
					updatedColumns: null,
				}
				updateKeyMap.set(columnIndex, columnValueUpdate)
			}

			// Navigate down
			updateKeyMap = columnValueUpdate.childColumnUpdateKeyMap
		}

		columnValueUpdate.updatedColumns = updatedColumns

		// Return the map of the records for the update statement of the specified combination
		// of columns/values
		return columnValueUpdate.recordKeyMap
	}

	/**
	 * Run all updates for a particular table.  One update per updated column combination
	 * is run.
	 *
	 * @param {Application_Index} applicationIndex
	 * @param {DbEntity_TableIndex} entityIndex
	 * @param {ColumnUpdateKeyMap} updateKeyMap
	 * @returns {Promise<void>}
	 */
	private async runUpdatesForTable(
		applicationIndex: Application_Index,
		applicationVersionId: ApplicationVersion_LocalId,
		entityIndex: DbEntity_TableIndex,
		updateKeyMap: ColumnUpdateKeyMap,
		context: IContext
	) {
		for (const columnValueUpdate of updateKeyMap.values()) {
			const updatedColumns = columnValueUpdate.updatedColumns
			if (updatedColumns) {
				await this.recordUpdateStageDao.updateEntityWhereIds(
					applicationIndex,
					applicationVersionId,
					entityIndex,
					columnValueUpdate.recordKeyMap,
					updatedColumns,
					context
				)
			}
			// Traverse down into nested column update combinations
			await this.runUpdatesForTable(
				applicationIndex, applicationVersionId, entityIndex,
				columnValueUpdate.childColumnUpdateKeyMap,
				context)
		}

	}

}
