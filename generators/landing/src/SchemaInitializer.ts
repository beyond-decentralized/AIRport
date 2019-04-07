import {
	DI
}                        from '@airport/di'
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
		jsonSchemas: JsonSchema[],
		checkDependencies?: boolean
	): Promise<void>

}

export class SchemaInitializer
	implements ISchemaInitializer {

	private queryObjectInitializer: Promise<IQueryObjectInitializer>
	private schemaBuilder: Promise<ISchemaBuilder>
	private schemaChecker: Promise<ISchemaChecker>
	private schemaLocator: Promise<ISchemaLocator>
	private schemaRecorder: Promise<ISchemaRecorder>

	constructor() {
		this.queryObjectInitializer = DI.getP(QUERY_OBJECT_INITIALIZER)
		this.schemaBuilder          = DI.getP(SCHEMA_BUILDER)
		this.schemaChecker          = DI.getP(SCHEMA_CHECKER)
		this.schemaLocator          = DI.getP(SCHEMA_LOCATOR)
		this.schemaRecorder         = DI.getP(SCHEMA_RECORDER)
	}

	async initialize(
		jsonSchemas: JsonSchema[],
		checkDependencies: boolean = false
	): Promise<void> {
		const jsonSchemasToInstall: JsonSchema[] = []

		const schemaChecker = await this.schemaChecker

		for (const jsonSchema of jsonSchemas) {
			await schemaChecker.check(jsonSchema)
			const existingSchema = (await this.schemaLocator).locateExistingSchemaVersionRecord(jsonSchema)

			if (existingSchema) {
				// Nothing needs to be done, we already have this schema version
				continue
			}
			jsonSchemasToInstall.push(jsonSchema)
		}

		let schemasWithValidDependencies

		if (checkDependencies) {
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
			await (await this.schemaBuilder).build(jsonSchema)
		}

		const ddlObjects = await (await this.schemaRecorder)
			.record(schemasWithValidDependencies);

		(await this.queryObjectInitializer).generateQObjectsAndPopulateStore(ddlObjects)
	}

}

DI.set(SCHEMA_INITIALIZER, SchemaInitializer)
