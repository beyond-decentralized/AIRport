import { JsonSchema } from '@airport/ground-control';
import { DdlObjects } from '@airport/takeoff';
export interface ISchemaComposer {
    compose(jsonSchemas: JsonSchema[]): DdlObjects;
}
export declare class SchemaComposer implements ISchemaComposer {
    private dbSchemaUtils;
    private ddlObjectRetriever;
    private schemaLocator;
    private terminalStore;
    private utils;
    constructor();
    compose(jsonSchemas: JsonSchema[]): DdlObjects;
    private composeDomains;
    private composeSchemas;
    private composeSchemaVersions;
    private composeSchemaReferences;
    private composeSchemaEntities;
    private composeSchemaProperties;
    private composeSchemaRelations;
    private composeSchemaColumns;
    private composeSchemaRelationColumns;
}
