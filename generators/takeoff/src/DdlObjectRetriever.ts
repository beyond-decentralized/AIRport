import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IApplication,
	IApplicationVersion,
	IDomainDao,
	IApplicationColumnDao,
	IApplicationDao,
	IApplicationEntityDao,
	IApplicationPropertyColumnDao,
	IApplicationPropertyDao,
	IApplicationReferenceDao,
	IApplicationRelationColumnDao,
	IApplicationRelationDao,
	IApplicationVersionDao
} from '@airport/airspace'
import {
	Domain_LocalId,
	Application_Index,
} from '@airport/ground-control'
import type { LastIds } from '@airport/apron'
import { DdlObjects, ITerminalStore } from '@airport/terminal-map'

export interface IDdlObjectRetriever {

	retrieveDdlObjects()
		: Promise<DdlObjects>

}

@Injected()
export class DdlObjectRetriever
	implements IDdlObjectRetriever {

	@Inject()
	applicationColumnDao: IApplicationColumnDao

	@Inject()
	applicationDao: IApplicationDao

	@Inject()
	applicationEntityDao: IApplicationEntityDao

	@Inject()
	applicationPropertyColumnDao: IApplicationPropertyColumnDao

	@Inject()
	applicationPropertyDao: IApplicationPropertyDao

	@Inject()
	applicationReferenceDao: IApplicationReferenceDao

	@Inject()
	applicationRelationColumnDao: IApplicationRelationColumnDao

	@Inject()
	applicationRelationDao: IApplicationRelationDao

	@Inject()
	applicationVersionDao: IApplicationVersionDao

	@Inject()
	domainDao: IDomainDao

	@Inject()
	terminalStore: ITerminalStore

	async retrieveDdlObjects(): Promise<DdlObjects> {
		const applications = await this.applicationDao.findAllActive()
		const applicationIndexes: Application_Index[] = []
		const domainIdSet: Set<Domain_LocalId> = new Set()
		applications.forEach(
			application => {
				applicationIndexes.push(application.index)
				domainIdSet.add(application.domain._localId)
			})
		applications.sort((
			application1: IApplication,
			application2: IApplication
		) => {
			return application1.index - application2.index
		})

		const domains = await this.domainDao.findByIdIn(Array.from(domainIdSet))

		const allApplicationVersions = await this.applicationVersionDao
			.findAllActiveOrderByApplication_IndexAndId()

		let lastApplication_Index: Application_Index
		// const allApplicationVersionsByIds: IApplicationVersion[] = []
		const latestApplicationVersions: IApplicationVersion[] = []
		const applicationVersions: IApplicationVersion[] = []
		for (const applicationVersion of allApplicationVersions) {
			if (applicationVersion.application.index !== lastApplication_Index) {
				latestApplicationVersions.push(applicationVersion)
			}
			// allApplicationVersionsByIds[applicationVersion._localId] = applicationVersion
			lastApplication_Index = applicationVersion.application.index
			applicationVersions.push(applicationVersion)
		}

		const latestApplicationVersion_LocalIds = latestApplicationVersions.map(
			applicationVersion => applicationVersion._localId)

		const applicationReferences = await this.applicationReferenceDao
			.findAllForApplicationVersions(latestApplicationVersion_LocalIds)

		const entities = await this.applicationEntityDao
			.findAllForApplicationVersions(latestApplicationVersion_LocalIds)
		const entityIds = entities.map(
			entity => entity._localId)
		/*
		const entityIds = entities.map(
	entity => {
		if (entity.tableConfig) {
			entity.tableConfig = JSON.parse(entity.tableConfig as any)
		}
		return entity._localId
	})
		 */

		const properties = await this.applicationPropertyDao
			.findAllForEntities(entityIds)
		const propertyIds = properties.map(
			property => property._localId)

		const relations = await this.applicationRelationDao
			.findAllForProperties(propertyIds)

		const columns = await this.applicationColumnDao
			.findAllForEntities(entityIds)
		const columnIds = columns.map(
			column => column._localId)

		const propertyColumns = await this.applicationPropertyColumnDao
			.findAllForColumns(columnIds)

		const relationColumns = await this.applicationRelationColumnDao
			.findAllForColumns(columnIds)

		const lastTerminalState = this.terminalStore.getTerminalState()


		const lastIds: LastIds = {
			columns: columns.length,
			domains: domains.length,
			entities: entities.length,
			properties: properties.length,
			propertyColumns: propertyColumns.length,
			relationColumns: relationColumns.length,
			relations: relations.length,
			applications: applications.length,
			applicationVersions: applicationVersions.length,
		}
		this.terminalStore.state.next({
			...lastTerminalState,
			lastIds
		})

		return {
			// allDomains: domains,
			// allApplications: applications,
			// allApplicationVersionsByIds,
			columns,
			domains,
			entities,
			latestApplicationVersions,
			properties,
			propertyColumns,
			relationColumns,
			relations,
			applicationReferences,
			applications,
			applicationVersions
		}
	}

}
