import {IAirportDatabase}         from '@airport/air-control'
import {
	container,
	DI
}                                 from '@airport/di'
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
import {IQueryEntityClassCreator} from './QueryEntityClassCreator'
import {
	DDL_OBJECT_LINKER,
	DDL_OBJECT_RETRIEVER,
	QUERY_ENTITY_CLASS_CREATOR,
	QUERY_OBJECT_INITIALIZER
}                                 from './tokens'

export interface IQueryObjectInitializer {

	initialize(
		airDb: IAirportDatabase
	): Promise<DdlObjects>

	generateQObjectsAndPopulateStore(
		ddlObjects: DdlObjects,
		airDb: IAirportDatabase,
		ddlObjectLinker: IDdlObjectLinker,
		queryEntityClassCreator: IQueryEntityClassCreator,
		terminalStore: ITerminalStore
	): void

}

export interface DdlObjects {

	allDomains: IDomain[]
	allSchemas: ISchema[]
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

	async initialize(
		airDb: IAirportDatabase
	): Promise<DdlObjects> {
		const [ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator,
			      terminalStore] = await container(this).get(
			DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER,
			QUERY_ENTITY_CLASS_CREATOR, TERMINAL_STORE)

		const ddlObjects = await ddlObjectRetriever.retrieveDdlObjects()

		this.generateQObjectsAndPopulateStore(ddlObjects, airDb,
			ddlObjectLinker, queryEntityClassCreator, terminalStore)

		return ddlObjects
	}

	generateQObjectsAndPopulateStore(
		ddlObjects: DdlObjects,
		airDb: IAirportDatabase,
		ddlObjectLinker: IDdlObjectLinker,
		queryEntityClassCreator: IQueryEntityClassCreator,
		terminalStore: ITerminalStore
	): void {
		ddlObjectLinker.link(ddlObjects, terminalStore)

		queryEntityClassCreator.createAll(ddlObjects.schemas, airDb)

		const lastTerminalState = terminalStore.getTerminalState()

		terminalStore.state.next({
			...lastTerminalState,
			domains: [
				...lastTerminalState.domains,
				...ddlObjects.domains
			],
			schemas: [
				...lastTerminalState.schemas,
				...ddlObjects.schemas
			]
		})
	}

}

DI.set(QUERY_OBJECT_INITIALIZER, QueryObjectInitializer)
