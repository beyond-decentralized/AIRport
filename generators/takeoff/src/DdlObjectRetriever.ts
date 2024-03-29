import {
	IContext,
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	IDdlDomainDao,
	IDdlColumnDao,
	IDdlApplicationDao,
	IDdlEntityDao,
	IDdlPropertyColumnDao,
	IDdlPropertyDao,
	IDdlApplicationReferenceDao,
	IDdlRelationColumnDao,
	IDdlRelationDao,
	IDdlApplicationVersionDao,
	IApplicationApiClassDao,
	IApplicationApiOperationDao,
	IApplicationApiParameterDao,
	IApplicationApiReturnTypeDao
} from '@airport/airspace/dist/app/bundle'
import {
	Domain_LocalId,
	Application_Index,
	IApplication,
	IApplicationVersion,
	AppApiClass_LocalId,
	AppApiClass,
	AppApiOperation,
	AppApiOperation_LocalId,
	ApplicationVersion_LocalId,
	AppApiParameter,
	AppApiReturnType,
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
	applicationApiClassDao: IApplicationApiClassDao

	// @Inject()
	// applicationApiOperationDao: IApplicationApiOperationDao

	// @Inject()
	// applicationApiParameterDao: IApplicationApiParameterDao

	// @Inject()
	// applicationApiReturnTypeDao: IApplicationApiReturnTypeDao

	@Inject()
	dbColumnDao: IDdlColumnDao

	@Inject()
	ddlApplicationDao: IDdlApplicationDao

	@Inject()
	dbEntityDao: IDdlEntityDao

	@Inject()
	dbPropertyColumnDao: IDdlPropertyColumnDao

	@Inject()
	dbPropertyDao: IDdlPropertyDao

	@Inject()
	ddlApplicationReferenceDao: IDdlApplicationReferenceDao

	@Inject()
	dbRelationColumnDao: IDdlRelationColumnDao

	@Inject()
	dbRelationDao: IDdlRelationDao

	@Inject()
	ddlApplicationVersionDao: IDdlApplicationVersionDao

	@Inject()
	ddlDomainDao: IDdlDomainDao

	@Inject()
	terminalStore: ITerminalStore

	async retrieveDdlObjects(
		context: IContext
	): Promise<DdlObjects> {
		const applications = await this.ddlApplicationDao.findAllActive(context)
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

		const domains = await this.ddlDomainDao.findByIdIn(
			Array.from(domainIdSet), context)

		const allApplicationVersions = await this.ddlApplicationVersionDao
			.findAllActiveOrderByApplication_IndexAndId(context)
		const applicationVersionMapByLocalId: Map<ApplicationVersion_LocalId, IApplicationVersion>
			= new Map()

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
			applicationVersionMapByLocalId.set(applicationVersion._localId, applicationVersion)
		}

		const latestApplicationVersion_LocalIds = latestApplicationVersions.map(
			applicationVersion => applicationVersion._localId)

		const applicationReferences = await this.ddlApplicationReferenceDao
			.findAllForApplicationVersions(
				latestApplicationVersion_LocalIds, context)

		const entities = await this.dbEntityDao
			.findAllForApplicationVersions(
				latestApplicationVersion_LocalIds, context)
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

		const apiClasses = await this.applicationApiClassDao.findAll()

		let apiOperations: AppApiOperation[] = []
		let apiParameters: AppApiParameter[] = []
		let apiReturnTypes: AppApiReturnType[] = []
		for (const apiClass of apiClasses) {
			apiOperations = apiOperations.concat(apiClass.operations)
			for (const apiOperation of apiOperations) {
				apiOperation.parameters.sort((a, b) => a.index - b.index)
				apiParameters = apiParameters.concat(apiOperation.parameters)
				apiReturnTypes = apiReturnTypes.concat(apiOperation.returnType)
			}
		}

		/*
		const apiClassMapByLocalId: Map<AppApiClass_LocalId, AppApiClass> = new Map()
		for (const apiClass of apiClasses) {
			apiClassMapByLocalId.set(apiClass._localId, apiClass)
			const applicationVersion = applicationVersionMapByLocalId.get(apiClass.applicationVersion._localId)
			apiClass.applicationVersion = applicationVersion
		}

		const apiOperations = await this.applicationApiOperationDao.findAll()
		const apiOperationMapByLocalId: Map<AppApiOperation_LocalId, AppApiOperation> = new Map()
		for (const apiOperation of apiOperations) {
			apiOperationMapByLocalId.set(apiOperation._localId, apiOperation)
			const apiClass = apiClassMapByLocalId.get(apiOperation.apiClass._localId)
			apiOperation.apiClass = apiClass
			apiClass.operations.push(apiOperation)
		}

		const apiParameters = await this.applicationApiParameterDao.findAll()
		for (const apiParameter of apiParameters) {
			const apiOperation = apiOperationMapByLocalId.get(apiParameter.operation._localId)
			apiParameter.operation = apiOperation
			apiOperation.parameters.push(apiParameter)
		}

		const apiReturnTypes = await this.applicationApiReturnTypeDao.findAll()
		for(const apiReturnType of apiReturnTypes) {
			const apiOperation = apiOperationMapByLocalId.get(apiReturnType.operation._localId)
			apiReturnType.operation = apiOperation
			apiOperation.returnType.push(apiReturnType)
		}

		for (const apiOperation of apiOperations) {
			apiOperation.parameters.sort((a, b) => a.index - b.index)
		}
		*/

		const lastTerminalState = this.terminalStore.getTerminalState()

		const lastIds: ILastIds = {
			apiClasses: apiClasses.length,
			apiOperations: apiOperations.length,
			apiParameters: apiParameters.length,
			apiReturnTypes: apiReturnTypes.length,
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
			apiClasses,
			apiOperations,
			apiParameters,
			apiReturnTypes,
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
