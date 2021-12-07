import {
	AIRPORT_DATABASE,
	and,
	compareNumbers,
	DATABASE_FACADE,
	IAirportDatabase,
	IDatabaseFacade,
	IQEntityInternal,
	or
} from '@airport/air-control'
import { container, DI } from '@airport/di'
import {
	ColumnIndex,
	ensureChildJsMap,
	ensureChildJsSet,
	JSONBaseOperation,
	ApplicationIndex,
	ApplicationVersionId,
	TableIndex
} from '@airport/ground-control'
import {
	Actor_Id,
	RepositoryEntity_ActorRecordId,
	Repository_Id
} from '@airport/holding-pattern'
import {
	IRecordUpdateStageDao,
	RECORD_UPDATE_STAGE_DAO,
	RecordUpdateStageValues
} from '@airport/moving-walkway'
import { IApplication } from '@airport/airspace'
import { STAGE2_SYNCED_IN_DATA_PROCESSOR } from '../../tokens'
import {
	RecordUpdate,
	Stage1SyncedInDataProcessingResult
} from './SyncInUtils'
import { IOperationContext } from '@airport/terminal-map'

/**
 * Stage 2 data processor is used to optimize the number of required
 * I/O operations to do applyChangesToDb the terminal I/O (Creates, Updates, Deletes)
 */
export interface IStage2SyncedInDataProcessor {

	applyChangesToDb(
		stage1Result: Stage1SyncedInDataProcessingResult,
		applicationsByApplicationVersionIdMap: Map<ApplicationVersionId, IApplication>
	): Promise<void>;

}

interface ColumnValueUpdate {
	childColumnUpdateKeyMap: ColumnUpdateKeyMap;
	recordKeyMap: RecordKeyMap;
	updatedColumns: ColumnIndex[];
}

interface ColumnUpdateKeyMap
	extends Map<ColumnIndex, ColumnValueUpdate> {
}

interface RecordKeyMap
	extends Map<Repository_Id, Map<Actor_Id, Set<RepositoryEntity_ActorRecordId>>> {
}

type ColumnIndexAndValue = [ColumnIndex, any];

export class Stage2SyncedInDataProcessor
	implements IStage2SyncedInDataProcessor {

	async applyChangesToDb(
		stage1Result: Stage1SyncedInDataProcessingResult,
		applicationsByApplicationVersionIdMap: Map<ApplicationVersionId, IApplication>
	): Promise<void> {
		const [airDb, dbFacade, recordUpdateStageDao] = await container(this).get(
			AIRPORT_DATABASE, DATABASE_FACADE, RECORD_UPDATE_STAGE_DAO)
		const context: IOperationContext = {} as any

		await this.performCreates(stage1Result.recordCreations,
			applicationsByApplicationVersionIdMap, airDb, dbFacade, context)
		await this.performUpdates(stage1Result.recordUpdates,
			applicationsByApplicationVersionIdMap, recordUpdateStageDao, context)
		await this.performDeletes(stage1Result.recordDeletions,
			applicationsByApplicationVersionIdMap, airDb, dbFacade, context)
	}

	/**
	 * Remote changes come in with ApplicationVersionIds not ApplicationIndexes, so it makes
	 * sense to keep this structure.  NOTE: only one version of a given application is
	 * processed at one time:
	 *
	 *  Changes for a application version below the one in this Terminal must first be upgraded.
	 *  Terminal itself must first be upgraded to newer application versions, before changes
	 *  for that application version are processed.
	 *
	 *  To tie in a given ApplicationVersionId to its ApplicationIndex an additional mapping data
	 *  structure is passed in.
	 */

	async performCreates(
		recordCreations: Map<ApplicationVersionId,
			Map<TableIndex, Map<Repository_Id, Map<Actor_Id,
				Map<RepositoryEntity_ActorRecordId, Map<ColumnIndex, any>>>>>>,
		applicationsByApplicationVersionIdMap: Map<ApplicationVersionId, IApplication>,
		airDb: IAirportDatabase,
		dbFacade: IDatabaseFacade,
		context: IOperationContext
	): Promise<void> {
		for (const [applicationVersionId, creationInApplicationMap] of recordCreations) {
			for (const [tableIndex, creationInTableMap] of creationInApplicationMap) {
				const applicationIndex = applicationsByApplicationVersionIdMap
					.get(applicationVersionId).index
				const dbEntity = airDb.applications[applicationIndex].currentVersion[0]
					.applicationVersion.entities[tableIndex]
				const qEntity = airDb.qApplications[applicationIndex][dbEntity.name]
				const columns = [
					qEntity.repository.id,
					qEntity.actor.id,
					qEntity.actorRecordId
				]
				let creatingColumns = true
				let numInserts = 0
				const values: any[][] = []
				for (const [repositoryId, creationForRepositoryMap] of creationInTableMap) {
					for (const [actorId, creationForActorMap] of creationForRepositoryMap) {
						for (const [actorRecordId, creationOfRowMap] of creationForActorMap) {
							const rowValues = [
								repositoryId,
								actorId,
								actorRecordId
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
								return compareNumbers(col1IndexAndValue[0], col2IndexAndValue[0])
							})
							for (const [columnIndex, columnValue] of columnIndexedValues) {
								if (creatingColumns) {
									columns.push(qEntity.__driver__.allColumns[columnIndex])
								}
								rowValues.push(columnValue)
							}
							if (columnIndexedValues.length) {
								values.push(rowValues)
							}
							creatingColumns = false
						}
					}
				}

				if (numInserts) {
					const previousDbEntity = context.dbEntity
					context.dbEntity = (qEntity as IQEntityInternal<any>)
						.__driver__.dbEntity
					try {
						await dbFacade.insertValues({
							insertInto: qEntity,
							columns,
							values
						}, context)
					} finally {
						context.dbEntity = previousDbEntity
					}
				}
			}
		}
	}

	async performUpdates(
		recordUpdates: Map<ApplicationVersionId,
			Map<TableIndex, Map<Repository_Id, Map<Actor_Id,
				Map<RepositoryEntity_ActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>,
		applicationsByApplicationVersionIdMap: Map<ApplicationVersionId, IApplication>,
		recordUpdateStageDao: IRecordUpdateStageDao,
		context: IOperationContext
	): Promise<void> {
		const finalUpdateMap: Map<ApplicationVersionId, Map<TableIndex, ColumnUpdateKeyMap>> = new Map()

		const recordUpdateStage: RecordUpdateStageValues[] = []

		// Build the final update data structure
		for (const [applicationVersionId, applicationUpdateMap] of recordUpdates) {
			const finalApplicationUpdateMap
				= ensureChildJsMap(finalUpdateMap, applicationVersionId)
			for (const [tableIndex, tableUpdateMap] of applicationUpdateMap) {
				const finalTableUpdateMap = ensureChildJsMap(finalApplicationUpdateMap, tableIndex)
				for (const [repositoryId, repositoryUpdateMap] of tableUpdateMap) {
					for (const [actorId, actorUpdates] of repositoryUpdateMap) {
						for (const [actorRecordId, recordUpdateMap] of actorUpdates) {
							const recordKeyMap = this.getRecordKeyMap(recordUpdateMap, finalTableUpdateMap)
							ensureChildJsSet(
								ensureChildJsMap(recordKeyMap, repositoryId),
								actorId)
								.add(actorRecordId)
							for (const [columnIndex, columnUpdate] of recordUpdateMap) {
								recordUpdateStage.push([
									applicationVersionId,
									tableIndex,
									repositoryId,
									actorId,
									actorRecordId,
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

		await recordUpdateStageDao.insertValues(recordUpdateStage)

		// Perform the updates
		for (const [applicationVersionId, updateMapForApplication] of finalUpdateMap) {
			const application = applicationsByApplicationVersionIdMap.get(applicationVersionId)
			for (const [tableIndex, updateMapForTable] of updateMapForApplication) {
				await this.runUpdatesForTable(application.index, applicationVersionId,
					tableIndex, updateMapForTable, recordUpdateStageDao)
			}
		}

		await recordUpdateStageDao.delete()
	}

	async performDeletes(
		recordDeletions: Map<ApplicationVersionId,
			Map<TableIndex, Map<Repository_Id, Map<Actor_Id,
				Set<RepositoryEntity_ActorRecordId>>>>>,
		applicationsByApplicationVersionIdMap: Map<ApplicationVersionId, IApplication>,
		airDb: IAirportDatabase,
		dbFacade: IDatabaseFacade,
		context: IOperationContext
	): Promise<void> {
		for (const [applicationVersionId, deletionInApplicationMap] of recordDeletions) {
			const application = applicationsByApplicationVersionIdMap.get(applicationVersionId)
			for (const [tableIndex, deletionInTableMap] of deletionInApplicationMap) {
				const dbEntity = airDb.applications[application.index].currentVersion[0]
					.applicationVersion.entities[tableIndex]
				const qEntity = airDb.qApplications[application.index][dbEntity.name]

				let numClauses = 0
				let repositoryWhereFragments: JSONBaseOperation[] = []
				for (const [repositoryId, deletionForRepositoryMap] of deletionInTableMap) {
					let actorWhereFragments: JSONBaseOperation[] = []
					for (const [actorId, actorRecordIdSet] of deletionForRepositoryMap) {
						numClauses++
						actorWhereFragments.push(and(
							qEntity.actorRecordId.in(Array.from(actorRecordIdSet)),
							qEntity.actor.id.equals(actorId)
						))
					}
					repositoryWhereFragments.push(and(
						qEntity.repository.id.equals(repositoryId),
						or(...actorWhereFragments)
					))
				}

				if (numClauses) {

					const previousDbEntity = context.dbEntity
					context.dbEntity = (qEntity as IQEntityInternal<any>)
						.__driver__.dbEntity
					try {
						await dbFacade.deleteWhere({
							deleteFrom: qEntity,
							where: or(...repositoryWhereFragments)
						}, context)
					} finally {
						context.dbEntity = previousDbEntity
					}
				}
			}
		}
	}

	/**
	 * Get the record key map (RecordKeyMap = RepositoryId -> Actor_Id
	 * -> RepositoryEntity_ActorRecordId) for the recordUpdateMap (the specified combination
	 * of columns/values being updated)
	 * @param {Map<ColumnIndex, RecordUpdate>} recordUpdateMap
	 * @param {ColumnUpdateKeyMap} finalTableUpdarecordKeyMapteMap
	 * @returns {RecordKeyMap}
	 */
	private getRecordKeyMap(
		recordUpdateMap: Map<ColumnIndex, RecordUpdate>, // combination of columns/values
		// being updated
		finalTableUpdateMap: ColumnUpdateKeyMap, // the map of updates for a table
	): RecordKeyMap {
		const updatedColumns: ColumnIndex[] = []
		for (const columnIndex of recordUpdateMap.keys()) {
			updatedColumns.push(columnIndex)
		}
		// Sort the updated columns by column index, to ensure that all records with the
		// same combination of updated columns are grouped
		updatedColumns.sort(compareNumbers)


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
	 * @param {ApplicationIndex} applicationIndex
	 * @param {TableIndex} tableIndex
	 * @param {ColumnUpdateKeyMap} updateKeyMap
	 * @returns {Promise<void>}
	 */
	private async runUpdatesForTable(
		applicationIndex: ApplicationIndex,
		applicationVersionId: ApplicationVersionId,
		tableIndex: TableIndex,
		updateKeyMap: ColumnUpdateKeyMap,
		recordUpdateStageDao: IRecordUpdateStageDao
	) {
		for (const columnValueUpdate of updateKeyMap.values()) {
			const updatedColumns = columnValueUpdate.updatedColumns
			if (updatedColumns) {
				await recordUpdateStageDao.updateEntityWhereIds(
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
				columnValueUpdate.childColumnUpdateKeyMap, recordUpdateStageDao)
		}

	}

}

DI.set(STAGE2_SYNCED_IN_DATA_PROCESSOR, Stage2SyncedInDataProcessor)
