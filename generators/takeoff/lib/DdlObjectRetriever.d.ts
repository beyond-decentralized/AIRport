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
    retrieveDdlObjects(): Promise<DdlObjects>;
}
