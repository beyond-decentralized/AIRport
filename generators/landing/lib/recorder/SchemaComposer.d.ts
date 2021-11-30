import { SchemaName } from '@airport/ground-control';
import { JsonSchemaWithLastIds } from '@airport/security-check';
import { AllDdlObjects, IDdlObjectRetriever } from '@airport/takeoff';
import { ITerminalStore } from '@airport/terminal-map';
import { ISchemaVersion } from '@airport/airspace';
import { ISchemaLocator } from '../locator/SchemaLocator';
export interface ISchemaComposer {
    compose(jsonSchemas: JsonSchemaWithLastIds[], ddlObjectRetriever: IDdlObjectRetriever, schemaLocator: ISchemaLocator, terminalStore: ITerminalStore): Promise<AllDdlObjects>;
}
export declare class SchemaComposer implements ISchemaComposer {
    compose(jsonSchemas: JsonSchemaWithLastIds[], ddlObjectRetriever: IDdlObjectRetriever, schemaLocator: ISchemaLocator, terminalStore: ITerminalStore): Promise<AllDdlObjects>;
    getExistingLatestSchemaVersion(referencedSchemaName: SchemaName, allDdlObjects: AllDdlObjects): Promise<ISchemaVersion>;
    private addSchemaVersionObjects;
    private addObjects;
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