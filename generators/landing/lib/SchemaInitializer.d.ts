import { JsonSchema } from '@airport/ground-control';
import { IQueryObjectInitializer } from '@airport/takeoff';
import { ISchemaBuilder } from './builder/ISchemaBuilder';
import { ISchemaChecker } from './checker/SchemaChecker';
import { ISchemaLocator } from './locator/SchemaLocator';
import { ISchemaRecorder } from './recorder/SchemaRecorder';
export interface ISchemaInitializer {
    initialize(jsonSchemas: JsonSchema[]): Promise<void>;
}
export declare class SchemaInitializer implements ISchemaInitializer {
    private queryObjectInitializer;
    private schemaBuilder;
    private schemaChecker;
    private schemaLocator;
    private schemaRecorder;
    constructor(queryObjectInitializer: IQueryObjectInitializer, schemaBuilder: ISchemaBuilder, schemaChecker: ISchemaChecker, schemaLocator: ISchemaLocator, schemaRecorder: ISchemaRecorder);
    initialize(jsonSchemas: JsonSchema[]): Promise<void>;
}
