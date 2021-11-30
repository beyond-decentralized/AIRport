import { SchemaLocator } from '@airport/landing';
import { ITerminalStore } from '@airport/terminal-map';
import { ISchemaVersion } from '@airport/airspace';
export declare class IFrameSchemaLocator extends SchemaLocator {
    locateLatestSchemaVersionBySchemaName(schemaName: string, terminalStore: ITerminalStore): Promise<ISchemaVersion>;
}
//# sourceMappingURL=IFrameSchemaLocator.d.ts.map