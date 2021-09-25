import { IAirportDatabase } from '@airport/air-control';
import { ISequenceGenerator } from '@airport/check-in';
import { IContext } from '@airport/di';
import { JsonSchemaWithLastIds } from '@airport/security-check';
import { DdlObjects, IQueryObjectInitializer } from '@airport/takeoff';
export interface ISchemaInitializer {
    initialize(jsonSchemas: JsonSchemaWithLastIds[], context: IContext, canAlreadyRunQueries: boolean): Promise<void>;
    initializeForAIRportApp(jsonSchema: JsonSchemaWithLastIds): Promise<void>;
    hydrate(jsonSchemas: JsonSchemaWithLastIds[], context: IContext): Promise<void>;
    stage(jsonSchemas: JsonSchemaWithLastIds[], context: IContext): Promise<[IAirportDatabase, IQueryObjectInitializer, ISequenceGenerator]>;
}
export declare class SchemaInitializer implements ISchemaInitializer {
    addNewSchemaVersionsToAll(ddlObjects: DdlObjects): void;
    hydrate(jsonSchemas: JsonSchemaWithLastIds[], context: IContext): Promise<void>;
    initialize(jsonSchemas: JsonSchemaWithLastIds[], context: IContext, canAlreadyRunQueries: boolean): Promise<void>;
    initializeForAIRportApp(jsonSchema: JsonSchemaWithLastIds): Promise<void>;
    stage(jsonSchemas: JsonSchemaWithLastIds[], context: IContext): Promise<[IAirportDatabase, IQueryObjectInitializer, ISequenceGenerator]>;
    private getSchemasWithValidDependencies;
    private setAirDbSchemas;
}
//# sourceMappingURL=SchemaInitializer.d.ts.map