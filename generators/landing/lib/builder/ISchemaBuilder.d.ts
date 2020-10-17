import { IAirportDatabase } from '@airport/air-control';
import { ISequence } from '@airport/airport-code';
import { JsonSchema } from '@airport/ground-control';
export interface ISchemaBuilder {
    build(jsonSchema: JsonSchema): Promise<void>;
    buildAllSequences(jsonSchemas: JsonSchema[]): Promise<ISequence[]>;
    stageSequences(jsonSchemas: JsonSchema[], airDb: IAirportDatabase): ISequence[];
}
//# sourceMappingURL=ISchemaBuilder.d.ts.map