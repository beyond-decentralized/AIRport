import { ISyncInApplicationVersionChecker } from './SyncInApplicationVersionChecker';
import { ISyncInActorChecker } from './SyncInActorChecker';
import { ISyncInApplicationChecker } from './SyncInApplicationChecker';
import { ISyncInDataChecker } from './SyncInDataChecker';
import { IRepositoriesAndMembersCheckResult, ISyncInRepositoryChecker } from './SyncInRepositoryChecker';
import { ISyncInTerminalChecker } from './SyncInTerminalChecker';
import { ISyncInUserAccountChecker } from './SyncInUserAccountChecker';
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { DbEntity_LocalId, DbRelation_Index, DbRelation, IDatastructureUtils, KeyUtils, SyncRepositoryData, SyncRepositoryMessage, Repository_GUID, IRepository, RepositoryMember_PublicSigningKey, IRepositoryMember } from '@airport/ground-control';
import { ITerminalStore } from '@airport/terminal-map';

export interface ISyncInChecker {

	checkMessage(
		message: SyncRepositoryMessage,
		addedRepositoryMapByGUID: Map<Repository_GUID, IRepository>,
		addedRepositoryMembersByRepositoryGUIDAndPublicSigningKey: Map<Repository_GUID, Map<RepositoryMember_PublicSigningKey, IRepositoryMember>>,
		context: IContext
	): Promise<IMessageCheckResult>

	checkReferencedApplicationRelations(
		data: SyncRepositoryData
	): void

}

export interface IMessageCheckResult
	extends IRepositoriesAndMembersCheckResult {
	// Delay processing of ledger tables because it might require
	// loading of additional Apps
	areAppsLoaded: boolean
}

@Injected()
export class SyncInChecker
	implements ISyncInChecker {

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	keyUtils: KeyUtils

	@Inject()
	syncInActorChecker: ISyncInActorChecker

	@Inject()
	syncInApplicationChecker: ISyncInApplicationChecker

	@Inject()
	syncInApplicationVersionChecker: ISyncInApplicationVersionChecker

	@Inject()
	syncInDataChecker: ISyncInDataChecker

	@Inject()
	syncInRepositoryChecker: ISyncInRepositoryChecker

	@Inject()
	syncInTerminalChecker: ISyncInTerminalChecker

	@Inject()
	syncInUserAccountChecker: ISyncInUserAccountChecker

	@Inject()
	terminalStore: ITerminalStore

	/**
	 * Check the message and load all required auxiliary entities.
	 */
	async checkMessage(
		message: SyncRepositoryMessage,
		addedRepositoryMapByGUID: Map<Repository_GUID, IRepository>,
		addedRepositoryMembersByRepositoryGUIDAndPublicSigningKey: Map<Repository_GUID, Map<RepositoryMember_PublicSigningKey, IRepositoryMember>>,
		context: IContext
	): Promise<IMessageCheckResult> {
		// FIXME: replace as many DB lookups as possible with Terminal State lookups
		let data = message.data

		// Serialize before object starts to be interlinked
		let serializedData = JSON.stringify(data)

		const applicationCheck = await this.syncInApplicationChecker.ensureApplications(data, context)
		if (!applicationCheck.isInstalled) {
			return {
				areAppsLoaded: false,
				isValid: applicationCheck.isValid
			}
		}

		let invalidResult = {
			areAppsLoaded: true,
			isValid: false
		}

		if (!applicationCheck.isValid) {
			return invalidResult
		}


		if (! await this.syncInUserAccountChecker.ensureUserAccounts(data, context)) {
			return invalidResult
		}
		if (! await this.syncInTerminalChecker.ensureTerminals(data, context)) {
			return invalidResult
		}
		if (! await this.syncInActorChecker.ensureActors(data, context)) {
			return invalidResult
		}

		const dataCheckResult = this.syncInDataChecker.checkData(message)

		const repositoryAndMemberCheckResult = await this.syncInRepositoryChecker
			.checkRepositoriesAndMembers(message, addedRepositoryMapByGUID,
				addedRepositoryMembersByRepositoryGUIDAndPublicSigningKey, context)
		if (!repositoryAndMemberCheckResult.isValid) {
			return invalidResult
		}

		for (const signatureCheck of repositoryAndMemberCheckResult.signatureChecks) {
			if (!this.keyUtils.verify(serializedData,
				signatureCheck.signatureToCheck,
				signatureCheck.publicSigningKey)) {
				console.error(`message.${signatureCheck.signatureName} is not valid.`)
				return invalidResult
			}
		}

		return {
			areAppsLoaded: true,
			...dataCheckResult,
			...repositoryAndMemberCheckResult
		}
	}

	checkReferencedApplicationRelations(
		data: SyncRepositoryData
	): void {
		// TODO: check referencedApplicationRelations
		data.referencedApplicationVersions
		const applicationEntityMap = this.syncInDataChecker.populateApplicationEntityMap(data.referencedApplicationVersions)
		const applicationRelationMap: Map<DbEntity_LocalId, Map<DbRelation_Index, DbRelation>> = new Map()

		for (let i = 0; i < data.referencedApplicationRelations.length; i++) {
			const referencedRelation = data.referencedApplicationRelations[i]

			if (typeof referencedRelation !== 'object') {
				throw new Error(`Invalid referencedApplicationRelations[${i}] objectg`)
			}
			if (typeof referencedRelation.index !== 'number') {
				throw new Error(`Expecting "index" (number)
					in 'referencedApplicationRelations[${i}].index'`)
			}

			const referencedEntity = referencedRelation.entity
			if (typeof referencedEntity !== 'object') {
				throw new Error(`Invalid referencedApplicationRelations[${i}].entity`)
			}
			if (typeof referencedEntity.applicationVersion !== 'number') {
				throw new Error(`Expecting "in-message index" (number)
					in 'referencedApplicationRelations[${i}].entity.applicationVersion'`)
			}
			if (typeof referencedEntity.index !== 'number') {
				throw new Error(`Expecting "index" (number)
					in 'referencedApplicationRelations[${i}].entity.index'`)
			}

			const messageApplicationVersion = data
				.referencedApplicationVersions[referencedEntity.applicationVersion as any]
			if (!messageApplicationVersion) {
				throw new Error(
					`No Application Version with in-message index ${referencedEntity.applicationVersion}.
Declared in 'referencedApplicationRelations[${i}].entity.applicationVersion'`
				)
			}

			const applicationEntity = applicationEntityMap.get(messageApplicationVersion.application.domain.name)
				.get(messageApplicationVersion.application.name).get(referencedEntity.index)
			if (!applicationEntity) {
				throw new Error(`Invalid referencedApplicationRelations[${i}].entity.index: ${referencedEntity.index}`)
			}

			const applicationRelationsForEntityMap = this.datastructureUtils.ensureChildJsMap(applicationRelationMap, applicationEntity._localId)
			let applicationRelation = applicationRelationsForEntityMap.get(referencedRelation.index)
			if (applicationRelation) {
				throw new Error(`referencedApplicationRelations[${i}].index: ${referencedRelation.index} is defined more than once`)
			}
			for (const relation of applicationEntity.relations) {
				if (relation.index === referencedRelation.index) {
					applicationRelation = relation
					break
				}
			}
			if (!applicationRelation) {
				throw new Error(`Invalid referencedApplicationRelations[${i}].index: ${referencedRelation.index}`)
			}
			applicationRelationsForEntityMap.set(referencedRelation.index, applicationRelation)

			data.referencedApplicationRelations[i] = applicationRelation
		}
	}
}
