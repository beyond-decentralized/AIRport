import {JsonSchema}         from '@airport/ground-control'
import {Service}            from 'typedi'
import {SchemaCheckerToken} from '../InjectionTokens'

export interface ISchemaChecker {

	check(
		jsonSchema: JsonSchema
	): Promise<void>

}

@Service(SchemaCheckerToken)
export class SchemaChecker {

	async check(
		jsonSchema: JsonSchema
	): Promise<void> {
		if (!jsonSchema) {
			throw new Error(`Json Schema not provided`)
		}
		if (!(jsonSchema.versions instanceof Array)) {
			throw new Error('schema.versions is not an array')
		}
		if (jsonSchema.versions.length !== 1) {
			// FIXME: add support for schema versioning
			throw new Error('Currently only 1 version of schema is supported')
		}

		await this.checkDomain(jsonSchema)
	}

	async checkDomain(
		jsonSchema: JsonSchema
	): Promise<void> {
		// TODO: implement domain checking
	}

}