import { TerminalMessage } from '@airport/arrivals-n-departures';
import { ISchemaVersion } from '@airport/airspace';
export interface ISchemaVersionCheckRecord {
    found?: boolean;
    schemaName: string;
    schemaVersion?: ISchemaVersion;
    schemaVersionNumber: number;
}
export interface ISyncInSchemaVersionChecker {
    ensureSchemaVersions(message: TerminalMessage): Promise<boolean>;
}
export declare class SyncInSchemaVersionChecker implements ISyncInSchemaVersionChecker {
    ensureSchemaVersions(message: TerminalMessage): Promise<boolean>;
    private checkVersionsSchemasDomains;
    private getNames;
}
//# sourceMappingURL=SyncInSchemaVersionChecker.d.ts.map