import {
	IUtils,
	UtilsToken
}                                from '@airport/air-control'
import {
	DomainId,
	ISchemaUtils,
	SchemaIndex,
	SchemaUtilsToken
} from '@airport/ground-control'
import {
	ITerminalStore,
	TerminalStoreToken
}                                from '@airport/terminal-map'
import {
	DomainDaoToken,
	IDomainDao
}                                from '@airport/territory'
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
	SchemaColumnDaoToken,
	SchemaDaoToken,
	SchemaEntityDaoToken,
	SchemaPropertyColumnDaoToken,
	SchemaPropertyDaoToken,
	SchemaReferenceDaoToken,
	SchemaRelationColumnDaoToken,
	SchemaRelationDaoToken,
	SchemaVersionDaoToken
}                                from '@airport/traffic-pattern'
import {
	Inject,
	Service
}                                from 'typedi'
import {DdlObjectRetrieverToken} from './InjectionTokens'
import {DllObjects}              from './QueryObjectInitializer'

export interface IDdlObjectRetriever {

	retrieveDdlObjects()
		: Promise<DllObjects>

}

@Service(DdlObjectRetrieverToken)
export class DdlObjectRetriever
	implements IDdlObjectRetriever {

	constructor(
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
		@Inject(SchemaVersionDaoToken)
		private schemaVersionDao: ISchemaVersionDao
	) {
	}

	async retrieveDdlObjects()
		: Promise<DllObjects> {
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