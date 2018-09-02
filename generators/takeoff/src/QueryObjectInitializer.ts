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
}                           from 'typedi'
import {DdlObjectLinker}    from './DdlObjectLinker'
import {DdlObjectRetriever} from './DdlObjectRetriever'
import {
	DdlObjectLinkerToken,
	DdlObjectRetrieverToken,
	QueryObjectInitializerToken
} from './InjectionTokens'

export interface IQueryObjectInitializer {

	initialize(): Promise<void>

}

export interface DllObjects {

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
		@Inject(DdlObjectLinkerToken)
		private ddlObjectLinker: DdlObjectLinker,
		@Inject(DdlObjectRetrieverToken)
		private ddlObjectRetriever: DdlObjectRetriever,
		@Inject(SchemaUtilsToken)
		private schemaUtils: ISchemaUtils,
		@Inject(TerminalStoreToken)
		private terminalStore: ITerminalStore,
		@Inject(UtilsToken)
		private utils: IUtils
	) {
	}


	async initialize(): Promise<void> {
		const ddlObjects = await this.ddlObjectRetriever.retrieveDdlObjects()

		this.ddlObjectLinker.link(ddlObjects)
		

		this.terminalStore.state.next({
			...this.terminalStore.getTerminalState(),
			domains,
			schemas
		})

	}

}
