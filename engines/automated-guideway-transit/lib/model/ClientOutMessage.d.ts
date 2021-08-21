import { DatabaseId, DatabaseSyncLogId, RepositoryId, SyncRecordAddDatetime, SyncRecordTransactionData } from "@airport/guideway";
import { OutClientMessageType } from "./ClientMessageType";
export declare const MILLIS_IN_DAY: number;
export declare type RecentConnectionDataOut = RecentConnectionRepositorySyncOut | RecentConnectionDatabaseSyncLogNotification;
export declare type RecentConnectionRepositorySyncOut = [OutClientMessageType, RepositoryId, SyncRecordAddDatetime, SyncRecordTransactionData];
export declare type RecentConnectionDatabaseSyncLogNotification = [OutClientMessageType, DatabaseSyncLogId];
export interface ConnectionDataCallback {
    (databaseId: DatabaseId, writeHeaders: boolean, data: RecentConnectionDataOut): void;
}
export interface ClientOutMessage {
}
