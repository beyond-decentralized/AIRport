import { IContext } from '@airport/di';
import { JsonSchema } from '@airport/ground-control';
import { DdlObjects } from '@airport/takeoff';
export interface ISchemaInitializer {
    initialize(jsonSchemas: JsonSchema[], context: IContext, normalOperation?: boolean): Promise<void>;
    hydrate(jsonSchemas: JsonSchema[], context: IContext): Promise<void>;
}
export declare class SchemaInitializer implements ISchemaInitializer {
    initialize(jsonSchemas: JsonSchema[], context: IContext, normalOperation?: boolean): Promise<void>;
    addNewSchemaVersionsToAll(ddlObjects: DdlObjects): void;
    hydrate(jsonSchemas: JsonSchema[], context: IContext): Promise<void>;
    private setAirDbSchemas;
}
//# sourceMappingURL=SchemaInitializer.d.ts.map