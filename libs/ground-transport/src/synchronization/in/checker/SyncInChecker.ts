import {
	AgtRepositoryId,
	TerminalName,
	TerminalSecondId
} from '@airport/arrivals-n-departures'
import {
	container,
	DI
} from '@airport/di'
import {
	DomainName,
	SchemaIndex,
	SchemaName,
	SchemaVersionId
} from '@airport/ground-control'
import {
	IActor
} from '@airport/holding-pattern'
import {
	SchemaChangeStatus,
} from '@airport/moving-walkway'
import {
	ISchema,
	ISchemaVersion,
} from '@airport/traffic-pattern'
import {
	SYNC_IN_ACTOR_CHECKER,
	SYNC_IN_CHECKER,
	SYNC_IN_DATA_CHECKER,
	SYNC_IN_REPO_CHECKER,
	SYNC_IN_REPO_TRANS_BLOCK_CREATOR,
	SYNC_IN_SCHEMA_CHECKER
} from '../../../tokens'
import { MessageToTM } from '../../types'
import {
	IDataToTM,
	RemoteActorId,
	RemoteSchemaVersionId
} from '../SyncInUtils'

export interface CheckSchemasResult {
	dataMessagesToBeUpgraded: IDataToTM[];
	dataMessagesWithCompatibleSchemasAndData: IDataToTM[];
	dataMessagesWithIncompatibleSchemas: IDataToTM[];
	dataMessagesWithMissingData: IDataToTM[];
	usedSchemaVersionIdSet: Set<SchemaIndex>;
}

export interface CheckResults {
	messageHasCompatibleSchemas: boolean
	messageHasValidData: boolean
}

export interface ISyncInChecker {

	checkSchemasAndDataAndRecordRepoTransBlocks(
		message: MessageToTM
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
		message: MessageToTM
	): Promise<CheckResults> {
		// FIXME: replace as many DB lookups as possible with Terminal State lookups

		const [syncInActorChecker, syncInDataChecker, syncInRepositoryChecker,
			syncInSchemaChecker, syncInRepoTransBlockCreator] = await container(this).get(
				SYNC_IN_ACTOR_CHECKER, SYNC_IN_DATA_CHECKER, SYNC_IN_REPO_CHECKER,
				SYNC_IN_SCHEMA_CHECKER, SYNC_IN_REPO_TRANS_BLOCK_CREATOR)

		if (!await syncInSchemaChecker.checkSchemas(message)) {
			return {
				messageHasCompatibleSchemas: false,
				messageHasValidData: null
			}
		}

		const {
			actorMap,
			actorMapById,
			consistentMessages
		} = await syncInActorChecker.ensureActorsAndGetAsMaps(
			dataMessages, dataMessagesWithInvalidData)


		const { consistentMessages, sharingNodeRepositoryMap }
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

	private updateActorReferences(
		dataMessages: IDataToTM[],
		actorMap: Map<ActorRandomId,
			Map<UserUniqueId,
				Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>
	): void {
		for (const dataMessage of dataMessages) {
			const data = dataMessage.data
			const actorMapByRemoteActorId: Map<RemoteActorId, IActor> = new Map()
			const newActors: IActor[] = []
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
			const data = dataMessage.data
			const repositoryMap = sharingNodeRepositoryMap.get(dataMessage.sharingMessage.sharingNode.id)
			const repositoryId = repositoryMap.get(dataMessage.agtRepositoryId)
			data.repository.id = repositoryId

			for (const repoTransHistory of data.repoTransHistories) {
				if (repoTransHistory.repository) {
					repoTransHistory.repository.id = repositoryId
				}
			}
		}
	}

}

DI.set(SYNC_IN_CHECKER, SyncInChecker)
