import {
	IUtils,
	UtilsToken
}                           from '@airport/air-control'
import {
	ColumnId,
	DomainId,
	EntityId,
	ISchemaUtils,
	PropertyId,
	RelationId,
	SchemaIndex,
	SchemaUtilsToken,
	SchemaVersionId
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
}                                    from 'typedi'
import {QueryObjectInitializerToken} from './InjectionTokens'

export interface IQueryObjectInitializer {

	initialize(): Promise<void>

}

interface RetrievedDllObjects {

	columns: ISchemaColumn[]
	domains: IDomain[]
	entities: ISchemaEntity[]
	latestSchemaVersions: ISchemaVersion[]
	properties: ISchemaProperty[]
	propertyColumns: ISchemaPropertyColumn[]
	relationColumns: ISchemaRelationColumn[]
	relations: ISchemaRelation[]
	schemaReferences: ISchemaReference[]
	schemas: ISchema[]

}

@Service(QueryObjectInitializerToken)
export class QueryObjectInitializer
	implements IQueryObjectInitializer {

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


	async initialize(): Promise<void> {
		const {
			      columns,
			      domains,
			      entities,
			      latestSchemaVersions,
			      properties,
			      propertyColumns,
			      relationColumns,
			      relations,
			      schemaReferences,
			      schemas
		      } = await this.retrieveDdlObjects()

		const schemaVersionMapById = this.linkDomainsAndSchemasAndVersions(
			domains, schemas, latestSchemaVersions, schemaReferences)

		const entityMapById = this.linkEntities(
			schemaVersionMapById, entities)

		const {
			      propertyMapById,
			      relationMapById
		      } = this.linkPropertiesAndRelations(
			entityMapById, properties, relations)

		this.linkColumns(entityMapById, propertyMapById, relationMapById,
			columns, propertyColumns, relationColumns)

		this.terminalStore.state.next({
			...this.terminalStore.getTerminalState(),
			domains,
			schemas
		})

	}

	async retrieveDdlObjects()
		: Promise<RetrievedDllObjects> {
		const schemas                      = await this.schemaDao
			.findAllActive()
		const schemaIndexes: SchemaIndex[] = []
		const domainIdSet: Set<DomainId>   = new Set()
		schemas.forEach(
			schema => {
				schemaIndexes.push(schema.index)
				domainIdSet.add(schema.domain.id)
			})
		schemas.sort((
			schema1: ISchema,
			schema2: ISchema
		) => {
			return schema1.index - schema2.index
		})

		const domains = await this.domainDao
			.findByIdIn(Array.from(domainIdSet))

		const latestSchemaVersions   = await this.schemaVersionDao
			.findAllLatestForSchemaIndexes(schemaIndexes)
		const latestSchemaVersionIds = latestSchemaVersions.map(
			schemaVersion => schemaVersion.id)

		const schemaReferences = await this.schemaReferenceDao
			.findAllForSchemaVersions(latestSchemaVersionIds)

		const entities  = await this.schemaEntityDao
			.findAllForSchemaVersions(latestSchemaVersionIds)
		const entityIds = entities.map(
			entity => entity.id)

		const properties  = await this.schemaPropertyDao
			.findAllForEntities(entityIds)
		const propertyIds = properties.map(
			property => property.id)

		const relations = await this.schemaRelationDao
			.findAllForProperties(propertyIds)

		const columns   = await this.schemaColumnDao
			.findAllForEntities(entityIds)
		const columnIds = columns.map(
			column => column.id)

		const propertyColumns = await this.schemaPropertyColumnDao
			.findAllForColumns(columnIds)

		const relationColumns = await this.schemaRelationColumnDao
			.findAllForColumns(columnIds)

		return {
			columns,
			domains,
			entities,
			latestSchemaVersions,
			properties,
			propertyColumns,
			relationColumns,
			relations,
			schemaReferences,
			schemas
		}
	}

	linkDomainsAndSchemasAndVersions(
		domains: IDomain[],
		schemas: ISchema[],
		latestSchemaVersions: ISchemaVersion[],
		schemaReferences: ISchemaReference[]
	): Map<SchemaVersionId, ISchemaVersion> {
		const domainMapById: Map<DomainId, IDomain> = new Map()
		domains.forEach((
			domain: IDomain
		) => {
			domainMapById.set(domain.id, domain)
			domain.schemas = []
		})

		const schemaMapByIndex: Map<SchemaIndex, ISchema> = new Map()
		schemas.forEach((
			schema: ISchema
		) => {
			schemaMapByIndex.set(schema.index, schema)
			const domain  = domainMapById.get(schema.domain.id)
			schema.domain = domain
			domain.schemas.push(<any>schema)
		})

		const schemaVersionMapById: Map<SchemaVersionId, ISchemaVersion> = new Map()
		latestSchemaVersions.forEach((
			schemaVersion: ISchemaVersion
		) => {
			schemaVersionMapById.set(schemaVersion.id, schemaVersion)

			const schema          = schemaMapByIndex.get(schemaVersion.schema.index)
			schema.currentVersion = schemaVersion
			schema.versions       = [schemaVersion]

			schemaVersion.schema                = schema
			schemaVersion.entities              = []
			schemaVersion.references            = []
			schemaVersion.referencedBy          = []
			schemaVersion.entityMapByName       = {}
			schemaVersion.referencesMapByName   = {}
			schemaVersion.referencedByMapByName = {}
		})

		schemaReferences.forEach((
			schemaReference: ISchemaReference
		) => {
			const ownSchemaVersion        = schemaVersionMapById.get(
				schemaReference.ownSchemaVersion.id)
			const referencedSchemaVersion = schemaVersionMapById.get(
				schemaReference.referencedSchemaVersion.id)

			ownSchemaVersion.references[schemaReference.index] = schemaReference
			ownSchemaVersion.referencesMapByName[referencedSchemaVersion.schema.name]
			                                                   = schemaReference

			referencedSchemaVersion.referencedBy.push(schemaReference)
			referencedSchemaVersion.referencedByMapByName[ownSchemaVersion.schema.name]
				= schemaReference

			schemaReference.ownSchemaVersion        = ownSchemaVersion
			schemaReference.referencedSchemaVersion = referencedSchemaVersion
		})

		return schemaVersionMapById
	}

	private linkEntities(
		schemaVersionMapById: Map<SchemaVersionId, ISchemaVersion>,
		entities: ISchemaEntity[]
	): Map<EntityId, ISchemaEntity> {
		const entityMapById: Map<EntityId, ISchemaEntity> = new Map()

		entities.forEach((
			entity: ISchemaEntity
		) => {
			const schemaVersion  = schemaVersionMapById.get(entity.schemaVersion.id)
			entity.schemaVersion = schemaVersion
			schemaVersion.entities[entity.index]
			                     = entity
			schemaVersion.entityMapByName[entity.name]
			                     = entity

			entity.columns            = []
			entity.properties         = []
			entity.relations          = []
			entity.relationReferences = []
			entity.columnMap          = {}
			entity.idColumns          = []
			entity.idColumnMap        = {}
			entity.propertyMap        = {}

			entityMapById.set(entity.id, entity)
		})

		return entityMapById
	}

	private linkPropertiesAndRelations(
		entityMapById: Map<EntityId, ISchemaEntity>,
		properties: ISchemaProperty[],
		relations: ISchemaRelation[]
	): {
		propertyMapById: Map<PropertyId, ISchemaProperty>,
		relationMapById: Map<RelationId, ISchemaRelation>
	} {
		const propertyMapById: Map<PropertyId, ISchemaProperty> = new Map()

		properties.forEach((
			property: ISchemaProperty
		) => {
			const entity                      = entityMapById.get(property.entity.id)
			entity.properties[property.index] = property
			entity.propertyMap[property.name] = property

			property.entity = entity

			property.propertyColumns = []

			propertyMapById.set(property.id, property)
		})

		const relationMapById: Map<RelationId, ISchemaRelation> = new Map()
		relations.forEach((
			relation: ISchemaRelation
		) => {
			const entity                     = entityMapById.get(relation.entity.id)
			entity.relations[relation.index] = relation

			const relationEntity = entityMapById.get(relation.relationEntity.id)
			relationEntity.relationReferences.push(relation)

			const property    = propertyMapById.get(relation.id)
			relation.property = property
			property.relation = [relation]

			relation.entity              = entity
			relation.relationEntity      = relationEntity
			relation.manyRelationColumns = []
			relation.oneRelationColumns  = []
		})

		return {
			propertyMapById,
			relationMapById
		}
	}

	private linkColumns(
		entityMapById: Map<EntityId, ISchemaEntity>,
		propertyMapById: Map<PropertyId, ISchemaProperty>,
		relationMapById: Map<RelationId, ISchemaRelation>,
		columns: ISchemaColumn[],
		propertyColumns: ISchemaPropertyColumn[],
		relationColumns: ISchemaRelationColumn[]
	) {
		const columnMapById: Map<ColumnId, ISchemaColumn> = new Map()
		columns.forEach((
			column: ISchemaColumn
		) => {
			columnMapById.set(column.id, column)

			const entity = entityMapById.get(column.entity.id)
			entity.columns[column.index] = column
			entity.columnMap[column.name] = column

			if(column.idIndex || column.idIndex === 0) {
				entity.idColumns[column.idIndex] = column
				entity.idColumnMap[column.name] = column
			}

			column.entity = entity

		})

		propertyColumns.forEach((
			propertyColumn: ISchemaPropertyColumn
		) => {
			const column = columnMapById.get(propertyColumn.column.id);
			column.propertyColumns.push(propertyColumn)

			const property = propertyMapById.get(propertyColumn.property.id)
			property.propertyColumns.push(propertyColumn)

			propertyColumn.column = column
			propertyColumn.property = property
		})

		relationColumns.forEach((
			relationColumn: ISchemaRelationColumn
		) => {
			const manyColumn = columnMapById.get(relationColumn.manyColumn.id)
			manyColumn.manyRelationColumns.push(relationColumn)

			const oneColumn = columnMapById.get(relationColumn.oneColumn.id)
			oneColumn.oneRelationColumns.push(relationColumn)

			const manyRelation = relationMapById.get(relationColumn.manyRelation.id)
			manyRelation.manyRelationColumns.push(relationColumn)

			const oneRelation = relationMapById.get(relationColumn.oneRelation.id)
			oneRelation.oneRelationColumns.push(relationColumn)

			relationColumn.manyColumn = manyColumn
			relationColumn.manyRelation = manyRelation
			relationColumn.oneColumn = oneColumn
			relationColumn.oneRelation = oneRelation
		})
	}

}
