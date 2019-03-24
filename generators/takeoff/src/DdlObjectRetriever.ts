import {DI}                   from '@airport/di'
import {
	DomainId,
	SchemaIndex,
}                             from '@airport/ground-control'
import {
	DOMAIN_DAO,
	IDomainDao
}                             from '@airport/territory'
import {
	ISchema,
	ISchemaColumnDao,
	ISchemaDao,
	ISchemaEntityDao,
	ISchemaPropertyColumnDao,
	ISchemaPropertyDao,
	ISchemaReferenceDao,
	ISchemaRelationColumnDao,
	ISchemaRelationDao,
	ISchemaVersionDao,
	SCHEMA_COLUMN_DAO,
	SCHEMA_DAO,
	SCHEMA_ENTITY_DAO,
	SCHEMA_PROPERTY_COLUMN_DAO,
	SCHEMA_PROPERTY_DAO,
	SCHEMA_REFERENCE_DAO,
	SCHEMA_RELATION_COLUMN_DAO,
	SCHEMA_RELATION_DAO,
	SCHEMA_VERSION_DAO
}                             from '@airport/traffic-pattern'
import {DDL_OBJECT_RETRIEVER} from './diTokens'
import {DdlObjects}           from './QueryObjectInitializer'

export interface IDdlObjectRetriever {

	retrieveDdlObjects()
		: Promise<DdlObjects>

}

export class DdlObjectRetriever
	implements IDdlObjectRetriever {

	private domainDao: IDomainDao
	private schemaColumnDao: ISchemaColumnDao
	private schemaDao: ISchemaDao
	private schemaEntityDao: ISchemaEntityDao
	private schemaPropertyColumnDao: ISchemaPropertyColumnDao
	private schemaPropertyDao: ISchemaPropertyDao
	private schemaReferenceDao: ISchemaReferenceDao
	private schemaRelationColumnDao: ISchemaRelationColumnDao
	private schemaRelationDao: ISchemaRelationDao
	private schemaVersionDao: ISchemaVersionDao

	constructor() {
		DI.get((
			domainDao,
			schemaColumnDao,
			schemaDao,
			schemaEntityDao,
			schemaPropertyColumnDao,
			schemaPropertyDao,
			schemaReferenceDao,
			schemaRelationColumnDao,
			schemaRelationDao,
			schemaVersionDao
			) => {
				this.domainDao               = domainDao
				this.schemaColumnDao         = schemaColumnDao
				this.schemaDao               = schemaDao
				this.schemaEntityDao         = schemaEntityDao
				this.schemaPropertyColumnDao = schemaPropertyColumnDao
				this.schemaPropertyDao       = schemaPropertyDao
				this.schemaReferenceDao      = schemaReferenceDao
				this.schemaRelationColumnDao = schemaRelationColumnDao
				this.schemaRelationDao       = schemaRelationDao
				this.schemaVersionDao        = schemaVersionDao
			}, DOMAIN_DAO, SCHEMA_COLUMN_DAO, SCHEMA_DAO,
			SCHEMA_ENTITY_DAO, SCHEMA_PROPERTY_COLUMN_DAO,
			SCHEMA_PROPERTY_DAO, SCHEMA_REFERENCE_DAO,
			SCHEMA_RELATION_COLUMN_DAO, SCHEMA_RELATION_DAO,
			SCHEMA_VERSION_DAO)
	}

	async retrieveDdlObjects()
		: Promise<DdlObjects> {
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

}

DI.set(DDL_OBJECT_RETRIEVER, DdlObjectRetriever)
