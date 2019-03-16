import { IDomainDao } from '@airport/territory';
import { ISchemaColumnDao, ISchemaDao, ISchemaEntityDao, ISchemaPropertyColumnDao, ISchemaPropertyDao, ISchemaReferenceDao, ISchemaRelationColumnDao, ISchemaRelationDao, ISchemaVersionDao } from '@airport/traffic-pattern';
import { DdlObjects } from './QueryObjectInitializer';
export interface IDdlObjectRetriever {
    retrieveDdlObjects(): Promise<DdlObjects>;
}
export declare class DdlObjectRetriever implements IDdlObjectRetriever {
    private domainDao;
    private schemaColumnDao;
    private schemaDao;
    private schemaEntityDao;
    private schemaPropertyColumnDao;
    private schemaPropertyDao;
    private schemaReferenceDao;
    private schemaRelationColumnDao;
    private schemaRelationDao;
    private schemaVersionDao;
    constructor(domainDao: IDomainDao, schemaColumnDao: ISchemaColumnDao, schemaDao: ISchemaDao, schemaEntityDao: ISchemaEntityDao, schemaPropertyColumnDao: ISchemaPropertyColumnDao, schemaPropertyDao: ISchemaPropertyDao, schemaReferenceDao: ISchemaReferenceDao, schemaRelationColumnDao: ISchemaRelationColumnDao, schemaRelationDao: ISchemaRelationDao, schemaVersionDao: ISchemaVersionDao);
    retrieveDdlObjects(): Promise<DdlObjects>;
}
