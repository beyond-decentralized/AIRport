import {DI}              from '@airport/di'
import {JsonSchema}      from '@airport/ground-control'
import {
	IQueryObjectInitializer,
	QUERY_OBJECT_INITIALIZER
}                        from '@airport/takeoff'
import {ISchemaBuilder}  from './builder/ISchemaBuilder'
import {ISchemaChecker}  from './checker/SchemaChecker'
import {
	SCHEMA_BUILDER,
	SCHEMA_CHECKER,
	SCHEMA_INITIALIZER,
	SCHEMA_LOCATOR,
	SCHEMA_RECORDER
}                        from './diTokens'
import {ISchemaLocator}  from './locator/SchemaLocator'
import {ISchemaRecorder} from './recorder/SchemaRecorder'

export interface ISchemaInitializer {

	initialize(
		jsonSchemas: JsonSchema[]
	): Promise<void>

}

export class SchemaInitializer
	implements ISchemaInitializer {

	private queryObjectInitializer: IQueryObjectInitializer
	private schemaBuilder: ISchemaBuilder
	private schemaChecker: ISchemaChecker
	private schemaLocator: ISchemaLocator
	private schemaRecorder: ISchemaRecorder

	constructor() {
		DI.get((
			queryObjectInitializer,
			schemaBuilder,
			schemaChecker,
			schemaLocator,
			schemaRecorder
			) => {
				this.queryObjectInitializer = queryObjectInitializer
				this.schemaBuilder          = schemaBuilder
				this.schemaChecker          = schemaChecker
				this.schemaLocator          = schemaLocator
				this.schemaRecorder         = schemaRecorder
			}, QUERY_OBJECT_INITIALIZER, SCHEMA_BUILDER, SCHEMA_CHECKER,
			SCHEMA_LOCATOR, SCHEMA_RECORDER)
	}

	async initialize(
		jsonSchemas: JsonSchema[]
	): Promise<void> {

		const jsonSchemasToInstall: JsonSchema[] = []

		for (const jsonSchema of jsonSchemas) {
			await this.schemaChecker.check(jsonSchema)
			const existingSchema = this.schemaLocator.locateExistingSchemaVersionRecord(jsonSchema)

			if (existingSchema) {
				// Nothing needs to be done, we already have this schema version
				continue
			}
			jsonSchemasToInstall.push(jsonSchema)
		}

		const schemaReferenceCheckResults = await this.schemaChecker
			.checkDependencies(jsonSchemasToInstall)

		if (schemaReferenceCheckResults.neededDependencies.length
			|| schemaReferenceCheckResults.schemasInNeedOfAdditionalDependencies.length) {
			throw new Error(`Installing schemas with external dependencies
			is not currently supported.`)
		}

		for (const jsonSchema of schemaReferenceCheckResults.schemasWithValidDependencies) {
			await this.schemaBuilder.build(jsonSchema)
		}

		const ddlObjects = await this.schemaRecorder.record(schemaReferenceCheckResults.schemasWithValidDependencies)

		this.queryObjectInitializer.generateQObjectsAndPopulateStore(ddlObjects)
	}

}

DI.set(SCHEMA_INITIALIZER, SchemaInitializer)
