import { JsonSchema } from '@airport/ground-control';
import { ISchemaBuilder } from './builder/ISchemaBuilder';
import { ISchemaChecker } from './checker/SchemaChecker';
import { ISchemaLocator } from './locator/SchemaLocator';
export interface ISchemaInitializer {
    initialize(jsonSchema: JsonSchema): Promise<void>;
}
export declare class SchemaInitializer implements ISchemaInitializer {
    private schemaBuilder;
    private schemaChecker;
    private schemaLocator;
    constructor(schemaBuilder: ISchemaBuilder, schemaChecker: ISchemaChecker, schemaLocator: ISchemaLocator);
    initialize(jsonSchema: JsonSchema): Promise<void>;
}
