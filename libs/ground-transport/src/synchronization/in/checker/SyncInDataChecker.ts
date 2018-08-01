import {
	IUtils,
	UtilsToken
}                                                 from "@airport/air-control";
import {
	ChangeType,
	SchemaVersionId,
	TableIndex
}                                                 from "@airport/ground-control";
import {
	ActorId,
	IRecordHistory,
	IRepositoryTransactionHistoryDao,
	RecordHistoryActorRecordId,
	RepositoryEntityActorRecordId,
	RepositoryId,
	RepositoryTransactionHistoryDaoToken
}                                                 from "@airport/holding-pattern";
import {
	IMissingRecord,
	IMissingRecordDao,
	IMissingRecordRepoTransBlockDao,
	IRepositoryTransactionBlock,
	IRepositoryTransactionBlockDao,
	ISharingMessage,
	ISharingMessageDao,
	MissingRecordDaoToken,
	MissingRecordId,
	MissingRecordRepoTransBlockDaoToken,
	MissingRecordStatus,
	RepositoryTransactionBlockDaoToken,
	SharingMessageDaoToken
}                                                 from "@airport/moving-walkway";
import {
	Inject,
	Service
}                                                 from "typedi";
import {
	SyncInDataCheckerToken,
	SyncInRepositoryTransactionBlockCreatorToken,
	SyncInUtilsToken
}                                                 from "../../../InjectionTokens";
import {ISyncInRepositoryTransactionBlockCreator} from "../creator/SyncInRepositoryTransactionBlockCreator";
import {
	IDataToTM,
	ISyncInUtils
}                                                 from "../SyncInUtils";

export interface DataCheckResults {
	dataMessagesWithCompatibleSchemasAndData: IDataToTM[];
	dataMessagesWithIncompatibleData: IDataToTM[];
	existingRepoTransBlocksWithCompatibleSchemasAndData: IRepositoryTransactionBlock[];
	missingRecordDataToTMs: IMissingRecordDataToTM[];
}

export interface IMissingRecordDataToTM {
	missingRecord: IMissingRecord,
	dataMessage: IDataToTM
}

export interface MissingRecordResults {
	compatibleDataMessageFlags: boolean[];
	missingRecordDataToTMs: IMissingRecordDataToTM[];
}

export interface DataStructuresForChanges {
	messageIndexMapByRecordToUpdateIds: Map<RepositoryId, Map<SchemaVersionId,
		Map<TableIndex, Map<ActorId, Map<RepositoryEntityActorRecordId, Set<number>>>>>>;
	recordToInsertMap: Map<RepositoryId, Map<SchemaVersionId,
		Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>;
	recordToUpdateMap: Map<RepositoryId, Map<SchemaVersionId,
		Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>;
}

export interface ISyncInDataChecker {

	checkData(
		dataMessagesWithCompatibleSchemas: IDataToTM[],
		// actorMapById: Map<ActorId, IActor>
	): Promise<DataCheckResults>

}

@Service(SyncInDataCheckerToken)
export class SyncInDataChecker
	implements ISyncInDataChecker {

	constructor(
		@Inject(MissingRecordDaoToken)
		private missingRecordDao: IMissingRecordDao,
		@Inject(MissingRecordRepoTransBlockDaoToken)
		private missingRecordRepoTransBlockDao: IMissingRecordRepoTransBlockDao,
		@Inject(RepositoryTransactionBlockDaoToken)
		private repositoryTransactionBlockDao: IRepositoryTransactionBlockDao,
		@Inject(RepositoryTransactionHistoryDaoToken)
		private repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao,
		@Inject(SharingMessageDaoToken)
		private sharingMessageDao: ISharingMessageDao,
		@Inject(SyncInRepositoryTransactionBlockCreatorToken)
		private syncInRepositoryTransactionBlockCreator: ISyncInRepositoryTransactionBlockCreator,
		@Inject(SyncInUtilsToken)
		private syncInUtils: ISyncInUtils,
		@Inject(UtilsToken)
		private utils: IUtils,
	) {

	}

	/**
	 * Every dataMessage.data.repoTransHistories array must be sorted before entering
	 * this method.
	 *
	 * @param {IDataToTM[]} dataMessagesWithCompatibleSchemas
	 * @returns {DataCheckResults}
	 */
	async checkData(
		dataMessagesWithCompatibleSchemas: IDataToTM[],
		// actorMapById: Map<ActorId, IActor>
	): Promise<DataCheckResults> {
		const {
			messageIndexMapByRecordToUpdateIds,
			recordToInsertMap,
			recordToUpdateMap
		} = this.getDataStructuresForChanges(dataMessagesWithCompatibleSchemas);

		const existingRecordIdMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			= await this.repositoryTransactionHistoryDao.findExistingRecordIdMap(recordToUpdateMap);

		const dataMessagesWithIncompatibleData: IDataToTM[] = [];
		const {
			compatibleDataMessageFlags,
			missingRecordDataToTMs,
		} = await this.determineMissingRecords(dataMessagesWithCompatibleSchemas,
			dataMessagesWithIncompatibleData, recordToUpdateMap,
			existingRecordIdMap, messageIndexMapByRecordToUpdateIds);

		const dataMessagesWithCompatibleSchemasAndData: IDataToTM[] = [];

		// filter out data messages with records that do not exist
		for (let i = 0; i < compatibleDataMessageFlags.length; i++) {
			const dataMessage = dataMessagesWithCompatibleSchemas[i];
			if (compatibleDataMessageFlags[i]) {
				dataMessagesWithCompatibleSchemasAndData.push(dataMessage);
			}
		}

		const toBeInsertedRecordMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			= this.getRecordsToInsertMap(dataMessagesWithCompatibleSchemasAndData);

		const foundMissingRecordIds =
			await this.missingRecordDao.setStatusWhereIdsInAndReturnIds(
				toBeInsertedRecordMap, MissingRecordStatus.MISSING);

		// Find repository transaction blocks that now can be processed
		const existingRepoTransBlocksWithCompatibleSchemasAndData
			= await this.getExistingRepoTransBlocksWithCompatibleSchemasAndData(foundMissingRecordIds);

		return {
			dataMessagesWithCompatibleSchemasAndData,
			dataMessagesWithIncompatibleData,
			existingRepoTransBlocksWithCompatibleSchemasAndData,
			missingRecordDataToTMs
		};
	}

	private getDataStructuresForChanges(
		dataMessagesWithCompatibleSchemas: IDataToTM[]
	): DataStructuresForChanges {
		const recordsToInsert: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			= this.getRecordsToInsertMap(dataMessagesWithCompatibleSchemas);

		const recordToUpdateMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			= new Map();
		const messageIndexMapByRecordToUpdateIds: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Map<RepositoryEntityActorRecordId, Set<number>>>>>>
			= new Map();


		for (let i = 0; i < dataMessagesWithCompatibleSchemas.length; i++) {
			const dataMessages = dataMessagesWithCompatibleSchemas[i];
			for (const repoTransHistory of dataMessages.data.repoTransHistories) {
				const repositoryId = repoTransHistory.repository.id;
				const recordToInsertMapForRepo = recordsToInsert.get(repositoryId);
				for (const operationHistory of repoTransHistory.operationHistory) {
					let recordToInsertMapForEntityInRepo;
					if (recordToInsertMapForRepo) {
						const recordToInsertMapForSchemaInRepo
							= recordToInsertMapForRepo.get(operationHistory.schemaVersion.id);
						if (recordToInsertMapForSchemaInRepo) {
							recordToInsertMapForEntityInRepo
								= recordToInsertMapForSchemaInRepo.get(operationHistory.entity.index);
						}
					}

					switch (operationHistory.changeType) {
						case ChangeType.DELETE_ROWS:
						case ChangeType.UPDATE_ROWS:
							for (const recordHistory of operationHistory.recordHistory) {
								let recordToInsertSetForActor;
								if (recordToInsertMapForEntityInRepo) {
									recordToInsertSetForActor
										= recordToInsertMapForEntityInRepo.get(recordHistory.actor.id);
								}
								if (!recordToInsertSetForActor
									|| !recordToInsertSetForActor.has(recordHistory.actorRecordId)) {
									const recordToUpdateMapForRepoInTable = this.syncInUtils
										.ensureRecordMapForRepoInTable(
											repositoryId, operationHistory, recordToUpdateMap);
									this.ensureRecordId(recordHistory, recordToUpdateMapForRepoInTable,
										recordHistory.actorRecordId);
									this.utils.ensureChildJsSet(
										this.utils.ensureChildJsMap(
											this.utils.ensureChildJsMap(
												this.utils.ensureChildJsMap(
													this.utils.ensureChildJsMap(
														messageIndexMapByRecordToUpdateIds, repositoryId),
													operationHistory.schemaVersion.id),
												operationHistory.entity.index),
											recordHistory.actor.id),
										recordHistory.actorRecordId)
										.add(i);
								}
							}
							break;
					}
				}
			}
		}

		return {
			messageIndexMapByRecordToUpdateIds,
			recordToInsertMap: recordsToInsert,
			recordToUpdateMap
		}
	}

	private async determineMissingRecords(
		dataMessagesWithCompatibleSchemas: IDataToTM[],
		dataMessagesWithIncompatibleData: IDataToTM[],
		recordToUpdateMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>,
		existingRecordIdMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>,
		messageIndexMapByRecordToUpdateIds: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Map<RepositoryEntityActorRecordId, Set<number>>>>>>
	): Promise<MissingRecordResults> {
		const compatibleDataMessageFlags: boolean[]
			= dataMessagesWithCompatibleSchemas.map(
			_ => true);
		const missingRecords: IMissingRecord[] = [];
		const missingRecordDataToTMs: IMissingRecordDataToTM[] = [];
		const sparseDataMessagesWithIncompatibleData: IDataToTM[] = [];

		for (const [repositoryId, updatedRecordMapForRepository] of recordToUpdateMap) {
			const existingRecordMapForRepository: Map<SchemaVersionId, Map<TableIndex,
				Map<ActorId, Set<RepositoryEntityActorRecordId>>>>
				= existingRecordIdMap.get(repositoryId);
			const messageIndexMapForRepository: Map<SchemaVersionId, Map<TableIndex,
				Map<ActorId, Map<RepositoryEntityActorRecordId, Set<number>>>>>
				= messageIndexMapByRecordToUpdateIds.get(repositoryId);

			for (const [schemaIndex, updatedRecordMapForSchemaInRepo] of updatedRecordMapForRepository) {
				let existingRecordMapForSchemaInRepo: Map<TableIndex,
					Map<ActorId, Set<RepositoryEntityActorRecordId>>>;
				if (existingRecordMapForRepository) {
					existingRecordMapForSchemaInRepo = existingRecordMapForRepository.get(schemaIndex);
				}
				const messageIndexMapForSchemaIndRepo: Map<TableIndex, Map<ActorId,
					Map<RepositoryEntityActorRecordId, Set<number>>>>
					= messageIndexMapForRepository.get(schemaIndex);

				for (const [tableIndex, updatedRecordMapForTableInRepo] of updatedRecordMapForSchemaInRepo) {
					let existingRecordMapForTableInSchema: Map<ActorId, Set<RepositoryEntityActorRecordId>>;
					if (existingRecordMapForSchemaInRepo) {
						existingRecordMapForTableInSchema = existingRecordMapForSchemaInRepo.get(tableIndex);
					}
					const messageIndexMapForTableInSchema: Map<ActorId,
						Map<RepositoryEntityActorRecordId, Set<number>>>
						= messageIndexMapForSchemaIndRepo.get(tableIndex);

					for (const [actorId, actorRecordIds] of updatedRecordMapForTableInRepo) {
						let existingRecordIdSetForActor: Set<RepositoryEntityActorRecordId>;
						if (existingRecordMapForTableInSchema) {
							existingRecordIdSetForActor = existingRecordMapForTableInSchema.get(actorId);
						}
						const messageIndexMapForActor: Map<RepositoryEntityActorRecordId, Set<number>>
							= messageIndexMapForTableInSchema.get(actorId);
						if (existingRecordIdSetForActor) {
							for (const actorRecordId of actorRecordIds) {
								if (!existingRecordIdSetForActor.has(actorRecordId)) {
									this.recordMissingRecordAndRepoTransBlockRelations(
										repositoryId,
										schemaIndex,
										tableIndex,
										actorId,
										actorRecordId,
										missingRecords,
										compatibleDataMessageFlags,
										messageIndexMapForActor,
										dataMessagesWithCompatibleSchemas,
										dataMessagesWithIncompatibleData,
										sparseDataMessagesWithIncompatibleData,
										missingRecordDataToTMs
									);
								}
							}
						} else {
							for (const actorRecordId of actorRecordIds) {
								this.recordMissingRecordAndRepoTransBlockRelations(
									repositoryId,
									schemaIndex,
									tableIndex,
									actorId,
									actorRecordId,
									missingRecords,
									compatibleDataMessageFlags,
									messageIndexMapForActor,
									dataMessagesWithCompatibleSchemas,
									dataMessagesWithIncompatibleData,
									sparseDataMessagesWithIncompatibleData,
									missingRecordDataToTMs
								);
							}
						}
					}
				}
			}
		}

		if (missingRecords.length) {
			await this.missingRecordDao.bulkCreate(missingRecords, false, false);
		}

		return {
			compatibleDataMessageFlags,
			missingRecordDataToTMs
		};
	}

	private getRecordsToInsertMap(
		dataMessages: IDataToTM[]
	): Map<RepositoryId, Map<SchemaVersionId,
		Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>> {
		const recordsToInsertMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			= new Map();

		for (let i = 0; i < dataMessages.length; i++) {
			const dataMessage = dataMessages[i];
			for (const repoTransHistory of dataMessage.data.repoTransHistories) {
				const repositoryId = repoTransHistory.repository.id;
				for (const operationHistory of repoTransHistory.operationHistory) {
					switch (operationHistory.changeType) {
						case ChangeType.INSERT_VALUES:
							for (const recordHistory of operationHistory.recordHistory) {
								this.utils.ensureChildJsSet(
									this.utils.ensureChildJsMap(
										this.utils.ensureChildJsMap(
											this.utils.ensureChildJsMap(
												recordsToInsertMap, repositoryId),
											operationHistory.schemaVersion.id),
										operationHistory.entity.index),
									recordHistory.actor.id)
									.add(recordHistory.actorRecordId);
							}
							break;
					}
				}
			}
		}
		return recordsToInsertMap;
	}

	ensureRecordId(
		recordHistory: IRecordHistory,
		actorRecordIdSetByActor: Map<ActorId, Set<RepositoryEntityActorRecordId>>,
		actorRecordId: RepositoryEntityActorRecordId = recordHistory.actorRecordId
	): void {
		this.utils.ensureChildJsSet(
			actorRecordIdSetByActor, recordHistory.actor.id).add(actorRecordId);
	}

	private recordMissingRecordAndRepoTransBlockRelations(
		repositoryId: RepositoryId,
		schemaVersionId: SchemaVersionId,
		tableIndex: TableIndex,
		actorId: ActorId,
		actorRecordId: RepositoryEntityActorRecordId,
		missingRecords: IMissingRecord[],
		compatibleDataMessageFlags: boolean[],
		messageIndexMapForActor: Map<RepositoryEntityActorRecordId, Set<number>>,
		dataMessagesWithCompatibleSchemas: IDataToTM[],
		dataMessagesWithIncompatibleData: IDataToTM[],
		sparseDataMessagesWithIncompatibleData: IDataToTM[],
		missingRecordDataToTMs: IMissingRecordDataToTM[]
	): void {
		const missingRecord = this.createMissingRecord(repositoryId, schemaVersionId,
			tableIndex, actorId, actorRecordId);
		missingRecords.push(missingRecord);
		for (const messageIndex of messageIndexMapForActor.get(actorRecordId)) {
			let dataMessage: IDataToTM;
			if (compatibleDataMessageFlags[messageIndex]) {
				const dataMessage = dataMessagesWithCompatibleSchemas[messageIndex];
				sparseDataMessagesWithIncompatibleData[messageIndex]
					= dataMessage;
				dataMessagesWithIncompatibleData.push(dataMessage);
				compatibleDataMessageFlags[messageIndex] = false;
			} else {
				dataMessage
					= sparseDataMessagesWithIncompatibleData[messageIndex];
			}
			missingRecordDataToTMs.push({
				missingRecord,
				dataMessage
			})
		}
	}

	private createMissingRecord(
		repositoryId: RepositoryId,
		schemaVersionId: SchemaVersionId,
		tableIndex: TableIndex,
		actorId: ActorId,
		actorRecordId: RecordHistoryActorRecordId
	): IMissingRecord {
		return {
			schemaVersion: {
				id: schemaVersionId
			},
			entity: {
				index: tableIndex,
				schemaVersion: {
					id: schemaVersionId
				}
			},
			repository: {
				id: repositoryId
			},
			actor: {
				id: actorId
			},
			actorRecordId,
			status: MissingRecordStatus.MISSING
		};
	}

	private async getExistingRepoTransBlocksWithCompatibleSchemasAndData(
		foundMissingRecordIds: MissingRecordId[]
	): Promise<IRepositoryTransactionBlock[]> {
		if (foundMissingRecordIds.length) {
			return [];
		}
		const existingRepoTransBlocksWithCompatibleSchemasAndData =
			await this.repositoryTransactionBlockDao.findWithMissingRecordIdsAndNoMissingRecordsWithStatus(
				foundMissingRecordIds,
				MissingRecordStatus.MISSING
			);

		await this.missingRecordRepoTransBlockDao.deleteWhereMissingRecordIdsIn(foundMissingRecordIds);
		await this.missingRecordDao.deleteWhereIdsIn(foundMissingRecordIds);

		return existingRepoTransBlocksWithCompatibleSchemasAndData;
	}

}