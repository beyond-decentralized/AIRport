import {
	SchemaIndex,
	SchemaName
}                                                 from "@airport/air-control";
import {AgtRepositoryId}                          from "@airport/arrivals-n-departures";
import {SchemaVersionId}                          from "@airport/ground-control";
import {
	ActorRandomId,
	IActor,
	RepositoryId,
	TerminalName,
	TerminalSecondId,
	UserUniqueId
}                                                 from "@airport/holding-pattern";
import {
	IMissingRecordRepoTransBlock,
	IMissingRecordRepoTransBlockDao,
	IRepositoryTransactionBlock,
	IRepoTransBlockSchemasToChange,
	IRepoTransBlockSchemasToChangeDao,
	ISharingMessage,
	ISharingMessageDao,
	MissingRecordRepoTransBlock,
	MissingRecordRepoTransBlockDaoToken,
	RepoTransBlockSchemasToChangeDaoToken,
	SchemaChangeStatus,
	SharingMessageDaoToken,
	SharingMessageProcessingStatus,
	SharingNodeId
}                                                 from "@airport/moving-walkway";
import {
	ISchema,
	ISchemaVersion,
	SchemaDomainName
}                                                 from "@airport/traffic-pattern";
import {MaxSchemaVersionView}                     from "@airport/traffic-pattern/lib/dao/SchemaVersionDao";
import {
	Inject,
	Service
}                                                 from "typedi";
import {
	SyncInActorCheckerToken,
	SyncInCheckerToken,
	SyncInDataCheckerToken,
	SyncInRepositoryCheckerToken,
	SyncInRepositoryTransactionBlockCreatorToken,
	SyncInSchemaCheckerToken,
	SyncInUtilsToken
}                                                 from "../../../InjectionTokens";
import {ISyncInRepositoryTransactionBlockCreator} from "../creator/SyncInRepositoryTransactionBlockCreator";
import {
	IDataToTM,
	ISyncInUtils,
	RemoteActorId,
	RemoteSchemaVersionId
}                                                 from "../SyncInUtils";
import {ISyncInActorChecker}                      from "./SyncInActorChecker";
import {ISyncInDataChecker}                       from "./SyncInDataChecker";
import {ISyncInRepositoryChecker}                 from "./SyncInRepositoryChecker";
import {ISyncInSchemaChecker}                     from "./SyncInSchemaChecker";

export interface CheckSchemasResult {
	dataMessagesToBeUpgraded: IDataToTM[];
	dataMessagesWithCompatibleSchemasAndData: IDataToTM[];
	dataMessagesWithIncompatibleSchemas: IDataToTM[];
	dataMessagesWithMissingData: IDataToTM[];
	usedSchemaVersionIdSet: Set<SchemaIndex>;
}

export interface ISyncInChecker {

	actorChecker: ISyncInActorChecker;
	repositoryChecker: ISyncInRepositoryChecker;

	checkSchemasAndDataAndRecordRepoTransBlocks(
		dataMessages: IDataToTM[],
		actorMap: Map<ActorRandomId,
			Map<UserUniqueId,
				Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>,
		sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>,
		dataMessagesWithInvalidData: IDataToTM[]
	): Promise<[
		ISharingMessage[],
		ISharingMessage[],
		IDataToTM[],
		Set<SchemaIndex>
		]>;

}

@Service(SyncInCheckerToken)
export class SyncInChecker
	implements ISyncInChecker {

	constructor(
		@Inject(SyncInActorCheckerToken)
		public actorChecker: ISyncInActorChecker,
		@Inject(SyncInDataCheckerToken)
		private dataChecker: ISyncInDataChecker,
		@Inject(MissingRecordRepoTransBlockDaoToken)
		private missingRecordRepoTransBlockDao: IMissingRecordRepoTransBlockDao,
		@Inject(SyncInRepositoryCheckerToken)
		public repositoryChecker: ISyncInRepositoryChecker,
		@Inject(RepoTransBlockSchemasToChangeDaoToken)
		private repoTransBlockSchemasToChangeDao: IRepoTransBlockSchemasToChangeDao,
		@Inject(SyncInSchemaCheckerToken)
		private schemaChecker: ISyncInSchemaChecker,
		@Inject(SharingMessageDaoToken)
		private sharingMessageDao: ISharingMessageDao,
		@Inject(SyncInRepositoryTransactionBlockCreatorToken)
		private syncInRepositoryTransactionBlockCreator: ISyncInRepositoryTransactionBlockCreator,
		@Inject(SyncInUtilsToken)
		private syncInUtils: ISyncInUtils
	) {
	}

	/**
	 *
	 * @param {IDataToTM[]} dataMessages
	 * @returns {Promise<[IDataToTM[] , Map<SchemaDomainName, Map<SchemaName, ISchema>>]>}
	 *      [
	 *          checked messages composed entirely of records from schemas with versions compatible
	 *              to this TM (it's present state),
	 *          map of schemas used in messages that have been verified to be in acceptable state
	 *              for message processing
	 *      ]
	 */
	async checkSchemasAndDataAndRecordRepoTransBlocks(
		dataMessages: IDataToTM[],
		actorMap: Map<ActorRandomId,
			Map<UserUniqueId,
				Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>,
		sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>,
		dataMessagesWithInvalidData: IDataToTM[]
	): Promise<[
		ISharingMessage[],
		IRepositoryTransactionBlock[],
		IDataToTM[],
		Set<SchemaVersionId>
		]> {

		const {
			dataMessagesWithCompatibleSchemas,
			dataMessagesWithIncompatibleSchemas,
			dataMessagesWithInvalidSchemas,
			dataMessagesToBeUpgraded,
			maxVersionedMapBySchemaAndDomainNames,
		} = await this.schemaChecker.checkSchemas(dataMessages);

		dataMessagesWithInvalidData = dataMessagesWithInvalidData
			.concat(dataMessagesWithInvalidSchemas);

		// this.updateSchemaReferences(dataMessagesWithIncompatibleSchemas, allSchemaMap);
		// this.updateSchemaReferences(dataMessagesToBeUpgraded, allSchemaMap);
		// Schema references for messages with incompatible schemas are converted
		// at when the messages are finally processed
		const usedSchemaVersionIdSet
			= this.updateSchemaReferences(dataMessagesWithCompatibleSchemas,
			maxVersionedMapBySchemaAndDomainNames);
		this.updateActorReferences(dataMessagesWithIncompatibleSchemas, actorMap);
		this.updateActorReferences(dataMessagesToBeUpgraded, actorMap);
		this.updateActorReferences(dataMessagesWithCompatibleSchemas, actorMap);
		this.updateRepositoryReferences(
			dataMessagesWithIncompatibleSchemas, sharingNodeRepositoryMap);
		this.updateRepositoryReferences(
			dataMessagesToBeUpgraded, sharingNodeRepositoryMap);
		this.updateRepositoryReferences(
			dataMessagesWithCompatibleSchemas, sharingNodeRepositoryMap);

		const {
			dataMessagesWithCompatibleSchemasAndData,
			dataMessagesWithIncompatibleData,
			existingRepoTransBlocksWithCompatibleSchemasAndData,
			missingRecordDataToTMs
		} = await this.dataChecker.checkData(dataMessagesWithCompatibleSchemas);


		await this.syncInRepositoryTransactionBlockCreator
			.createRepositoryTransBlocks(
				dataMessagesWithIncompatibleSchemas,
				dataMessagesWithIncompatibleData,
				dataMessagesToBeUpgraded,
				dataMessagesWithCompatibleSchemasAndData,
				dataMessagesWithInvalidData
			);

		const allDataToTM = await this.syncInRepositoryTransactionBlockCreator
			.createMissingRecordRepoTransBlocks(
				missingRecordDataToTMs
			);

		await this.syncInRepositoryTransactionBlockCreator
			.createSharingMessageRepoTransBlocks(allDataToTM);
		await this.recordAllSharingNodeRepoTransBlocks();

		const sharingMessagesWithCompatibleSchemasAndData = await this.recordSharingMessages(
			dataMessagesWithIncompatibleSchemas,
			dataMessagesToBeUpgraded,
			schemasWithChangesMap,
			dataMessagesWithCompatibleSchemasAndData,
			sharingMessagesWithIncompatibleData,
			missingRecordRepoTransBlocks
		);

		return [
			sharingMessagesWithCompatibleSchemasAndData,
			existingRepoTransBlocksWithCompatibleSchemasAndData,
			dataMessagesWithCompatibleSchemas,
			usedSchemaVersionIdSet
		];
	}

	/**
	 * Schema references are to be upgraded for messages with Compatible Schemas only. The remaining
	 * types of messages are only upgraded when processed
	 *
	 * 1) Incompatible schemas:
	 *
	 * Missing Schema ids cannot be upgraded
	 * Schema version ids are not yet be upgraded
	 *
	 * FIXME: when missing schemas are retrieved - map schema & schema version ids to local values
	 * FIXME: when messages/or local schema are upgraded - map schema version ids to local values
	 *
	 * 2) Data to be upgraded:
	 * Schema version ids are not yet be upgraded
	 * FIXME: when messages are upgraded - map schema version ids to local values
	 *
	 */
	private updateSchemaReferences(
		dataMessages: IDataToTM[],
		maxVersionedMapBySchemaAndDomainNames:
			Map<SchemaDomainName, Map<SchemaName, MaxSchemaVersionView>>
	): Set<SchemaIndex> {
		const usedSchemaIndexSet: Set<SchemaIndex> = new Set();

		for (const dataMessage of dataMessages) {
			const data = dataMessage.data;
			// const schemaIndexMapByRemoteSchemaIndex: Map<RemoteSchemaIndex, SchemaIndex> = new Map();
			const schemaVersionIdMapByRemoteSchemaVersionId:
				Map<RemoteSchemaVersionId, SchemaVersionId> = new Map();
			const localSchemaVersions: ISchemaVersion[] = [];
			const remoteSchemaVersions = data.schemaVersions;
			for (const schemaVersion of remoteSchemaVersions) {
				const schema = schemaVersion.schema;
				const localSchemaVersionView: MaxSchemaVersionView = maxVersionedMapBySchemaAndDomainNames
					.get(schema.domainName).get(schema.name);

				// const localSchemaIndex = localSchemaVersionView.index;
				// const remoteSchemaIndex = schema.index;
				// schema.index = localSchemaIndex;
				schema.index = localSchemaVersionView.index;
				// schemaIndexMapByRemoteSchemaIndex.set(remoteSchemaIndex, localSchemaIndex);

				const localSchemaVersionId = localSchemaVersionView.schemaVersionId;
				const remoteSchemaVersionId = schemaVersion.id;
				schemaVersionIdMapByRemoteSchemaVersionId.set(remoteSchemaVersionId,
					localSchemaVersionId);

				localSchemaVersions.push(schemaVersion);
			}
			data.schemaVersions = localSchemaVersions;

			for (const repoTransHistory of data.repoTransHistories) {
				delete repoTransHistory.id;
				for (const operationHistory of repoTransHistory.operationHistory) {
					delete operationHistory.id;
					const localSchemaVersionId
						= schemaVersionIdMapByRemoteSchemaVersionId.get(operationHistory.schemaVersion.id);
					usedSchemaIndexSet.add(localSchemaVersionId);
					operationHistory.schemaVersion.id = localSchemaVersionId;
					for (const recordHistory of operationHistory.recordHistory) {
						delete recordHistory.id;
					}
				}
			}
		}

		return usedSchemaIndexSet;
	}

	private updateActorReferences(
		dataMessages: IDataToTM[],
		actorMap: Map<ActorRandomId,
			Map<UserUniqueId,
				Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>
	): void {
		for (const dataMessage of dataMessages) {
			const data = dataMessage.data;
			const actorMapByRemoteActorId: Map<RemoteActorId, IActor> = new Map();
			const newActors: IActor[] = [];
			for (const actor of data.actors) {
				const localActor = actorMap.get(actor.randomId).get(actor.user.uniqueId).get(actor.terminal.name)
					.get(actor.terminal.secondId).get(actor.terminal.owner.uniqueId);
				actorMapByRemoteActorId.set(actor.id, localActor);
				newActors.push(localActor);
			}
			data.actors = newActors;

			for (const repoTransHistory of data.repoTransHistories) {
				repoTransHistory.actor = actorMapByRemoteActorId.get(repoTransHistory.actor.id);
				for (const operationHistory of repoTransHistory.operationHistory) {
					for (const recordHistory of operationHistory.recordHistory) {
						recordHistory.actor = actorMapByRemoteActorId.get(recordHistory.actor.id);
					}
				}
			}
		}
	}

	private updateRepositoryReferences(
		dataMessages: IDataToTM[],
		sharingNodeRepositoryMap: Map<SharingNodeId, Map<AgtRepositoryId, RepositoryId>>
	): void {
		for (const dataMessage of dataMessages) {
			const data = dataMessage.data;
			const repositoryMap = sharingNodeRepositoryMap.get(dataMessage.sharingNode.id);
			const repositoryId = repositoryMap.get(dataMessage.agtRepositoryId);
			data.repository.id = repositoryId;

			for (const repoTransHistory of data.repoTransHistories) {
				if (repoTransHistory.repository) {
					repoTransHistory.repository.id = repositoryId;
				}
			}
		}
	}

	private async recordSharingMessages(
		dataMessagesWithIncompatibleSchemas: IDataToTM[],
		dataMessagesToBeUpgraded: IDataToTM[],
		schemasWithChangesMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>,
		dataMessagesWithCompatibleSchemasAndData: IDataToTM[],
		sharingMessagesWithIncompatibleData: ISharingMessage[],
		missingRecordRepoTransBlocks: IMissingRecordRepoTransBlock[]
	): Promise<ISharingMessage[]> {
		// const sharingMessagesWithIncompatibleSchemas = dataMessagesWithIncompatibleSchemas.map((
		// 	dataMessagesWithIncompatibleSchemas
		// ) => {
		// 	/**
		// 	 * Record the messages (with data, because it cannot yet be processed) for messages
		// 	 * that require schema changes (new schemas or schema upgrades).
		// 	 */
		// 	return this.syncInUtils.createSharingMessage(
		// 		dataMessagesWithIncompatibleSchemas,
		// SharingMessageProcessingStatus.NEEDS_SCHEMA_CHANGES, true); }); const
		// sharingMessagesToBeUpgraded = dataMessagesToBeUpgraded.map(( dataMessageToBeUpgraded ) =>
		// { /** * Record the messages (with data, because it cannot yet be processed) for messages *
		// that need to be upgraded to schema versions present on this TM. * * Messages cannot yet be
		// processed since messages upgrades are done by the client * domain code and need to be sent
		// over to those domains for upgrading. */ return this.syncInUtils.createSharingMessage(
		// dataMessageToBeUpgraded, SharingMessageProcessingStatus.NEEDS_DATA_UPGRADES, true); });
		// const sharingMessagesWithCompatibleSchemasAndData =
		// dataMessagesWithCompatibleSchemasAndData.map(( sharingMessageWithCompatibleSchemas ) => {
		// return this.syncInUtils.createSharingMessage( sharingMessageWithCompatibleSchemas,
		// SharingMessageProcessingStatus.READY_FOR_PROCESSING, false); }); const
		// allSharingMessagesToCreate: ISharingMessage[] = [
		// ...sharingMessagesWithIncompatibleSchemas, ...sharingMessagesToBeUpgraded,
		// ...sharingMessagesWithIncompatibleData, ...sharingMessagesWithCompatibleSchemasAndData ];
		// await this.sharingMessageDao.bulkCreate( allSharingMessagesToCreate, false, false);

		const m: MissingRecordRepoTransBlock;

		if (missingRecordRepoTransBlocks.length) {
			await this.missingRecordRepoTransBlockDao.bulkCreate(
				missingRecordRepoTransBlocks, false, false);
		}


		// Record all schemas to change per sharing message with incompatible schemas
		const sharingMessagesSchemasToChange: IRepoTransBlockSchemasToChange[] = [];
		for (let i = 0; i < dataMessagesWithIncompatibleSchemas.length; i++) {
			const message: IDataToTM = dataMessagesWithIncompatibleSchemas[i];
			const sharingMessage: ISharingMessage = sharingMessagesWithIncompatibleSchemas[i];

			let allMessageSchemasAreCompatible = true;
			let messageBuildWithOutdatedSchemaVersions = false;
			// for every schema (at a given version) used in the message
			for (const schema of message.data.schemas) {
				let matchingSchema = this.findMatchingSchema(schemasWithChangesMap, schema);
				if (!matchingSchema) {
					continue;
				}

				// If a there was a schema that needs to be added or upgraded
				sharingMessagesSchemasToChange.push({
					sharingMessage,
					status: SchemaChangeStatus.CHANGE_NEEDED,
					schema: matchingSchema
				});
			}
		}
		await this.repoTransBlockSchemasToChangeDao.bulkCreate(
			sharingMessagesSchemasToChange, false, false);

		return sharingMessagesWithCompatibleSchemasAndData;
	}


	private findMatchingSchema(
		schemaMap: Map<SchemaDomainName, Map<SchemaName, ISchema>>,
		schema: ISchema
	) {
		const schemasForDomainName = schemaMap.get(schema.domainName);
		if (!schemasForDomainName) {
			return null;
		}

		return schemasForDomainName.get(schema.name);
	}

}
