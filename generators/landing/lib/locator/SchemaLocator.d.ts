import { JsonSchema } from '@airport/ground-control';
import { ITerminalStore } from '@airport/terminal-map';
import { ISchemaVersion } from '@airport/traffic-pattern';
export interface ISchemaLocator {
    locateExistingSchemaVersionRecord(jsonSchema: JsonSchema): Promise<ISchemaVersion>;
}
export declare class SchemaLocator implements ISchemaLocator {
    private terminalStore;
    constructor(terminalStore: ITerminalStore);
    locateExistingSchemaVersionRecord(jsonSchema: JsonSchema): Promise<ISchemaVersion>;
}
