import { SchemaName } from '@airport/ground-control';
import { JsonSchemaWithLastIds } from '@airport/security-check';
import { AllDdlObjects, DdlObjects, IDdlObjectRetriever } from '@airport/takeoff';
import { ITerminalStore } from '@airport/terminal-map';
import { ISchemaVersion } from '@airport/traffic-pattern';
import { ISchemaLocator } from '../locator/SchemaLocator';
export interface ISchemaComposer {
    compose(jsonSchemas: JsonSchemaWithLastIds[], ddlObjectRetriever: IDdlObjectRetriever, schemaLocator: ISchemaLocator, terminalStore: ITerminalStore): Promise<AllDdlObjects>;
}
export declare class SchemaComposer implements ISchemaComposer {
    compose(jsonSchemas: JsonSchemaWithLastIds[], ddlObjectRetriever: IDdlObjectRetriever, schemaLocator: ISchemaLocator, terminalStore: ITerminalStore): Promise<AllDdlObjects>;
    addSchemaVersionObjects(schemaVersion: ISchemaVersion, ddlObjects: DdlObjects): void;
    getExistingLatestSchemaVersion(referencedSchemaName: SchemaName, allDdlObjects: AllDdlObjects): Promise<ISchemaVersion>;
    private composeDomain;
    private composeSchema;
    private composeSchemaVersion;
    private composeSchemaReferences;
    private composeSchemaEntities;
    private composeSchemaProperties;
    private composeSchemaRelations;
    private composeSchemaColumns;
    private composeSchemaRelationColumns;
}
//# sourceMappingURL=SchemaComposer.d.ts.map