import {
	IAirportDatabase,
	IUtils,
} from '@airport/air-traffic-control'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	ApplicationColumn_Index,
	ensureChildJsMap,
	ensureChildJsSet,
	JSONBaseOperation,
	Application_Index,
	ApplicationVersion_LocalId,
	ApplicationEntity_TableIndex,
	airEntity,
	DbColumn,
	DbEntity
} from '@airport/ground-control'
import {
	Actor_LocalId,
	ActorRecordId,
	Repository_LocalId
} from '@airport/holding-pattern/dist/app/bundle'
import {
	IRecordUpdateStageDao,
	RecordUpdateStageValues
} from '@airport/layover'
import { IApplication } from '@airport/airspace/dist/app/bundle'
import {
	RecordUpdate,
	Stage1SyncedInDataProcessingResult
} from './SyncInUtils'
import { IOperationContext } from '@airport/terminal-map'
import { IDatabaseFacade } from '@airport/tarmaq-dao'
import { AND, IQEntityInternal, OR } from '@airport/tarmaq-query'

/**
 * Stage 2 data processor is used to optimize the number of required
 * I/O operations to do applyChangesToDb the terminal I/O (Creates, Updates, Deletes)
 */
export interface IStage2SyncedInDataProcessor {

	applyChangesToDb(
		stage1Result: Stage1SyncedInDataProcessingResult,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>
	): Promise<void>;

}

interface ColumnValueUpdate {
	childColumnUpdateKeyMap: ColumnUpdateKeyMap;
	recordKeyMap: RecordKeyMap;
	updatedColumns: ApplicationColumn_Index[];
}

interface ColumnUpdateKeyMap
	extends Map<ApplicationColumn_Index, ColumnValueUpdate> {
}

interface RecordKeyMap
	extends Map<Repository_LocalId, Map<Actor_LocalId, Set<ActorRecordId>>> {
}

type ColumnIndexAndValue = [ApplicationColumn_Index, any];

@Injected()
export class Stage2SyncedInDataProcessor
	implements IStage2SyncedInDataProcessor {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	databaseFacade: IDatabaseFacade

	@Inject()
	recordUpdateStageDao: IRecordUpdateStageDao

	@Inject()
	utils: IUtils

	async applyChangesToDb(
		stage1Result: Stage1SyncedInDataProcessingResult,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>
	): Promise<void> {
		const context: IOperationContext = {} as any

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

	async performCreates(
		recordCreations: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, Map<ApplicationColumn_Index, any>>>>>>,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>,
		context: IOperationContext
	): Promise<void> {
		for (const [applicationVersionId, creationInApplicationMap] of recordCreations) {
			for (const [tableIndex, creationInTableMap] of creationInApplicationMap) {
				const applicationIndex = applicationsByApplicationVersion_LocalIdMap
					.get(applicationVersionId).index
				const dbEntity = this.airportDatabase.applications[applicationIndex].currentVersion[0]
					.applicationVersion.entities[tableIndex]
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
				for (const [repositoryId, creationForRepositoryMap] of creationInTableMap) {
					for (const [actorId, creationForActorMap] of creationForRepositoryMap) {
						for (const [_actorRecordId, creationOfRowMap] of creationForActorMap) {
							const rowValues = [
								repositoryId,
								actorId,
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
								if (creatingColumns) {
									columns.push(qEntity.__driver__.allColumns[columnIndex])
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

	getNonIdColumnsInIndexOrder(
		dbEntity: DbEntity
	): DbColumn[] {
		const nonIdColumns = []
		for (const column of dbEntity.columns) {
			switch (column.name) {
				case airEntity.ACTOR_LID:
				case airEntity.ACTOR_RECORD_ID:
				case airEntity.REPOSITORY_LID:
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

	async performUpdates(
		recordUpdates: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Map<ActorRecordId, Map<ApplicationColumn_Index, RecordUpdate>>>>>>,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>,
		context: IOperationContext
	): Promise<void> {
		const finalUpdateMap: Map<ApplicationVersion_LocalId, Map<ApplicationEntity_TableIndex, ColumnUpdateKeyMap>> = new Map()

		const recordUpdateStage: RecordUpdateStageValues[] = []

		// Build the final update data structure
		for (const [applicationVersionId, applicationUpdateMap] of recordUpdates) {
			const finalApplicationUpdateMap
				= ensureChildJsMap(finalUpdateMap, applicationVersionId)
			for (const [tableIndex, tableUpdateMap] of applicationUpdateMap) {
				const finalTableUpdateMap = ensureChildJsMap(finalApplicationUpdateMap, tableIndex)
				for (const [repositoryId, repositoryUpdateMap] of tableUpdateMap) {
					for (const [actorId, actorUpdates] of repositoryUpdateMap) {
						for (const [_actorRecordId, recordUpdateMap] of actorUpdates) {
							const recordKeyMap = this.getRecordKeyMap(recordUpdateMap, finalTableUpdateMap)
							ensureChildJsSet(
								ensureChildJsMap(recordKeyMap, repositoryId),
								actorId)
								.add(_actorRecordId)
							for (const [columnIndex, columnUpdate] of recordUpdateMap) {
								recordUpdateStage.push([
									applicationVersionId,
									tableIndex,
									repositoryId,
									actorId,
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

		await this.recordUpdateStageDao.insertValues(recordUpdateStage)

		// Perform the updates
		for (const [applicationVersionId, updateMapForApplication] of finalUpdateMap) {
			const application = applicationsByApplicationVersion_LocalIdMap.get(applicationVersionId)
			for (const [tableIndex, updateMapForTable] of updateMapForApplication) {
				await this.runUpdatesForTable(application.index, applicationVersionId,
					tableIndex, updateMapForTable)
			}
		}

		await this.recordUpdateStageDao.delete()
	}

	async performDeletes(
		recordDeletions: Map<ApplicationVersion_LocalId,
			Map<ApplicationEntity_TableIndex, Map<Repository_LocalId, Map<Actor_LocalId,
				Set<ActorRecordId>>>>>,
		applicationsByApplicationVersion_LocalIdMap: Map<ApplicationVersion_LocalId, IApplication>,
		context: IOperationContext
	): Promise<void> {
		for (const [applicationVersionId, deletionInApplicationMap] of recordDeletions) {
			const application = applicationsByApplicationVersion_LocalIdMap.get(applicationVersionId)
			for (const [tableIndex, deletionInTableMap] of deletionInApplicationMap) {
				const dbEntity = this.airportDatabase.applications[application.index].currentVersion[0]
					.applicationVersion.entities[tableIndex]
				const qEntity = this.airportDatabase.qApplications[application.index][dbEntity.name]

				let numClauses = 0
				let repositoryWhereFragments: JSONBaseOperation[] = []
				for (const [repositoryId, deletionForRepositoryMap] of deletionInTableMap) {
					let actorWhereFragments: JSONBaseOperation[] = []
					for (const [actorId, actorRecordIdSet] of deletionForRepositoryMap) {
						numClauses++
						actorWhereFragments.push(AND(
							qEntity._actorRecordId.IN(Array.from(actorRecordIdSet)),
							qEntity.actor._localId.equals(actorId)
						))
					}
					repositoryWhereFragments.push(AND(
						qEntity.repository._localId.equals(repositoryId),
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
						}, context)
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
	 * @param {Map<ApplicationColumn_Index, RecordUpdate>} recordUpdateMap
	 * @param {ColumnUpdateKeyMap} finalTableUpdarecordKeyMapteMap
	 * @returns {RecordKeyMap}
	 */
	private getRecordKeyMap(
		recordUpdateMap: Map<ApplicationColumn_Index, RecordUpdate>, // combination of columns/values
		// being updated
		finalTableUpdateMap: ColumnUpdateKeyMap, // the map of updates for a table
	): RecordKeyMap {
		const updatedColumns: ApplicationColumn_Index[] = []
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
	 * @param {ApplicationEntity_TableIndex} tableIndex
	 * @param {ColumnUpdateKeyMap} updateKeyMap
	 * @returns {Promise<void>}
	 */
	private async runUpdatesForTable(
		applicationIndex: Application_Index,
		applicationVersionId: ApplicationVersion_LocalId,
		tableIndex: ApplicationEntity_TableIndex,
		updateKeyMap: ColumnUpdateKeyMap
	) {
		for (const columnValueUpdate of updateKeyMap.values()) {
			const updatedColumns = columnValueUpdate.updatedColumns
			if (updatedColumns) {
				await this.recordUpdateStageDao.updateEntityWhereIds(
					applicationIndex,
					applicationVersionId,
					tableIndex,
					columnValueUpdate.recordKeyMap,
					updatedColumns
				)
			}
			// Traverse down into nested column update combinations
			await this.runUpdatesForTable(
				applicationIndex, applicationVersionId, tableIndex,
				columnValueUpdate.childColumnUpdateKeyMap)
		}

	}

}
