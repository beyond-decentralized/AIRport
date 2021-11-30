import { IAirportDatabase }         from '@airport/air-control';
import {
	container,
	DI
}                                   from '@airport/di';
import {
	ITerminalStore,
	TERMINAL_STORE
}                                   from '@airport/terminal-map';
import {
	IDomain,
	ISchema,
	ISchemaColumn,
	ISchemaEntity,
	ISchemaProperty,
	ISchemaPropertyColumn,
	ISchemaReference,
	ISchemaRelation,
	ISchemaRelationColumn,
	ISchemaVersion
}                                   from '@airport/airspace';
import { IDdlObjectLinker }         from './DdlObjectLinker';
import { IQueryEntityClassCreator } from './QueryEntityClassCreator';
import {
	DDL_OBJECT_LINKER,
	DDL_OBJECT_RETRIEVER,
	QUERY_ENTITY_CLASS_CREATOR,
	QUERY_OBJECT_INITIALIZER
}                                   from './tokens';

export interface IQueryObjectInitializer {

	initialize(
		airDb: IAirportDatabase
	): Promise<AllDdlObjects>

	generateQObjectsAndPopulateStore(
		allDdlObjects: AllDdlObjects,
		airDb: IAirportDatabase,
		ddlObjectLinker: IDdlObjectLinker,
		queryEntityClassCreator: IQueryEntityClassCreator,
		terminalStore: ITerminalStore
	): void

}

export interface AllDdlObjects {
	all: DdlObjects
	allSchemaVersionsByIds: ISchemaVersion[]
	added: DdlObjects
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
	schemas: ISchema[]
	schemaReferences: ISchemaReference[]
	schemaVersions: ISchemaVersion[]

}

export class QueryObjectInitializer
	implements IQueryObjectInitializer {

	generateQObjectsAndPopulateStore(
		allDdlObjects: AllDdlObjects,
		airDb: IAirportDatabase,
		ddlObjectLinker: IDdlObjectLinker,
		queryEntityClassCreator: IQueryEntityClassCreator,
		terminalStore: ITerminalStore
	): void {
		ddlObjectLinker.link(allDdlObjects, terminalStore);
		queryEntityClassCreator.createAll(allDdlObjects.all.schemas, airDb);
		const lastTerminalState = terminalStore.getTerminalState();

		const existingDomainMap = {};
		for (const domain of lastTerminalState.domains) {
			existingDomainMap[domain.name] = domain;
		}
		for (const domain of allDdlObjects.added.domains) {
			delete existingDomainMap[domain.name];
		}
		const unmodifiedDomains: IDomain[] = [];
		for (const domainName in existingDomainMap) {
			unmodifiedDomains.push(existingDomainMap[domainName]);
		}

		const existingSchemaMap = {};
		for (const schema of lastTerminalState.schemas) {
			existingSchemaMap[schema.name] = schema;
		}
		for (const schema of allDdlObjects.added.schemas) {
			delete existingSchemaMap[schema.name];
		}
		const unmodifiedSchemas: ISchema[] = [];
		for (const schemaName in existingSchemaMap) {
			unmodifiedSchemas.push(existingSchemaMap[schemaName]);
		}

		terminalStore.state.next({
			...lastTerminalState,
			domains: [
				...unmodifiedDomains,
				...allDdlObjects.added.domains
			],
			schemas: [
				...unmodifiedSchemas,
				...allDdlObjects.added.schemas
			]
		});
	}

	async initialize(
		airDb: IAirportDatabase
	): Promise<AllDdlObjects> {
		const [ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator,
			      terminalStore] = await container(this).get(
			DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER,
			QUERY_ENTITY_CLASS_CREATOR, TERMINAL_STORE);

		const ddlObjects = await ddlObjectRetriever.retrieveDdlObjects();

		const allSchemaVersionsByIds = []

		for(const schemaVersion of ddlObjects.schemaVersions) {
			allSchemaVersionsByIds[schemaVersion.id] = schemaVersion
		}

		let allDdlObjects: AllDdlObjects = {
			all: ddlObjects,
			allSchemaVersionsByIds,
			added: ddlObjects
		}

		this.generateQObjectsAndPopulateStore(allDdlObjects, airDb,
			ddlObjectLinker, queryEntityClassCreator, terminalStore);

		return allDdlObjects;
	}

}

DI.set(QUERY_OBJECT_INITIALIZER, QueryObjectInitializer);
