import { JsonSchema } from '@airport/ground-control';
import { ISchemaBuilder } from './builder/ISchemaBuilder';
import { ISchemaChecker } from './checker/SchemaChecker';
import { ISchemaLocator } from './locator/SchemaLocator';
import { ISchemaRecorder } from './recorder/SchemaRecorder';
export interface ISchemaInitializer {
    initialize(jsonSchemas: JsonSchema[]): Promise<void>;
}
export declare class SchemaInitializer implements ISchemaInitializer {
    private schemaBuilder;
    private schemaChecker;
    private schemaLocator;
    private schemaRecorder;
    constructor(schemaBuilder: ISchemaBuilder, schemaChecker: ISchemaChecker, schemaLocator: ISchemaLocator, schemaRecorder: ISchemaRecorder);
    initialize(jsonSchemas: JsonSchema[]): Promise<void>;
}
