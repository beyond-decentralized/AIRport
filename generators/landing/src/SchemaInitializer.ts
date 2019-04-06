import {
	DI,
	ICachedPromise
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

	private queryObjectInitializer: ICachedPromise<IQueryObjectInitializer>
	private schemaBuilder: ICachedPromise<ISchemaBuilder>
	private schemaChecker: ICachedPromise<ISchemaChecker>
	private schemaLocator: ICachedPromise<ISchemaLocator>
	private schemaRecorder: ICachedPromise<ISchemaRecorder>

	constructor() {
		this.queryObjectInitializer = DI.cache(QUERY_OBJECT_INITIALIZER)
		this.schemaBuilder          = DI.cache(SCHEMA_BUILDER)
		this.schemaChecker          = DI.cache(SCHEMA_CHECKER)
		this.schemaLocator          = DI.cache(SCHEMA_LOCATOR)
		this.schemaRecorder         = DI.cache(SCHEMA_RECORDER)
	}

	async initialize(
		jsonSchemas: JsonSchema[],
		checkDependencies: boolean = false
	): Promise<void> {
		const jsonSchemasToInstall: JsonSchema[] = []

		const schemaChecker = await this.schemaChecker.get()

		for (const jsonSchema of jsonSchemas) {
			await schemaChecker.check(jsonSchema)
			const existingSchema = (await this.schemaLocator.get()).locateExistingSchemaVersionRecord(jsonSchema)

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
			await (await this.schemaBuilder.get()).build(jsonSchema)
		}

		const ddlObjects = await (await this.schemaRecorder.get())
			.record(schemasWithValidDependencies);

		(await this.queryObjectInitializer.get()).generateQObjectsAndPopulateStore(ddlObjects)
	}

}

DI.set(SCHEMA_INITIALIZER, SchemaInitializer)
