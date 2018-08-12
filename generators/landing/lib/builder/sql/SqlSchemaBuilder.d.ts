import { JsonSchema } from '@airport/ground-control';
import { ISchemaBuilder } from '../ISchemaBuilder';
export declare class SqlSchemaBuilder implements ISchemaBuilder {
    constructor();
    build(jsonSchema: JsonSchema): Promise<void>;
}
