import {
	DI,
	ICachedPromise
}                             from '@airport/di'
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

	private domainDao: ICachedPromise<IDomainDao>
	private schemaColumnDao: ICachedPromise<ISchemaColumnDao>
	private schemaDao: ICachedPromise<ISchemaDao>
	private schemaEntityDao: ICachedPromise<ISchemaEntityDao>
	private schemaPropertyColumnDao: ICachedPromise<ISchemaPropertyColumnDao>
	private schemaPropertyDao: ICachedPromise<ISchemaPropertyDao>
	private schemaReferenceDao: ICachedPromise<ISchemaReferenceDao>
	private schemaRelationColumnDao: ICachedPromise<ISchemaRelationColumnDao>
	private schemaRelationDao: ICachedPromise<ISchemaRelationDao>
	private schemaVersionDao: ICachedPromise<ISchemaVersionDao>

	constructor() {
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

	async retrieveDdlObjects()
		: Promise<DdlObjects> {
		const schemas                      = await (await this.schemaDao.get())
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

		const domains = await (await this.domainDao.get())
			.findByIdIn(Array.from(domainIdSet))

		const latestSchemaVersions   = await (await this.schemaVersionDao.get())
			.findAllLatestForSchemaIndexes(schemaIndexes)
		const latestSchemaVersionIds = latestSchemaVersions.map(
			schemaVersion => schemaVersion.id)

		const schemaReferences = await (await this.schemaReferenceDao.get())
			.findAllForSchemaVersions(latestSchemaVersionIds)

		const entities  = await (await this.schemaEntityDao.get())
			.findAllForSchemaVersions(latestSchemaVersionIds)
		const entityIds = entities.map(
			entity => entity.id)

		const properties  = await (await this.schemaPropertyDao.get())
			.findAllForEntities(entityIds)
		const propertyIds = properties.map(
			property => property.id)

		const relations = await (await this.schemaRelationDao.get())
			.findAllForProperties(propertyIds)

		const columns   = await (await this.schemaColumnDao.get())
			.findAllForEntities(entityIds)
		const columnIds = columns.map(
			column => column.id)

		const propertyColumns = await (await this.schemaPropertyColumnDao.get())
			.findAllForColumns(columnIds)

		const relationColumns = await (await this.schemaRelationColumnDao.get())
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
