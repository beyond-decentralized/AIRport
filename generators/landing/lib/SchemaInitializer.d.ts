import { IAirportDatabase } from '@airport/air-control';
import { ISequenceGenerator } from '@airport/check-in';
import { IContext } from '@airport/di';
import { JsonSchema } from '@airport/ground-control';
import { DdlObjects, IQueryObjectInitializer } from '@airport/takeoff';
export interface ISchemaInitializer {
    initialize(jsonSchemas: JsonSchema[], context: IContext, normalOperation?: boolean): Promise<void>;
    hydrate(jsonSchemas: JsonSchema[], context: IContext): Promise<void>;
    stage(jsonSchemas: JsonSchema[], context: IContext): Promise<[IAirportDatabase, IQueryObjectInitializer, ISequenceGenerator]>;
}
export declare class SchemaInitializer implements ISchemaInitializer {
    addNewSchemaVersionsToAll(ddlObjects: DdlObjects): void;
    hydrate(jsonSchemas: JsonSchema[], context: IContext): Promise<void>;
    initialize(jsonSchemas: JsonSchema[], context: IContext, normalOperation?: boolean): Promise<void>;
    stage(jsonSchemas: JsonSchema[], context: IContext): Promise<[IAirportDatabase, IQueryObjectInitializer, ISequenceGenerator]>;
    private setAirDbSchemas;
}
//# sourceMappingURL=SchemaInitializer.d.ts.map