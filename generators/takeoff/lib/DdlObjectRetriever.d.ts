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
    constructor();
    retrieveDdlObjects(): Promise<DdlObjects>;
}
