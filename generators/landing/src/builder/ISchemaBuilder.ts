import {JsonSchema} from '@airport/ground-control'

export interface ISchemaBuilder {

	build(
		jsonSchema: JsonSchema
	): void;

}