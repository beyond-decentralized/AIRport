import { DdlObjects } from './QueryObjectInitializer';
export interface IDdlObjectLinker {
    link(ddlObjects: DdlObjects): void;
}
export declare class DdlObjectLinker implements IDdlObjectLinker {
    link(ddlObjects: DdlObjects): void;
    private linkDomainsAndSchemasAndVersions;
    private linkEntities;
    private linkPropertiesAndRelations;
    private linkColumns;
}
