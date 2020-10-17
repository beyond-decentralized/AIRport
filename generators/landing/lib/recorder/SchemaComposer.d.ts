import { JsonSchema, SchemaName } from '@airport/ground-control';
import { DdlObjects, IDdlObjectRetriever } from '@airport/takeoff';
import { ITerminalStore } from '@airport/terminal-map';
import { ISchemaVersion } from '@airport/traffic-pattern';
import { ISchemaLocator } from '../locator/SchemaLocator';
export interface ISchemaComposer {
    compose(jsonSchemas: JsonSchema[], ddlObjectRetriever: IDdlObjectRetriever, schemaLocator: ISchemaLocator, terminalStore: ITerminalStore): DdlObjects;
}
export declare class SchemaComposer implements ISchemaComposer {
    compose(jsonSchemas: JsonSchema[], ddlObjectRetriever: IDdlObjectRetriever, schemaLocator: ISchemaLocator, terminalStore: ITerminalStore): DdlObjects;
    private composeDomains;
    private composeSchemas;
    private composeSchemaVersions;
    private composeSchemaReferences;
    private composeSchemaEntities;
    private composeSchemaProperties;
    private composeSchemaRelations;
    private composeSchemaColumns;
    private composeSchemaRelationColumns;
    getExistingLatestSchemaVersion(referencedSchemaName: SchemaName, terminalStore: ITerminalStore): ISchemaVersion;
}
//# sourceMappingURL=SchemaComposer.d.ts.map