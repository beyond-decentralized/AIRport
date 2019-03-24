import {
	IUtils,
	UTILS
}                                                 from '@airport/air-control'
import {DI}                                       from '@airport/di'
import {
	ChangeType,
	EntityId,
	SchemaVersionId,
	TableIndex
}                                                 from '@airport/ground-control'
import {
	ActorId,
	IRecordHistory,
	IRepositoryTransactionHistoryDao,
	RecordHistoryActorRecordId,
	REPO_TRANS_HISTORY_DAO,
	RepositoryEntityActorRecordId,
	RepositoryId
}                                                 from '@airport/holding-pattern'
import {
	IMissingRecord,
	IMissingRecordDao,
	IMissingRecordRepoTransBlockDao,
	IRepositoryTransactionBlock,
	IRepositoryTransactionBlockDao,
	ISharingMessageDao,
	MISSING_RECORD_DAO,
	MISSING_RECORD_REPO_TRANS_BLOCK_DAO,
	MissingRecordId,
	MissingRecordStatus,
	REPO_TRANS_BLOCK_DAO,
	SHARING_MESSAGE_DAO
}                                                 from '@airport/moving-walkway'
import {
	ITerminalStore,
	TERMINAL_STORE
}                                                 from '@airport/terminal-map'
import {
	SYNC_IN_DATA_CHECKER,
	SYNC_IN_REPO_TRANS_BLOCK_CREATOR,
	SYNC_IN_UTILS
}                                                 from '../../../diTokens'
import {ISyncInRepositoryTransactionBlockCreator} from '../creator/SyncInRepositoryTransactionBlockCreator'
import {
	IDataToTM,
	ISyncInUtils
}                                                 from '../SyncInUtils'

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
		Map<EntityId, Map<ActorId, Map<RepositoryEntityActorRecordId, Set<number>>>>>>;
	recordsToUpdateMap: Map<RepositoryId, Map<SchemaVersionId,
		Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>;
}

export interface ISyncInDataChecker {

	checkData(
		dataMessagesWithCompatibleSchemas: IDataToTM[],
		// actorMapById: Map<ActorId, IActor>
	): Promise<DataCheckResults>

}

export class SyncInDataChecker
	implements ISyncInDataChecker {

	private missingRecordDao: IMissingRecordDao
	private missingRecordRepoTransBlockDao: IMissingRecordRepoTransBlockDao
	private repositoryTransactionBlockDao: IRepositoryTransactionBlockDao
	private repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao
	private sharingMessageDao: ISharingMessageDao
	private syncInRepositoryTransactionBlockCreator: ISyncInRepositoryTransactionBlockCreator
	private syncInUtils: ISyncInUtils
	private terminalStore: ITerminalStore
	private utils: IUtils

	constructor() {
		DI.get((
			missingRecordDao,
			missingRecordRepoTransBlockDao,
			repositoryTransactionBlockDao,
			repositoryTransactionHistoryDao,
			sharingMessageDao,
			syncInRepositoryTransactionBlockCreator,
			syncInUtils,
			terminalStore,
			utils
			) => {
				this.missingRecordDao                        = missingRecordDao
				this.missingRecordRepoTransBlockDao          = missingRecordRepoTransBlockDao
				this.repositoryTransactionBlockDao           = repositoryTransactionBlockDao
				this.repositoryTransactionHistoryDao         = repositoryTransactionHistoryDao
				this.sharingMessageDao                       = sharingMessageDao
				this.syncInRepositoryTransactionBlockCreator = syncInRepositoryTransactionBlockCreator
				this.syncInUtils                             = syncInUtils
				this.terminalStore                           = terminalStore
				this.utils                                   = utils
			}, MISSING_RECORD_DAO, MISSING_RECORD_REPO_TRANS_BLOCK_DAO,
			REPO_TRANS_BLOCK_DAO, REPO_TRANS_HISTORY_DAO,
			SHARING_MESSAGE_DAO, SYNC_IN_REPO_TRANS_BLOCK_CREATOR,
			SYNC_IN_UTILS, TERMINAL_STORE, UTILS)
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
			      recordsToUpdateMap
		      } = this.getDataStructuresForChanges(dataMessagesWithCompatibleSchemas)

		const existingRecordIdMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			      = await this.repositoryTransactionHistoryDao.findExistingRecordIdMap(recordsToUpdateMap)

		const dataMessagesWithIncompatibleData: IDataToTM[] = []
		const {
			      compatibleDataMessageFlags,
			      missingRecordDataToTMs,
		      }                                             = await this.determineMissingRecords(dataMessagesWithCompatibleSchemas,
			dataMessagesWithIncompatibleData, recordsToUpdateMap,
			existingRecordIdMap, messageIndexMapByRecordToUpdateIds)

		const dataMessagesWithCompatibleSchemasAndData: IDataToTM[] = []

		// filter out data messages with records that do not exist
		for (let i = 0; i < compatibleDataMessageFlags.length; i++) {
			const dataMessage = dataMessagesWithCompatibleSchemas[i]
			if (compatibleDataMessageFlags[i]) {
				dataMessagesWithCompatibleSchemasAndData.push(dataMessage)
			}
		}

		const toBeInsertedRecordMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			      = this.getRecordsToInsertMap(dataMessagesWithCompatibleSchemasAndData)

		const foundMissingRecordIds =
			      await this.missingRecordDao.setStatusWhereIdsInAndReturnIds(
				      toBeInsertedRecordMap, MissingRecordStatus.MISSING)

		// Find repository transaction blocks that now can be processed
		const existingRepoTransBlocksWithCompatibleSchemasAndData
			      = await this.getExistingRepoTransBlocksWithCompatibleSchemasAndData(foundMissingRecordIds)

		return {
			dataMessagesWithCompatibleSchemasAndData,
			dataMessagesWithIncompatibleData,
			existingRepoTransBlocksWithCompatibleSchemasAndData,
			missingRecordDataToTMs
		}
	}

	private getDataStructuresForChanges(
		dataMessagesWithCompatibleSchemas: IDataToTM[]
	): DataStructuresForChanges {
		const recordsToInsertMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			      = this.getRecordsToInsertMap(dataMessagesWithCompatibleSchemas)

		const recordsToUpdateMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			      = new Map()
		const messageIndexMapByRecordToUpdateIds: Map<RepositoryId, Map<SchemaVersionId,
			Map<EntityId, Map<ActorId, Map<RepositoryEntityActorRecordId, Set<number>>>>>>
			      = new Map()


		for (let i = 0; i < dataMessagesWithCompatibleSchemas.length; i++) {
			const dataMessages = dataMessagesWithCompatibleSchemas[i]
			dataMessages.data.repoTransHistories.sort((
				repoTransHistory1,
				repoTransHistory2,
			) => repoTransHistory1.saveTimestamp.getTime() - repoTransHistory2.saveTimestamp.getTime())
			for (const repoTransHistory of dataMessages.data.repoTransHistories) {
				const repositoryId             = repoTransHistory.repository.id
				const recordToInsertMapForRepo = recordsToInsertMap.get(repositoryId)
				repoTransHistory.operationHistory.sort((
					operationHistory1,
					operationHistory2,
				) => operationHistory1.orderNumber - operationHistory2.orderNumber)
				for (const operationHistory of repoTransHistory.operationHistory) {
					let recordToInsertMapForEntityInRepo
					if (recordToInsertMapForRepo) {
						const recordToInsertMapForSchemaInRepo
							      = recordToInsertMapForRepo.get(operationHistory.schemaVersion.id)
						if (recordToInsertMapForSchemaInRepo) {
							recordToInsertMapForEntityInRepo
								= recordToInsertMapForSchemaInRepo.get(operationHistory.entity.id)
						}
					}

					switch (operationHistory.changeType) {
						case ChangeType.DELETE_ROWS:
						case ChangeType.UPDATE_ROWS:
							for (const recordHistory of operationHistory.recordHistory) {
								let recordToInsertSetForActor
								if (recordToInsertMapForEntityInRepo) {
									recordToInsertSetForActor
										= recordToInsertMapForEntityInRepo.get(recordHistory.actor.id)
								}
								if (!recordToInsertSetForActor
									|| !recordToInsertSetForActor.has(recordHistory.actorRecordId)) {
									const recordToUpdateMapForRepoInTable = this.syncInUtils
										.ensureRecordMapForRepoInTable(
											repositoryId, operationHistory, recordsToUpdateMap)
									this.ensureRecordId(recordHistory, recordToUpdateMapForRepoInTable,
										recordHistory.actorRecordId)
									this.utils.ensureChildJsSet(
										this.utils.ensureChildJsMap(
											this.utils.ensureChildJsMap(
												this.utils.ensureChildJsMap(
													this.utils.ensureChildJsMap(
														messageIndexMapByRecordToUpdateIds, repositoryId),
													operationHistory.schemaVersion.id),
												operationHistory.entity.id),
											recordHistory.actor.id),
										recordHistory.actorRecordId)
										.add(i)
								}
							}
							break
					}
				}
			}
		}

		return {
			messageIndexMapByRecordToUpdateIds,
			recordsToUpdateMap
		}
	}

	private async determineMissingRecords(
		dataMessagesWithCompatibleSchemas: IDataToTM[],
		dataMessagesWithIncompatibleData: IDataToTM[],
		recordToUpdateMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>,
		existingRecordIdMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>,
		messageIndexMapByRecordToUpdateIds: Map<RepositoryId, Map<SchemaVersionId,
			Map<EntityId, Map<ActorId, Map<RepositoryEntityActorRecordId, Set<number>>>>>>
	): Promise<MissingRecordResults> {
		const compatibleDataMessageFlags: boolean[]
			                                                        = dataMessagesWithCompatibleSchemas.map(
			_ => true)
		const missingRecords: IMissingRecord[]                    = []
		const missingRecordDataToTMs: IMissingRecordDataToTM[]    = []
		const sparseDataMessagesWithIncompatibleData: IDataToTM[] = []

		for (const [repositoryId, updatedRecordMapForRepository] of recordToUpdateMap) {
			const existingRecordMapForRepository: Map<SchemaVersionId, Map<TableIndex,
				Map<ActorId, Set<RepositoryEntityActorRecordId>>>>
				      = existingRecordIdMap.get(repositoryId)
			const messageIndexMapForRepository: Map<SchemaVersionId, Map<TableIndex,
				Map<ActorId, Map<RepositoryEntityActorRecordId, Set<number>>>>>
				      = messageIndexMapByRecordToUpdateIds.get(repositoryId)

			for (const [schemaIndex, updatedRecordMapForSchemaInRepo] of updatedRecordMapForRepository) {
				let existingRecordMapForSchemaInRepo: Map<EntityId,
					Map<ActorId, Set<RepositoryEntityActorRecordId>>>
				if (existingRecordMapForRepository) {
					existingRecordMapForSchemaInRepo = existingRecordMapForRepository.get(schemaIndex)
				}
				const messageIndexMapForSchemaIndRepo: Map<EntityId, Map<ActorId,
					Map<RepositoryEntityActorRecordId, Set<number>>>>
					      = messageIndexMapForRepository.get(schemaIndex)

				for (const [entityId, updatedRecordMapForTableInRepo] of updatedRecordMapForSchemaInRepo) {
					let existingRecordMapForTableInSchema: Map<ActorId, Set<RepositoryEntityActorRecordId>>
					if (existingRecordMapForSchemaInRepo) {
						existingRecordMapForTableInSchema = existingRecordMapForSchemaInRepo.get(entityId)
					}
					const messageIndexMapForTableInSchema: Map<ActorId,
						Map<RepositoryEntityActorRecordId, Set<number>>>
						      = messageIndexMapForSchemaIndRepo.get(entityId)

					for (const [actorId, actorRecordIds] of updatedRecordMapForTableInRepo) {
						let existingRecordIdSetForActor: Set<RepositoryEntityActorRecordId>
						if (existingRecordMapForTableInSchema) {
							existingRecordIdSetForActor = existingRecordMapForTableInSchema.get(actorId)
						}
						const messageIndexMapForActor: Map<RepositoryEntityActorRecordId, Set<number>>
							      = messageIndexMapForTableInSchema.get(actorId)
						if (existingRecordIdSetForActor) {
							for (const actorRecordId of actorRecordIds) {
								if (!existingRecordIdSetForActor.has(actorRecordId)) {
									this.recordMissingRecordAndRepoTransBlockRelations(
										repositoryId,
										schemaIndex,
										entityId,
										actorId,
										actorRecordId,
										missingRecords,
										compatibleDataMessageFlags,
										messageIndexMapForActor,
										dataMessagesWithCompatibleSchemas,
										dataMessagesWithIncompatibleData,
										sparseDataMessagesWithIncompatibleData,
										missingRecordDataToTMs
									)
								}
							}
						} else {
							for (const actorRecordId of actorRecordIds) {
								this.recordMissingRecordAndRepoTransBlockRelations(
									repositoryId,
									schemaIndex,
									entityId,
									actorId,
									actorRecordId,
									missingRecords,
									compatibleDataMessageFlags,
									messageIndexMapForActor,
									dataMessagesWithCompatibleSchemas,
									dataMessagesWithIncompatibleData,
									sparseDataMessagesWithIncompatibleData,
									missingRecordDataToTMs
								)
							}
						}
					}
				}
			}
		}

		if (missingRecords.length) {
			await this.missingRecordDao.bulkCreate(missingRecords, false, false)
		}

		return {
			compatibleDataMessageFlags,
			missingRecordDataToTMs
		}
	}

	private getRecordsToInsertMap(
		dataMessages: IDataToTM[]
	): Map<RepositoryId, Map<SchemaVersionId,
		Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>> {
		const recordsToInsertMap: Map<RepositoryId, Map<SchemaVersionId,
			Map<EntityId, Map<ActorId, Set<RepositoryEntityActorRecordId>>>>>
			      = new Map()

		for (let i = 0; i < dataMessages.length; i++) {
			const dataMessage = dataMessages[i]
			for (const repoTransHistory of dataMessage.data.repoTransHistories) {
				const repositoryId = repoTransHistory.repository.id
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
										operationHistory.entity.id),
									recordHistory.actor.id)
									.add(recordHistory.actorRecordId)
							}
							break
					}
				}
			}
		}
		return recordsToInsertMap
	}

	ensureRecordId(
		recordHistory: IRecordHistory,
		actorRecordIdSetByActor: Map<ActorId, Set<RepositoryEntityActorRecordId>>,
		actorRecordId: RepositoryEntityActorRecordId = recordHistory.actorRecordId
	): void {
		this.utils.ensureChildJsSet(
			actorRecordIdSetByActor, recordHistory.actor.id).add(actorRecordId)
	}

	private recordMissingRecordAndRepoTransBlockRelations(
		repositoryId: RepositoryId,
		schemaVersionId: SchemaVersionId,
		entityId: TableIndex,
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
			entityId, actorId, actorRecordId)
		missingRecords.push(missingRecord)
		for (const messageIndex of messageIndexMapForActor.get(actorRecordId)) {
			let dataMessage: IDataToTM
			if (compatibleDataMessageFlags[messageIndex]) {
				const dataMessage = dataMessagesWithCompatibleSchemas[messageIndex]
				sparseDataMessagesWithIncompatibleData[messageIndex]
				                  = dataMessage
				dataMessagesWithIncompatibleData.push(dataMessage)
				compatibleDataMessageFlags[messageIndex] = false
			} else {
				dataMessage
					= sparseDataMessagesWithIncompatibleData[messageIndex]
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
		entityId: EntityId,
		actorId: ActorId,
		actorRecordId: RecordHistoryActorRecordId
	): IMissingRecord {
		return {
			schemaVersion: {
				id: schemaVersionId
			},
			entity: {
				id: entityId
			},
			repository: {
				id: repositoryId
			},
			actor: {
				id: actorId
			},
			actorRecordId,
			status: MissingRecordStatus.MISSING
		}
	}

	private async getExistingRepoTransBlocksWithCompatibleSchemasAndData(
		foundMissingRecordIds: MissingRecordId[]
	): Promise<IRepositoryTransactionBlock[]> {
		if (foundMissingRecordIds.length) {
			return []
		}
		const existingRepoTransBlocksWithCompatibleSchemasAndData =
			      await this.repositoryTransactionBlockDao.findWithMissingRecordIdsAndNoMissingRecordsWithStatus(
				      foundMissingRecordIds,
				      MissingRecordStatus.MISSING
			      )

		await this.missingRecordRepoTransBlockDao.deleteWhereMissingRecordIdsIn(foundMissingRecordIds)
		await this.missingRecordDao.deleteWhereIdsIn(foundMissingRecordIds)

		return existingRepoTransBlocksWithCompatibleSchemasAndData
	}

}

DI.set(SYNC_IN_DATA_CHECKER, SyncInDataChecker)
