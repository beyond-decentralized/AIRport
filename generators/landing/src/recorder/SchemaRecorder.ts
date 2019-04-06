import {
	IUtils,
	UTILS
}                       from '@airport/air-control'
import {
	DI,
	ICachedPromise
}                       from '@airport/di'
import {
	DB_SCHEMA_UTILS,
	DomainName,
	IDbSchemaUtils,
	IdColumnOnlyIndex,
	JsonSchema,
	SchemaName,
	SchemaStatus,
}                       from '@airport/ground-control'
import {DdlObjects}     from '@airport/takeoff'
import {
	ITerminalStore,
	TERMINAL_STORE
}                       from '@airport/terminal-map'
import {
	DOMAIN_DAO,
	IDomain,
	IDomainDao
}                       from '@airport/territory'
import {
	ISchema,
	ISchemaColumn,
	ISchemaColumnDao,
	ISchemaDao,
	ISchemaEntity,
	ISchemaEntityDao,
	ISchemaProperty,
	ISchemaPropertyColumn,
	ISchemaPropertyColumnDao,
	ISchemaPropertyDao,
	ISchemaReference,
	ISchemaReferenceDao,
	ISchemaRelation,
	ISchemaRelationColumn,
	ISchemaRelationColumnDao,
	ISchemaRelationDao,
	ISchemaVersion,
	ISchemaVersionDao,
	SCHEMA_COLUMN_DAO,
	SCHEMA_DAO,
	SCHEMA_ENTITY_DAO,
	SCHEMA_PROPERTY_COLUMN_DAO,
	SCHEMA_PROPERTY_DAO,
	SCHEMA_REFERENCE_DAO,
	SCHEMA_RELATION_COLUMN_DAO,
	SCHEMA_RELATION_DAO,
	SCHEMA_VERSION_DAO,
	SchemaPropertyColumnECreateProperties,
	SchemaReferenceECreateProperties,
	SchemaRelationColumnECreateProperties
}                       from '@airport/traffic-pattern'
import {
	SCHEMA_LOCATOR,
	SCHEMA_RECORDER
}                       from '../diTokens'
import {ISchemaLocator} from '../locator/SchemaLocator'

export interface ISchemaRecorder {

	record(
		jsonSchemas: JsonSchema[]
	): Promise<DdlObjects>

}

export class SchemaRecorder
	implements ISchemaRecorder {

	private domainDao: ICachedPromise<IDomainDao>
	private schemaColumnDao: ICachedPromise<ISchemaColumnDao>
	private schemaDao: ICachedPromise<ISchemaDao>
	private schemaEntityDao: ICachedPromise<ISchemaEntityDao>
	private schemaLocator: ISchemaLocator
	private schemaPropertyColumnDao: ICachedPromise<ISchemaPropertyColumnDao>
	private schemaPropertyDao: ICachedPromise<ISchemaPropertyDao>
	private schemaReferenceDao: ICachedPromise<ISchemaReferenceDao>
	private schemaRelationColumnDao: ICachedPromise<ISchemaRelationColumnDao>
	private schemaRelationDao: ICachedPromise<ISchemaRelationDao>
	private dbSchemaUtils: IDbSchemaUtils
	private schemaVersionDao: ICachedPromise<ISchemaVersionDao>
	private terminalStore: ITerminalStore
	private utils: IUtils

	constructor() {
		DI.get((
			schemaLocator,
			dbSchemaUtils,
			terminalStore,
			utils
			) => {
				this.schemaLocator = schemaLocator
				this.dbSchemaUtils = dbSchemaUtils
				this.terminalStore = terminalStore
				this.utils         = utils
			}, SCHEMA_LOCATOR, DB_SCHEMA_UTILS,
			TERMINAL_STORE, UTILS)

		this.domainDao               = DI.cache(DOMAIN_DAO)
		this.schemaColumnDao         = DI.cache(SCHEMA_COLUMN_DAO)
		this.schemaDao               = DI.cache(SCHEMA_DAO)
		this.schemaEntityDao         = DI.cache(SCHEMA_ENTITY_DAO)
		this.schemaPropertyColumnDao = DI.cache(SCHEMA_PROPERTY_COLUMN_DAO)
		this.schemaPropertyDao       = DI.cache(SCHEMA_PROPERTY_DAO)
		this.schemaReferenceDao      = DI.cache(SCHEMA_REFERENCE_DAO)
		this.schemaRelationColumnDao = DI.cache(SCHEMA_RELATION_COLUMN_DAO)
		this.schemaRelationDao       = DI.cache(SCHEMA_RELATION_DAO)
		this.schemaVersionDao        = DI.cache(SCHEMA_VERSION_DAO)
	}

	async record(
		jsonSchemas: JsonSchema[]
	): Promise<DdlObjects> {
		const domainSet: Set<DomainName>                       = new Set()
		const jsonSchemaMapByName: Map<SchemaName, JsonSchema> = new Map()

		for (const jsonSchema of jsonSchemas) {
			domainSet.add(jsonSchema.domain)
			jsonSchemaMapByName.set(this.dbSchemaUtils.getSchemaName(jsonSchema), jsonSchema)
		}

		const {
			      domainMapByName,
			      domains
		      } = await this.recordDomains(domainSet)
		const {
			      newSchemaMapByName,
			      newSchemas
		      } = await this.recordSchemas(
			domainMapByName, jsonSchemaMapByName)
		const {
			      newSchemaVersionMapBySchemaName,
			      newSchemaVersions
		      } = await this.recordSchemaVersions(
			jsonSchemaMapByName, newSchemaMapByName)
		const {
			      newSchemaReferenceMap,
			      newSchemaReferences
		      } = await this.generateSchemaReferences(
			jsonSchemaMapByName, newSchemaVersionMapBySchemaName)
		const {
			      newEntitiesMapBySchemaName,
			      newEntities
		      } = await this.generateSchemaEntities(
			jsonSchemaMapByName, newSchemaVersionMapBySchemaName)
		const {
			      newProperties,
			      newPropertiesMap
		      } = await this.generateSchemaProperties(
			jsonSchemaMapByName, newEntitiesMapBySchemaName)
		const {
			      newRelations,
			      newRelationsMap
		      } = await this.generateSchemaRelations(
			jsonSchemaMapByName, newEntitiesMapBySchemaName, newPropertiesMap, newSchemaReferenceMap)
		const {
			      newColumns,
			      newColumnsMap,
			      newPropertyColumns
		      } = await this.generateSchemaColumns(
			jsonSchemaMapByName, newEntitiesMapBySchemaName, newPropertiesMap)

		const newRelationColumns = await this.generateSchemaRelationColumns(
			jsonSchemaMapByName, newSchemaVersionMapBySchemaName,
			newSchemaReferenceMap, newRelationsMap, newColumnsMap)

		return {
			columns: newColumns,
			domains,
			entities: newEntities,
			latestSchemaVersions: newSchemaVersions,
			properties: newProperties,
			propertyColumns: newPropertyColumns,
			relationColumns: newRelationColumns,
			relations: newRelations,
			schemaReferences: newSchemaReferences,
			schemas: newSchemas
		}
	}

	private async recordDomains(
		domainNameSet: Set<DomainName>
	): Promise<{
		domainMapByName: Map<DomainName, IDomain>,
		domains: IDomain[]
	}> {
		const domains: IDomain[] = []
		const existingDomains    = this.terminalStore.getDomains()

		const domainMapByName: Map<DomainName, IDomain> = new Map()
		for (const domain of existingDomains) {
			if (domainNameSet.has(domain.name)) {
				domainMapByName.set(domain.name, domain)
			}
		}
		const newDomains: IDomain[] = []
		for (const domainName of domainNameSet) {
			const existingDomain = domainMapByName.get(domainName)
			if (existingDomain) {
				domains.push(existingDomain)
				continue
			}
			const domain: IDomain = {
				name: domainName,
				schemas: []
			}
			newDomains.push(domain)
			domains.push(domain)
		}

		if (newDomains.length) {
			await (await this.domainDao.get()).bulkCreate(newDomains, false, false)

			for (const domain of newDomains) {
				domainMapByName.set(domain.name, domain)
			}
		}

		return {
			domainMapByName,
			domains
		}
	}

	private async recordSchemas(
		domainMapByName: Map<DomainName, IDomain>,
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>
	): Promise<{
		newSchemaMapByName: Map<SchemaName, ISchema>,
		newSchemas: ISchema[]
	}> {
		const newSchemaMapByName: Map<SchemaName, ISchema> = new Map()
		const allSchemas                                   = this.terminalStore.getSchemas()
		for (const schema of allSchemas) {
			newSchemaMapByName.set(schema.name, schema)
		}

		const newSchemas: ISchema[] = []
		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			if (newSchemaMapByName.has(schemaName)) {
				continue
			}
			const domain          = domainMapByName.get(jsonSchema.domain)
			const schema: ISchema = {
				domain,
				name: schemaName,
				scope: 'public',
				status: SchemaStatus.CURRENT,
			}
			domain.schemas.push(<any>schema)
			newSchemas.push(schema)
		}

		if (newSchemas.length) {
			await (await this.schemaDao.get()).bulkCreate(newSchemas, false, false)

			for (const schema of newSchemas) {
				newSchemaMapByName.set(schema.name, schema)
			}
		}

		return {
			newSchemaMapByName,
			newSchemas
		}
	}

	private async recordSchemaVersions(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaMapByName: Map<SchemaName, ISchema>
	): Promise<{
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>,
		newSchemaVersions: ISchemaVersion[]
	}> {
		// Schema versions are guaranteed to be new
		const newSchemaVersions: ISchemaVersion[]                              = []
		const newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion> = new Map()
		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const schema                           = newSchemaMapByName.get(schemaName)
			const lastJsonSchemaVersion            = jsonSchema.versions[jsonSchema.versions.length - 1]
			const versionParts                     = lastJsonSchemaVersion.versionString.split('.')
			const newSchemaVersion: ISchemaVersion = {
				integerVersion: lastJsonSchemaVersion.integerVersion,
				versionString: lastJsonSchemaVersion.versionString,
				majorVersion: parseInt(versionParts[0]),
				minorVersion: parseInt(versionParts[1]),
				patchVersion: parseInt(versionParts[2]),
				schema,
				// entities: [],
				// references: [],
				// referencedBy: [],
				// entityMapByName: {},
				// referencesMapByName: {},
				// referencedByMapByName: {},
			}
			// schema.currentVersion                  = newSchemaVersion
			// schema.versions                        = [newSchemaVersion]
			newSchemaVersions.push(newSchemaVersion)
			newSchemaVersionMapBySchemaName.set(schemaName, newSchemaVersion)
		}

		await (await this.schemaVersionDao.get()).bulkCreate(newSchemaVersions, false, false)

		return {
			newSchemaVersionMapBySchemaName,
			newSchemaVersions
		}
	}

	private async generateSchemaReferences(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>
	): Promise<{
		newSchemaReferenceMap: Map<SchemaName, ISchemaReference[]>,
		newSchemaReferences: ISchemaReference[]
	}> {
		const newSchemaReferenceMap: Map<SchemaName, ISchemaReference[]> = new Map()

		const newSchemaReferences: ISchemaReference[] = []
		for (const [schemaName, ownSchemaVersion] of newSchemaVersionMapBySchemaName) {
			const schema     = ownSchemaVersion.schema
			const jsonSchema = jsonSchemaMapByName.get(schema.name)
			const lastJsonSchemaVersion
			                 = jsonSchema.versions[jsonSchema.versions.length - 1]
			const schemaReferences: ISchemaReference[]
			                 = this.utils.ensureChildArray(newSchemaReferenceMap, schemaName)

			for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
				const referencedSchemaName  = this.dbSchemaUtils.getSchemaName(jsonReferencedSchema)
				let referencedSchemaVersion = newSchemaVersionMapBySchemaName.get(referencedSchemaName)
				if (!referencedSchemaVersion) {
					referencedSchemaVersion = this.schemaLocator.locateLatestSchemaVersionBySchemaName(referencedSchemaName)
					if (!referencedSchemaVersion) {
						throw new Error(`Could not locate schema:
						${referencedSchemaName}
						in either existing schemas or schemas being currently processed`)
					}
				}
				const schemaReference: ISchemaReference = {
					index: jsonReferencedSchema.index,
					ownSchemaVersion,
					referencedSchemaVersion
				}
				schemaReferences.push(schemaReference)
				schemaReferences.push(schemaReference)
			}
		}

		await (await this.schemaReferenceDao.get()).bulkCreate(
			newSchemaReferences as SchemaReferenceECreateProperties[],
			false, false)

		return {
			newSchemaReferenceMap,
			newSchemaReferences
		}
	}

	private async generateSchemaEntities(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>
	): Promise<{
		newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>,
		newEntities: ISchemaEntity[]
	}> {
		const newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]> = new Map()

		const newEntities: ISchemaEntity[] = []
		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			let index                  = 0
			const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1]
			const jsonEntities         = currentSchemaVersion.entities
			const schemaVersion        = newSchemaVersionMapBySchemaName.get(schemaName)
			for (const jsonEntity of jsonEntities) {
				const entity: ISchemaEntity = {
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
				}
				// schemaVersion.entities.push(entity)
				newEntities.push(entity)
			}
			newEntitiesMapBySchemaName.set(schemaName, schemaVersion.entities)
		}

		await (await this.schemaEntityDao.get()).bulkCreate(newEntities, false, false)

		return {
			newEntitiesMapBySchemaName,
			newEntities
		}
	}

	private async generateSchemaProperties(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>
	): Promise<{
		newProperties: ISchemaProperty[],
		newPropertiesMap: Map<SchemaName, ISchemaProperty[][]>
	}> {
		const newProperties: ISchemaProperty[]                       = []
		const newPropertiesMap: Map<SchemaName, ISchemaProperty[][]> = new Map()

		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1]
			const jsonEntities         = currentSchemaVersion.entities
			const entities             = newEntitiesMapBySchemaName.get(schemaName)
			const propertiesByEntityIndex
			                           = this.utils.ensureChildArray(newPropertiesMap, schemaName)
			jsonEntities.forEach((
				jsonEntity,
				tableIndex
			) => {
				const entity = entities[tableIndex]
				const propertiesForEntity
				             = []
				propertiesByEntityIndex[tableIndex]
				             = propertiesForEntity
				let index    = 0

				for (const jsonProperty of jsonEntity.properties) {
					const property: ISchemaProperty = {
						index: index++,
						entity,
						name: jsonProperty.name,
						isId: jsonProperty.isId,
						// propertyColumns: []
					}
					// entity.properties.push(property)
					// entity.propertyMap[property.name] = property
					propertiesForEntity[index] = property
					newProperties.push(property)
				}
			})
		}

		await (await this.schemaPropertyDao.get()).bulkCreate(newProperties, false, false)

		return {
			newProperties,
			newPropertiesMap
		}
	}

	private async generateSchemaRelations(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>,
		newPropertiesMap: Map<SchemaName, ISchemaProperty[][]>,
		newSchemaReferenceMap: Map<SchemaName, ISchemaReference[]>
	): Promise<{
		newRelations: ISchemaRelation[],
		newRelationsMap: Map<SchemaName, ISchemaRelation[][]>
	}> {
		const newRelations: ISchemaRelation[]                       = []
		const newRelationsMap: Map<SchemaName, ISchemaRelation[][]> = new Map()

		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1]
			const jsonEntities         = currentSchemaVersion.entities
			const entitiesForSchema    = newEntitiesMapBySchemaName.get(schemaName)
			const propertiesByEntityIndex
			                           = newPropertiesMap.get(schemaName)
			const relationsByEntityIndex
			                           = this.utils.ensureChildArray(newRelationsMap, schemaName)
			const referencesForSchema  = newSchemaReferenceMap.get(schemaName)

			jsonEntities.forEach((
				jsonEntity,
				tableIndex
			) => {
				const propertiesForEntity
					        = propertiesByEntityIndex[tableIndex]
				const relationsForEntity
					        = []
				relationsByEntityIndex[tableIndex]
					        = relationsForEntity
				let index = 0

				const relations: ISchemaRelation[] = []
				for (const jsonRelation of jsonEntity.relations) {
					const property = propertiesForEntity[jsonRelation.propertyRef.index]

					let referencedSchemaName = schemaName
					if (jsonRelation.relationTableSchemaIndex
						|| jsonRelation.relationTableSchemaIndex === 0) {
						const schemaReference = referencesForSchema[jsonRelation.relationTableSchemaIndex]
						referencedSchemaName  = schemaReference.referencedSchemaVersion.schema.name
					}

					const relationEntity = entitiesForSchema[jsonRelation.relationTableIndex]

					const relation: ISchemaRelation = {
						index: index++,
						property,
						foreignKey: jsonRelation.foreignKey,
						manyToOneElems: <any>jsonRelation.manyToOneElems,
						oneToManyElems: jsonRelation.oneToManyElems,
						relationType: jsonRelation.relationType,
						isId: property.isId,
						relationEntity,
						// oneRelationColumns: [],
						// manyRelationColumns: []
					}
					// property.relation               = [relation]
					// relationEntity.relations.push(relation)
					propertiesForEntity[index] = relation
					relations.push(relation)
					newRelations.push(relation)
				}
			})
		}

		await (await this.schemaRelationDao.get()).bulkCreate(newRelations, false, false)

		return {
			newRelations,
			newRelationsMap
		}
	}

	private async generateSchemaColumns(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newEntitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>,
		newPropertiesMap: Map<SchemaName, ISchemaProperty[][]>,
	): Promise<{
		newColumns: ISchemaColumn[],
		newColumnsMap: Map<SchemaName, ISchemaColumn[][]>,
		newPropertyColumns: ISchemaPropertyColumn[]
	}> {
		const newColumnsMap: Map<SchemaName, ISchemaColumn[][]> = new Map()

		const newColumns: ISchemaColumn[]                 = []
		const newPropertyColumns: ISchemaPropertyColumn[] = []

		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const entitiesForSchema    = newEntitiesMapBySchemaName.get(schemaName)
			const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1]
			const jsonEntities         = currentSchemaVersion.entities
			const propertiesForSchema  = newPropertiesMap.get(schemaName)

			jsonEntities.forEach((
				jsonEntity,
				tableIndex
			) => {
				const entity                               = entitiesForSchema[tableIndex]
				const idColumnIndexes: IdColumnOnlyIndex[] = []
				jsonEntity.idColumnRefs.forEach((
					idColumnRef,
					idColumnIndex
				) => {
					idColumnIndexes[idColumnRef.index] = idColumnIndex
				})
				const propertiesForEntity = propertiesForSchema[tableIndex]

				jsonEntity.columns.forEach((
					jsonColumn,
					index
				) => {
					const idColumndIndex        = idColumnIndexes[index]
					const column: ISchemaColumn = {
						index,
						entity,
						idIndex: idColumndIndex,
						isGenerated: jsonColumn.isGenerated,
						allocationSize: jsonColumn.allocationSize,
						name: jsonColumn.name,
						notNull: jsonColumn.notNull,
						type: jsonColumn.type,
						// propertyColumns: [],
						// oneRelationColumns: [],
						// manyRelationColumns: []
					}
					newColumns.push(column)
					// entity.columns.push(column)
					// entity.columnMap[column.name] = column

					// if (idColumndIndex || idColumndIndex === 0) {
					// 	entity.idColumns[idColumndIndex] = column
					// 	entity.idColumnMap[column.name]  = column
					// }

					jsonColumn.propertyRefs.forEach((
						propertyReference
					) => {
						const property                              = propertiesForEntity[propertyReference.index]
						const propertyColumn: ISchemaPropertyColumn = {
							column,
							property
						}
						newPropertyColumns.push(propertyColumn)
						// column.propertyColumns.push(propertyColumn)
						// property.propertyColumns.push(propertyColumn)
					})
				})
			})
		}

		await (await this.schemaColumnDao.get()).bulkCreate(newColumns, false, false)
		await (await this.schemaPropertyColumnDao.get()).bulkCreate(
			newPropertyColumns as SchemaPropertyColumnECreateProperties[],
			false, false)

		return {
			newColumns,
			newColumnsMap,
			newPropertyColumns
		}
	}

	private async generateSchemaRelationColumns(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>,
		newSchemaReferenceMap: Map<SchemaName, ISchemaReference[]>,
		newRelationsMap: Map<SchemaName, ISchemaRelation[][]>,
		newColumnsMap: Map<SchemaName, ISchemaColumn[][]>
	): Promise<ISchemaRelationColumn[]> {
		const newRelationColumns: ISchemaRelationColumn[] = []

		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const currentSchemaVersion      = jsonSchema.versions[jsonSchema.versions.length - 1]
			const jsonEntities              = currentSchemaVersion.entities
			const columnsForSchema          = newColumnsMap.get(schemaName)
			const relationsForSchema        = newRelationsMap.get(schemaName)
			const schemaReferencesForSchema = newSchemaReferenceMap.get(schemaName)

			jsonEntities.forEach((
				jsonEntity,
				tableIndex
			) => {
				const columnsForEntity   = columnsForSchema[tableIndex]
				const relationsForEntity = relationsForSchema[tableIndex]

				jsonEntity.columns.forEach((
					jsonColumn,
					index
				) => {
					const manyColumn = columnsForEntity[index]
					const relationColumns: ISchemaRelationColumn[]
					                 = []

					jsonColumn.manyRelationColumnRefs.forEach((
						jsonRelationColumn
					) => {
						const manyRelation = relationsForEntity[jsonRelationColumn.manyRelationIndex]
						// if (!manyRelation.manyRelationColumns) {
						// 	manyRelation.manyRelationColumns = []
						// }
						let oneRelationSchemaVersion: ISchemaVersion

						if (jsonRelationColumn.oneSchemaIndex) {
							const schemaReference    = schemaReferencesForSchema[jsonRelationColumn.oneSchemaIndex]
							oneRelationSchemaVersion = schemaReference.referencedSchemaVersion
						} else {
							oneRelationSchemaVersion = newSchemaVersionMapBySchemaName.get(schemaName)
						}
						const oneTable  = oneRelationSchemaVersion
							.entities[jsonRelationColumn.oneTableIndex]
						const oneColumn = oneTable.columns[jsonRelationColumn.oneColumnIndex]
						// if (!jsonRelationColumn.oneSchemaIndex
						// 	&& !oneColumn.oneRelationColumns) {
						// 	oneColumn.oneRelationColumns = []
						// }
						const oneRelation = oneTable.relations[jsonRelationColumn.oneRelationIndex]
						// if (!jsonRelationColumn.oneSchemaIndex
						// 	&& !oneRelation.oneRelationColumns) {
						// 	oneRelation.oneRelationColumns = []
						// }

						const relationColumn: ISchemaRelationColumn = {
							manyColumn,
							manyRelation,
							oneColumn,
							oneRelation
						}
						// manyRelation.manyRelationColumns.push(relationColumn)
						// if (!jsonRelationColumn.oneSchemaIndex) {
						// 	oneColumn.oneRelationColumns.push(relationColumn)
						// 	oneRelation.oneRelationColumns.push(relationColumn)
						// }
						relationColumns.push(relationColumn)
						newRelationColumns.push(relationColumn)
					})
					manyColumn.manyRelationColumns = relationColumns
				})
			})
		}

		if (newRelationColumns.length) {
			await (await this.schemaRelationColumnDao.get()).bulkCreate(
				newRelationColumns as SchemaRelationColumnECreateProperties[],
				false, false)
		}

		return newRelationColumns
	}

}

DI.set(SCHEMA_RECORDER, SchemaRecorder)
