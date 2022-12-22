import {
	ApplicationStatus,
	Domain_Name,
	ensureChildArray,
	ensureChildJsSet,
	FullApplication_Name,
	IDbApplicationUtils,
	ApplicationColumn_IdIndex,
	JsonApplication,
} from '@airport/ground-control';
import { JsonApplicationWithLastIds } from '@airport/apron';
import {
	AllDdlObjects,
	DdlObjects,
	IDomainRetriever,
	ITerminalStore
} from '@airport/terminal-map';
import {
	IDomain,
	IApplication,
	IApplicationColumn,
	IApplicationCurrentVersion,
	IApplicationEntity,
	IApplicationProperty,
	IApplicationPropertyColumn,
	IApplicationReference,
	IApplicationRelation,
	IApplicationRelationColumn,
	IApplicationVersion
} from '@airport/airspace/dist/app/bundle';
import { IApplicationLocator } from '../locator/ApplicationLocator';
import {
	Inject,
	Injected
} from '@airport/direction-indicator'

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
	dbApplicationUtils: IDbApplicationUtils

	@Inject()
	domainRetriever: IDomainRetriever

	@Inject()
	terminalStore: ITerminalStore

	async compose(
		jsonApplications: JsonApplicationWithLastIds[],
		context: IApplicationComposerContext
	): Promise<AllDdlObjects> {
		// NOTE: application name contains domain name as a prefix
		const jsonApplicationMapByFullName: Map<FullApplication_Name, JsonApplicationWithLastIds> = new Map();

		const terminalStore = context.terminalStore
		const allDomains = terminalStore.getDomains().slice()
		const domainMapByName: Map<Domain_Name, IDomain> = new Map()
		for (const domain of allDomains) {
			domainMapByName.set(domain.name, domain)
		}

		const allApplications: IApplication[] = terminalStore.getApplications().slice()
		// NOTE: application fullName contains domain name as a prefix
		const applicationMapByFullName: Map<FullApplication_Name, IApplication> = new Map()
		for (const application of allApplications) {
			applicationMapByFullName.set(application.fullName, application)
		}

		const newLatestApplicationVersions: IApplicationVersion[] = []
		const newApplicationVersionMapByApplication_Name: Map<FullApplication_Name, IApplicationVersion> = new Map()
		const newEntitiesMapByApplication_Name: Map<FullApplication_Name, IApplicationEntity[]> = new Map()
		const newPropertiesMap: Map<FullApplication_Name, IApplicationProperty[][]> = new Map()
		const newRelationsMap: Map<FullApplication_Name, IApplicationRelation[][]> = new Map()
		const newColumnsMap: Map<FullApplication_Name, IApplicationColumn[][]> = new Map()

		const added: DdlObjects = {
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
			jsonApplicationMapByFullName.set(this.dbApplicationUtils.
				getFullApplication_Name(jsonApplication), jsonApplication);
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
			const fullApplication_Name = this.dbApplicationUtils.
				getFullApplication_Name(jsonApplication)
			jsonApplicationMapByFullName.set(fullApplication_Name, jsonApplication);

			const domain = domainMapByName.get(jsonApplication.domain)
			const application = applicationMapByFullName.get(this.dbApplicationUtils.
				getFullApplication_Name(jsonApplication))
			if (!application.index) {
				jsonApplication.lastIds = {
					...this.terminalStore.getLastIds()
				}
				application.index = ++this.terminalStore.getLastIds().applications
			}
			if (!domain._localId) {
				domain._localId = ++this.terminalStore.getLastIds().domains
			}
			const applicationVersion = newApplicationVersionMapByApplication_Name.get(application.fullName)
			if (!applicationVersion._localId) {
				applicationVersion._localId = ++this.terminalStore.getLastIds().applicationVersions
				applicationVersion.jsonApplication = jsonApplication
			}

			this.composeApplicationEntities(jsonApplication, applicationVersion,
				newEntitiesMapByApplication_Name, added.entities)
			this.composeApplicationProperties(jsonApplication, added.properties, newPropertiesMap,
				newEntitiesMapByApplication_Name)
			await this.composeApplicationRelations(jsonApplication, added.relations, newRelationsMap,
				newEntitiesMapByApplication_Name, newPropertiesMap, newApplicationReferenceMap,
				terminalStore, allDdlObjects
			)
			this.composeApplicationColumns(jsonApplication, added.columns, newColumnsMap,
				added.propertyColumns, newEntitiesMapByApplication_Name, newPropertiesMap)
			await this.composeApplicationRelationColumns(
				jsonApplication, added.relationColumns, newApplicationVersionMapByApplication_Name,
				newApplicationReferenceMap, newRelationsMap,
				newColumnsMap, terminalStore, allDdlObjects)
		}

		this.addObjects(allDdlObjects.added, allDdlObjects.all)

		for (const applicationVersion of allDdlObjects.all.applicationVersions) {
			allDdlObjects.allApplicationVersionsByIds[applicationVersion._localId] = applicationVersion
		}

		return allDdlObjects;
	}

	async getExistingLatestApplicationVersion(
		referencedApplication_Name: FullApplication_Name,
		allDdlObjects: AllDdlObjects
	): Promise<IApplicationVersion> {
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
			let entityPropertyColumns: IApplicationPropertyColumn[] = []
			for (const property of entity.properties) {
				entityPropertyColumns = entityPropertyColumns
					.concat(property.propertyColumns)
			}
			ddlObjects.propertyColumns = ddlObjects.propertyColumns
				.concat(entityPropertyColumns)
			ddlObjects.relations = ddlObjects.relations.concat(entity.relations)
			let entityRelationColumns: IApplicationRelationColumn[] = []
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
		applicationMapByFullName: Map<FullApplication_Name, IApplication>
	): IApplication {
		const fullApplication_Name = this.dbApplicationUtils.
			getFullApplication_Name(jsonApplication)
		let application = applicationMapByFullName.get(fullApplication_Name)
		if (!application) {
			application = {
				domain,
				index: null,
				fullName: fullApplication_Name,
				name: jsonApplication.name,
				scope: 'public',
				signature: 'localhost',
				status: ApplicationStatus.CURRENT,
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
		newApplicationVersionMapByApplication_Name: Map<FullApplication_Name, IApplicationVersion>
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
				application,
				jsonApplication,
				entities: [],
				references: [],
				referencedBy: [],
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
		jsonApplicationMapByName: Map<FullApplication_Name, JsonApplication>,
		newApplicationVersionMapByApplication_Name: Map<FullApplication_Name, IApplicationVersion>,
		terminalStore: ITerminalStore,
		allDdlObjects: AllDdlObjects,
		deepTraverseReferences: boolean
	): Promise<{
		newApplicationReferenceMap: Map<FullApplication_Name, IApplicationReference[]>,
		newApplicationReferences: IApplicationReference[]
	}> {
		const newApplicationReferenceMap: Map<FullApplication_Name, IApplicationReference[]> = new Map();

		const newApplicationReferenceLookup: Map<FullApplication_Name, Set<number>> = new Map()

		const newApplicationReferences: IApplicationReference[] = [];
		for (const [applicationName, ownApplicationVersion] of newApplicationVersionMapByApplication_Name) {
			const application = ownApplicationVersion.application;
			const jsonApplication = jsonApplicationMapByName.get(application.fullName);
			const lastJsonApplicationVersion
				= jsonApplication.versions[jsonApplication.versions.length - 1];
			const applicationReferences: IApplicationReference[]
				= ensureChildArray(newApplicationReferenceMap, applicationName);
			const applicationReferenceLookup: Set<number>
				= ensureChildJsSet(newApplicationReferenceLookup, applicationName);

			for (const jsonReferencedApplication of lastJsonApplicationVersion.referencedApplications) {
				const referencedFullApplication_Name = this.dbApplicationUtils.
					getFullApplication_Name(jsonReferencedApplication);
				let referencedApplicationVersion = newApplicationVersionMapByApplication_Name.get(referencedFullApplication_Name);
				if (!referencedApplicationVersion) {
					referencedApplicationVersion = await this.applicationLocator.locateLatestApplicationVersionByApplication_Name(
						referencedFullApplication_Name, terminalStore);
					if (!referencedApplicationVersion) {
						throw new Error(`Could not locate application:
						${referencedFullApplication_Name}
						in either existing applications or applications being currently processed`);
					}
					this.addApplicationVersionObjects(referencedApplicationVersion, allDdlObjects.all)
					if (deepTraverseReferences) {
						// This should cause another iteration over the outer loop to process newly added ApplicationVersion
						jsonApplicationMapByName.set(referencedFullApplication_Name, referencedApplicationVersion.jsonApplication)
						newApplicationVersionMapByApplication_Name.set(referencedFullApplication_Name, referencedApplicationVersion);
					}
				}
				const applicationReference: IApplicationReference = {
					index: jsonReferencedApplication.index,
					ownApplicationVersion,
					referencedApplicationVersion
				};
				if (!applicationReferenceLookup.has(jsonReferencedApplication.index)) {
					applicationReferenceLookup.add(jsonReferencedApplication.index)
					newApplicationReferences.push(applicationReference);
					applicationReferences.push(applicationReference);
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
		newEntitiesMapByApplication_Name: Map<FullApplication_Name, IApplicationEntity[]>,
		newEntities: IApplicationEntity[]
	): void {
		const applicationName = this.dbApplicationUtils.
			getFullApplication_Name(jsonApplication)
		let index = 0;
		// TODO: verify that jsonApplication.versions is always ordered ascending
		const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
		const jsonEntities = currentApplicationVersion.entities;
		const newApplicationEntities: IApplicationEntity[] = [];
		for (const jsonEntity of jsonEntities) {
			const entity: IApplicationEntity = {
				_localId: ++this.terminalStore.getLastIds().entities,
				index: index++,
				applicationVersion,
				isLocal: jsonEntity.isLocal,
				isAirEntity: jsonEntity.isAirEntity,
				name: jsonEntity.name,
				tableConfig: jsonEntity.tableConfig,
				// columns: [],
				// columnMap: {},
				// idColumns: [],
				// idColumnMap: {},
				// relations: [],
				// properties: [],
				// propertyMap: {}
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
		newProperties: IApplicationProperty[],
		newPropertiesMap: Map<FullApplication_Name, IApplicationProperty[][]>,
		newEntitiesMapByApplication_Name: Map<FullApplication_Name, IApplicationEntity[]>,
	): void {
		const applicationName = this.dbApplicationUtils.
			getFullApplication_Name(jsonApplication)
		const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
		const jsonEntities = currentApplicationVersion.entities;
		const entities = newEntitiesMapByApplication_Name.get(applicationName);
		const propertiesByEntityIndex
			= ensureChildArray(newPropertiesMap, applicationName);
		jsonEntities.forEach((
			jsonEntity,
			tableIndex
		) => {
			const entity = entities[tableIndex];
			const propertiesForEntity
				= [];
			propertiesByEntityIndex[tableIndex]
				= propertiesForEntity;
			let index = 0;

			for (const jsonProperty of jsonEntity.properties) {
				const property: IApplicationProperty = {
					_localId: ++this.terminalStore.getLastIds().properties,
					index,
					entity,
					name: jsonProperty.name,
					isId: jsonProperty.isId,
				};
				propertiesForEntity[index] = property;
				index++;
				newProperties.push(property);
			}
		});
	}

	private async composeApplicationRelations(
		jsonApplication: JsonApplication,
		newRelations: IApplicationRelation[],
		newRelationsMap: Map<FullApplication_Name, IApplicationRelation[][]>,
		newEntitiesMapByApplication_Name: Map<FullApplication_Name, IApplicationEntity[]>,
		newPropertiesMap: Map<FullApplication_Name, IApplicationProperty[][]>,
		newApplicationReferenceMap: Map<FullApplication_Name, IApplicationReference[]>,
		terminalStore: ITerminalStore,
		allDdlObjects: AllDdlObjects
	): Promise<void> {
		const applicationName = this.dbApplicationUtils.
			getFullApplication_Name(jsonApplication)
		const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
		const jsonEntities = currentApplicationVersion.entities;
		const entitiesForApplication = newEntitiesMapByApplication_Name.get(applicationName);
		const propertiesByEntityIndex
			= newPropertiesMap.get(applicationName);
		const relationsByEntityIndex
			= ensureChildArray(newRelationsMap, applicationName);
		const referencesForApplication = newApplicationReferenceMap.get(applicationName);

		for (let tableIndex = 0; tableIndex < jsonEntities.length; tableIndex++) {
			const jsonEntity = jsonEntities[tableIndex]
			const propertiesForEntity
				= propertiesByEntityIndex[tableIndex];
			const relationsForEntity
				= [];
			relationsByEntityIndex[tableIndex]
				= relationsForEntity;
			const entity = entitiesForApplication[tableIndex];
			let index = 0;

			const relations: IApplicationRelation[] = [];
			for (const jsonRelation of jsonEntity.relations) {
				const property = propertiesForEntity[jsonRelation.propertyRef.index];

				let referencedApplication_Name = applicationName;
				if (jsonRelation.relationTableApplication_Index
					|| jsonRelation.relationTableApplication_Index === 0) {
					const applicationReference = referencesForApplication[jsonRelation.relationTableApplication_Index];
					referencedApplication_Name = applicationReference.referencedApplicationVersion.application.fullName;
				}

				let entitiesArray = newEntitiesMapByApplication_Name.get(referencedApplication_Name);

				if (!entitiesArray) {
					const applicationVersion = await this.getExistingLatestApplicationVersion(
						referencedApplication_Name, allDdlObjects)
					entitiesArray = applicationVersion.entities;
				}

				const relationEntity = entitiesArray[jsonRelation.relationTableIndex];

				const relation: IApplicationRelation = {
					entity,
					_localId: ++terminalStore.getLastIds().relations,
					index,
					foreignKey: jsonRelation.foreignKey,
					isId: property.isId,
					manyToOneElems: <any>jsonRelation.manyToOneElems,
					property,
					oneToManyElems: jsonRelation.oneToManyElems,
					relationEntity,
					relationType: jsonRelation.relationType,
					// oneRelationColumns: [],
					// manyRelationColumns: []
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
		newColumns: IApplicationColumn[],
		newColumnsMap: Map<FullApplication_Name, IApplicationColumn[][]>,
		newPropertyColumns: IApplicationPropertyColumn[],
		newEntitiesMapByApplication_Name: Map<FullApplication_Name, IApplicationEntity[]>,
		newPropertiesMap: Map<FullApplication_Name, IApplicationProperty[][]>,
	): void {
		const applicationName = this.dbApplicationUtils.
			getFullApplication_Name(jsonApplication)
		const columnsByTable: IApplicationColumn[][] = [];
		newColumnsMap.set(applicationName, columnsByTable);
		const entitiesForApplication = newEntitiesMapByApplication_Name.get(applicationName);
		const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
		const jsonEntities = currentApplicationVersion.entities;
		const propertiesForApplication = newPropertiesMap.get(applicationName);

		jsonEntities.forEach((
			jsonEntity,
			tableIndex
		) => {
			const entity = entitiesForApplication[tableIndex];
			const columnsForTable: IApplicationColumn[] = [];
			columnsByTable[tableIndex] = columnsForTable;
			const idColumnIndexes: ApplicationColumn_IdIndex[] = [];
			jsonEntity.idColumnRefs.forEach((
				idColumnRef,
				idColumnIndex
			) => {
				idColumnIndexes[idColumnRef.index] = idColumnIndex;
			});
			const propertiesForEntity = propertiesForApplication[tableIndex];

			jsonEntity.columns.forEach((
				jsonColumn,
				index
			) => {
				const idColumndIndex = idColumnIndexes[index];
				const column: IApplicationColumn = {
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
					type: jsonColumn.type,
				};
				columnsForTable[index] = column;
				newColumns.push(column);

				jsonColumn.propertyRefs.forEach((
					propertyReference
				) => {
					const property = propertiesForEntity[propertyReference.index];
					const propertyColumn: IApplicationPropertyColumn = {
						column,
						property
					};
					newPropertyColumns.push(propertyColumn);
				});
			});
		});
	}

	private async composeApplicationRelationColumns(
		jsonApplication: JsonApplication,
		newRelationColumns: IApplicationRelationColumn[],
		newApplicationVersionMapByApplication_Name: Map<FullApplication_Name, IApplicationVersion>,
		newApplicationReferenceMap: Map<FullApplication_Name, IApplicationReference[]>,
		newRelationsMap: Map<FullApplication_Name, IApplicationRelation[][]>,
		newColumnsMap: Map<FullApplication_Name, IApplicationColumn[][]>,
		terminalStore: ITerminalStore,
		allDdlObjects: AllDdlObjects
	): Promise<void> {
		const applicationName = this.dbApplicationUtils.
			getFullApplication_Name(jsonApplication)
		const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
		const jsonEntities = currentApplicationVersion.entities;
		const columnsForApplication = newColumnsMap.get(applicationName);
		const relationsForApplication = newRelationsMap.get(applicationName);
		const applicationReferencesForApplication = newApplicationReferenceMap.get(applicationName);

		for (let tableIndex = 0; tableIndex < jsonEntities.length; tableIndex++) {
			const jsonEntity = jsonEntities[tableIndex]
			const columnsForEntity = columnsForApplication[tableIndex];
			const relationsForEntity = relationsForApplication[tableIndex];

			for (let index = 0; index < jsonEntity.columns.length; index++) {
				const jsonColumn = jsonEntity.columns[index]
				const manyColumn = columnsForEntity[index];
				const relationColumns: IApplicationRelationColumn[] = [];

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
						const applicationVersion = await this.getExistingLatestApplicationVersion(
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

					const relationColumn: IApplicationRelationColumn = {
						_localId: ++terminalStore.getLastIds().relationColumns,
						manyColumn,
						manyRelation,
						oneColumn,
						oneRelation,
						// FIXME: figure out how to many OneToMany-only relations
						parentRelation: manyRelation
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

}
