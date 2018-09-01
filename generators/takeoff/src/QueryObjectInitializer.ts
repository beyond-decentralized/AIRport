import {
	IUtils,
	UtilsToken
}                                    from '@airport/air-control'
import {
	DomainId,
	ISchemaUtils,
	SchemaIndex,
	SchemaUtilsToken
}                                    from '@airport/ground-control'
import {
	DomainDaoToken,
	IDomain,
	IDomainDao
}                                    from '@airport/territory'
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
	SchemaColumnDaoToken,
	SchemaDaoToken,
	SchemaEntityDaoToken,
	SchemaPropertyColumnDaoToken,
	SchemaPropertyDaoToken,
	SchemaReferenceDaoToken,
	SchemaRelationColumnDaoToken,
	SchemaRelationDaoToken,
	SchemaVersionDaoToken
}                                    from '@airport/traffic-pattern'
import {
	Inject,
	Service
}                                    from 'typedi'
import {QueryObjectInitializerToken} from './InjectionTokens'

export interface IQueryObjectInitializer {

	initialize(): Promise<void>

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
		@Inject(UtilsToken)
		private utils: IUtils
	) {
	}


	async initialize(): Promise<void> {
		const schemas                      = await this.schemaDao
			.findAllActive()
		const schemaIndexes: SchemaIndex[] = []
		const domainIdSet: Set<DomainId>   = new Set()
		schemas.forEach(
			schema => {
				schemaIndexes.push(schema.index)
				domainIdSet.add(schema.domain.id)
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

	}

	linkDomainsAndSchemasAndVersions(
		domains: IDomain[],
		schemas: ISchema[],
		schemaVersions: ISchemaVersion
	) {
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
			domain.schemas.push(schema)
		})

	}

}
