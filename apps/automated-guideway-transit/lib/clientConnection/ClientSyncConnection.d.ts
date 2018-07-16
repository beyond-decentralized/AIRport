export interface IClientSyncConnection {
    connectionId: number;
    ip: any;
    error(statusCode: number): void;
    addAuth(token: string): void;
    send(data: string): void;
    close(): void;
}
