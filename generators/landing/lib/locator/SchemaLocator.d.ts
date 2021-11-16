import { JsonSchema } from '@airport/ground-control';
import { AllDdlObjects } from '@airport/takeoff';
import { ITerminalStore } from '@airport/terminal-map';
import { ISchemaVersion } from '@airport/traffic-pattern';
export interface ISchemaLocator {
    locateExistingSchemaVersionRecord(jsonSchema: JsonSchema, terminalStore: ITerminalStore): ISchemaVersion;
    locateLatestSchemaVersionBySchemaName(schemaName: string, terminalStore: ITerminalStore, allDdlObjects?: AllDdlObjects): Promise<ISchemaVersion>;
}
export declare class SchemaLocator implements ISchemaLocator {
    locateExistingSchemaVersionRecord(jsonSchema: JsonSchema, terminalStore: ITerminalStore): ISchemaVersion;
    locateLatestSchemaVersionBySchemaName(schemaName: string, terminalStore: ITerminalStore, allDdlObjects?: AllDdlObjects): Promise<ISchemaVersion>;
}
//# sourceMappingURL=SchemaLocator.d.ts.map