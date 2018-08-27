import {
	IUtils,
	UtilsToken
}                                    from '@airport/air-control'
import {
	ISchemaUtils,
	SchemaUtilsToken
}                                    from '@airport/ground-control'
import {
	DomainDaoToken,
	IDomainDao
}                                    from '@airport/territory'
import {
	ISchemaDao,
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
import {ISchemaColumnDao}            from '@airport/traffic-pattern/lib/dao/SchemaColumnDao'
import {ISchemaEntityDao}            from '@airport/traffic-pattern/lib/dao/SchemaEntityDao'
import {ISchemaPropertyColumnDao}    from '@airport/traffic-pattern/lib/dao/SchemaPropertyColumnDao'
import {ISchemaPropertyDao}          from '@airport/traffic-pattern/lib/dao/SchemaPropertyDao'
import {ISchemaReferenceDao}         from '@airport/traffic-pattern/lib/dao/SchemaReferenceDao'
import {ISchemaRelationColumnDao}    from '@airport/traffic-pattern/lib/dao/SchemaRelationColumnDao'
import {ISchemaRelationDao}          from '@airport/traffic-pattern/lib/dao/SchemaRelationDao'
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
		const schemas              = await this.schemaDao.findAll()
		const latestSchemaVersions = await this.schemaVersionDao.findAllLatest()
		const latestSchemaVersionIds = latestSchemaVersions
			.map(schemaVersion => schemaVersion.id)
		const schemaReferences     = await this.schemaReferenceDao
			.findAllForSchemaVersions(latestSchemaVersionIds)
		const entities             = await this.schemaEntityDao
			.findAllForSchemaVersions(latestSchemaVersionIds)
		const properties           = await this.
	}

}
