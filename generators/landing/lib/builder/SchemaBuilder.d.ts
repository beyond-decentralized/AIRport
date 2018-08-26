import { JsonSchema } from '@airport/ground-control';
export interface SchemaBuilder {
    build(jsonSchema: JsonSchema): void;
}
