import { IServerSyncLog } from './serversynclog';
export interface IServer {
    id: number;
    serverType?: number;
    serverSyncLogs?: IServerSyncLog[];
}
