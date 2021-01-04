import { IAirportDatabase } from '@airport/air-control';
import { ISequence } from '@airport/airport-code';
import { JsonSchema } from '@airport/ground-control';
import { IContext } from '@airport/di';
export interface ISchemaBuilder {
    build(jsonSchema: JsonSchema, context: IContext): Promise<void>;
    buildAllSequences(jsonSchemas: JsonSchema[], context: IContext): Promise<ISequence[]>;
    stageSequences(jsonSchemas: JsonSchema[], airDb: IAirportDatabase, context: IContext): ISequence[];
}
//# sourceMappingURL=ISchemaBuilder.d.ts.map