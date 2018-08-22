import { ISchemaUtils, JsonSchema } from '@airport/ground-control';
import { IDomainDao } from '@airport/territory';
import { ISchemaDao, ISchemaVersionDao } from '@airport/traffic-pattern';
export interface ISchemaRecorder {
    record(jsonSchemas: JsonSchema[]): Promise<void>;
}
export declare class SchemaRecorder implements ISchemaRecorder {
    private domainDao;
    private schemaDao;
    private schemaUtils;
    private schemaVersionDao;
    constructor(domainDao: IDomainDao, schemaDao: ISchemaDao, schemaUtils: ISchemaUtils, schemaVersionDao: ISchemaVersionDao);
    record(jsonSchemas: JsonSchema[]): Promise<void>;
}
