import { JsonSchema } from '@airport/ground-control';
import { DdlObjects } from '@airport/takeoff';
export interface ISchemaInitializer {
    initialize(jsonSchemas: JsonSchema[], normalOperation?: boolean): Promise<void>;
}
export declare class SchemaInitializer implements ISchemaInitializer {
    private queryObjectInitializer;
    private schemaBuilder;
    private schemaChecker;
    private schemaComposer;
    private schemaLocator;
    private schemaRecorder;
    private terminalStore;
    constructor();
    initialize(jsonSchemas: JsonSchema[], normalOperation?: boolean): Promise<void>;
    addNewSchemaVersionsToAll(ddlObjects: DdlObjects): void;
}
