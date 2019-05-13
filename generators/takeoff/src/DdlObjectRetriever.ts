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

	private domainDao: Promise<IDomainDao>
	private schemaColumnDao: Promise<ISchemaColumnDao>
	private schemaDao: Promise<ISchemaDao>
	private schemaEntityDao: Promise<ISchemaEntityDao>
	private schemaPropertyColumnDao: Promise<ISchemaPropertyColumnDao>
	private schemaPropertyDao: Promise<ISchemaPropertyDao>
	private schemaReferenceDao: Promise<ISchemaReferenceDao>
	private schemaRelationColumnDao: Promise<ISchemaRelationColumnDao>
	private schemaRelationDao: Promise<ISchemaRelationDao>
	private schemaVersionDao: Promise<ISchemaVersionDao>

	constructor() {
		this.domainDao               = DI.getP(DOMAIN_DAO)
		this.schemaColumnDao         = DI.getP(SCHEMA_COLUMN_DAO)
		this.schemaDao               = DI.getP(SCHEMA_DAO)
		this.schemaEntityDao         = DI.getP(SCHEMA_ENTITY_DAO)
		this.schemaPropertyColumnDao = DI.getP(SCHEMA_PROPERTY_COLUMN_DAO)
		this.schemaPropertyDao       = DI.getP(SCHEMA_PROPERTY_DAO)
		this.schemaReferenceDao      = DI.getP(SCHEMA_REFERENCE_DAO)
		this.schemaRelationColumnDao = DI.getP(SCHEMA_RELATION_COLUMN_DAO)
		this.schemaRelationDao       = DI.getP(SCHEMA_RELATION_DAO)
		this.schemaVersionDao        = DI.getP(SCHEMA_VERSION_DAO)
	}

	async retrieveDdlObjects(): Promise<DdlObjects> {
		const schemas                      = await (await this.schemaDao).findAllActive()
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

		const domains = await (await this.domainDao).findByIdIn(Array.from(domainIdSet))

		const allSchemaVersions = await (await this.schemaVersionDao)
			.findAllActiveOrderBySchemaIndexAndId()

		let lastSchemaIndex: SchemaIndex
		const latestSchemaVersions: ISchemaVersion[]   = []
		const allSchemaVersionsByIds: ISchemaVersion[] = []
		for (const schemaVersion of allSchemaVersions) {
			if (schemaVersion.schema.index !== lastSchemaIndex) {
				latestSchemaVersions.push(schemaVersion)
			}
			allSchemaVersionsByIds[schemaVersion.id] = schemaVersion
			lastSchemaIndex                          = schemaVersion.schema.index
		}

		const latestSchemaVersionIds = latestSchemaVersions.map(
			schemaVersion => schemaVersion.id)


		const schemaReferences = await (await this.schemaReferenceDao)
			.findAllForSchemaVersions(latestSchemaVersionIds)

		const entities  = await (await this.schemaEntityDao)
			.findAllForSchemaVersions(latestSchemaVersionIds)
		const entityIds = entities.map(
			entity => entity.id)

		const properties  = await (await this.schemaPropertyDao)
			.findAllForEntities(entityIds)
		const propertyIds = properties.map(
			property => property.id)

		const relations = await (await this.schemaRelationDao)
			.findAllForProperties(propertyIds)

		const columns   = await (await this.schemaColumnDao)
			.findAllForEntities(entityIds)
		const columnIds = columns.map(
			column => column.id)

		const propertyColumns = await (await this.schemaPropertyColumnDao)
			.findAllForColumns(columnIds)

		const relationColumns = await (await this.schemaRelationColumnDao)
			.findAllForColumns(columnIds)

		return {
			allSchemaVersionsByIds,
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
