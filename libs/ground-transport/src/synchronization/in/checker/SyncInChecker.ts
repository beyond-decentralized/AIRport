import {
	RepositorySynchronizationData, RepositorySynchronizationMessage,
} from '@airport/arrivals-n-departures'
import { IApplicationVersionCheckRecord, ISyncInApplicationVersionChecker } from './SyncInApplicationVersionChecker';
import { ISyncInActorChecker } from './SyncInActorChecker';
import { ISyncInApplicationChecker } from './SyncInApplicationChecker';
import { IDataCheckResult, ISyncInDataChecker } from './SyncInDataChecker';
import { ISyncInRepositoryChecker } from './SyncInRepositoryChecker';
import { ISyncInTerminalChecker } from './SyncInTerminalChecker';
import { ISyncInUserAccountChecker } from './SyncInUserAccountChecker';
import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import { ApplicationEntity_LocalId, ApplicationRelation_Index, Application_Name, Domain_Name, IDatastructureUtils } from '@airport/ground-control';
import { ITerminalStore } from '@airport/terminal-map';
import { IApplicationRelation } from '@airport/airspace';

export interface ISyncInChecker {

	checkData(
		data: RepositorySynchronizationMessage,
		context: IContext
	): Promise<IDataCheckResult>

	checkReferencedApplicationRelations(
		data: RepositorySynchronizationData,
		applicationCheckMap: Map<Domain_Name, Map<Application_Name, IApplicationVersionCheckRecord>>,
		context: IContext
	): Promise<void>

}

@Injected()
export class SyncInChecker
	implements ISyncInChecker {

	@Inject()
	datastructureUtils: IDatastructureUtils

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
	async checkData(
		message: RepositorySynchronizationMessage,
		context: IContext
	): Promise<IDataCheckResult> {
		// FIXME: replace as many DB lookups as possible with Terminal State lookups

		let data = message.data

		if (! await this.syncInUserAccountChecker.ensureUserAccounts(data, context)) {
			return {
				isValid: false
			}
		}
		if (! await this.syncInTerminalChecker.ensureTerminals(data, context)) {
			return {
				isValid: false
			}
		}
		if (! await this.syncInApplicationChecker.ensureApplications(data, context)) {
			return {
				isValid: false
			}
		}
		if (! await this.syncInActorChecker.ensureActors(data, context)) {
			return {
				isValid: false
			}
		}
		if (! await this.syncInRepositoryChecker.ensureRepositories(data, context)) {
			return {
				isValid: false
			}
		}
		if (!await this.syncInApplicationVersionChecker.ensureApplicationVersions(
			data.applicationVersions, data.applications, context)) {
			return {
				isValid: false
			}
		}


		return await this.syncInDataChecker.checkData(message, context)
	}

	async checkReferencedApplicationRelations(
		data: RepositorySynchronizationData,
		_context: IContext
	): Promise<void> {
		// TODO: check referencedApplicationRelations
		data.referencedApplicationVersions
		const applicationEntityMap = await this.syncInDataChecker.populateApplicationEntityMap(data.referencedApplicationVersions)
		const applicationRelationMap: Map<ApplicationEntity_LocalId, Map<ApplicationRelation_Index, IApplicationRelation>> = new Map()

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
