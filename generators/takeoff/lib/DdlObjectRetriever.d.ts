import { DdlObjects } from './QueryObjectInitializer';
export interface IDdlObjectRetriever {
    lastIds: LastIds;
    retrieveDdlObjects(): Promise<DdlObjects>;
}
export interface LastIds {
    columns: number;
    domains: number;
    entities: number;
    properties: number;
    propertyColumns: number;
    relations: number;
    schemas: number;
    schemaVersions: number;
}
export declare class DdlObjectRetriever implements IDdlObjectRetriever {
    private domainDao;
    lastIds: LastIds;
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
