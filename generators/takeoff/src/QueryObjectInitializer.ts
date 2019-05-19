import {DI}                       from '@airport/di'
import {
	ITerminalStore,
	TERMINAL_STORE
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
import {IDdlObjectLinker}         from './DdlObjectLinker'
import {IDdlObjectRetriever}      from './DdlObjectRetriever'
import {
	DDL_OBJECT_LINKER,
	DDL_OBJECT_RETRIEVER,
	QUERY_ENTITY_CLASS_CREATOR,
	QUERY_OBJECT_INITIALIZER
}                                 from './diTokens'
import {IQueryEntityClassCreator} from './QueryEntityClassCreator'

export interface IQueryObjectInitializer {

	initialize(): Promise<void>

	generateQObjectsAndPopulateStore(
		ddlObjects: DdlObjects
	): void

}

export interface DdlObjects {

	allDomains: IDomain[]
	allSchemas: IDomain[]
	allSchemaVersionsByIds: ISchemaVersion[]
	columns: ISchemaColumn[]
	domains: IDomain[]
	entities: ISchemaEntity[]
	latestSchemaVersions: ISchemaVersion[]
	properties: ISchemaProperty[]
	propertyColumns: ISchemaPropertyColumn[]
	relationColumns: ISchemaRelationColumn[]
	relations: ISchemaRelation[]
	schemas: ISchema[]
	schemaReferences: ISchemaReference[]
	schemaVersions: ISchemaVersion[]

}

export class QueryObjectInitializer
	implements IQueryObjectInitializer {

	private ddlObjectLinker: IDdlObjectLinker
	private ddlObjectRetriever: IDdlObjectRetriever
	private queryEntityClassCreator: IQueryEntityClassCreator
	private terminalStore: ITerminalStore

	constructor() {
		DI.get((
			ddlObjectLinker,
			ddlObjectRetriever,
			queryEntityClassCreator,
			terminalStore
			) => {
				this.ddlObjectLinker         = ddlObjectLinker
				this.ddlObjectRetriever      = ddlObjectRetriever
				this.queryEntityClassCreator = queryEntityClassCreator
				this.terminalStore           = terminalStore
			}, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER,
			QUERY_ENTITY_CLASS_CREATOR, TERMINAL_STORE)
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

DI.set(QUERY_OBJECT_INITIALIZER, QueryObjectInitializer)
