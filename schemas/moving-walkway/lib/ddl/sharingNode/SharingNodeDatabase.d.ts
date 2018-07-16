import { TerminalPassword, TerminalId } from "@airport/arrivals-n-departures";
import { IDatabase } from "@airport/holding-pattern";
import { DatabaseSyncStatus } from "@airport/terminal-map";
import { SharingNode } from "./SharingNode";
export declare class SharingNodeDatabase {
    sharingNode: SharingNode;
    database: IDatabase;
    agtDatabaseId: TerminalId;
    agtDatabaseHash: TerminalPassword;
    databaseSyncStatus: DatabaseSyncStatus;
}
