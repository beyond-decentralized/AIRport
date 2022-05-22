import { RepositorySynchronizationMessage, RepositorySynchronizationReadResponseFragment } from '@airport/arrivals-n-departures';
import type { RepositoryTransactionHistory_SyncTimestamp } from '@airport/holding-pattern';
export interface INonhubClient {
    getRepositoryTransactions(location: string, repositoryUuid: string, sinceSyncTimestamp?: number): Promise<RepositorySynchronizationReadResponseFragment[]>;
    sendRepositoryTransactions(location: string, repositoryUuId: string, messages: RepositorySynchronizationMessage[]): Promise<RepositoryTransactionHistory_SyncTimestamp>;
}
export declare class NonhubClient implements INonhubClient {
    serverLocationProtocol: string;
    getRepositoryTransactions(location: string, repositoryUuId: string, sinceSyncTimestamp?: number): Promise<RepositorySynchronizationReadResponseFragment[]>;
    sendRepositoryTransactions(location: string, repositoryUuId: string, messages: RepositorySynchronizationMessage[]): Promise<RepositoryTransactionHistory_SyncTimestamp>;
    private sendMessage;
}
//# sourceMappingURL=NonhubClient.d.ts.map