import { IAirportDatabase } from '@airport/air-control'
import { ISequence } from '@airport/airport-code'
import { IContext } from '@airport/di';
import { JsonSchema } from '@airport/ground-control'
import { JsonSchemaWithLastIds } from '@airport/security-check';
import { ISchema } from '@airport/airspace';

export interface ISchemaBuilder {

	build(
		jsonSchema: JsonSchema,
		existingSchemaMap: Map<string, ISchema>,
		newJsonSchemaMap: Map<string, JsonSchemaWithLastIds>,
		context: IContext,
	): Promise<void>

	buildAllSequences(
		jsonSchemas: JsonSchema[],
		context: IContext,
	): Promise<ISequence[]>

	stageSequences(
		jsonSchemas: JsonSchema[],
		airDb: IAirportDatabase,
		context: IContext,
	): ISequence[]

}
