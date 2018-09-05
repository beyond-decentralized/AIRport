import { IUtils } from '@airport/air-control';
import { IDbSchemaUtils, JsonSchema } from '@airport/ground-control';
import { DdlObjects } from '@airport/takeoff';
import { ITerminalStore } from '@airport/terminal-map';
import { IDomainDao } from '@airport/territory';
import { ISchemaColumnDao, ISchemaDao, ISchemaEntityDao, ISchemaPropertyColumnDao, ISchemaPropertyDao, ISchemaReferenceDao, ISchemaRelationColumnDao, ISchemaRelationDao, ISchemaVersionDao } from '@airport/traffic-pattern';
import { ISchemaLocator } from '../locator/SchemaLocator';
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
    constructor(domainDao: IDomainDao, schemaColumnDao: ISchemaColumnDao, schemaDao: ISchemaDao, schemaEntityDao: ISchemaEntityDao, schemaLocator: ISchemaLocator, schemaPropertyColumnDao: ISchemaPropertyColumnDao, schemaPropertyDao: ISchemaPropertyDao, schemaReferenceDao: ISchemaReferenceDao, schemaRelationColumnDao: ISchemaRelationColumnDao, schemaRelationDao: ISchemaRelationDao, dbSchemaUtils: IDbSchemaUtils, schemaVersionDao: ISchemaVersionDao, terminalStore: ITerminalStore, utils: IUtils);
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
