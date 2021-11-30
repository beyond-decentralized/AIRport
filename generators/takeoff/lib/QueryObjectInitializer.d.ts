import { IAirportDatabase } from '@airport/air-control';
import { ITerminalStore } from '@airport/terminal-map';
import { IDomain, ISchema, ISchemaColumn, ISchemaEntity, ISchemaProperty, ISchemaPropertyColumn, ISchemaReference, ISchemaRelation, ISchemaRelationColumn, ISchemaVersion } from '@airport/traffic-pattern';
import { IDdlObjectLinker } from './DdlObjectLinker';
import { IQueryEntityClassCreator } from './QueryEntityClassCreator';
export interface IQueryObjectInitializer {
    initialize(airDb: IAirportDatabase): Promise<AllDdlObjects>;
    generateQObjectsAndPopulateStore(allDdlObjects: AllDdlObjects, airDb: IAirportDatabase, ddlObjectLinker: IDdlObjectLinker, queryEntityClassCreator: IQueryEntityClassCreator, terminalStore: ITerminalStore): void;
}
export interface AllDdlObjects {
    all: DdlObjects;
    allSchemaVersionsByIds: ISchemaVersion[];
    added: DdlObjects;
}
export interface DdlObjects {
    columns: ISchemaColumn[];
    domains: IDomain[];
    entities: ISchemaEntity[];
    latestSchemaVersions: ISchemaVersion[];
    properties: ISchemaProperty[];
    propertyColumns: ISchemaPropertyColumn[];
    relationColumns: ISchemaRelationColumn[];
    relations: ISchemaRelation[];
    schemas: ISchema[];
    schemaReferences: ISchemaReference[];
    schemaVersions: ISchemaVersion[];
}
export declare class QueryObjectInitializer implements IQueryObjectInitializer {
    generateQObjectsAndPopulateStore(allDdlObjects: AllDdlObjects, airDb: IAirportDatabase, ddlObjectLinker: IDdlObjectLinker, queryEntityClassCreator: IQueryEntityClassCreator, terminalStore: ITerminalStore): void;
    initialize(airDb: IAirportDatabase): Promise<AllDdlObjects>;
}
//# sourceMappingURL=QueryObjectInitializer.d.ts.map