import {JsonSchema} from '@airport/ground-control'

export interface ISchemaBuilder {

	build(
		jsonSchema: JsonSchema
	): Promise<void>

	buildAllSequences(
		jsonSchemas: JsonSchema[]
	): Promise<void>

}
