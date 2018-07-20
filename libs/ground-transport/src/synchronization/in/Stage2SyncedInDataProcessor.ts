import {Service} from "typedi";
import {Stage2SyncedInDataProcessorToken} from "../../../../apps/terminal/src/InjectionTokens";
import {
	AirportTerminalToken,
	and,
	ColumnIndex,
	IAirportTerminal,
	IUtils,
	or,
	SchemaIndex,
	TableIndex,
	UtilsToken
} from "@airport/air-control";
import {ActorId, RepositoryEntityActorRecordId, RepositoryId} from "@airport/holding-pattern";
import {Inject} from "typedi/decorators/Inject";
import {
	IRecordUpdateStageDao,
	RecordUpdateStageDaoToken,
	RecordUpdateStageValues
} from "@airport/moving-walkway";
import {JSONBaseOperation} from "@airport/ground-control";
import {RecordUpdate, Stage1SyncedInDataProcessingResult} from "./SyncInUtils";

/**
 * Stage 2 data processor is used to optimize to optimize the number of required
 * I/O operations to do applyChangesToDb the terminal I/O (Creates, Updates, Deletes)
 */
export interface IStage2SyncedInDataProcessor {

	applyChangesToDb(
		stage1Result: Stage1SyncedInDataProcessingResult
	): Promise<void>;

}

interface ColumnValueUpdate {
	childColumnUpdateKeyMap: ColumnUpdateKeyMap;
	recordKeyMap: RecordKeyMap;
	updatedColumns: ColumnIndex[];
}

interface ColumnUpdateKeyMap extends Map<ColumnIndex, ColumnValueUpdate> {
}

interface RecordKeyMap extends Map<RepositoryId, Map<ActorId, Set<RepositoryEntityActorRecordId>>> {
}

type ColumnIndexAndValue = [ColumnIndex, any];

@Service(Stage2SyncedInDataProcessorToken)
export class Stage2SyncedInDataProcessor
	implements IStage2SyncedInDataProcessor {

	constructor(
		@Inject(AirportTerminalToken)
		private airportDb: IAirportTerminal,
		@Inject(RecordUpdateStageDaoToken)
		private recordUpdateStageDao: IRecordUpdateStageDao,
		@Inject(UtilsToken)
		private utils: IUtils
	) {
	}

	async applyChangesToDb(
		stage1Result: Stage1SyncedInDataProcessingResult
	): Promise<void> {

		await this.performCreates(stage1Result.recordCreations);
		await this.performUpdates(stage1Result.recordUpdates);
		await this.performDeletes(stage1Result.recordDeletions);
	}

	async performCreates(
		recordCreations: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, Map<ColumnIndex, any>>>>>>
	): Promise<void> {
		for (const [schemaIndex, creationInSchemaMap] of recordCreations) {
			for (const [tableIndex, creationInTableMap] of creationInSchemaMap) {
				const dbEntity = this.airportDb.schemas[schemaIndex].currentVersion.entities[tableIndex];
				const qEntity = this.airportDb.qSchemas[schemaIndex][dbEntity.name];
				const columns = [
					qEntity.repository.id,
					qEntity.actor.id,
					qEntity.actorRecordId
				];
				let creatingColumns = true;
				let numInserts = 0;
				const values: any[][] = [];
				for (const [repositoryId, creationForRepositoryMap] of creationInTableMap) {
					for (const [actorId, creationForActorMap] of creationForRepositoryMap) {
						for (const [actorRecordId, creationOfRowMap] of creationForActorMap) {
							const rowValues = [
								repositoryId,
								actorId,
								actorRecordId
							];
							const columnIndexedValues: ColumnIndexAndValue[] = [];
							for (const [columnIndex, columnValue] of creationOfRowMap) {
								columnIndexedValues.push([columnIndex, columnValue]);
							}
							if (columnIndexedValues.length) {
								numInserts++;
							}
							columnIndexedValues.sort((
								col1IndexAndValue: ColumnIndexAndValue,
								col2IndexAndValue: ColumnIndexAndValue
							) => {
								return this.utils.compareNumbers(col1IndexAndValue[0], col2IndexAndValue[0])
							});
							for (const [columnIndex, columnValue] of columnIndexedValues) {
								if (creatingColumns) {
									columns.push(qEntity.__driver__.allColumns[columnIndex]);
								}
								rowValues.push(columnValue);
							}
							if (columnIndexedValues.length) {
								values.push(rowValues);
							}
							creatingColumns = false;
						}
					}
				}

				if (numInserts) {
					await this.airportDb.db.insertValues(dbEntity, {
						insertInto: qEntity,
						columns,
						values
					});
				}
			}
		}
	}


	async performUpdates(
		recordUpdates: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Map<RepositoryEntityActorRecordId, Map<ColumnIndex, RecordUpdate>>>>>>
	): Promise<void> {
		const finalUpdateMap: Map<SchemaIndex, Map<TableIndex, ColumnUpdateKeyMap>> = new Map();

		const recordUpdateStage: RecordUpdateStageValues[] = [];

		// Build the final update data structure
		for (const [schemaIndex, schemaUpdateMap] of recordUpdates) {
			const finalSchemaUpdateMap
				= this.utils.ensureChildJsMap(finalUpdateMap, schemaIndex);
			for (const [tableIndex, tableUpdateMap] of schemaUpdateMap) {
				const finalTableUpdateMap = this.utils.ensureChildJsMap(finalSchemaUpdateMap, tableIndex);
				for (const [repositoryId, repositoryUpdateMap] of tableUpdateMap) {
					for (const [actorId, actorUpdates] of repositoryUpdateMap) {
						for (const [actorRecordId, recordUpdateMap] of actorUpdates) {
							const recordKeyMap = this.getRecordKeyMap(recordUpdateMap, finalTableUpdateMap);
							this.utils.ensureChildJsSet(
								this.utils.ensureChildJsMap(recordKeyMap, repositoryId),
								actorId)
								.add(actorRecordId);
							for (const [columnIndex, columnUpdate] of recordUpdateMap) {
								recordUpdateStage.push([
									schemaIndex,
									tableIndex,
									repositoryId,
									actorId,
									actorRecordId,
									columnIndex,
									columnUpdate.newValue
								]);
							}
						}
					}
				}
			}
		}

		await this.recordUpdateStageDao.insertValues(recordUpdateStage);

		// Perform the updates
		for (const [schemaIndex, updateMapForSchema] of finalUpdateMap) {
			for (const [tableIndex, updateMapForTable] of updateMapForSchema) {
				await this.runUpdatesForTable(schemaIndex, tableIndex, updateMapForTable);
			}
		}

		await this.recordUpdateStageDao.delete();
	}

	/**
	 * Get the record key map (RecordKeyMap = RepositoryId -> ActorId
	 * -> RepositoryEntityActorRecordId) for the recordUpdateMap (the specified combination of
	 * columns/values being updated)
	 * @param {Map<ColumnIndex, RecordUpdate>} recordUpdateMap
	 * @param {ColumnUpdateKeyMap} finalTableUpdarecordKeyMapteMap
	 * @returns {RecordKeyMap}
	 */
	private getRecordKeyMap(
		recordUpdateMap: Map<ColumnIndex, RecordUpdate>, // combination of columns/values being updated
		finalTableUpdateMap: ColumnUpdateKeyMap, // the map of updates for a table
	): RecordKeyMap {
		const updatedColumns: ColumnIndex[] = [];
		for (const columnIndex of recordUpdateMap.keys()) {
			updatedColumns.push(columnIndex);
		}
		// Sort the updated columns by column index, to ensure that all records with the
		// same combination of updated columns are grouped
		updatedColumns.sort(this.utils.compareNumbers);


		// Navigate down the table UpdateKeyMap to find the matching combination of
		// columns being updated
		let columnValueUpdate: ColumnValueUpdate;
		let updateKeyMap = finalTableUpdateMap;
		for (const columnIndex of updatedColumns) {
			columnValueUpdate = updateKeyMap.get(columnIndex);

			// If no update statements with the specified combination of columns exist yet
			if (!columnValueUpdate) {
				columnValueUpdate = {
					childColumnUpdateKeyMap: new Map(),
					recordKeyMap: new Map(),
					updatedColumns: null,
				};
				updateKeyMap.set(columnIndex, columnValueUpdate);
			}

			// Navigate down
			updateKeyMap = columnValueUpdate.childColumnUpdateKeyMap;
		}

		columnValueUpdate.updatedColumns = updatedColumns;

		// Return the map of the records for the update statement of the specified combination
		// of columns/values
		return columnValueUpdate.recordKeyMap;
	}

	/**
	 * Run all updates for a particular table.  One update per updated column combination is run.
	 *
	 * @param {SchemaIndex} schemaIndex
	 * @param {TableIndex} tableIndex
	 * @param {ColumnUpdateKeyMap} updateKeyMap
	 * @returns {Promise<void>}
	 */
	private async runUpdatesForTable(
		schemaIndex: SchemaIndex,
		tableIndex: TableIndex,
		updateKeyMap: ColumnUpdateKeyMap
	) {
		for (const columnValueUpdate of updateKeyMap.values()) {
			const updatedColumns = columnValueUpdate.updatedColumns;
			if (updatedColumns) {
				await this.recordUpdateStageDao.updateEntityWhereIds(
					schemaIndex,
					tableIndex,
					columnValueUpdate.recordKeyMap,
					updatedColumns
				);
			}
			// Traverse down into nested column update combinations
			await this.runUpdatesForTable(
				schemaIndex, tableIndex, columnValueUpdate.childColumnUpdateKeyMap);
		}

	}

	async performDeletes(
		recordDeletions: Map<SchemaIndex,
			Map<TableIndex, Map<RepositoryId, Map<ActorId,
				Set<RepositoryEntityActorRecordId>>>>>
	): Promise<void> {
		for (const [schemaIndex, deletionInSchemaMap] of recordDeletions) {
			for (const [tableIndex, deletionInTableMap] of deletionInSchemaMap) {
				const dbEntity = this.airportDb.schemas[schemaIndex].currentVersion.entities[tableIndex];
				const qEntity = this.airportDb.qSchemas[schemaIndex][dbEntity.name];

				let numClauses = 0;
				let repositoryWhereFragments: JSONBaseOperation[] = [];
				for (const [repositoryId, deletionForRepositoryMap] of deletionInTableMap) {
					let actorWhereFragments: JSONBaseOperation[] = [];
					for (const [actorId, actorRecordIdSet] of deletionForRepositoryMap) {
						numClauses++;
						actorWhereFragments.push(and(
							qEntity.actorRecordId.in(Array.from(actorRecordIdSet)),
							qEntity.actor.id.equals(actorId)
						));
					}
					repositoryWhereFragments.push(and(
						qEntity.repository.id.equals(repositoryId),
						or(...actorWhereFragments)
					));
				}

				if (numClauses) {
					await this.airportDb.db.deleteWhere(dbEntity, {
						deleteFrom: qEntity,
						where: or(...repositoryWhereFragments)
					});
				}
			}
		}
	}

}