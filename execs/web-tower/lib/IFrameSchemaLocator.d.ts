import { SchemaLocator } from '@airport/landing';
import { ITerminalStore } from '@airport/terminal-map';
import { ISchemaVersion } from '@airport/traffic-pattern';
import { DdlObjects } from '@airport/takeoff';
export declare class IFrameSchemaLocator extends SchemaLocator {
    locateLatestSchemaVersionBySchemaName(schemaName: string, terminalStore: ITerminalStore, ddlObjects?: DdlObjects): Promise<ISchemaVersion>;
}
//# sourceMappingURL=IFrameSchemaLocator.d.ts.map