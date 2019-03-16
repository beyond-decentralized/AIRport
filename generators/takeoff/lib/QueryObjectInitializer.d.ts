import { ITerminalStore } from '@airport/terminal-map';
import { IDomain } from '@airport/territory';
import { ISchema, ISchemaColumn, ISchemaEntity, ISchemaProperty, ISchemaPropertyColumn, ISchemaReference, ISchemaRelation, ISchemaRelationColumn, ISchemaVersion } from '@airport/traffic-pattern';
import { DdlObjectLinker } from './DdlObjectLinker';
import { DdlObjectRetriever } from './DdlObjectRetriever';
import { IQueryEntityClassCreator } from './QueryEntityClassCreator';
export interface IQueryObjectInitializer {
    initialize(): Promise<void>;
    generateQObjectsAndPopulateStore(ddlObjects: DdlObjects): void;
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
    schemaReferences: ISchemaReference[];
    schemas: ISchema[];
}
export declare class QueryObjectInitializer implements IQueryObjectInitializer {
    private ddlObjectLinker;
    private ddlObjectRetriever;
    private queryEntityClassCreator;
    private terminalStore;
    constructor(ddlObjectLinker: DdlObjectLinker, ddlObjectRetriever: DdlObjectRetriever, queryEntityClassCreator: IQueryEntityClassCreator, terminalStore: ITerminalStore);
    initialize(): Promise<void>;
    generateQObjectsAndPopulateStore(ddlObjects: DdlObjects): void;
}
