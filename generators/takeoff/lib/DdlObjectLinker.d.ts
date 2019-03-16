import { SchemaVersionId } from '@airport/ground-control';
import { IDomain } from '@airport/territory';
import { ISchema, ISchemaReference, ISchemaVersion } from '@airport/traffic-pattern';
import { DdlObjects } from './QueryObjectInitializer';
export interface IDdlObjectLinker {
    link(ddlObjects: DdlObjects): void;
}
export declare class DdlObjectLinker implements IDdlObjectLinker {
    link(ddlObjects: DdlObjects): void;
    linkDomainsAndSchemasAndVersions(domains: IDomain[], schemas: ISchema[], latestSchemaVersions: ISchemaVersion[], schemaReferences: ISchemaReference[]): Map<SchemaVersionId, ISchemaVersion>;
    private linkEntities;
    private linkPropertiesAndRelations;
    private linkColumns;
}
