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
    relationColumns: number;
    relations: number;
    schemas: number;
    schemaVersions: number;
}
export declare class DdlObjectRetriever implements IDdlObjectRetriever {
    lastIds: LastIds;
    retrieveDdlObjects(): Promise<DdlObjects>;
}
//# sourceMappingURL=DdlObjectRetriever.d.ts.map