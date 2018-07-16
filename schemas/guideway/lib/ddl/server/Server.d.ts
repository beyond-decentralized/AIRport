import { ServerSyncLog } from "./ServerSyncLog";
import { ServerType } from "./ServerType";
export declare type ServerId = number;
export declare class Server {
    id: ServerId;
    serverType: ServerType;
    serverSyncLogs: ServerSyncLog[];
}
