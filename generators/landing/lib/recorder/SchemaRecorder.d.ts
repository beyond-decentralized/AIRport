import { JsonSchema } from '@airport/ground-control';
import { DdlObjects } from '@airport/takeoff';
export interface ISchemaRecorder {
    record(jsonSchemas: JsonSchema[]): Promise<DdlObjects>;
}
export declare class SchemaRecorder implements ISchemaRecorder {
    private domainDao;
    private schemaColumnDao;
    private schemaDao;
    private schemaEntityDao;
    private schemaLocator;
    private schemaPropertyColumnDao;
    private schemaPropertyDao;
    private schemaReferenceDao;
    private schemaRelationColumnDao;
    private schemaRelationDao;
    private dbSchemaUtils;
    private schemaVersionDao;
    private terminalStore;
    private utils;
    constructor();
    record(jsonSchemas: JsonSchema[]): Promise<DdlObjects>;
    private recordDomains;
    private recordSchemas;
    private recordSchemaVersions;
    private generateSchemaReferences;
    private generateSchemaEntities;
    private generateSchemaProperties;
    private generateSchemaRelations;
    private generateSchemaColumns;
    private generateSchemaRelationColumns;
}
