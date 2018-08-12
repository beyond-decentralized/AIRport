import {JsonSchema}     from '@airport/ground-control'
import {
	Inject,
	Service
}                       from 'typedi'
import {ISchemaBuilder} from './builder/ISchemaBuilder'
import {ISchemaChecker} from './checker/SchemaChecker'
import {
	SchemaBuilderToken,
	SchemaCheckerToken,
	SchemaInitializerToken,
	SchemaLocatorToken
}                       from './InjectionTokens'
import {ISchemaLocator} from './locator/SchemaLocator'

export interface ISchemaInitializer {

	initialize(
		jsonSchema: JsonSchema
	): Promise<void>

}

@Service(SchemaInitializerToken)
export class SchemaInitializer
	implements ISchemaInitializer {

	constructor(
		@Inject(SchemaBuilderToken)
		private schemaBuilder: ISchemaBuilder,
		@Inject(SchemaCheckerToken)
		private schemaChecker: ISchemaChecker,
		@Inject(SchemaLocatorToken)
		private schemaLocator: ISchemaLocator,
	) {
	}

	async initialize(
		jsonSchema: JsonSchema
	): Promise<void> {
		await this.schemaChecker.check(jsonSchema)
		const existingSchema = this.schemaLocator.locateExistingSchemaVersionRecord(jsonSchema)

		if (existingSchema) {
			// Nothing needs to be done, we already have this schema version
			return
		}

		this.schemaBuilder.build(jsonSchema)
	}

}