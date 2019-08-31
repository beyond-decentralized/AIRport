import { JsonSchema } from '@airport/ground-control';
import { DdlObjects } from '@airport/takeoff';
export interface ISchemaInitializer {
    initialize(jsonSchemas: JsonSchema[], normalOperation?: boolean): Promise<void>;
    hydrate(jsonSchemas: JsonSchema[]): Promise<void>;
}
export declare class SchemaInitializer implements ISchemaInitializer {
    initialize(jsonSchemas: JsonSchema[], normalOperation?: boolean): Promise<void>;
    addNewSchemaVersionsToAll(ddlObjects: DdlObjects): void;
    hydrate(jsonSchemas: JsonSchema[]): Promise<void>;
    private setAirDbSchemas;
}
