import {
	IUtils,
	SchemaIndex,
	TableIndex,
	UtilsToken
}                                                 from "@airport/air-control";
import {ChangeType}                               from "@airport/ground-control";
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
	IMissingRecordSharingMessage,
	IRepositoryTransactionBlock,
	ISharingMessage,
	ISharingMessageDao,
	MissingRecordDaoToken,
	MissingRecordId,
	MissingRecordRepoTransBlockDaoToken,
	MissingRecordStatus,
	SharingMessageDaoToken,
	SharingMessageProcessingStatus
}                                                 from "@airport/moving-walkway";
import {
	Inject,
	Service
}                                                 from "typedi";
import {
	SyncInDataCheckerToken,
	SyncInRepositoryTransactionBlockCreatorToken
}                                                 from "../../../InjectionTokens";
import {ISyncInRepositoryTransactionBlockCreator} from "../creator/SyncInRepositoryTransactionBlockCreator";
import {
	DataCheckResults,
	IDataToTM,
	ISyncInUtils
}                                                 from "../SyncInUtils";

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
		const insertedRecordMap: Map<RepositoryId, Map<SchemaIndex,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			= this.getInsertedRecordMap(dataMessagesWithCompatibleSchemas);

		const updatedRecordMap: Map<RepositoryId, Map<SchemaIndex,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			= new Map();
		const messageIndexMapByUpdatedRecordIds: Map<RepositoryId, Map<SchemaIndex,
			Map<TableIndex, Map<ActorId, Map<RepositoryEntityActorRecordId, Set<number>>>>>>
			= new Map();


		for (let i = 0; i < dataMessagesWithCompatibleSchemas.length; i++) {
			const dataMessages = dataMessagesWithCompatibleSchemas[i];
			for (const repoTransHistory of dataMessages.data.repoTransHistories) {
				const repositoryId = repoTransHistory.repository.id;
				const insertedRecordMapForRepo = insertedRecordMap.get(repositoryId);
				for (const operationHistory of repoTransHistory.operationHistory) {
					let insertedRecordMapForEntityInRepo;
					if (insertedRecordMapForRepo) {
						const insertedRecordMapForSchemaInRepo
							= insertedRecordMapForRepo.get(operationHistory.schema.index);
						if (insertedRecordMapForSchemaInRepo) {
							insertedRecordMapForEntityInRepo
								= insertedRecordMapForSchemaInRepo.get(operationHistory.entity.index);
						}
					}

					switch (operationHistory.changeType) {
						case ChangeType.DELETE_ROWS:
						case ChangeType.UPDATE_ROWS:
							for (const recordHistory of operationHistory.recordHistory) {
								let insertedRecordSetForActor;
								if (insertedRecordMapForEntityInRepo) {
									insertedRecordSetForActor
										= insertedRecordMapForEntityInRepo.get(recordHistory.actor.id);
								}
								if (!insertedRecordSetForActor
									|| !insertedRecordSetForActor.has(recordHistory.actorRecordId)) {
									const updatedRecordMapForRepoInTable = this.syncInUtils
										.ensureRecordMapForRepoInTable(
											repositoryId, operationHistory, updatedRecordMap);
									this.ensureRecordId(recordHistory, updatedRecordMapForRepoInTable,
										recordHistory.actorRecordId);
									this.utils.ensureChildJsSet(
										this.utils.ensureChildJsMap(
											this.utils.ensureChildJsMap(
												this.utils.ensureChildJsMap(
													this.utils.ensureChildJsMap(
														messageIndexMapByUpdatedRecordIds, repositoryId),
													operationHistory.schema.index),
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

		const existingRecordIdMap: Map<RepositoryId, Map<SchemaIndex,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			= await this.repositoryTransactionHistoryDao.findExistingRecordIdMap(updatedRecordMap);

		const compatibleDataMessageFlags: boolean[]
			= dataMessagesWithCompatibleSchemas.map(
			dataMessage => true);

		const sharingMessagesWithIncompatibleData: ISharingMessage[] = [];
		const sparseSharingMessagesWithIncompatibleData: ISharingMessage[] = [];
		const missingRecords: IMissingRecord[] = [];
		const missingRecordSharingMessages: IMissingRecordSharingMessage[] = [];

		for (const [repositoryId, updatedRecordMapForRepository] of updatedRecordMap) {
			const existingRecordMapForRepository: Map<SchemaIndex, Map<TableIndex,
				Map<ActorId, Set<RepositoryEntityActorRecordId>>>>
				= existingRecordIdMap.get(repositoryId);
			const messageIndexMapForRepository: Map<SchemaIndex, Map<TableIndex,
				Map<ActorId, Map<RepositoryEntityActorRecordId, Set<number>>>>>
				= messageIndexMapByUpdatedRecordIds.get(repositoryId);

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
									this.recordMissingRecordAndSharingMessageRelations(
										repositoryId,
										schemaIndex,
										tableIndex,
										actorId,
										actorRecordId,
										missingRecords,
										compatibleDataMessageFlags,
										messageIndexMapForActor,
										dataMessagesWithCompatibleSchemas,
										sharingMessagesWithIncompatibleData,
										sparseSharingMessagesWithIncompatibleData,
										missingRecordSharingMessages
									);
								}
							}
						} else {
							for (const actorRecordId of actorRecordIds) {
								this.recordMissingRecordAndSharingMessageRelations(
									repositoryId,
									schemaIndex,
									tableIndex,
									actorId,
									actorRecordId,
									missingRecords,
									compatibleDataMessageFlags,
									messageIndexMapForActor,
									dataMessagesWithCompatibleSchemas,
									sharingMessagesWithIncompatibleData,
									sparseSharingMessagesWithIncompatibleData,
									missingRecordSharingMessages
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

		const dataMessagesWithCompatibleSchemasAndData: IDataToTM[] = [];

		// filter out data messages with records that do no exist
		for (let i = 0; i < compatibleDataMessageFlags.length; i++) {
			const dataMessage = dataMessagesWithCompatibleSchemas[i];
			if (compatibleDataMessageFlags[i]) {
				dataMessagesWithCompatibleSchemasAndData.push(dataMessage);
			}
		}

		const toBeInsertedRecordMap: Map<RepositoryId, Map<SchemaIndex,
			Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			= this.getInsertedRecordMap(dataMessagesWithCompatibleSchemasAndData);

		const foundMissingRecordIds =
			await this.missingRecordDao.setStatusWhereIdsInAndReturnIds(toBeInsertedRecordMap);

		const existingRepoTransBlocksWithCompatibleSchemasAndData
			= await this.getExistingRepoTransBlocksWithCompatibleSchemasAndData(foundMissingRecordIds);

		return {
			dataMessagesWithCompatibleSchemasAndData,
			existingRepoTransBlocksWithCompatibleSchemasAndData,
			missingRecordSharingMessages,
			sharingMessagesWithIncompatibleData
		};
	}

	private getInsertedRecordMap(
		dataMessages: IDataToTM[]
	): Map<RepositoryId, Map<SchemaIndex,
		Map<TableIndex, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>> {
		const insertedRecordMap: Map<RepositoryId, Map<SchemaIndex,
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
												insertedRecordMap, repositoryId),
											operationHistory.schema.index),
										operationHistory.entity.index),
									recordHistory.actor.id)
									.add(recordHistory.actorRecordId);
							}
							break;
					}
				}
			}
		}
		return insertedRecordMap;
	}

	ensureRecordId(
		recordHistory: IRecordHistory,
		actorRecordIdSetByActor: Map<ActorId, Set<RepositoryEntityActorRecordId>>,
		actorRecordId: RepositoryEntityActorRecordId = recordHistory.actorRecordId
	): void {
		this.utils.ensureChildJsSet(
			actorRecordIdSetByActor, recordHistory.actor.id).add(actorRecordId);
	}

	private recordMissingRecordAndSharingMessageRelations(
		repositoryId: RepositoryId,
		schemaIndex: SchemaIndex,
		tableIndex: TableIndex,
		actorId: ActorId,
		actorRecordId: RepositoryEntityActorRecordId,
		missingRecords: IMissingRecord[],
		compatibleDataMessageFlags: boolean[],
		messageIndexMapForActor: Map<RepositoryEntityActorRecordId, Set<number>>,
		dataMessagesWithCompatibleSchemas: IDataToTM[],
		sharingMessagesWithIncompatibleData: ISharingMessage[],
		sparseSharingMessagesWithIncompatibleData: ISharingMessage[],
		missingRecordSharingMessages: IMissingRecordSharingMessage[]
	): void {
		const missingRecord = this.createMissingRecord(repositoryId, schemaIndex,
			tableIndex, actorId, actorRecordId);
		missingRecords.push(missingRecord);
		for (const messageIndex of messageIndexMapForActor.get(actorRecordId)) {
			let sharingMessage: ISharingMessage;
			if (compatibleDataMessageFlags[messageIndex]) {
				const dataMessage = dataMessagesWithCompatibleSchemas[messageIndex];
				sharingMessage = this.syncInUtils.createSharingMessage(dataMessage,
					SharingMessageProcessingStatus.NEEDS_ADDITIONAL_DATA, true);
				sparseSharingMessagesWithIncompatibleData[messageIndex]
					= sharingMessage;
				sharingMessagesWithIncompatibleData.push(sharingMessage);
				compatibleDataMessageFlags[messageIndex] = false;
			} else {
				sharingMessage
					= sparseSharingMessagesWithIncompatibleData[messageIndex];
			}
			missingRecordSharingMessages.push({
				missingRecord,
				sharingMessage
			})
		}
	}

	private createMissingRecord(
		repositoryId: RepositoryId,
		schemaIndex: SchemaIndex,
		tableIndex: TableIndex,
		actorId: ActorId,
		actorRecordId: RecordHistoryActorRecordId
	): IMissingRecord {
		return {
			schema: {
				index: schemaIndex
			},
			entity: {
				index: tableIndex,
				schema: {
					index: schemaIndex
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
			await this.sharingMessageDao.findWithMissingRecordIdsAndNoMissingRecordsWithStatus(
				foundMissingRecordIds,
				MissingRecordStatus.MISSING
			);

		await this.missingRecordRepoTransBlockDao.deleteWhereMissingRecordIdsIn(foundMissingRecordIds);
		await this.missingRecordDao.deleteWhereIdsIn(foundMissingRecordIds);

		return existingRepoTransBlocksWithCompatibleSchemasAndData;
	}

}