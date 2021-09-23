import { SchemaName } from '@airport/ground-control';
import { JsonSchemaWithLastIds } from '@airport/security-check';
import { DdlObjects, IDdlObjectRetriever } from '@airport/takeoff';
import { ITerminalStore } from '@airport/terminal-map';
import { ISchemaVersion } from '@airport/traffic-pattern';
import { ISchemaLocator } from '../locator/SchemaLocator';
export interface ISchemaComposer {
    compose(jsonSchemas: JsonSchemaWithLastIds[], ddlObjectRetriever: IDdlObjectRetriever, schemaLocator: ISchemaLocator, terminalStore: ITerminalStore): DdlObjects;
}
export declare class SchemaComposer implements ISchemaComposer {
    compose(jsonSchemas: JsonSchemaWithLastIds[], ddlObjectRetriever: IDdlObjectRetriever, schemaLocator: ISchemaLocator, terminalStore: ITerminalStore): DdlObjects;
    getExistingLatestSchemaVersion(referencedSchemaName: SchemaName, terminalStore: ITerminalStore): ISchemaVersion;
    private composeDomains;
    private composeSchemas;
    private composeSchemaVersions;
    private composeSchemaReferences;
    private composeSchemaEntities;
    private composeSchemaProperties;
    private composeSchemaRelations;
    private composeSchemaColumns;
    private composeSchemaRelationColumns;
}
//# sourceMappingURL=SchemaComposer.d.ts.map