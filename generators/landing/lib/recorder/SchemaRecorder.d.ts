import { IUtils } from '@airport/air-control';
import { ISchemaUtils, JsonSchema } from '@airport/ground-control';
import { IDomainDao } from '@airport/territory';
import { ISchemaDao, ISchemaVersionDao } from '@airport/traffic-pattern';
import { ISchemaColumnDao } from '@airport/traffic-pattern/lib/dao/SchemaColumnDao';
import { ISchemaEntityDao } from '@airport/traffic-pattern/lib/dao/SchemaEntityDao';
import { ISchemaPropertyColumnDao } from '@airport/traffic-pattern/lib/dao/SchemaPropertyColumnDao';
import { ISchemaPropertyDao } from '@airport/traffic-pattern/lib/dao/SchemaPropertyDao';
import { ISchemaReferenceDao } from '@airport/traffic-pattern/lib/dao/SchemaReferenceDao';
import { ISchemaRelationColumnDao } from '@airport/traffic-pattern/lib/dao/SchemaRelationColumnDao';
import { ISchemaRelationDao } from '@airport/traffic-pattern/lib/dao/SchemaRelationDao';
import { ISchemaLocator } from '../locator/SchemaLocator';
export interface ISchemaRecorder {
    record(jsonSchemas: JsonSchema[]): Promise<void>;
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
    private schemaUtils;
    private schemaVersionDao;
    private utils;
    constructor(domainDao: IDomainDao, schemaColumnDao: ISchemaColumnDao, schemaDao: ISchemaDao, schemaEntityDao: ISchemaEntityDao, schemaLocator: ISchemaLocator, schemaPropertyColumnDao: ISchemaPropertyColumnDao, schemaPropertyDao: ISchemaPropertyDao, schemaReferenceDao: ISchemaReferenceDao, schemaRelationColumnDao: ISchemaRelationColumnDao, schemaRelationDao: ISchemaRelationDao, schemaUtils: ISchemaUtils, schemaVersionDao: ISchemaVersionDao, utils: IUtils);
    record(jsonSchemas: JsonSchema[]): Promise<void>;
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
