import {TableIndex}                from "@airport/air-control";
import {SchemaVersionId}           from "@airport/ground-control";
import {
	ActorId,
	RecordHistoryActorRecordId,
	RepositoryEntityActorRecordId,
	RepositoryId
}                                  from "@airport/holding-pattern";
import {
	IMissingRecord,
	IMissingRecordDao,
	IMissingRecordRepoTransBlock,
	MissingRecordDaoToken,
	MissingRecordStatus
}                                  from "@airport/moving-walkway";
import {Inject}                    from "typedi";
import {MissingRecordCreatorToken} from "../../../InjectionTokens";
import {IDataToTM}                 from "../SyncInUtils";

export interface IMissingRecordCreator {

}

@Inject(MissingRecordCreatorToken)
export class MissingRecordCreator
	implements IMissingRecordCreator {

	constructor(
		@Inject(MissingRecordDaoToken)
		private missingRecordDao: IMissingRecordDao
	) {
	}

	async createMissingRecords() {
		const dataMessagesWithIncompatibleData: IDataToTM[] = [];
		const sparseDataMessagesWithIncompatibleData: IDataToTM[] = [];
		const missingRecords: IMissingRecord[] = [];
		const missingRecordRepoTransBlock: IMissingRecordRepoTransBlock[] = [];

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
										missingRecordRepoTransBlock
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
									missingRecordRepoTransBlock
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
		missingRecordRepoTransBlocks: IMissingRecordRepoTransBlock[]
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
			missingRecordRepoTransBlocks.push({
				missingRecord,
				sharingMessage
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

}