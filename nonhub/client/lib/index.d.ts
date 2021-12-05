import { RepositorySynchronizationMessage, RepositorySynchronizationReadResponse, RepositorySynchronizationWriteResponse } from '@airport/arrivals-n-departures';
export declare const NONHUB_CLIENT: import("@airport/di").IDiToken<INonhubClient>;
export interface INonhubClient {
    getRepositoryTransactions(location: string, repositoryUuid: string, sinceSyncTimestamp?: number): Promise<RepositorySynchronizationReadResponse>;
    sendRepositoryTransactions(location: string, repositoryUuId: string, messages: RepositorySynchronizationMessage[]): Promise<RepositorySynchronizationWriteResponse>;
}
export declare class NonhubClient implements INonhubClient {
    serverLocationProtocol: string;
    getRepositoryTransactions(location: string, repositoryUuId: string, sinceSyncTimestamp?: number): Promise<RepositorySynchronizationReadResponse>;
    sendRepositoryTransactions(location: string, repositoryUuId: string, messages: RepositorySynchronizationMessage[]): Promise<RepositorySynchronizationWriteResponse>;
    private sendMessage;
}
//# sourceMappingURL=index.d.ts.map