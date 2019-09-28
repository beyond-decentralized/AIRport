import { SyncType } from "../synchronization/SyncType";
import { Server } from './Server';
export declare type ServerSyncLogId = number;
export declare type ServerSyncLogStartDatetime = Date;
export declare type ServerSyncLogEndDatetime = Date;
export declare type ServerSyncLogNumberOfConnections = number;
export declare type ServerSyncLogNumberOfRecords = number;
export declare type ServerSyncLogDataCharsTotal = number;
export declare class ServerSyncLog {
    id: ServerSyncLogId;
    server: Server;
    type: SyncType;
    startDatetime: ServerSyncLogStartDatetime;
    endDatetime: ServerSyncLogEndDatetime;
    numberOfConnections: ServerSyncLogNumberOfConnections;
    numberOfRecords: ServerSyncLogNumberOfRecords;
    dataCharsTotal: ServerSyncLogDataCharsTotal;
}
