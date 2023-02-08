import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IDbDomainDao,
	IDbColumnDao,
	IDbApplicationDao,
	IDbEntityDao,
	IDbPropertyColumnDao,
	IDbPropertyDao,
	IDbApplicationReferenceDao,
	IDbRelationColumnDao,
	IDbRelationDao,
	IDbApplicationVersionDao
} from '@airport/airspace/dist/app/bundle'
import {
	DbDomain_LocalId,
	DbApplication_Index,
	DbApplication,
	DbApplicationVersion,
} from '@airport/ground-control'
import { DdlObjects, ITerminalStore } from '@airport/terminal-map'
import { ILastIds } from '@airport/air-traffic-control'

export interface IDdlObjectRetriever {

	retrieveDdlObjects(
		context: IContext
	)
		: Promise<DdlObjects>

}

@Injected()
export class DdlObjectRetriever
	implements IDdlObjectRetriever {

	@Inject()
	dbColumnDao: IDbColumnDao

	@Inject()
	dbApplicationDao: IDbApplicationDao

	@Inject()
	dbEntityDao: IDbEntityDao

	@Inject()
	dbPropertyColumnDao: IDbPropertyColumnDao

	@Inject()
	dbPropertyDao: IDbPropertyDao

	@Inject()
	dbApplicationReferenceDao: IDbApplicationReferenceDao

	@Inject()
	dbRelationColumnDao: IDbRelationColumnDao

	@Inject()
	dbRelationDao: IDbRelationDao

	@Inject()
	dbApplicationVersionDao: IDbApplicationVersionDao

	@Inject()
	dbDomainDao: IDbDomainDao

	@Inject()
	terminalStore: ITerminalStore

	async retrieveDdlObjects(
		context: IContext
	): Promise<DdlObjects> {
		const applications = await this.dbApplicationDao.findAllActive(context)
		const applicationIndexes: DbApplication_Index[] = []
		const domainIdSet: Set<DbDomain_LocalId> = new Set()
		applications.forEach(
			application => {
				applicationIndexes.push(application.index)
				domainIdSet.add(application.domain._localId)
			})
		applications.sort((
			application1: DbApplication,
			application2: DbApplication
		) => {
			return application1.index - application2.index
		})

		const domains = await this.dbDomainDao.findByIdIn(
			Array.from(domainIdSet), context)

		const allApplicationVersions = await this.dbApplicationVersionDao
			.findAllActiveOrderByDbApplication_IndexAndId(context)

		let lastDbApplication_Index: DbApplication_Index
		// const allApplicationVersionsByIds: DbApplicationVersion[] = []
		const latestApplicationVersions: DbApplicationVersion[] = []
		const applicationVersions: DbApplicationVersion[] = []
		for (const applicationVersion of allApplicationVersions) {
			if (applicationVersion.application.index !== lastDbApplication_Index) {
				latestApplicationVersions.push(applicationVersion)
			}
			// allApplicationVersionsByIds[applicationVersion._localId] = applicationVersion
			lastDbApplication_Index = applicationVersion.application.index
			applicationVersions.push(applicationVersion)
		}

		const latestDbApplicationVersion_LocalIds = latestApplicationVersions.map(
			applicationVersion => applicationVersion._localId)

		const applicationReferences = await this.dbApplicationReferenceDao
			.findAllForApplicationVersions(
				latestDbApplicationVersion_LocalIds, context)

		const entities = await this.dbEntityDao
			.findAllForApplicationVersions(
				latestDbApplicationVersion_LocalIds, context)
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

		const properties = await this.dbPropertyDao
			.findAllForEntities(entityIds, context)
		const propertyIds = properties.map(
			property => property._localId)

		const relations = await this.dbRelationDao
			.findAllForProperties(propertyIds, context)

		const columns = await this.dbColumnDao
			.findAllForEntities(entityIds, context)
		const columnIds = columns.map(
			column => column._localId)

		const propertyColumns = await this.dbPropertyColumnDao
			.findAllForColumns(columnIds, context)

		const relationColumns = await this.dbRelationColumnDao
			.findAllForColumns(columnIds, context)

		const lastTerminalState = this.terminalStore.getTerminalState()


		const lastIds: ILastIds = {
			columns: columns.length,
			domains: domains.length,
			entities: entities.length,
			properties: properties.length,
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
