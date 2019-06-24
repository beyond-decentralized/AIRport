import {AIR_DB}             from '@airport/air-control'
import {SEQUENCE_GENERATOR} from '@airport/check-in'
import {DI}                 from '@airport/di'
import {
	DbSchema,
	JsonSchema
}                           from '@airport/ground-control'
import {
	DDL_OBJECT_LINKER,
	DDL_OBJECT_RETRIEVER,
	DdlObjects,
	QUERY_ENTITY_CLASS_CREATOR,
	QUERY_OBJECT_INITIALIZER
}                           from '@airport/takeoff'
import {TERMINAL_STORE}     from '@airport/terminal-map'
import {
	SCHEMA_BUILDER,
	SCHEMA_CHECKER,
	SCHEMA_COMPOSER,
	SCHEMA_INITIALIZER,
	SCHEMA_LOCATOR,
	SCHEMA_RECORDER
}                           from './diTokens'

export interface ISchemaInitializer {

	initialize(
		jsonSchemas: JsonSchema[],
		normalOperation?: boolean
	): Promise<void>

}

export class SchemaInitializer
	implements ISchemaInitializer {

	async initialize(
		jsonSchemas: JsonSchema[],
		normalOperation: boolean = true
	): Promise<void> {
		const [airDb, ddlObjectLinker, ddlObjectRetriever,
			      queryEntityClassCreator, queryObjectInitializer,
			      schemaBuilder, schemaChecker, schemaComposer,
			      schemaLocator, schemaRecorder, sequenceGenerator,
			      terminalStore] = await DI.get(AIR_DB,
			DDL_OBJECT_LINKER, DDL_OBJECT_RETRIEVER,
			QUERY_ENTITY_CLASS_CREATOR, QUERY_OBJECT_INITIALIZER,
			SCHEMA_BUILDER, SCHEMA_CHECKER,
			SCHEMA_COMPOSER, SCHEMA_LOCATOR, SCHEMA_RECORDER,
			SEQUENCE_GENERATOR, TERMINAL_STORE)

		const jsonSchemasToInstall: JsonSchema[] = []

		for (const jsonSchema of jsonSchemas) {
			await schemaChecker.check(jsonSchema)
			const existingSchema = schemaLocator.locateExistingSchemaVersionRecord(
				jsonSchema, terminalStore)

			if (existingSchema) {
				// Nothing needs to be done, we already have this schema version
				continue
			}
			jsonSchemasToInstall.push(jsonSchema)
		}

		let schemasWithValidDependencies

		if (normalOperation) {
			const schemaReferenceCheckResults = await schemaChecker
				.checkDependencies(jsonSchemasToInstall)

			if (schemaReferenceCheckResults.neededDependencies.length
				|| schemaReferenceCheckResults.schemasInNeedOfAdditionalDependencies.length) {
				throw new Error(`Installing schemas with external dependencies
			is not currently supported.`)
			}
			schemasWithValidDependencies = schemaReferenceCheckResults.schemasWithValidDependencies
		} else {
			schemasWithValidDependencies = jsonSchemasToInstall
		}

		for (const jsonSchema of schemasWithValidDependencies) {
			await schemaBuilder.build(jsonSchema)
		}

		const ddlObjects = schemaComposer.compose(
			schemasWithValidDependencies, ddlObjectRetriever,
			schemaLocator, terminalStore)

		if (normalOperation) {
			await schemaRecorder.record(ddlObjects, normalOperation)
		}

		this.addNewSchemaVersionsToAll(ddlObjects)

		queryObjectInitializer.generateQObjectsAndPopulateStore(
			ddlObjects, airDb, ddlObjectLinker, queryEntityClassCreator,
			terminalStore)

		if (!normalOperation) {
			const schemas: DbSchema[] = []
			for (let schema of ddlObjects.allSchemas) {
				schemas[schema.index] = schema as DbSchema
			}
			airDb.schemas = schemas
			airDb.S       = schemas
		}

		const newSequences = await schemaBuilder.buildAllSequences(
			schemasWithValidDependencies)

		await sequenceGenerator.init(newSequences)

		if (!normalOperation) {
			await schemaRecorder.record(ddlObjects, normalOperation)
		}
	}

	addNewSchemaVersionsToAll(
		ddlObjects: DdlObjects
	) {
		for (const schemaVersion of ddlObjects.schemaVersions) {
			ddlObjects.allSchemaVersionsByIds[schemaVersion.id] = schemaVersion
		}
	}

}

DI.set(SCHEMA_INITIALIZER, SchemaInitializer)
