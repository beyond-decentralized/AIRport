import {
	AIRPORT_DATABASE,
	IAirportDatabase
} from '@airport/air-control';
import {
	ISequenceGenerator,
	SEQUENCE_GENERATOR
} from '@airport/check-in';
import {
	container,
	DI,
	IContext
} from '@airport/di';
import {
	DbSchema,
	getSchemaName,
	JsonSchema
} from '@airport/ground-control';
import { JsonSchemaWithLastIds } from '@airport/security-check';
import {
	DDL_OBJECT_LINKER,
	DDL_OBJECT_RETRIEVER,
	DdlObjects,
	IQueryObjectInitializer,
	QUERY_ENTITY_CLASS_CREATOR,
	QUERY_OBJECT_INITIALIZER
} from '@airport/takeoff';
import { TERMINAL_STORE } from '@airport/terminal-map';
import { ISchema, SCHEMA_DAO } from '@airport/traffic-pattern';
import {
	SCHEMA_BUILDER,
	SCHEMA_CHECKER,
	SCHEMA_COMPOSER,
	SCHEMA_INITIALIZER,
	SCHEMA_LOCATOR,
	SCHEMA_RECORDER
} from './tokens';

export interface ISchemaInitializer {

	initialize(
		jsonSchemas: JsonSchemaWithLastIds[],
		context: IContext,
		canAlreadyRunQueries: boolean
	): Promise<void>

	initializeForAIRportApp(
		jsonSchema: JsonSchemaWithLastIds
	): Promise<void>

	hydrate(
		jsonSchemas: JsonSchemaWithLastIds[],
		context: IContext,
	): Promise<void>

	stage(
		jsonSchemas: JsonSchemaWithLastIds[],
		context: IContext,
	): Promise<[IAirportDatabase, IQueryObjectInitializer, ISequenceGenerator]>

}

export class SchemaInitializer
	implements ISchemaInitializer {

	addNewSchemaVersionsToAll(ddlObjects: DdlObjects) {
		for (const schemaVersion of ddlObjects.schemaVersions) {
			ddlObjects.allSchemaVersionsByIds[schemaVersion.id] = schemaVersion;
		}
	}

	async hydrate(
		jsonSchemas: JsonSchemaWithLastIds[],
		context: IContext,
	): Promise<void> {
		const [airDb, queryObjectInitializer, sequenceGenerator] =
			await this.stage(jsonSchemas, context);
		// Hydrate all DDL objects and Sequences

		const ddlObjects = await queryObjectInitializer.initialize(airDb);

		this.addNewSchemaVersionsToAll(ddlObjects);

		this.setAirDbSchemas(airDb, ddlObjects);

		await sequenceGenerator.initialize();
	}

	/*
	 * Initialization scenarios:
	 *
	 * Brand new install - initialize BLUEPRINT schemas
	 * Install new App - initialize New schema (and any new dependency schemas)
	 * Reload existing install - hydrate all schemas
	 * Reload exiting App - nothing to do
	 */

	async initialize(
		jsonSchemas: JsonSchemaWithLastIds[],
		context: IContext,
		canAlreadyRunQueries: boolean
	): Promise<void> {
		const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator,
			queryObjectInitializer, schemaBuilder, schemaComposer,
			schemaLocator, schemaRecorder, sequenceGenerator, terminalStore]
			= await container(this).get(AIRPORT_DATABASE, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER,
				QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, SCHEMA_BUILDER,
				SCHEMA_COMPOSER, SCHEMA_LOCATOR, SCHEMA_RECORDER,
				SEQUENCE_GENERATOR, TERMINAL_STORE);

		const schemasWithValidDependencies = await this.
			getSchemasWithValidDependencies(jsonSchemas, canAlreadyRunQueries)

		for (const jsonSchema of schemasWithValidDependencies) {
			await schemaBuilder.build(jsonSchema, context);
		}

		const ddlObjects = schemaComposer.compose(
			schemasWithValidDependencies, ddlObjectRetriever, schemaLocator, terminalStore);

		if (canAlreadyRunQueries) {
			await schemaRecorder.record(ddlObjects, context);
		}

		this.addNewSchemaVersionsToAll(ddlObjects);

		queryObjectInitializer.generateQObjectsAndPopulateStore(
			ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);

		this.setAirDbSchemas(airDb, ddlObjects);

		const newSequences = await schemaBuilder.buildAllSequences(
			schemasWithValidDependencies, context);

		await sequenceGenerator.initialize(newSequences);

		if (!canAlreadyRunQueries) {
			await schemaRecorder.record(ddlObjects, context);
		}
	}

	async initializeForAIRportApp(
		jsonSchema: JsonSchemaWithLastIds
	): Promise<void> {
		const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator,
			queryObjectInitializer, schemaComposer, schemaLocator, terminalStore]
			= await container(this).get(AIRPORT_DATABASE, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER,
				QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER,
				SCHEMA_COMPOSER, SCHEMA_LOCATOR, TERMINAL_STORE);

		const schemasWithValidDependencies = await this.
			getSchemasWithValidDependencies([jsonSchema], false)

		const ddlObjects = schemaComposer.compose(
			schemasWithValidDependencies, ddlObjectRetriever, schemaLocator, terminalStore)

		this.addNewSchemaVersionsToAll(ddlObjects);

		queryObjectInitializer.generateQObjectsAndPopulateStore(
			ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);

		this.setAirDbSchemas(airDb, ddlObjects);
	}

	async stage(
		jsonSchemas: JsonSchemaWithLastIds[],
		context: IContext,
	): Promise<[IAirportDatabase, IQueryObjectInitializer, ISequenceGenerator]> {
		const [airDb, ddlObjectLinker, ddlObjectRetriever, queryEntityClassCreator,
			queryObjectInitializer, schemaBuilder, schemaComposer,
			schemaLocator, sequenceGenerator, terminalStore]
			= await container(this).get(AIRPORT_DATABASE, DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER,
				QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER, SCHEMA_BUILDER,
				SCHEMA_COMPOSER, SCHEMA_LOCATOR, SEQUENCE_GENERATOR, TERMINAL_STORE);

		// Temporarily Initialize schema DDL objects and Sequences to allow for normal hydration

		const tempDdlObjects = schemaComposer.compose(
			jsonSchemas, ddlObjectRetriever, schemaLocator, terminalStore);

		this.addNewSchemaVersionsToAll(tempDdlObjects);

		queryObjectInitializer.generateQObjectsAndPopulateStore(
			tempDdlObjects, airDb, ddlObjectLinker, queryEntityClassCreator, terminalStore);

		this.setAirDbSchemas(airDb, tempDdlObjects);

		const newSequences = await schemaBuilder.stageSequences(
			jsonSchemas, airDb, context);

		await sequenceGenerator.tempInitialize(newSequences);

		return [airDb, queryObjectInitializer, sequenceGenerator];
	}

	private async getSchemasWithValidDependencies(
		jsonSchemas: JsonSchemaWithLastIds[],
		checkDependencies: boolean
	): Promise<JsonSchemaWithLastIds[]> {
		const [schemaChecker, schemaLocator, terminalStore]
			= await container(this).get(SCHEMA_CHECKER, SCHEMA_LOCATOR, TERMINAL_STORE);
		const jsonSchemasToInstall: JsonSchema[] = [];

		for (const jsonSchema of jsonSchemas) {
			await schemaChecker.check(jsonSchema);
			const existingSchema = schemaLocator.locateExistingSchemaVersionRecord(
				jsonSchema, terminalStore);

			if (existingSchema) {
				// Nothing needs to be done, we already have this schema version
				continue;
			}
			jsonSchemasToInstall.push(jsonSchema);
		}

		let schemasWithValidDependencies;

		if (checkDependencies) {
			const schemaReferenceCheckResults = await schemaChecker
				.checkDependencies(jsonSchemasToInstall);

			if (schemaReferenceCheckResults.neededDependencies.length
				|| schemaReferenceCheckResults.schemasInNeedOfAdditionalDependencies.length) {
				throw new Error(`Installing schemas with external dependencies
			is not currently supported.`);
			}
			schemasWithValidDependencies = schemaReferenceCheckResults.schemasWithValidDependencies;
		} else {
			schemasWithValidDependencies = jsonSchemasToInstall;
		}

		return schemasWithValidDependencies
	}

	private setAirDbSchemas(
		airDb: IAirportDatabase,
		ddlObjects: DdlObjects
	) {
		for (let schema of ddlObjects.allSchemas) {
			airDb.schemas[schema.index] = schema as DbSchema;
		}
	}

}

DI.set(SCHEMA_INITIALIZER, SchemaInitializer);
