import { JsonSchema } from '@airport/ground-control';
export interface ISchemaInitializer {
    initialize(jsonSchemas: JsonSchema[], checkDependencies?: boolean): Promise<void>;
}
export declare class SchemaInitializer implements ISchemaInitializer {
    private queryObjectInitializer;
    private schemaBuilder;
    private schemaChecker;
    private schemaLocator;
    private schemaRecorder;
    constructor();
    initialize(jsonSchemas: JsonSchema[], checkDependencies?: boolean): Promise<void>;
}
