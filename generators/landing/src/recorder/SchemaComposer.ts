import { container, DI } from '@airport/di';
import {
	DomainName,
	ensureChildArray,
	getSchemaName,
	IdColumnOnlyIndex,
	JsonSchema,
	SchemaName,
	SchemaStatus
} from '@airport/ground-control';
import { JsonSchemaWithLastIds } from '@airport/security-check';
import {
	AllDdlObjects,
	DdlObjects,
	IDdlObjectRetriever
} from '@airport/takeoff';
import { ITerminalStore } from '@airport/terminal-map';
import {
	IDomain,
	ISchema,
	ISchemaColumn,
	ISchemaCurrentVersion,
	ISchemaEntity,
	ISchemaProperty,
	ISchemaPropertyColumn,
	ISchemaReference,
	ISchemaRelation,
	ISchemaRelationColumn,
	ISchemaVersion
} from '@airport/traffic-pattern';
import { ISchemaLocator } from '../locator/SchemaLocator';
import { SCHEMA_COMPOSER, SCHEMA_LOCATOR } from '../tokens';

export interface ISchemaComposer {

	compose(
		jsonSchemas: JsonSchemaWithLastIds[],
		ddlObjectRetriever: IDdlObjectRetriever,
		schemaLocator: ISchemaLocator,
		terminalStore: ITerminalStore
	): Promise<AllDdlObjects>;

}

export class SchemaComposer
	implements ISchemaComposer {

	async compose(
		jsonSchemas: JsonSchemaWithLastIds[],
		ddlObjectRetriever: IDdlObjectRetriever,
		schemaLocator: ISchemaLocator,
		terminalStore: ITerminalStore
	): Promise<AllDdlObjects> {
		// FIXME: investigate if references here shoud be done by schemaSignatures and not DOMAIN_NAME___SCHEMA_NAME

		// NOTE: schema name contains domain name as a prefix
		const jsonSchemaMapByName: Map<SchemaName, JsonSchemaWithLastIds> = new Map();

		const allDomains = terminalStore.getDomains().slice()
		const domainNameMapByName: Map<DomainName, IDomain> = new Map()
		for (const domain of allDomains) {
			domainNameMapByName.set(domain.name, domain)
		}

		const allSchemas: ISchema[] = terminalStore.getSchemas().slice()
		// NOTE: schema name contains domain name as a prefix
		const schemaMapByName: Map<SchemaName, ISchema> = new Map()
		for (const schema of allSchemas) {
			schemaMapByName.set(schema.name, schema)
		}

		const newLatestSchemaVersions: ISchemaVersion[] = []
		// NOTE: schema name contains domain name as a prefix
		const newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion> = new Map()
		// NOTE: schema name contains domain name as a prefix
		const newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]> = new Map()
		// NOTE: schema name contains domain name as a prefix
		const newPropertiesMap: Map<SchemaName, ISchemaProperty[][]> = new Map()
		// NOTE: schema name contains domain name as a prefix
		const newRelationsMap: Map<SchemaName, ISchemaRelation[][]> = new Map()
		// NOTE: schema name contains domain name as a prefix
		const newColumnsMap: Map<SchemaName, ISchemaColumn[][]> = new Map()

		const added: DdlObjects = {
			columns: [],
			domains: [],
			entities: [],
			latestSchemaVersions: [],
			properties: [],
			propertyColumns: [],
			relationColumns: [],
			relations: [],
			schemaReferences: [],
			schemas: [],
			schemaVersions: []
		}
		const allSchemaVersionsByIds: ISchemaVersion[] = [...terminalStore.getAllSchemaVersionsByIds()];
		const all: DdlObjects = {
			columns: [], //
			domains: [], //
			entities: [], //
			latestSchemaVersions: [], //
			properties: [], //
			propertyColumns: [],
			relationColumns: [],
			relations: [], //
			schemaReferences: [], //
			schemas: [], //
			schemaVersions: [] //
		}
		const allDdlObjects: AllDdlObjects = {
			all,
			allSchemaVersionsByIds,
			added
		}

		for (const jsonSchema of jsonSchemas) {
			jsonSchemaMapByName.set(getSchemaName(jsonSchema), jsonSchema);
			const domain = this.composeDomain(jsonSchema.domain,
				allDomains, added.domains, domainNameMapByName)
			const schema = this.composeSchema(domain, jsonSchema, allSchemas, added.schemas, schemaMapByName)
			this.composeSchemaVersion(jsonSchema, schema,
				newLatestSchemaVersions, added.schemaVersions, newSchemaVersionMapBySchemaName)
		}

		const {
			newSchemaReferenceMap,
			newSchemaReferences
		} = await this.composeSchemaReferences(jsonSchemaMapByName,
			newSchemaVersionMapBySchemaName, schemaLocator, terminalStore,
			allDdlObjects)

		added.schemaReferences = newSchemaReferences

		for (const schemaVersion of allSchemaVersionsByIds) {
			if (schemaVersion) {
				this.addSchemaVersionObjects(schemaVersion, all)
			}
		}

		for (const jsonSchema of jsonSchemas) {
			const schemaNameWithDomainNamePrefix = getSchemaName(jsonSchema)
			jsonSchemaMapByName.set(schemaNameWithDomainNamePrefix, jsonSchema);

			const domain = domainNameMapByName.get(jsonSchema.domain)
			const schema = schemaMapByName.get(getSchemaName(jsonSchema))
			if (!schema.index) {
				const lastIds = {
					...ddlObjectRetriever.lastIds
				}
				jsonSchema.lastIds = lastIds
				schema.jsonSchema = jsonSchema
				schema.index = ++ddlObjectRetriever.lastIds.schemas
			}
			if (!domain.id) {
				domain.id = ++ddlObjectRetriever.lastIds.domains
			}
			const schemaVersion = newSchemaVersionMapBySchemaName.get(schema.name)
			if (!schemaVersion.id) {
				schemaVersion.id = ++ddlObjectRetriever.lastIds.schemaVersions
			}

			this.composeSchemaEntities(jsonSchema, schemaVersion,
				newEntitiesMapBySchemaName, added.entities, ddlObjectRetriever)
			this.composeSchemaProperties(jsonSchema, added.properties, newPropertiesMap,
				newEntitiesMapBySchemaName, ddlObjectRetriever)
			await this.composeSchemaRelations(jsonSchema, added.relations, newRelationsMap,
				newEntitiesMapBySchemaName, newPropertiesMap, newSchemaReferenceMap,
				ddlObjectRetriever, terminalStore, allDdlObjects
			)
			this.composeSchemaColumns(jsonSchema, added.columns, newColumnsMap,
				added.propertyColumns, newEntitiesMapBySchemaName, newPropertiesMap, ddlObjectRetriever)
			await this.composeSchemaRelationColumns(
				jsonSchema, added.relationColumns, newSchemaVersionMapBySchemaName,
				newSchemaReferenceMap, newRelationsMap,
				newColumnsMap, ddlObjectRetriever, terminalStore, allDdlObjects)
		}

		this.addObjects(allDdlObjects.added, allDdlObjects.all)

		for (const schemaVersion of allDdlObjects.all.schemaVersions) {
			allDdlObjects.allSchemaVersionsByIds[schemaVersion.id] = schemaVersion
		}

		return allDdlObjects;
	}

	async getExistingLatestSchemaVersion(
		referencedSchemaName: SchemaName,
		allDdlObjects: AllDdlObjects
	): Promise<ISchemaVersion> {
		for (const latestSchemaVersion of allDdlObjects.all.latestSchemaVersions) {
			if (latestSchemaVersion.schema.name == referencedSchemaName) {
				return latestSchemaVersion;
			}
		}
		throw new Error(`Cannot find schema "${referencedSchemaName}".`);
	}

	private addSchemaVersionObjects(
		schemaVersion: ISchemaVersion,
		ddlObjects: DdlObjects,
	) {
		let foundDomain = false
		for (const domain of ddlObjects.domains) {
			if (domain.name === schemaVersion.schema.domain.name) {
				foundDomain = true
				break
			}
		}
		if (!foundDomain) {
			ddlObjects.domains.push(schemaVersion.schema.domain)
		}
		let foundSchema = false
		for (const schema of ddlObjects.schemas) {
			if (schema.domain === schemaVersion.schema.domain
				&& schema.name === schemaVersion.schema.name) {
				foundSchema = true
				break
			}
		}
		if (!foundSchema) {
			ddlObjects.schemas.push(schemaVersion.schema)
		}
		ddlObjects.schemaVersions.push(schemaVersion)
		ddlObjects.latestSchemaVersions.push(schemaVersion)
		ddlObjects.schemaReferences = ddlObjects.schemaReferences
			.concat(schemaVersion.references)
		ddlObjects.entities = ddlObjects.entities.concat(schemaVersion.entities)

		for (const entity of schemaVersion.entities) {
			ddlObjects.columns = ddlObjects.columns.concat(entity.columns)
			ddlObjects.properties = ddlObjects.properties.concat(entity.properties)
			let entityPropertyColumns: ISchemaPropertyColumn[] = []
			for (const property of entity.properties) {
				entityPropertyColumns = entityPropertyColumns
					.concat(property.propertyColumns)
			}
			ddlObjects.propertyColumns = ddlObjects.propertyColumns
				.concat(entityPropertyColumns)
			ddlObjects.relations = ddlObjects.relations.concat(entity.relations)
			let entityRelationColumns: ISchemaRelationColumn[] = []
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
		toObjects.latestSchemaVersions = toObjects.latestSchemaVersions
			.concat(fromObjects.latestSchemaVersions)
		toObjects.properties = toObjects.properties.concat(fromObjects.properties)
		toObjects.propertyColumns = toObjects.propertyColumns
			.concat(fromObjects.propertyColumns)
		toObjects.relationColumns = toObjects.relationColumns
			.concat(fromObjects.relationColumns)
		toObjects.relations = toObjects.relations.concat(fromObjects.relations)

		for (const fromSchema of fromObjects.schemas) {
			let foundSchema = false
			for (const toSchema of toObjects.schemas) {
				if (toSchema.domain === fromSchema.domain
					&& toSchema.name === fromSchema.name) {
					foundSchema = true
					break
				}
			}
			if (!foundSchema) {
				toObjects.schemas.push(fromSchema)
			}
		}
		toObjects.schemaReferences = toObjects.schemaReferences
			.concat(fromObjects.schemaReferences)
		toObjects.schemaVersions = toObjects.schemaVersions
			.concat(fromObjects.schemaVersions)
	}

	private composeDomain(
		domainName: DomainName,
		allDomains: IDomain[],
		newDomains: IDomain[],
		domainNameMapByName: Map<DomainName, IDomain>,
	): IDomain {
		let domain = domainNameMapByName.get(domainName)
		if (!domain) {
			domain = {
				id: null,
				name: domainName,
				schemas: []
			}
			allDomains.push(domain)
			newDomains.push(domain)
			domainNameMapByName.set(domainName, domain)
		}

		return domain
	}

	private composeSchema(
		domain: IDomain,
		jsonSchema: JsonSchemaWithLastIds,
		allSchemas: ISchema[],
		newSchemas: ISchema[],
		schemaMapByName: Map<SchemaName, ISchema>
	): ISchema {
		const schemaName = getSchemaName(jsonSchema)
		let schema = schemaMapByName.get(schemaName)
		if (!schema) {
			schema = {
				domain,
				index: null,
				jsonSchema: null,
				name: schemaName,
				packageName: jsonSchema.name,
				scope: 'public',
				status: SchemaStatus.CURRENT,
			};
			allSchemas.push(schema);
			newSchemas.push(schema);
			schemaMapByName.set(schemaName, schema)
		}

		return schema
	}

	private composeSchemaVersion(
		jsonSchema: JsonSchemaWithLastIds,
		schema: ISchema,
		newLatestSchemaVersions: ISchemaVersion[],
		newSchemaVersions: ISchemaVersion[],
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>
	): ISchemaVersion {
		// Schema versions are guaranteed to be new
		let newSchemaVersion: ISchemaVersion;
		for (const schemaVersion of jsonSchema.versions) {
			const versionParts = schemaVersion.versionString.split('.');
			newSchemaVersion = {
				id: null,
				integerVersion: schemaVersion.integerVersion,
				versionString: schemaVersion.versionString,
				majorVersion: parseInt(versionParts[0]),
				minorVersion: parseInt(versionParts[1]),
				patchVersion: parseInt(versionParts[2]),
				schema,
				entities: [],
				references: [],
				referencedBy: [],
				entityMapByName: {},
				referencesMapByName: {},
				referencedByMapByName: {},
			};
			if (schema.versions) {
				schema.versions.push(newSchemaVersion)
			} else {
				schema.versions = [newSchemaVersion]
			}
			newSchemaVersions.push(newSchemaVersion);
		}
		let newSchemaCurrentVersion: ISchemaCurrentVersion = {
			schema,
			schemaVersion: newSchemaVersion
		}
		// needed for normalOperation only
		schema.currentVersion = [newSchemaCurrentVersion];

		newLatestSchemaVersions.push(newSchemaVersion);
		newSchemaVersionMapBySchemaName.set(schema.name, newSchemaVersion);

		return newSchemaVersion;
	}

	private async composeSchemaReferences(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>,
		schemaLocator: ISchemaLocator,
		terminalStore: ITerminalStore,
		allDdlObjects: AllDdlObjects
	): Promise<{
		newSchemaReferenceMap: Map<SchemaName, ISchemaReference[]>,
		newSchemaReferences: ISchemaReference[]
	}> {
		const newSchemaReferenceMap: Map<SchemaName, ISchemaReference[]> = new Map();

		const newSchemaReferences: ISchemaReference[] = [];
		for (const [schemaName, ownSchemaVersion] of newSchemaVersionMapBySchemaName) {
			const schema = ownSchemaVersion.schema;
			const jsonSchema = jsonSchemaMapByName.get(schema.name);
			const lastJsonSchemaVersion
				= jsonSchema.versions[jsonSchema.versions.length - 1];
			const schemaReferences: ISchemaReference[]
				= ensureChildArray(newSchemaReferenceMap, schemaName);

			for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
				const referencedSchemaName = getSchemaName(jsonReferencedSchema);
				let referencedSchemaVersion = newSchemaVersionMapBySchemaName.get(referencedSchemaName);
				if (!referencedSchemaVersion) {
					referencedSchemaVersion = await schemaLocator.locateLatestSchemaVersionBySchemaName(
						referencedSchemaName, terminalStore);
					if (!referencedSchemaVersion) {
						throw new Error(`Could not locate schema:
						${referencedSchemaName}
						in either existing schemas or schemas being currently processed`);
					}
					this.addSchemaVersionObjects(referencedSchemaVersion, allDdlObjects.all)
				}
				const schemaReference: ISchemaReference = {
					index: jsonReferencedSchema.index,
					ownSchemaVersion,
					referencedSchemaVersion
				};
				newSchemaReferences.push(schemaReference);
				schemaReferences.push(schemaReference);
			}
		}

		return {
			newSchemaReferenceMap,
			newSchemaReferences
		};
	}

	private composeSchemaEntities(
		jsonSchema: JsonSchemaWithLastIds,
		schemaVersion: ISchemaVersion,
		newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>,
		newEntities: ISchemaEntity[],
		ddlObjectRetriever: IDdlObjectRetriever
	): void {
		const schemaName = getSchemaName(jsonSchema)
		let index = 0;
		// TODO: verify that jsonSchema.versions is always ordered ascending
		const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
		const jsonEntities = currentSchemaVersion.entities;
		const newSchemaEntities: ISchemaEntity[] = [];
		for (const jsonEntity of jsonEntities) {
			const entity: ISchemaEntity = {
				id: ++ddlObjectRetriever.lastIds.entities,
				index: index++,
				schemaVersion,
				isLocal: jsonEntity.isLocal,
				isRepositoryEntity: jsonEntity.isRepositoryEntity,
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
			// schemaVersion.entities.push(entity)
			newSchemaEntities.push(entity);
			newEntities.push(entity);
		}
		newEntitiesMapBySchemaName.set(schemaName, newSchemaEntities);
		schemaVersion.entities = newSchemaEntities;
	}

	private composeSchemaProperties(
		jsonSchema: JsonSchema,
		newProperties: ISchemaProperty[],
		newPropertiesMap: Map<SchemaName, ISchemaProperty[][]>,
		newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>,
		ddlObjectRetriever: IDdlObjectRetriever
	): void {
		const schemaName = getSchemaName(jsonSchema)
		const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
		const jsonEntities = currentSchemaVersion.entities;
		const entities = newEntitiesMapBySchemaName.get(schemaName);
		const propertiesByEntityIndex
			= ensureChildArray(newPropertiesMap, schemaName);
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
				const property: ISchemaProperty = {
					id: ++ddlObjectRetriever.lastIds.properties,
					index,
					entity,
					name: jsonProperty.name,
					isId: jsonProperty.isId,
					// propertyColumns: []
				};
				// entity.properties.push(property)
				// entity.propertyMap[property.name] = property
				propertiesForEntity[index] = property;
				index++;
				newProperties.push(property);
			}
		});
	}

	private async composeSchemaRelations(
		jsonSchema: JsonSchema,
		newRelations: ISchemaRelation[],
		newRelationsMap: Map<SchemaName, ISchemaRelation[][]>,
		newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>,
		newPropertiesMap: Map<SchemaName, ISchemaProperty[][]>,
		newSchemaReferenceMap: Map<SchemaName, ISchemaReference[]>,
		ddlObjectRetriever: IDdlObjectRetriever,
		terminalStore: ITerminalStore,
		allDdlObjects: AllDdlObjects
	): Promise<void> {
		const schemaName = getSchemaName(jsonSchema)
		const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
		const jsonEntities = currentSchemaVersion.entities;
		const entitiesForSchema = newEntitiesMapBySchemaName.get(schemaName);
		const propertiesByEntityIndex
			= newPropertiesMap.get(schemaName);
		const relationsByEntityIndex
			= ensureChildArray(newRelationsMap, schemaName);
		const referencesForSchema = newSchemaReferenceMap.get(schemaName);

		for (let tableIndex = 0; tableIndex < jsonEntities.length; tableIndex++) {
			const jsonEntity = jsonEntities[tableIndex]
			const propertiesForEntity
				= propertiesByEntityIndex[tableIndex];
			const relationsForEntity
				= [];
			relationsByEntityIndex[tableIndex]
				= relationsForEntity;
			const entity = entitiesForSchema[tableIndex];
			let index = 0;

			const relations: ISchemaRelation[] = [];
			for (const jsonRelation of jsonEntity.relations) {
				const property = propertiesForEntity[jsonRelation.propertyRef.index];

				let referencedSchemaName = schemaName;
				if (jsonRelation.relationTableSchemaIndex
					|| jsonRelation.relationTableSchemaIndex === 0) {
					const schemaReference = referencesForSchema[jsonRelation.relationTableSchemaIndex];
					referencedSchemaName = schemaReference.referencedSchemaVersion.schema.name;
				}

				let entitiesArray = newEntitiesMapBySchemaName.get(referencedSchemaName);

				if (!entitiesArray) {
					const schemaVersion = await this.getExistingLatestSchemaVersion(
						referencedSchemaName, allDdlObjects)
					entitiesArray = schemaVersion.entities;
				}

				const relationEntity = entitiesArray[jsonRelation.relationTableIndex];

				const relation: ISchemaRelation = {
					entity,
					id: ++ddlObjectRetriever.lastIds.relations,
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

	private composeSchemaColumns(
		jsonSchema: JsonSchema,
		newColumns: ISchemaColumn[],
		newColumnsMap: Map<SchemaName, ISchemaColumn[][]>,
		newPropertyColumns: ISchemaPropertyColumn[],
		newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>,
		newPropertiesMap: Map<SchemaName, ISchemaProperty[][]>,
		ddlObjectRetriever: IDdlObjectRetriever
	): void {
		const schemaName = getSchemaName(jsonSchema)
		const columnsByTable: ISchemaColumn[][] = [];
		newColumnsMap.set(schemaName, columnsByTable);
		const entitiesForSchema = newEntitiesMapBySchemaName.get(schemaName);
		const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
		const jsonEntities = currentSchemaVersion.entities;
		const propertiesForSchema = newPropertiesMap.get(schemaName);

		jsonEntities.forEach((
			jsonEntity,
			tableIndex
		) => {
			const entity = entitiesForSchema[tableIndex];
			const columnsForTable: ISchemaColumn[] = [];
			columnsByTable[tableIndex] = columnsForTable;
			const idColumnIndexes: IdColumnOnlyIndex[] = [];
			jsonEntity.idColumnRefs.forEach((
				idColumnRef,
				idColumnIndex
			) => {
				idColumnIndexes[idColumnRef.index] = idColumnIndex;
			});
			const propertiesForEntity = propertiesForSchema[tableIndex];

			jsonEntity.columns.forEach((
				jsonColumn,
				index
			) => {
				const idColumndIndex = idColumnIndexes[index];
				const column: ISchemaColumn = {
					allocationSize: jsonColumn.allocationSize,
					entity,
					id: ++ddlObjectRetriever.lastIds.columns,
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
					// propertyColumns: [],
					// oneRelationColumns: [],
					// manyRelationColumns: []
				};
				columnsForTable[index] = column;
				newColumns.push(column);
				// entity.columns.push(column)
				// entity.columnMap[column.name] = column

				// if (idColumndIndex || idColumndIndex === 0) {
				// 	entity.idColumns[idColumndIndex] = column
				// 	entity.idColumnMap[column.name]  = column
				// }

				jsonColumn.propertyRefs.forEach((
					propertyReference
				) => {
					const property = propertiesForEntity[propertyReference.index];
					const propertyColumn: ISchemaPropertyColumn = {
						column,
						property
					};
					newPropertyColumns.push(propertyColumn);
					// column.propertyColumns.push(propertyColumn)
					// property.propertyColumns.push(propertyColumn)
				});
			});
		});
	}

	private async composeSchemaRelationColumns(
		jsonSchema: JsonSchema,
		newRelationColumns: ISchemaRelationColumn[],
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>,
		newSchemaReferenceMap: Map<SchemaName, ISchemaReference[]>,
		newRelationsMap: Map<SchemaName, ISchemaRelation[][]>,
		newColumnsMap: Map<SchemaName, ISchemaColumn[][]>,
		ddlObjectRetriever: IDdlObjectRetriever,
		terminalStore: ITerminalStore,
		allDdlObjects: AllDdlObjects
	): Promise<void> {
		const schemaName = getSchemaName(jsonSchema)
		const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
		const jsonEntities = currentSchemaVersion.entities;
		const columnsForSchema = newColumnsMap.get(schemaName);
		const relationsForSchema = newRelationsMap.get(schemaName);
		const schemaReferencesForSchema = newSchemaReferenceMap.get(schemaName);

		for (let tableIndex = 0; tableIndex < jsonEntities.length; tableIndex++) {
			const jsonEntity = jsonEntities[tableIndex]
			const columnsForEntity = columnsForSchema[tableIndex];
			const relationsForEntity = relationsForSchema[tableIndex];

			for (let index = 0; index < jsonEntity.columns.length; index++) {
				const jsonColumn = jsonEntity.columns[index]
				const manyColumn = columnsForEntity[index];
				const relationColumns: ISchemaRelationColumn[] = [];

				for (const jsonRelationColumn of jsonColumn.manyRelationColumnRefs) {
					const manyRelation = relationsForEntity[jsonRelationColumn.manyRelationIndex];
					// if (!manyRelation.manyRelationColumns) {
					// 	manyRelation.manyRelationColumns = []
					// }
					let oneRelationSchemaVersion: ISchemaVersion;

					if (jsonRelationColumn.oneSchemaIndex
						|| jsonRelationColumn.oneSchemaIndex === 0) {
						const schemaReference = schemaReferencesForSchema[jsonRelationColumn.oneSchemaIndex];
						oneRelationSchemaVersion = schemaReference.referencedSchemaVersion;
					} else {
						oneRelationSchemaVersion = newSchemaVersionMapBySchemaName.get(schemaName);
					}
					const referencedSchemaName = oneRelationSchemaVersion.schema.name;
					const oneTableColumnsMapForSchema =
						newColumnsMap.get(referencedSchemaName);

					let oneTableColumns;
					let oneTableRelations;
					if (oneTableColumnsMapForSchema) {
						oneTableColumns = oneTableColumnsMapForSchema[jsonRelationColumn.oneTableIndex];
						oneTableRelations = newRelationsMap.get(oneRelationSchemaVersion.schema.name)
						[jsonRelationColumn.oneTableIndex];
					} else {
						const schemaVersion = await this.getExistingLatestSchemaVersion(
							referencedSchemaName, allDdlObjects)
						const entitiesArray = schemaVersion.entities;
						const entity = entitiesArray[jsonRelationColumn.oneTableIndex];
						oneTableColumns = entity.columns;
						oneTableRelations = entity.relations;
					}

					const oneColumn = oneTableColumns[jsonRelationColumn.oneColumnIndex];
					// if (!jsonRelationColumn.oneSchemaIndex
					// 	&& !oneColumn.oneRelationColumns) {
					// 	oneColumn.oneRelationColumns = []
					// }
					const oneRelation = oneTableRelations[jsonRelationColumn.oneRelationIndex];
					// if (!jsonRelationColumn.oneSchemaIndex
					// 	&& !oneRelation.oneRelationColumns) {
					// 	oneRelation.oneRelationColumns = []
					// }

					const relationColumn: ISchemaRelationColumn = {
						id: ++ddlObjectRetriever.lastIds.relationColumns,
						manyColumn,
						manyRelation,
						oneColumn,
						oneRelation,
						// FIXME: figure out how to many OneToMany-only relations
						parentRelation: manyRelation
					};
					// manyRelation.manyRelationColumns.push(relationColumn)
					// if (!jsonRelationColumn.oneSchemaIndex) {
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

DI.set(SCHEMA_COMPOSER, SchemaComposer);
