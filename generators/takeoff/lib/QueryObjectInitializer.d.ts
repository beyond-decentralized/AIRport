import { IAirportDatabase } from '@airport/air-control';
import { ITerminalStore } from '@airport/terminal-map';
import { IDomain, IApplication, IApplicationColumn, IApplicationEntity, IApplicationProperty, IApplicationPropertyColumn, IApplicationReference, IApplicationRelation, IApplicationRelationColumn, IApplicationVersion } from '@airport/airspace';
import { IDdlObjectLinker } from './DdlObjectLinker';
import { IQueryEntityClassCreator } from './QueryEntityClassCreator';
export interface IQueryObjectInitializer {
    initialize(airDb: IAirportDatabase): Promise<AllDdlObjects>;
    generateQObjectsAndPopulateStore(allDdlObjects: AllDdlObjects, airDb: IAirportDatabase, ddlObjectLinker: IDdlObjectLinker, queryEntityClassCreator: IQueryEntityClassCreator, terminalStore: ITerminalStore): void;
}
export interface AllDdlObjects {
    all: DdlObjects;
    allApplicationVersionsByIds: IApplicationVersion[];
    added: DdlObjects;
}
export interface DdlObjects {
    columns: IApplicationColumn[];
    domains: IDomain[];
    entities: IApplicationEntity[];
    latestApplicationVersions: IApplicationVersion[];
    properties: IApplicationProperty[];
    propertyColumns: IApplicationPropertyColumn[];
    relationColumns: IApplicationRelationColumn[];
    relations: IApplicationRelation[];
    applications: IApplication[];
    applicationReferences: IApplicationReference[];
    applicationVersions: IApplicationVersion[];
}
export declare class QueryObjectInitializer implements IQueryObjectInitializer {
    generateQObjectsAndPopulateStore(allDdlObjects: AllDdlObjects, airDb: IAirportDatabase, ddlObjectLinker: IDdlObjectLinker, queryEntityClassCreator: IQueryEntityClassCreator, terminalStore: ITerminalStore): void;
    initialize(airDb: IAirportDatabase): Promise<AllDdlObjects>;
}
//# sourceMappingURL=QueryObjectInitializer.d.ts.map