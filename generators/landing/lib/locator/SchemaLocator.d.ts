import { JsonSchema } from '@airport/ground-control';
import { ITerminalStore } from '@airport/terminal-map';
import { ISchemaVersion } from '@airport/traffic-pattern';
export interface ISchemaLocator {
    locateExistingSchemaVersionRecord(jsonSchema: JsonSchema): ISchemaVersion;
    locateLatestSchemaVersionBySchemaName(schemaName: string): ISchemaVersion;
}
export declare class SchemaLocator implements ISchemaLocator {
    private terminalStore;
    constructor(terminalStore: ITerminalStore);
    locateExistingSchemaVersionRecord(jsonSchema: JsonSchema): ISchemaVersion;
    locateLatestSchemaVersionBySchemaName(schemaName: string): ISchemaVersion;
}
