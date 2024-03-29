import {
	ApplicationStatus,
	Domain_Name,
	Application_FullName,
	IApplicationNameUtils,
	DbColumn_IdIndex,
	JsonApplication,
	IDatastructureUtils,
	IDomain,
	IApplication,
	IApplicationVersion,
	DbEntity,
	DbProperty,
	DbRelation,
	DbColumn,
	DbPropertyColumn,
	DbRelationColumn,
	IApplicationCurrentVersion,
	IApplicationReference,
	AppApiClass,
	AppApiOperation,
	AppApiParameter,
	AppApiReturnType,
} from '@airport/ground-control';
import {
	AllDdlObjects,
	DdlObjects,
	IDomainRetriever,
	ITerminalStore
} from '@airport/terminal-map';
import { IApplicationLocator } from '../locator/ApplicationLocator';
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import { JsonApplicationWithLastIds } from '@airport/air-traffic-control';

export interface IApplicationComposer {

	compose(
		jsonApplications: JsonApplicationWithLastIds[],
		context: IApplicationComposerContext
	): Promise<AllDdlObjects>;

}

export interface IApplicationComposerContext {
	terminalStore: ITerminalStore,
	// is true inside AIRport apps to load all of the necessary Application Q objects
	deepTraverseReferences?: boolean
}

@Injected()
export class ApplicationComposer
	implements IApplicationComposer {

	@Inject()
	applicationLocator: IApplicationLocator

	@Inject()
	datastructureUtils: IDatastructureUtils

	@Inject()
	applicationNameUtils: IApplicationNameUtils

	@Inject()
	domainRetriever: IDomainRetriever

	@Inject()
	terminalStore: ITerminalStore

	async compose(
		jsonApplications: JsonApplicationWithLastIds[],
		context: IApplicationComposerContext
	): Promise<AllDdlObjects> {
		// NOTE: application name contains domain name as a prefix
		const jsonApplicationMapByFullName: Map<Application_FullName, JsonApplicationWithLastIds> = new Map();

		const terminalStore = context.terminalStore
		const allDomains = terminalStore.getDomains().slice()
		const domainMapByName: Map<Domain_Name, IDomain> = new Map()
		for (const domain of allDomains) {
			domainMapByName.set(domain.name, domain)
		}

		const allApplications: IApplication[] = terminalStore.getApplications().slice()
		// NOTE: application fullName contains domain name as a prefix
		const applicationMapByFullName: Map<Application_FullName, IApplication> = new Map()
		for (const application of allApplications) {
			applicationMapByFullName.set(application.fullName, application)
		}

		const newLatestApplicationVersions: IApplicationVersion[] = []
		const newApplicationVersionMapByApplication_Name: Map<Application_FullName, IApplicationVersion> = new Map()
		const newEntitiesMapByApplication_Name: Map<Application_FullName, DbEntity[]> = new Map()
		const newPropertiesMap: Map<Application_FullName, DbProperty[][]> = new Map()
		const newRelationsMap: Map<Application_FullName, DbRelation[][]> = new Map()
		const newColumnsMap: Map<Application_FullName, DbColumn[][]> = new Map()

		const added: DdlObjects = {
			apiClasses: [],
			apiOperations: [],
			apiParameters: [],
			apiReturnTypes: [],
			columns: [],
			domains: [],
			entities: [],
			latestApplicationVersions: [],
			properties: [],
			propertyColumns: [],
			relationColumns: [],
			relations: [],
			applicationReferences: [],
			applications: [],
			applicationVersions: []
		}
		const allApplicationVersionsByIds: IApplicationVersion[] = [...terminalStore.getAllApplicationVersionsByIds()];
		const all: DdlObjects = {
			apiClasses: [],
			apiOperations: [],
			apiParameters: [],
			apiReturnTypes: [],
			columns: [], //
			domains: [], //
			entities: [], //
			latestApplicationVersions: [], //
			properties: [], //
			propertyColumns: [],
			relationColumns: [],
			relations: [], //
			applicationReferences: [], //
			applications: [], //
			applicationVersions: [] //
		}
		const allDdlObjects: AllDdlObjects = {
			all,
			allApplicationVersionsByIds,
			added
		}

		for (const jsonApplication of jsonApplications) {
			jsonApplicationMapByFullName.set(this.applicationNameUtils.
				getApplication_FullName(jsonApplication), jsonApplication);
			const domain = await this.composeDomain(jsonApplication.domain,
				allDomains, added.domains, domainMapByName)
			const application = this.composeApplication(domain, jsonApplication, allApplications, added.applications, applicationMapByFullName)
			this.composeApplicationVersion(jsonApplication, application,
				newLatestApplicationVersions, added.applicationVersions, newApplicationVersionMapByApplication_Name)
		}

		const {
			newApplicationReferenceMap,
			newApplicationReferences
		} = await this.composeApplicationReferences(jsonApplicationMapByFullName,
			newApplicationVersionMapByApplication_Name, terminalStore,
			allDdlObjects, context.deepTraverseReferences)

		added.applicationReferences = newApplicationReferences

		for (const applicationVersion of allApplicationVersionsByIds) {
			if (applicationVersion) {
				this.addApplicationVersionObjects(applicationVersion, all)
			}
		}

		for (const jsonApplication of jsonApplications) {
			const fullApplication_Name = this.applicationNameUtils.
				getApplication_FullName(jsonApplication)
			jsonApplicationMapByFullName.set(fullApplication_Name, jsonApplication);

			const domain = domainMapByName.get(jsonApplication.domain)
			const application = applicationMapByFullName.get(this.applicationNameUtils.
				getApplication_FullName(jsonApplication))
			if (!application.index) {
				jsonApplication.lastIds = {
					...this.terminalStore.getLastIds()
				}
				application.index = ++this.terminalStore.getLastIds().applications
			}
			if (!domain._localId) {
				domain._localId = ++this.terminalStore.getLastIds().domains
			}
			const applicationVersion = newApplicationVersionMapByApplication_Name
				.get(application.fullName)
			if (!applicationVersion._localId) {
				applicationVersion._localId = ++this.terminalStore.getLastIds().applicationVersions
				applicationVersion.jsonApplication = jsonApplication
			}

			this.composeApplicationEntities(jsonApplication, applicationVersion,
				newEntitiesMapByApplication_Name, added.entities)
			this.composeApplicationProperties(jsonApplication, applicationVersion,
				added.properties, newPropertiesMap,
				newEntitiesMapByApplication_Name)
			this.composeApplicationRelations(jsonApplication, applicationVersion,
				added.relations, newRelationsMap,
				newEntitiesMapByApplication_Name, newPropertiesMap, newApplicationReferenceMap,
				terminalStore, allDdlObjects
			)
			this.composeApplicationColumns(
				jsonApplication, applicationVersion,
				added.columns, newColumnsMap,
				added.propertyColumns, newEntitiesMapByApplication_Name, newPropertiesMap)
			this.composeApplicationRelationColumns(
				jsonApplication, applicationVersion,
				added.relationColumns, newApplicationVersionMapByApplication_Name,
				newApplicationReferenceMap, newRelationsMap,
				newColumnsMap, terminalStore, allDdlObjects)
			this.composeApplicationApis(jsonApplication, applicationVersion,
				added.apiClasses, added.apiOperations,
				added.apiParameters, added.apiReturnTypes)
		}

		this.addObjects(allDdlObjects.added, allDdlObjects.all)

		for (const applicationVersion of allDdlObjects.all.applicationVersions) {
			allDdlObjects.allApplicationVersionsByIds[applicationVersion._localId] = applicationVersion
		}

		return allDdlObjects;
	}

	getExistingLatestApplicationVersion(
		referencedApplication_Name: Application_FullName,
		allDdlObjects: AllDdlObjects
	): IApplicationVersion {
		for (const latestApplicationVersion of allDdlObjects.all.latestApplicationVersions) {
			if (latestApplicationVersion.application.fullName == referencedApplication_Name) {
				return latestApplicationVersion;
			}
		}
		throw new Error(`Cannot find application "${referencedApplication_Name}".`);
	}

	private addApplicationVersionObjects(
		applicationVersion: IApplicationVersion,
		ddlObjects: DdlObjects,
	) {
		let foundDomain = false
		for (const domain of ddlObjects.domains) {
			if (domain.name === applicationVersion.application.domain.name) {
				foundDomain = true
				break
			}
		}
		if (!foundDomain) {
			ddlObjects.domains.push(applicationVersion.application.domain)
		}
		let foundApplication = false
		for (const application of ddlObjects.applications) {
			if (application.domain === applicationVersion.application.domain
				&& application.name === applicationVersion.application.name) {
				foundApplication = true
				break
			}
		}
		if (!foundApplication) {
			ddlObjects.applications.push(applicationVersion.application)
		}
		ddlObjects.applicationVersions.push(applicationVersion)
		ddlObjects.latestApplicationVersions.push(applicationVersion)
		ddlObjects.applicationReferences = ddlObjects.applicationReferences
			.concat(applicationVersion.references)
		ddlObjects.entities = ddlObjects.entities.concat(applicationVersion.entities)

		for (const entity of applicationVersion.entities) {
			ddlObjects.columns = ddlObjects.columns.concat(entity.columns)
			ddlObjects.properties = ddlObjects.properties.concat(entity.properties)
			let entityPropertyColumns: DbPropertyColumn[] = []
			for (const property of entity.properties) {
				entityPropertyColumns = entityPropertyColumns
					.concat(property.propertyColumns)
			}
			ddlObjects.propertyColumns = ddlObjects.propertyColumns
				.concat(entityPropertyColumns)
			ddlObjects.relations = ddlObjects.relations.concat(entity.relations)
			let entityRelationColumns: DbRelationColumn[] = []
			for (const relation of entity.relations) {
				entityRelationColumns = entityRelationColumns
					.concat(relation.manyRelationColumns)
			}
			ddlObjects.relationColumns = ddlObjects.relationColumns
				.concat(entityRelationColumns)
		}

	}

	private addObjects(
		fromObjects: DdlObjects,
		toObjects: DdlObjects
	): void {
		toObjects.columns = toObjects.columns.concat(fromObjects.columns)

		for (const fromDomain of fromObjects.domains) {
			let foundDomain = false
			for (const toDomain of toObjects.domains) {
				if (toDomain.name === fromDomain.name) {
					foundDomain = true
					break
				}
			}
			if (!foundDomain) {
				toObjects.domains.push(fromDomain)
			}
		}
		toObjects.apiClasses = toObjects.apiClasses.concat(fromObjects.apiClasses)
		toObjects.apiOperations = toObjects.apiOperations.concat(fromObjects.apiOperations)
		toObjects.apiParameters = toObjects.apiParameters.concat(fromObjects.apiParameters)
		toObjects.apiReturnTypes = toObjects.apiReturnTypes.concat(fromObjects.apiReturnTypes)
		toObjects.entities = toObjects.entities.concat(fromObjects.entities)
		toObjects.latestApplicationVersions = toObjects.latestApplicationVersions
			.concat(fromObjects.latestApplicationVersions)
		toObjects.properties = toObjects.properties.concat(fromObjects.properties)
		toObjects.propertyColumns = toObjects.propertyColumns
			.concat(fromObjects.propertyColumns)
		toObjects.relationColumns = toObjects.relationColumns
			.concat(fromObjects.relationColumns)
		toObjects.relations = toObjects.relations.concat(fromObjects.relations)

		for (const fromApplication of fromObjects.applications) {
			let foundApplication = false
			for (const toApplication of toObjects.applications) {
				if (toApplication.domain === fromApplication.domain
					&& toApplication.name === fromApplication.name) {
					foundApplication = true
					break
				}
			}
			if (!foundApplication) {
				toObjects.applications.push(fromApplication)
			}
		}
		toObjects.applicationReferences = toObjects.applicationReferences
			.concat(fromObjects.applicationReferences)
		toObjects.applicationVersions = toObjects.applicationVersions
			.concat(fromObjects.applicationVersions)
	}

	private async composeDomain(
		domainName: Domain_Name,
		allDomains: IDomain[],
		newDomains: IDomain[],
		domainMapByName: Map<Domain_Name, IDomain>,
	): Promise<IDomain> {
		let domain = await this.domainRetriever.retrieveDomain(
			domainName, domainMapByName as any, allDomains as any, newDomains as any
		) as IDomain
		if (!domain) {
			domain = {
				_localId: null,
				name: domainName,
				applications: []
			}
			allDomains.push(domain)
			newDomains.push(domain)
			domainMapByName.set(domainName, domain)
		}

		return domain
	}

	private composeApplication(
		domain: IDomain,
		jsonApplication: JsonApplicationWithLastIds,
		allApplications: IApplication[],
		newApplications: IApplication[],
		applicationMapByFullName: Map<Application_FullName, IApplication>
	): IApplication {
		const fullApplication_Name = this.applicationNameUtils.
			getApplication_FullName(jsonApplication)
		let application = applicationMapByFullName.get(fullApplication_Name)
		if (!application) {
			application = {
				currentVersion: [],
				domain,
				index: null,
				fullName: fullApplication_Name,
				name: jsonApplication.name,
				scope: 'public',
				publicSigningKey: 'localhost',
				status: ApplicationStatus.CURRENT,
				versions: []
			};
			allApplications.push(application);
			newApplications.push(application);
			applicationMapByFullName.set(fullApplication_Name, application)
		}

		return application
	}

	private composeApplicationVersion(
		jsonApplication: JsonApplicationWithLastIds,
		application: IApplication,
		newLatestApplicationVersions: IApplicationVersion[],
		newApplicationVersions: IApplicationVersion[],
		newApplicationVersionMapByApplication_Name: Map<Application_FullName, IApplicationVersion>
	): IApplicationVersion {
		// Application versions are guaranteed to be new
		let newApplicationVersion: IApplicationVersion;
		for (const applicationVersion of jsonApplication.versions) {
			const versionParts = applicationVersion.versionString.split('.');
			newApplicationVersion = {
				_localId: null,
				integerVersion: applicationVersion.integerVersion,
				versionString: applicationVersion.versionString,
				majorVersion: parseInt(versionParts[0]),
				minorVersion: parseInt(versionParts[1]),
				patchVersion: parseInt(versionParts[2]),
				signature: applicationVersion.signature,
				application,
				jsonApplication,
				entities: [],
				references: [],
				referencedBy: [],
				apiClassMapByName: {},
				entityMapByName: {},
				referencesMapByName: {},
				referencedByMapByName: {},
			};
			if (application.versions) {
				application.versions.push(newApplicationVersion)
			} else {
				application.versions = [newApplicationVersion]
			}
			newApplicationVersions.push(newApplicationVersion);
		}
		let newApplicationCurrentVersion: IApplicationCurrentVersion = {
			application,
			applicationVersion: newApplicationVersion
		}
		// needed for normalOperation only
		application.currentVersion = [newApplicationCurrentVersion];

		newLatestApplicationVersions.push(newApplicationVersion);
		newApplicationVersionMapByApplication_Name.set(application.fullName, newApplicationVersion);

		return newApplicationVersion;
	}

	private async composeApplicationReferences(
		jsonApplicationMapByName: Map<Application_FullName, JsonApplication>,
		newApplicationVersionMapByApplication_Name: Map<Application_FullName, IApplicationVersion>,
		terminalStore: ITerminalStore,
		allDdlObjects: AllDdlObjects,
		deepTraverseReferences: boolean
	): Promise<{
		newApplicationReferenceMap: Map<Application_FullName, IApplicationReference[]>,
		newApplicationReferences: IApplicationReference[]
	}> {
		const newApplicationReferenceMap: Map<Application_FullName, IApplicationReference[]> = new Map();

		const newApplicationReferenceLookup: Map<Application_FullName, Set<number>> = new Map()

		const newApplicationReferences: IApplicationReference[] = [];
		for (const [applicationName, ownApplicationVersion] of newApplicationVersionMapByApplication_Name) {
			const application = ownApplicationVersion.application;
			const jsonApplication = jsonApplicationMapByName.get(application.fullName);
			const lastJsonApplicationVersion
				= jsonApplication.versions[jsonApplication.versions.length - 1];
			const applicationReferences: IApplicationReference[]
				= this.datastructureUtils.ensureChildArray(
					newApplicationReferenceMap, applicationName);
			const applicationReferenceLookup: Set<number>
				= this.datastructureUtils.ensureChildJsSet(
					newApplicationReferenceLookup, applicationName);

			for (const jsonReferencedApplication of lastJsonApplicationVersion.referencedApplications) {
				const referencedApplication_FullName = this.applicationNameUtils.
					getApplication_FullName(jsonReferencedApplication);
				let referencedApplicationVersion = newApplicationVersionMapByApplication_Name.get(referencedApplication_FullName);
				if (!referencedApplicationVersion) {
					referencedApplicationVersion = await this.applicationLocator.locateLatestApplicationVersionByApplication_Name(
						referencedApplication_FullName, terminalStore);
					if (!referencedApplicationVersion) {
						throw new Error(`Could not locate application:
						${referencedApplication_FullName}
						in either existing applications or applications being currently processed`);
					}
					this.addApplicationVersionObjects(referencedApplicationVersion, allDdlObjects.all)
					if (deepTraverseReferences) {
						// This should cause another iteration over the outer loop to process newly added ApplicationVersion
						jsonApplicationMapByName.set(referencedApplication_FullName, referencedApplicationVersion.jsonApplication)
						newApplicationVersionMapByApplication_Name.set(referencedApplication_FullName, referencedApplicationVersion);
					}
				}
				if (!applicationReferenceLookup.has(jsonReferencedApplication.index)) {
					applicationReferenceLookup.add(jsonReferencedApplication.index)
					const applicationReference: IApplicationReference = {
						index: jsonReferencedApplication.index,
						ownApplicationVersion,
						referencedApplicationVersion,
						// FIXME: when Application versioning is added, properly set sinceVersion
						sinceVersion: ownApplicationVersion
					}
					newApplicationReferences.push(applicationReference)
					applicationReferences.push(applicationReference)
				}
			}
		}

		return {
			newApplicationReferenceMap,
			newApplicationReferences
		};
	}

	private composeApplicationEntities(
		jsonApplication: JsonApplicationWithLastIds,
		applicationVersion: IApplicationVersion,
		newEntitiesMapByApplication_Name: Map<Application_FullName, DbEntity[]>,
		newEntities: DbEntity[]
	): void {
		const applicationName = this.applicationNameUtils.
			getApplication_FullName(jsonApplication)
		let index = 0;
		// TODO: verify that jsonApplication.versions is always ordered ascending
		const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
		const jsonEntities = currentApplicationVersion.entities;
		const newApplicationEntities: DbEntity[] = [];
		for (const jsonEntity of jsonEntities) {
			const entity: DbEntity = {
				_localId: ++this.terminalStore.getLastIds().entities,
				index: index++,
				applicationVersion,
				isLocal: jsonEntity.isLocal,
				isAirEntity: jsonEntity.isAirEntity,
				name: jsonEntity.name,
				tableConfig: jsonEntity.tableConfig,
				columns: [],
				// columnMap: {},
				// idColumns: [],
				// idColumnMap: {},
				// relations: [],
				properties: [],
				// propertyMap: {},
				// FIXME: when Application versioning is added, properly set sinceVersion
				sinceVersion: applicationVersion
			};
			// applicationVersion.entities.push(entity)
			newApplicationEntities.push(entity);
			newEntities.push(entity);
		}
		newEntitiesMapByApplication_Name.set(applicationName, newApplicationEntities);
		applicationVersion.entities = newApplicationEntities;
	}

	private composeApplicationProperties(
		jsonApplication: JsonApplication,
		applicationVersion: IApplicationVersion,
		newProperties: DbProperty[],
		newPropertiesMap: Map<Application_FullName, DbProperty[][]>,
		newEntitiesMapByApplication_Name: Map<Application_FullName, DbEntity[]>,
	): void {
		const applicationName = this.applicationNameUtils.
			getApplication_FullName(jsonApplication)
		const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
		const jsonEntities = currentApplicationVersion.entities;
		const entities = newEntitiesMapByApplication_Name.get(applicationName);
		const propertiesByEntityIndex
			= this.datastructureUtils.ensureChildArray(newPropertiesMap, applicationName);
		jsonEntities.forEach((
			jsonEntity,
			entityIndex
		) => {
			const entity = entities[entityIndex];
			const propertiesForEntity
				= [];
			propertiesByEntityIndex[entityIndex]
				= propertiesForEntity;
			let index = 0;

			for (const jsonProperty of jsonEntity.properties) {
				const property: DbProperty = {
					_localId: ++this.terminalStore.getLastIds().properties,
					index,
					entity,
					name: jsonProperty.name,
					isId: jsonProperty.isId,
					propertyColumns: [],
					// FIXME: when Application versioning is added, properly set sinceVersion
					sinceVersion: applicationVersion
				};
				propertiesForEntity[index] = property;
				index++;
				newProperties.push(property);
			}
		});
	}

	private composeApplicationRelations(
		jsonApplication: JsonApplication,
		applicationVersion: IApplicationVersion,
		newRelations: DbRelation[],
		newRelationsMap: Map<Application_FullName, DbRelation[][]>,
		newEntitiesMapByApplication_Name: Map<Application_FullName, DbEntity[]>,
		newPropertiesMap: Map<Application_FullName, DbProperty[][]>,
		newApplicationReferenceMap: Map<Application_FullName, IApplicationReference[]>,
		terminalStore: ITerminalStore,
		allDdlObjects: AllDdlObjects
	): void {
		const applicationName = this.applicationNameUtils.
			getApplication_FullName(jsonApplication)
		const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
		const jsonEntities = currentApplicationVersion.entities;
		const entitiesForApplication = newEntitiesMapByApplication_Name.get(applicationName);
		const propertiesByEntityIndex
			= newPropertiesMap.get(applicationName);
		const relationsByEntityIndex
			= this.datastructureUtils.ensureChildArray(newRelationsMap, applicationName);
		const referencesForApplication = newApplicationReferenceMap.get(applicationName);

		for (let entityIndex = 0; entityIndex < jsonEntities.length; entityIndex++) {
			const jsonEntity = jsonEntities[entityIndex]
			const propertiesForEntity
				= propertiesByEntityIndex[entityIndex];
			const relationsForEntity
				= [];
			relationsByEntityIndex[entityIndex]
				= relationsForEntity;
			const entity = entitiesForApplication[entityIndex];
			let index = 0;

			const relations: DbRelation[] = [];
			for (const queryRelation of jsonEntity.relations) {
				const property = propertiesForEntity[queryRelation.propertyRef.index];

				let referencedApplication_Name = applicationName;
				if (queryRelation.relationTableApplication_Index
					|| queryRelation.relationTableApplication_Index === 0) {
					const applicationReference = referencesForApplication[queryRelation.relationTableApplication_Index];
					referencedApplication_Name = applicationReference.referencedApplicationVersion.application.fullName;
				}

				let entitiesArray = newEntitiesMapByApplication_Name.get(referencedApplication_Name);

				if (!entitiesArray) {
					const applicationVersion = this.getExistingLatestApplicationVersion(
						referencedApplication_Name, allDdlObjects)
					entitiesArray = applicationVersion.entities;
				}

				const relationEntity = entitiesArray[queryRelation.relationTableIndex];

				const relation: DbRelation = {
					entity,
					_localId: ++terminalStore.getLastIds().relations,
					index,
					foreignKey: queryRelation.foreignKey,
					isId: property.isId,
					manyToOneElems: <any>queryRelation.manyToOneElems,
					property,
					oneToManyElems: queryRelation.oneToManyElems,
					relationEntity,
					relationType: queryRelation.relationType,
					// oneRelationColumns: [],
					// manyRelationColumns: [],
					// FIXME: when Application versioning is added, properly set sinceVersion
					sinceVersion: applicationVersion
				};
				// property.relation               = [relation]
				// relationEntity.relations.push(relation)
				relationsForEntity[index] = relation;
				index++;
				relations.push(relation);
				newRelations.push(relation);
			}
		}
	}

	private composeApplicationColumns(
		jsonApplication: JsonApplication,
		applicationVersion: IApplicationVersion,
		newColumns: DbColumn[],
		newColumnsMap: Map<Application_FullName, DbColumn[][]>,
		newPropertyColumns: DbPropertyColumn[],
		newEntitiesMapByApplication_Name: Map<Application_FullName, DbEntity[]>,
		newPropertiesMap: Map<Application_FullName, DbProperty[][]>,
	): void {
		const applicationName = this.applicationNameUtils.
			getApplication_FullName(jsonApplication)
		const columnsByTable: DbColumn[][] = [];
		newColumnsMap.set(applicationName, columnsByTable);
		const entitiesForApplication = newEntitiesMapByApplication_Name.get(applicationName);
		const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
		const jsonEntities = currentApplicationVersion.entities;
		const propertiesForApplication = newPropertiesMap.get(applicationName);

		jsonEntities.forEach((
			jsonEntity,
			entityIndex
		) => {
			const entity = entitiesForApplication[entityIndex];
			const columnsForTable: DbColumn[] = [];
			columnsByTable[entityIndex] = columnsForTable;
			const idColumnIndexes: DbColumn_IdIndex[] = [];
			jsonEntity.idColumnRefs.forEach((
				idColumnRef,
				idColumnIndex
			) => {
				idColumnIndexes[idColumnRef.index] = idColumnIndex;
			});
			const propertiesForEntity = propertiesForApplication[entityIndex];

			jsonEntity.columns.forEach((
				jsonColumn,
				index
			) => {
				const idColumndIndex = idColumnIndexes[index];
				const column: DbColumn = {
					allocationSize: jsonColumn.allocationSize,
					entity,
					_localId: ++this.terminalStore.getLastIds().columns,
					idIndex: idColumndIndex,
					index,
					isGenerated: jsonColumn.isGenerated,
					manyRelationColumns: [],
					name: jsonColumn.name,
					notNull: jsonColumn.notNull,
					oneRelationColumns: [],
					precision: jsonColumn.precision,
					propertyColumns: [],
					scale: jsonColumn.scale,
					// FIXME: when Application versioning is added, properly set sinceVersion
					sinceVersion: applicationVersion,
					type: jsonColumn.type,
				};
				columnsForTable[index] = column;
				newColumns.push(column);

				jsonColumn.propertyRefs.forEach((
					propertyReference
				) => {
					const property = propertiesForEntity[propertyReference.index];
					const propertyColumn: DbPropertyColumn = {
						column,
						property,
						// FIXME: when Application versioning is added, properly set sinceVersion
						sinceVersion: applicationVersion,
					};
					newPropertyColumns.push(propertyColumn);
				});
			});
		});
	}

	private composeApplicationRelationColumns(
		jsonApplication: JsonApplication,
		applicationVersion: IApplicationVersion,
		newRelationColumns: DbRelationColumn[],
		newApplicationVersionMapByApplication_Name: Map<Application_FullName, IApplicationVersion>,
		newApplicationReferenceMap: Map<Application_FullName, IApplicationReference[]>,
		newRelationsMap: Map<Application_FullName, DbRelation[][]>,
		newColumnsMap: Map<Application_FullName, DbColumn[][]>,
		terminalStore: ITerminalStore,
		allDdlObjects: AllDdlObjects
	): void {
		const applicationName = this.applicationNameUtils.
			getApplication_FullName(jsonApplication)
		const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
		const jsonEntities = currentApplicationVersion.entities;
		const columnsForApplication = newColumnsMap.get(applicationName);
		const relationsForApplication = newRelationsMap.get(applicationName);
		const applicationReferencesForApplication = newApplicationReferenceMap.get(applicationName);

		for (let entityIndex = 0; entityIndex < jsonEntities.length; entityIndex++) {
			const jsonEntity = jsonEntities[entityIndex]
			const columnsForEntity = columnsForApplication[entityIndex];
			const relationsForEntity = relationsForApplication[entityIndex];

			for (let index = 0; index < jsonEntity.columns.length; index++) {
				const jsonColumn = jsonEntity.columns[index]
				const manyColumn = columnsForEntity[index];
				const relationColumns: DbRelationColumn[] = [];

				for (const jsonRelationColumn of jsonColumn.manyRelationColumnRefs) {
					const manyRelation = relationsForEntity[jsonRelationColumn.manyRelationIndex];
					// if (!manyRelation.manyRelationColumns) {
					// 	manyRelation.manyRelationColumns = []
					// }
					let oneRelationApplicationVersion: IApplicationVersion;

					if (jsonRelationColumn.oneApplication_Index
						|| jsonRelationColumn.oneApplication_Index === 0) {
						const applicationReference = applicationReferencesForApplication[jsonRelationColumn.oneApplication_Index];
						oneRelationApplicationVersion = applicationReference.referencedApplicationVersion;
					} else {
						oneRelationApplicationVersion = newApplicationVersionMapByApplication_Name.get(applicationName);
					}
					const referencedApplication_Name = oneRelationApplicationVersion.application.fullName;
					const oneTableColumnsMapForApplication =
						newColumnsMap.get(referencedApplication_Name);

					let oneTableColumns;
					let oneTableRelations;
					if (oneTableColumnsMapForApplication) {
						oneTableColumns = oneTableColumnsMapForApplication[jsonRelationColumn.oneTableIndex];
						oneTableRelations = newRelationsMap.get(oneRelationApplicationVersion.application.fullName)
						[jsonRelationColumn.oneTableIndex];
					} else {
						const applicationVersion = this.getExistingLatestApplicationVersion(
							referencedApplication_Name, allDdlObjects)
						const entitiesArray = applicationVersion.entities;
						const entity = entitiesArray[jsonRelationColumn.oneTableIndex];
						oneTableColumns = entity.columns;
						oneTableRelations = entity.relations;
					}

					const oneColumn = oneTableColumns[jsonRelationColumn.oneColumnIndex];
					// if (!jsonRelationColumn.oneApplication_Index
					// 	&& !oneColumn.oneRelationColumns) {
					// 	oneColumn.oneRelationColumns = []
					// }
					const oneRelation = oneTableRelations[jsonRelationColumn.oneRelationIndex];
					// if (!jsonRelationColumn.oneApplication_Index
					// 	&& !oneRelation.oneRelationColumns) {
					// 	oneRelation.oneRelationColumns = []
					// }

					const relationColumn: DbRelationColumn = {
						_localId: ++terminalStore.getLastIds().relationColumns,
						manyColumn,
						manyRelation,
						oneColumn,
						oneRelation,
						// FIXME: figure out how to many OneToMany-only relations
						parentRelation: manyRelation,
						// FIXME: when Application versioning is added, properly set sinceVersion
						sinceVersion: applicationVersion,
					};
					// manyRelation.manyRelationColumns.push(relationColumn)
					// if (!jsonRelationColumn.oneApplication_Index) {
					// 	oneColumn.oneRelationColumns.push(relationColumn)
					// 	oneRelation.oneRelationColumns.push(relationColumn)
					// }
					relationColumns.push(relationColumn);
					newRelationColumns.push(relationColumn);
				}
				manyColumn.manyRelationColumns = []; // relationColumns
			}
		}
	}

	private composeApplicationApis(
		jsonApplication: JsonApplicationWithLastIds,
		applicationVersion: IApplicationVersion,
		newApiClasses: AppApiClass[],
		newApiOperations: AppApiOperation[],
		newApiParameters: AppApiParameter[],
		newApiReturnTypes: AppApiReturnType[]
	): void {
		// TODO: verify that jsonApplication.versions is always ordered ascending
		const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
		const apiDefinition = currentApplicationVersion.api;
		const newApplicationApiClasses: AppApiClass[] = [];
		for (const apiClassName in apiDefinition.apiObjectMap) {
			const apiClassDefinition = apiDefinition.apiObjectMap[apiClassName]
			const apiClass: AppApiClass = {
				_localId: ++this.terminalStore.getLastIds().apiClasses,
				name: apiClassName,
				applicationVersion,
				operations: [],
				operationMapByName: {}
			}
			for (const operationName in apiClassDefinition.operationMap) {
				const apiOperationDefinition = apiClassDefinition.operationMap[operationName]
				const apiOperation: AppApiOperation = {
					_localId: ++this.terminalStore.getLastIds().apiOperations,
					isAsync: apiOperationDefinition.isAsync,
					name: operationName,
					apiClass,
					parameters: [],
					returnType: []
				}
				newApiOperations.push(apiOperation)

				for (let index = 0; index < apiOperationDefinition.parameters.length; index++) {
					const apiParameterDefinition = apiOperationDefinition.parameters[index]
					const apiParameter: AppApiParameter = {
						_localId: ++this.terminalStore.getLastIds().apiParameters,
						index,
						isRest: apiParameterDefinition.isRest,
						operation: apiOperation,
						text: apiParameterDefinition.text
					}
					newApiParameters.push(apiParameter)
				}
				apiClass.operations.push(apiOperation)
				apiClass.operationMapByName[apiOperation.name] = apiOperation
				// TODO: Add return type
			}
			newApplicationApiClasses.push(apiClass);
			newApiClasses.push(apiClass);
			applicationVersion.apiClassMapByName[apiClass.name] = apiClass
		}
		applicationVersion.apiClasses = newApplicationApiClasses;
	}

}
