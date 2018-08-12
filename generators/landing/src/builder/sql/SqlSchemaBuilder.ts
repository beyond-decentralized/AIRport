import {JsonSchema}     from '@airport/ground-control'
import {
	Inject,
	Service
}                       from 'typedi'
import {
	SchemaBuilderToken,
	SchemaLocatorToken
}                       from '../../InjectionTokens'
import {ISchemaLocator} from '../../locator/SchemaLocator'
import {ISchemaBuilder} from '../ISchemaBuilder'

@Service(SchemaBuilderToken)
export class SqlSchemaBuilder
	implements ISchemaBuilder {

	constructor(
	) {
	}

	async build(
		jsonSchema: JsonSchema
	): Promise<void> {

	}

}