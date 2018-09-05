import {JsonSchema}                  from '@airport/ground-control'
import {IQueryObjectInitializer}     from '@airport/takeoff'
import {QueryObjectInitializerToken} from '@airport/takeoff/lib/InjectionTokens'
import {
	Inject,
	Service
}                                    from 'typedi'
import {ISchemaBuilder}              from './builder/ISchemaBuilder'
import {ISchemaChecker}              from './checker/SchemaChecker'
import {
	SchemaBuilderToken,
	SchemaCheckerToken,
	SchemaInitializerToken,
	SchemaLocatorToken,
	SchemaRecorderToken
}                                    from './InjectionTokens'
import {ISchemaLocator}              from './locator/SchemaLocator'
import {ISchemaRecorder}             from './recorder/SchemaRecorder'

export interface ISchemaInitializer {

	initialize(
		jsonSchemas: JsonSchema[]
	): Promise<void>

}

@Service(SchemaInitializerToken)
export class SchemaInitializer
	implements ISchemaInitializer {

	constructor(
		@Inject(QueryObjectInitializerToken)
		private queryObjectInitializer: IQueryObjectInitializer,
		@Inject(SchemaBuilderToken)
		private schemaBuilder: ISchemaBuilder,
		@Inject(SchemaCheckerToken)
		private schemaChecker: ISchemaChecker,
		@Inject(SchemaLocatorToken)
		private schemaLocator: ISchemaLocator,
		@Inject(SchemaRecorderToken)
		private schemaRecorder: ISchemaRecorder
	) {
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