import { JsonSchema } from '@airport/ground-control';
import { ITerminalStore } from '@airport/terminal-map';
import { ISchemaVersion } from '@airport/airspace';
export interface ISchemaLocator {
    locateExistingSchemaVersionRecord(jsonSchema: JsonSchema, terminalStore: ITerminalStore): ISchemaVersion;
    locateLatestSchemaVersionBySchemaName(schemaName: string, terminalStore: ITerminalStore): Promise<ISchemaVersion>;
}
export declare class SchemaLocator implements ISchemaLocator {
    locateExistingSchemaVersionRecord(jsonSchema: JsonSchema, terminalStore: ITerminalStore): ISchemaVersion;
    locateLatestSchemaVersionBySchemaName(schemaName: string, terminalStore: ITerminalStore): Promise<ISchemaVersion>;
}
//# sourceMappingURL=SchemaLocator.d.ts.map