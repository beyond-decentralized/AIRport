import { JsonSchema } from '@airport/ground-control';
import { DdlObjects } from '@airport/takeoff';
export interface ISchemaInitializer {
    initialize(jsonSchemas: JsonSchema[], normalOperation?: boolean): Promise<void>;
}
export declare class SchemaInitializer implements ISchemaInitializer {
    initialize(jsonSchemas: JsonSchema[], normalOperation?: boolean): Promise<void>;
    addNewSchemaVersionsToAll(ddlObjects: DdlObjects): void;
}
