import { RepositorySynchronizationMessage } from '@airport/arrivals-n-departures';
import type { RepositoryTransactionHistory_SyncTimestamp } from '@airport/holding-pattern';
export declare const NONHUB_CLIENT: import("@airport/di").IDiToken<INonhubClient>;
export interface GetRepositoryTransactionsResult {
    messages: RepositorySynchronizationMessage[];
    syncTimestamp: number;
}
export interface INonhubClient {
    getRepositoryTransactions(location: string, repositoryUuid: string, sinceSyncTimestamp?: number): Promise<GetRepositoryTransactionsResult>;
    sendRepositoryTransactions(location: string, repositoryUuId: string, messages: RepositorySynchronizationMessage[]): Promise<RepositoryTransactionHistory_SyncTimestamp>;
}
export declare class NonhubClient implements INonhubClient {
    serverLocationProtocol: string;
    getRepositoryTransactions(location: string, repositoryUuId: string, sinceSyncTimestamp?: number): Promise<GetRepositoryTransactionsResult>;
    sendRepositoryTransactions(location: string, repositoryUuId: string, messages: RepositorySynchronizationMessage[]): Promise<RepositoryTransactionHistory_SyncTimestamp>;
    private sendMessage;
}
//# sourceMappingURL=index.d.ts.map