import {
	ITerminalStore,
	TerminalStoreToken
}                                 from '@airport/terminal-map'
import {IDomain}                  from '@airport/territory'
import {
	ISchema,
	ISchemaColumn,
	ISchemaEntity,
	ISchemaProperty,
	ISchemaPropertyColumn,
	ISchemaReference,
	ISchemaRelation,
	ISchemaRelationColumn,
	ISchemaVersion
}                                 from '@airport/traffic-pattern'
import {
	Inject,
	Service
}                                 from 'typedi'
import {DdlObjectLinker}          from './DdlObjectLinker'
import {DdlObjectRetriever}       from './DdlObjectRetriever'
import {
	DdlObjectLinkerToken,
	DdlObjectRetrieverToken,
	QueryEntityClassCreatorToken,
	QueryObjectInitializerToken
}                                 from './InjectionTokens'
import {IQueryEntityClassCreator} from './QueryEntityClassCreator'

export interface IQueryObjectInitializer {

	initialize(): Promise<void>

	generateQObjectsAndPopulateStore(
		ddlObjects: DdlObjects
	): void

}

export interface DdlObjects {

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
		@Inject(DdlObjectLinkerToken)
		private ddlObjectLinker: DdlObjectLinker,
		@Inject(DdlObjectRetrieverToken)
		private ddlObjectRetriever: DdlObjectRetriever,
		@Inject(QueryEntityClassCreatorToken)
		private queryEntityClassCreator: IQueryEntityClassCreator,
		@Inject(TerminalStoreToken)
		private terminalStore: ITerminalStore,
	) {
	}


	async initialize(): Promise<void> {
		const ddlObjects = await this.ddlObjectRetriever.retrieveDdlObjects()

		this.generateQObjectsAndPopulateStore(ddlObjects)
	}

	generateQObjectsAndPopulateStore(
		ddlObjects: DdlObjects
	): void {
		this.ddlObjectLinker.link(ddlObjects)

		this.queryEntityClassCreator.createAll(ddlObjects.schemas)

		this.terminalStore.state.next({
			...this.terminalStore.getTerminalState(),
			domains: ddlObjects.domains,
			schemas: ddlObjects.schemas
		})
	}

}
