import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { Repository_Source, Repository_GUID } from "@airport/holding-pattern";
import { INonhubClient } from "@airport/nonhub-client";
import { ISynchronizationAdapter } from "./ISynchronizationAdapter";
export declare class DebugSynchronizationAdapter implements ISynchronizationAdapter {
    nonhubClient: INonhubClient;
    getTransactionsForRepository(repositorySource: Repository_Source, repositoryUuId: Repository_GUID, sinceSyncTimestamp?: number): Promise<RepositorySynchronizationMessage[]>;
    sendTransactions(repositorySource: Repository_Source, messagesByRepository: Map<Repository_GUID, RepositorySynchronizationMessage[]>): Promise<boolean>;
    sendTransactionsForRepository(repositorySource: Repository_Source, repositoryUuId: Repository_GUID, messages: RepositorySynchronizationMessage[]): Promise<boolean>;
}
//# sourceMappingURL=DebugSynchronizationAdapter.d.ts.map