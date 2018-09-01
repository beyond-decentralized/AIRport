import {
	IUtils,
	UtilsToken
}                           from '@airport/air-control'
import {
	DomainName,
	IdColumnOnlyIndex,
	ISchemaUtils,
	JsonSchema,
	SchemaName,
	SchemaStatus,
	SchemaUtilsToken
}                           from '@airport/ground-control'
import {
	ITerminalStore,
	TerminalStoreToken
} from '@airport/terminal-map'
import {
	DomainDaoToken,
	IDomain,
	IDomainDao
}                           from '@airport/territory'
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
	SchemaColumnDaoToken,
	SchemaDaoToken,
	SchemaEntityDaoToken,
	SchemaPropertyColumnDaoToken,
	SchemaPropertyDaoToken,
	SchemaReferenceDaoToken,
	SchemaRelationColumnDaoToken,
	SchemaRelationDaoToken,
	SchemaVersionDaoToken
}                           from '@airport/traffic-pattern'
import {
	Inject,
	Service
}                           from 'typedi'
import {SchemaLocatorToken} from '../InjectionTokens'
import {ISchemaLocator}     from '../locator/SchemaLocator'

export interface ISchemaRecorder {

	record(
		jsonSchemas: JsonSchema[]
	): Promise<void>

}

@Service(SchemaUtilsToken)
export class SchemaRecorder
	implements ISchemaRecorder {

	constructor(
		// @Inject(AirportDatabaseToken)
		// private airportDatabase: IAirportDatabase,
		@Inject(DomainDaoToken)
		private domainDao: IDomainDao,
		@Inject(SchemaColumnDaoToken)
		private schemaColumnDao: ISchemaColumnDao,
		@Inject(SchemaDaoToken)
		private schemaDao: ISchemaDao,
		@Inject(SchemaEntityDaoToken)
		private schemaEntityDao: ISchemaEntityDao,
		@Inject(SchemaLocatorToken)
		private schemaLocator: ISchemaLocator,
		@Inject(SchemaPropertyColumnDaoToken)
		private schemaPropertyColumnDao: ISchemaPropertyColumnDao,
		@Inject(SchemaPropertyDaoToken)
		private schemaPropertyDao: ISchemaPropertyDao,
		@Inject(SchemaReferenceDaoToken)
		private schemaReferenceDao: ISchemaReferenceDao,
		@Inject(SchemaRelationColumnDaoToken)
		private schemaRelationColumnDao: ISchemaRelationColumnDao,
		@Inject(SchemaRelationDaoToken)
		private schemaRelationDao: ISchemaRelationDao,
		@Inject(SchemaUtilsToken)
		private schemaUtils: ISchemaUtils,
		@Inject(SchemaVersionDaoToken)
		private schemaVersionDao: ISchemaVersionDao,
		@Inject(TerminalStoreToken)
		private terminalStore: ITerminalStore,
		@Inject(UtilsToken)
		private utils: IUtils
	) {
	}

	async record(
		jsonSchemas: JsonSchema[]
	): Promise<void> {
		const domainSet: Set<DomainName>                       = new Set()
		const jsonSchemaMapByName: Map<SchemaName, JsonSchema> = new Map()

		for (const jsonSchema of jsonSchemas) {
			domainSet.add(jsonSchema.domain)
			jsonSchemaMapByName.set(this.schemaUtils.getSchemaName(jsonSchema), jsonSchema)
		}

		const domainMapByName                 = await this.recordDomains(domainSet)
		const schemaMapByName                 = await this.recordSchemas(
			domainMapByName, jsonSchemaMapByName)
		const newSchemaVersionMapBySchemaName = await this.recordSchemaVersions(
			jsonSchemaMapByName, schemaMapByName)
		const schemaReferenceMap              = await this.generateSchemaReferences(
			jsonSchemaMapByName, newSchemaVersionMapBySchemaName)
		const entitiesMapBySchemaName         = await this.generateSchemaEntities(
			jsonSchemaMapByName, newSchemaVersionMapBySchemaName)
		const propertiesMap                   = await this.generateSchemaProperties(
			jsonSchemaMapByName, entitiesMapBySchemaName)
		const relationsMap                    = await this.generateSchemaRelations(
			jsonSchemaMapByName, entitiesMapBySchemaName, propertiesMap, schemaReferenceMap)
		const columnsMap                      = await this.generateSchemaColumns(
			jsonSchemaMapByName, entitiesMapBySchemaName, propertiesMap)

		await this.generateSchemaRelationColumns(
			jsonSchemaMapByName, newSchemaVersionMapBySchemaName,
			schemaReferenceMap, relationsMap, columnsMap)


		const domains: IDomain[] = []
		for(const domain of domainMapByName.values()) {
			domains.push(domain)
		}

		const schemas: ISchema[] = []
		for(const schema of schemaMapByName.values()) {
			schemas[schema.index] = schema
		}

		this.terminalStore.state.next({
			...this.terminalStore.getTerminalState(),
			domains,
			schemas
		})
	}

	private async recordDomains(
		domainSet: Set<DomainName>
	): Promise<Map<DomainName, IDomain>> {
		const domainMapByName
			      = await this.domainDao.findMapByNameWithNames(Array.from(domainSet))

		const newDomains: IDomain[] = []
		for (const domainName of domainSet) {
			if (domainMapByName.has(domainName)) {
				continue
			}
			newDomains.push({
				name: domainName,
				schemas: []
			})
		}

		if (newDomains.length) {
			await this.domainDao.bulkCreate(newDomains, false, false)

			for (const domain of newDomains) {
				domainMapByName.set(domain.name, domain)
			}
		}

		return domainMapByName
	}

	private async recordSchemas(
		domainMapByName: Map<DomainName, IDomain>,
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>
	): Promise<Map<SchemaName, ISchema>> {
		const schemaMapByName = await this.schemaDao
			.findMapByNames(Array.from(jsonSchemaMapByName.keys()))

		const newSchemas: ISchema[] = []
		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			if (schemaMapByName.has(schemaName)) {
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
			await this.schemaDao.bulkCreate(newSchemas, false, false)

			for (const schema of newSchemas) {
				schemaMapByName.set(schema.name, schema)
			}
		}

		return schemaMapByName
	}

	private async recordSchemaVersions(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		schemaMapByName: Map<SchemaName, ISchema>
	): Promise<Map<SchemaName, ISchemaVersion>> {
		// Schema versions are guaranteed to be new
		const newSchemaVersions: ISchemaVersion[]                              = []
		const newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion> = new Map()
		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const schema                           = schemaMapByName.get(schemaName)
			const lastJsonSchemaVersion            = jsonSchema.versions[jsonSchema.versions.length - 1]
			const versionParts                     = lastJsonSchemaVersion.versionString.split('.')
			const newSchemaVersion: ISchemaVersion = {
				integerVersion: lastJsonSchemaVersion.integerVersion,
				versionString: lastJsonSchemaVersion.versionString,
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
			}
			schema.currentVersion                  = newSchemaVersion
			schema.versions                        = [newSchemaVersion]
			newSchemaVersions.push(newSchemaVersion)
			newSchemaVersionMapBySchemaName.set(schemaName, newSchemaVersion)
		}

		await this.schemaVersionDao.bulkCreate(newSchemaVersions, false, false)

		return newSchemaVersionMapBySchemaName
	}

	private async generateSchemaReferences(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>
	): Promise<Map<SchemaName, ISchemaReference[]>> {
		const schemaReferenceMap: Map<SchemaName, ISchemaReference[]> = new Map()

		const allSchemaReferences: ISchemaReference[] = []
		for (const [schemaName, ownSchemaVersion] of newSchemaVersionMapBySchemaName) {
			const schema     = ownSchemaVersion.schema
			const jsonSchema = jsonSchemaMapByName.get(schema.name)
			const lastJsonSchemaVersion
			                 = jsonSchema.versions[jsonSchema.versions.length - 1]
			const schemaReferences: ISchemaReference[]
			                 = this.utils.ensureChildArray(schemaReferenceMap, schemaName)

			for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
				const referencedSchemaName  = this.schemaUtils.getSchemaName(jsonReferencedSchema)
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
				allSchemaReferences.push(schemaReference)
			}
		}

		await this.schemaReferenceDao.bulkCreate(allSchemaReferences, false, false)

		return schemaReferenceMap
	}

	private async generateSchemaEntities(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>
	): Promise<Map<SchemaName, ISchemaEntity[]>> {
		const entitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]> = new Map()

		const allEntities: ISchemaEntity[] = []
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
					columns: [],
					columnMap: {},
					idColumns: [],
					idColumnMap: {},
					relations: [],
					properties: [],
					propertyMap: {}
				}
				schemaVersion.entities.push(entity)
				allEntities.push(entity)
			}
			entitiesMapBySchemaName.set(schemaName, schemaVersion.entities)
		}

		await this.schemaEntityDao.bulkCreate(allEntities, false, false)

		return entitiesMapBySchemaName
	}

	private async generateSchemaProperties(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		entitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>
	): Promise<Map<SchemaName, ISchemaProperty[][]>> {
		const allProperties: ISchemaProperty[]                    = []
		const propertiesMap: Map<SchemaName, ISchemaProperty[][]> = new Map()

		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1]
			const jsonEntities         = currentSchemaVersion.entities
			const entities             = entitiesMapBySchemaName.get(schemaName)
			const propertiesByEntityIndex
			                           = this.utils.ensureChildArray(propertiesMap, schemaName)
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
						propertyColumns: []
					}
					entity.properties.push(property)
					entity.propertyMap[property.name] = property
					propertiesForEntity[index]        = property
					allProperties.push(property)
				}
			})
		}

		await this.schemaPropertyDao.bulkCreate(allProperties, false, false)

		return propertiesMap
	}

	private async generateSchemaRelations(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		entitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>,
		propertiesMap: Map<SchemaName, ISchemaProperty[][]>,
		schemaReferenceMap: Map<SchemaName, ISchemaReference[]>
	): Promise<Map<SchemaName, ISchemaRelation[][]>> {
		const allRelations: ISchemaRelation[]                    = []
		const relationsMap: Map<SchemaName, ISchemaRelation[][]> = new Map()

		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1]
			const jsonEntities         = currentSchemaVersion.entities
			const entitiesForSchema    = entitiesMapBySchemaName.get(schemaName)
			const propertiesByEntityIndex
			                           = propertiesMap.get(schemaName)
			const relationsByEntityIndex
			                           = this.utils.ensureChildArray(relationsMap, schemaName)
			const referencesForSchema  = schemaReferenceMap.get(schemaName)

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
						oneRelationColumns: [],
						manyRelationColumns: []
					}
					property.relation               = [relation]
					relationEntity.relations.push(relation)
					propertiesForEntity[index] = relation
					relations.push(relation)
					allRelations.push(relation)
				}
			})
		}

		await this.schemaRelationDao.bulkCreate(allRelations, false, false)

		return relationsMap
	}

	private async generateSchemaColumns(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		entitiesMapBySchemaName: Map<SchemaName, ISchemaEntity[]>,
		propertiesMap: Map<SchemaName, ISchemaProperty[][]>,
	): Promise<Map<SchemaName, ISchemaColumn[][]>> {
		const columnsMap: Map<SchemaName, ISchemaColumn[][]> = new Map()

		const allColumns: ISchemaColumn[]                 = []
		const allPropertyColumns: ISchemaPropertyColumn[] = []

		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const entitiesForSchema    = entitiesMapBySchemaName.get(schemaName)
			const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1]
			const jsonEntities         = currentSchemaVersion.entities
			const propertiesForSchema  = propertiesMap.get(schemaName)

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
						propertyColumns: [],
						oneRelationColumns: [],
						manyRelationColumns: []
					}
					allColumns.push(column)
					entity.columns.push(column)
					entity.columnMap[column.name] = column

					if (idColumndIndex || idColumndIndex === 0) {
						entity.idColumns[idColumndIndex] = column
						entity.idColumnMap[column.name]  = column
					}

					jsonColumn.propertyRefs.forEach((
						propertyReference
					) => {
						const property                              = propertiesForEntity[propertyReference.index]
						const propertyColumn: ISchemaPropertyColumn = {
							column,
							property
						}
						allPropertyColumns.push(propertyColumn)
						column.propertyColumns.push(propertyColumn)
						property.propertyColumns.push(propertyColumn)
					})
				})
			})
		}

		await this.schemaColumnDao.bulkCreate(allColumns, false, false)
		await this.schemaPropertyColumnDao.bulkCreate(allPropertyColumns, false, false)

		return columnsMap
	}

	private async generateSchemaRelationColumns(
		jsonSchemaMapByName: Map<SchemaName, JsonSchema>,
		newSchemaVersionMapBySchemaName: Map<SchemaName, ISchemaVersion>,
		schemaReferenceMap: Map<SchemaName, ISchemaReference[]>,
		relationsMap: Map<SchemaName, ISchemaRelation[][]>,
		columnsMap: Map<SchemaName, ISchemaColumn[][]>
	): Promise<Map<SchemaName, ISchemaColumn[][]>> {
		const allRelationColumns: ISchemaRelationColumn[] = []

		for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
			const currentSchemaVersion      = jsonSchema.versions[jsonSchema.versions.length - 1]
			const jsonEntities              = currentSchemaVersion.entities
			const columnsForSchema          = columnsMap.get(schemaName)
			const relationsForSchema        = relationsMap.get(schemaName)
			const schemaReferencesForSchema = schemaReferenceMap.get(schemaName)

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
						if (!manyRelation.manyRelationColumns) {
							manyRelation.manyRelationColumns = []
						}
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
						if (!jsonRelationColumn.oneSchemaIndex
							&& !oneColumn.oneRelationColumns) {
							oneColumn.oneRelationColumns = []
						}
						const oneRelation = oneTable.relations[jsonRelationColumn.oneRelationIndex]
						if (!jsonRelationColumn.oneSchemaIndex
							&& !oneRelation.oneRelationColumns) {
							oneRelation.oneRelationColumns = []
						}

						const relationColumn: ISchemaRelationColumn = {
							manyColumn,
							manyRelation,
							oneColumn,
							oneRelation
						}
						manyRelation.manyRelationColumns.push(relationColumn)
						if (!jsonRelationColumn.oneSchemaIndex) {
							oneColumn.oneRelationColumns.push(relationColumn)
							oneRelation.oneRelationColumns.push(relationColumn)
						}
						relationColumns.push(relationColumn)
						allRelationColumns.push(relationColumn)
					})
					manyColumn.manyRelationColumns = relationColumns
				})
			})
		}

		if (allRelationColumns.length) {
			await this.schemaRelationColumnDao.bulkCreate(allRelationColumns, false, false)
		}

		return columnsMap
	}

}