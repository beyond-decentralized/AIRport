import {
	AgtRepositoryId,
	TerminalName,
	TerminalSecondId
}                     from '@airport/arrivals-n-departures'
import {container, DI}           from '@airport/di'
import {
	DomainName,
	SchemaIndex,
	SchemaName,
	SchemaVersionId
}                     from '@airport/ground-control'
import {
	ActorRandomId,
	IActor,
	RepositoryId
}                     from '@airport/holding-pattern'
import {
	IRepositoryTransactionBlock,
	IRepoTransBlockSchemaToChange,
	IRepoTransBlockSchemaToChangeDao,
	ISharingMessage,
	MISSING_RECORD_REPO_TRANS_BLOCK_DAO,
	REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO,
	SchemaChangeStatus,
	SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO,
	SharingNode_Id
}                     from '@airport/moving-walkway'
import {
	ISchema,
	ISchemaVersion,
}                     from '@airport/traffic-pattern'
import {UserUniqueId} from '@airport/travel-document-checkpoint'
import {
	SYNC_IN_ACTOR_CHECKER,
	SYNC_IN_CHECKER,
	SYNC_IN_DATA_CHECKER,
	SYNC_IN_REPO_CHECKER,
	SYNC_IN_REPO_TRANS_BLOCK_CREATOR,
	SYNC_IN_SCHEMA_CHECKER
}                     from '../../../tokens'
import {
	IDataToTM,
	RemoteActorId,
	RemoteSchemaVersionId
}                     from '../SyncInUtils'

export interface CheckSchemasResult {
	dataMessagesToBeUpgraded: IDataToTM[];
	dataMessagesWithCompatibleSchemasAndData: IDataToTM[];
	dataMessagesWithIncompatibleSchemas: IDataToTM[];
	dataMessagesWithMissingData: IDataToTM[];
	usedSchemaVersionIdSet: Set<SchemaIndex>;
}

export interface CheckResults {
	sharingMessagesWithCompatibleSchemasAndData: ISharingMessage[]
	existingRepoTransBlocksWithCompatibleSchemasAndData: IRepositoryTransactionBlock[]
	dataMessagesWithCompatibleSchemas: IDataToTM[]
	dataMessagesWithInvalidData: IDataToTM[]
	// usedSchemaVersionIdSet
}

export interface ISyncInChecker {

	checkSchemasAndDataAndRecordRepoTransBlocks(
		dataMessages: IDataToTM[]
		// actorMap: Map<ActorRandomId,
		// 	Map<UserUniqueId,
		// 		Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>,
		// sharingNodeRepositoryMap: Map<SharingNode_Id, Map<AgtRepositoryId, RepositoryId>>,
		// dataMessagesWithInvalidData: IDataToTM[]
	): Promise<CheckResults>;

}

export class SyncInChecker
	implements ISyncInChecker {

	/**
	 *
	 * @param {IDataToTM[]} dataMessages
	 * @returns {Promise<[IDataToTM[] , Map<SchemaDomainName, Map<SchemaName, ISchema>>]>}
	 *      [
	 *          checked messages composed entirely of records from schemas with versions
	 *   compatible to this TM (it's present state), map of schemas used in messages that
	 *   have been verified to be in acceptable state for message processing
	 *      ]
	 */
	async checkSchemasAndDataAndRecordRepoTransBlocks(
		dataMessages: IDataToTM[]
	): Promise<CheckResults> {
		const [syncInActorChecker, syncInDataChecker,
			      missingRecordRepoTransBlockDao, syncInRepositoryChecker,
			      repoTransBlockSchemasToChangeDao, syncInSchemaChecker,
			      sharingMessageRepoTransBlockDao, syncInRepoTransBlockCreator] = await container(this).get(
			SYNC_IN_ACTOR_CHECKER, SYNC_IN_DATA_CHECKER,
			MISSING_RECORD_REPO_TRANS_BLOCK_DAO, SYNC_IN_REPO_CHECKER,
			REPO_TRANS_BLOCK_SCHEMA_TO_CHANGE_DAO, SYNC_IN_SCHEMA_CHECKER,
			SHARING_MESSAGE_REPO_TRANS_BLOCK_DAO, SYNC_IN_REPO_TRANS_BLOCK_CREATOR)

		const {
			      dataMessagesWithCompatibleSchemas,
			      dataMessagesWithIncompatibleSchemas,
			      dataMessagesWithInvalidSchemas,
			      dataMessagesToBeUpgraded,
			      maxVersionedMapBySchemaAndDomainNames,
			      requiredSchemaVersionIds,
			      schemasWithChangesMap,
		      } = await syncInSchemaChecker.checkSchemas(dataMessages)

		const {
			      actorMap,
			      actorMapById,
			      consistentMessages
		      } = await syncInActorChecker.ensureActorsAndGetAsMaps(
			dataMessages, dataMessagesWithInvalidData)


		const {consistentMessages, sharingNodeRepositoryMap}
			      = await syncInRepositoryChecker.ensureRepositories(
			allDataMessages, dataMessagesWithInvalidData)

		dataMessagesWithInvalidData = dataMessagesWithInvalidData
			.concat(dataMessagesWithInvalidSchemas)

		// this.updateSchemaReferences(dataMessagesWithIncompatibleSchemas, allSchemaMap);
		// this.updateSchemaReferences(dataMessagesToBeUpgraded, allSchemaMap);
		// Schema references for messages with incompatible schemas are converted
		// at when the messages are finally processed
		const usedSchemaVersionIdSet
			      = this.updateSchemaReferences(dataMessagesWithCompatibleSchemas,
			maxVersionedMapBySchemaAndDomainNames)
		// this.updateActorReferences(dataMessagesWithIncompatibleSchemas, actorMap)
		// this.updateActorReferences(dataMessagesToBeUpgraded, actorMap)
		this.updateActorReferences(dataMessagesWithCompatibleSchemas, actorMap)
		// this.updateRepositoryReferences(
		// 	dataMessagesWithIncompatibleSchemas, sharingNodeRepositoryMap)
		// this.updateRepositoryReferences(
		// 	dataMessagesToBeUpgraded, sharingNodeRepositoryMap)
		this.updateRepositoryReferences(
			dataMessagesWithCompatibleSchemas, sharingNodeRepositoryMap)

		const {
			      dataMessagesWithCompatibleSchemasAndData,
			      dataMessagesWithIncompatibleData,
			      existingRepoTransBlocksWithCompatibleSchemasAndData,
			      missingRecordDataToTMs
		      } = await syncInDataChecker.checkData(dataMessagesWithCompatibleSchemas)


		const allDataToTM = await syncInRepoTransBlockCreator
			.createRepositoryTransBlocks(
				dataMessagesWithIncompatibleSchemas,
				dataMessagesWithIncompatibleData,
				dataMessagesToBeUpgraded,
				dataMessagesWithCompatibleSchemasAndData,
				dataMessagesWithInvalidData
			)

		await syncInRepoTransBlockCreator
			.createMissingRecordRepoTransBlocks(
				missingRecordDataToTMs,
				missingRecordRepoTransBlockDao)

		await syncInRepoTransBlockCreator
			.createSharingMessageRepoTransBlocks(allDataToTM,
				sharingMessageRepoTransBlockDao)

		// Currently, SharingNodeRepoTransBlocks are not needed for incoming messages.
		// Their are used to track the sync status of the outgoing RTBs only
		// await this.recordAllSharingNodeRepoTransBlocks();

		const sharingMessagesWithCompatibleSchemasAndData
			      = await this.recordRepoTransBlockSchemaToChange(
			dataMessagesWithIncompatibleSchemas,
			// dataMessagesToBeUpgraded,
			schemasWithChangesMap,
			// dataMessagesWithCompatibleSchemasAndData,
			// sharingMessagesWithIncompatibleData,
			// missingRecordRepoTransBlocks,
			repoTransBlockSchemasToChangeDao
		)

		return [
			sharingMessagesWithCompatibleSchemasAndData,
			existingRepoTransBlocksWithCompatibleSchemasAndData,
			dataMessagesWithCompatibleSchemas,
			usedSchemaVersionIdSet
		]
	}

	/**
	 * Schema references are to be upgraded for messages with Compatible Schemas only. The
	 * remaining types of messages are only upgraded when processed
	 *
	 * 1) Incompatible schemas:
	 *
	 * Missing Schema ids cannot be upgraded
	 * Schema version ids are not yet be upgraded
	 *
	 * FIXME: when missing schemas are retrieved - map schema & schema version ids to local
	 * values FIXME: when messages/or local schema are upgraded - map schema version ids to
	 * local values
	 *
	 * 2) Data to be upgraded:
	 * Schema version ids are not yet be upgraded
	 * FIXME: when messages are upgraded - map schema version ids to local values
	 *
	 */
	private updateSchemaReferences(
		dataMessages: IDataToTM[],
		maxVersionedMapBySchemaAndDomainNames:
			Map<DomainName, Map<SchemaName, ISchemaVersion>>
	): Set<SchemaIndex> {
		const usedSchemaIndexSet: Set<SchemaIndex> = new Set()

		for (const dataMessage of dataMessages) {
			const data = dataMessage.data
			// const schemaIndexMapByRemoteSchemaIndex: Map<RemoteSchemaIndex, SchemaIndex> =
			// new Map();
			const schemaVersionIdMapByRemoteSchemaVersionId:
				      Map<RemoteSchemaVersionId, SchemaVersionId> = new Map()
			const localSchemaVersions: ISchemaVersion[]         = []
			const remoteSchemaVersions                          = data.schemaVersions
			for (const schemaVersion of remoteSchemaVersions) {
				const schema                                 = schemaVersion.schema
				const localSchemaVersionView: ISchemaVersion = maxVersionedMapBySchemaAndDomainNames
					.get(schema.domain.name).get(schema.name)

				// const localSchemaIndex = localSchemaVersionView.index;
				// const remoteSchemaIndex = schema.index;
				// schema.index = localSchemaIndex;
				schema.index = localSchemaVersionView.schema.index
				// schemaIndexMapByRemoteSchemaIndex.set(remoteSchemaIndex, localSchemaIndex);

				const localSchemaVersionId  = localSchemaVersionView.id
				const remoteSchemaVersionId = schemaVersion.id
				schemaVersionIdMapByRemoteSchemaVersionId.set(remoteSchemaVersionId,
					localSchemaVersionId)

				localSchemaVersions.push(schemaVersion)
			}
			data.schemaVersions = localSchemaVersions

			for (const repoTransHistory of data.repoTransHistories) {
				delete repoTransHistory.id
				for (const operationHistory of repoTransHistory.operationHistory) {
					delete operationHistory.id
					const localSchemaVersionId
						      = schemaVersionIdMapByRemoteSchemaVersionId.get(operationHistory.entity.schemaVersion.id)
					usedSchemaIndexSet.add(localSchemaVersionId)
					operationHistory.entity.schemaVersion.id = localSchemaVersionId
					for (const recordHistory of operationHistory.recordHistory) {
						delete recordHistory.id
					}
				}
			}
		}

		return usedSchemaIndexSet
	}

	private updateActorReferences(
		dataMessages: IDataToTM[],
		actorMap: Map<ActorRandomId,
			Map<UserUniqueId,
				Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>
	): void {
		for (const dataMessage of dataMessages) {
			const data                                                = dataMessage.data
			const actorMapByRemoteActorId: Map<RemoteActorId, IActor> = new Map()
			const newActors: IActor[]                                 = []
			for (const actor of data.actors) {
				const localActor = actorMap.get(actor.uuId).get(actor.user.uniqueId).get(actor.terminal.name)
					.get(actor.terminal.secondId).get(actor.terminal.owner.uniqueId)
				actorMapByRemoteActorId.set(actor.id, localActor)
				newActors.push(localActor)
			}
			data.actors = newActors

			for (const repoTransHistory of data.repoTransHistories) {
				repoTransHistory.actor = actorMapByRemoteActorId.get(repoTransHistory.actor.id)
				for (const operationHistory of repoTransHistory.operationHistory) {
					for (const recordHistory of operationHistory.recordHistory) {
						recordHistory.actor = actorMapByRemoteActorId.get(recordHistory.actor.id)
					}
				}
			}
		}
	}

	private updateRepositoryReferences(
		dataMessages: IDataToTM[],
		sharingNodeRepositoryMap: Map<SharingNode_Id, Map<AgtRepositoryId, RepositoryId>>
	): void {
		for (const dataMessage of dataMessages) {
			const data          = dataMessage.data
			const repositoryMap = sharingNodeRepositoryMap.get(dataMessage.sharingMessage.sharingNode.id)
			const repositoryId  = repositoryMap.get(dataMessage.agtRepositoryId)
			data.repository.id  = repositoryId

			for (const repoTransHistory of data.repoTransHistories) {
				if (repoTransHistory.repository) {
					repoTransHistory.repository.id = repositoryId
				}
			}
		}
	}

	private async recordRepoTransBlockSchemaToChange(
		dataMessagesWithIncompatibleSchemas: IDataToTM[],
		// dataMessagesToBeUpgraded: IDataToTM[],
		schemaWithChangesMap: Map<DomainName, Map<SchemaName, ISchema>>,
		// dataMessagesWithCompatibleSchemasAndData: IDataToTM[],
		// sharingMessagesWithIncompatibleData: ISharingMessage[],
		// missingRecordRepoTransBlocks: IMissingRecordRepoTransBlock[],
		repoTransBlockSchemasToChangeDao: IRepoTransBlockSchemaToChangeDao
	): Promise<ISharingMessage[]> {
		// const sharingMessagesWithIncompatibleSchemas =
		// dataMessagesWithIncompatibleSchemas.map(( dataMessagesWithIncompatibleSchemas ) =>
		// { /** * Record the messages (with data, because it cannot yet be processed) for
		// messages * that require schema changes (new schemas or schema upgrades). */ return
		// this.syncInUtils.createSharingMessage( dataMessagesWithIncompatibleSchemas,
		// SharingMessageProcessingStatus.NEEDS_SCHEMA_CHANGES, true); }); const
		// sharingMessagesToBeUpgraded = dataMessagesToBeUpgraded.map((
		// dataMessageToBeUpgraded ) => { /** * Record the messages (with data, because it
		// cannot yet be processed) for messages * that need to be upgraded to schema
		// versions present on this TM. * * Messages cannot yet be processed since messages
		// upgrades are done by the client * domain code and need to be sent over to those
		// allDomains for upgrading. */ return this.syncInUtils.createSharingMessage(
		// dataMessageToBeUpgraded, SharingMessageProcessingStatus.NEEDS_DATA_UPGRADES,
		// true); }); const sharingMessagesWithCompatibleSchemasAndData =
		// dataMessagesWithCompatibleSchemasAndData.map(( sharingMessageWithCompatibleSchemas
		// ) => { return this.syncInUtils.createSharingMessage(
		// sharingMessageWithCompatibleSchemas,
		// SharingMessageProcessingStatus.READY_FOR_PROCESSING, false); }); const
		// allSharingMessagesToCreate: ISharingMessage[] = [
		// ...sharingMessagesWithIncompatibleSchemas, ...sharingMessagesToBeUpgraded,
		// ...sharingMessagesWithIncompatibleData,
		// ...sharingMessagesWithCompatibleSchemasAndData ]; await
		// this.sharingMessageDao.bulkCreate( allSharingMessagesToCreate, false);

		// const m: MissingRecordRepoTransBlock;

		// if (missingRecordRepoTransBlocks.length) {
		// 	await this.missingRecordRepoTransBlockDao.bulkCreate(
		// 		missingRecordRepoTransBlocks, false);
		// }


		// Record all schemas to change per sharing message with incompatible schemas
		const repoTransBlockSchemasToChange: IRepoTransBlockSchemaToChange[] = []
		for (let i = 0; i < dataMessagesWithIncompatibleSchemas.length; i++) {
			const message: IDataToTM = dataMessagesWithIncompatibleSchemas[i]
			// const sharingMessage: ISharingMessage =
			// sharingMessagesWithIncompatibleSchemas[i];

			let allMessageSchemasAreCompatible         = true
			let messageBuildWithOutdatedSchemaVersions = false
			// for every schema (at a given version) used in the message
			for (const schema of message.data.schemas) {
				let matchingSchema = this.findMatchingSchema(schemaWithChangesMap, schema)
				if (!matchingSchema) {
					continue
				}

				// If a there was a schema that needs to be added or upgraded
				repoTransBlockSchemasToChange.push({
					// sharingMessage,
					repositoryTransactionBlock: message.repositoryTransactionBlock,
					status: SchemaChangeStatus.CHANGE_NEEDED,
					schema: matchingSchema
				})
			}
		}
		await repoTransBlockSchemasToChangeDao.bulkCreate(
			repoTransBlockSchemasToChange, false)

		return sharingMessagesWithCompatibleSchemasAndData
	}


	private findMatchingSchema(
		schemaMap: Map<DomainName, Map<SchemaName, ISchema>>,
		schema: ISchema
	) {
		const schemasForDomainName = schemaMap.get(schema.domain.name)
		if (!schemasForDomainName) {
			return null
		}

		return schemasForDomainName.get(schema.name)
	}

}

DI.set(SYNC_IN_CHECKER, SyncInChecker)