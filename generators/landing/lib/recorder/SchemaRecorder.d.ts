import { ISchemaUtils, JsonSchema } from '@airport/ground-control';
import { IDomainDao } from '@airport/territory';
import { ISchemaDao, ISchemaVersionDao } from '@airport/traffic-pattern';
import { ISchemaEntityDao } from '@airport/traffic-pattern/lib/dao/SchemaEntityDao';
import { ISchemaReferenceDao } from '@airport/traffic-pattern/lib/dao/SchemaReferenceDao';
import { ISchemaLocator } from '../locator/SchemaLocator';
export interface ISchemaRecorder {
    record(jsonSchemas: JsonSchema[]): Promise<void>;
}
export declare class SchemaRecorder implements ISchemaRecorder {
    private domainDao;
    private schemaDao;
    private schemaEntityDao;
    private schemaLocator;
    private schemaReferenceDao;
    private schemaUtils;
    private schemaVersionDao;
    constructor(domainDao: IDomainDao, schemaDao: ISchemaDao, schemaEntityDao: ISchemaEntityDao, schemaLocator: ISchemaLocator, schemaReferenceDao: ISchemaReferenceDao, schemaUtils: ISchemaUtils, schemaVersionDao: ISchemaVersionDao);
    record(jsonSchemas: JsonSchema[]): Promise<void>;
    private recordDomains;
    private recordSchemas;
    private recordSchemaVersions;
    private generateSchemaReferences;
    private generateSchemaEntities;
}
