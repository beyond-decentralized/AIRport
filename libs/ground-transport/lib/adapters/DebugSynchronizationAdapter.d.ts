import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { Repository_Source, Repository_GUID } from "@airport/holding-pattern";
import { IClient } from "@airway/client";
import { ISynchronizationAdapter } from "./ISynchronizationAdapter";
export declare class DebugSynchronizationAdapter implements ISynchronizationAdapter {
    client: IClient;
    getTransactionsForRepository(repositorySource: Repository_Source, repositoryGUID: Repository_GUID, sinceSyncTimestamp?: number): Promise<RepositorySynchronizationMessage[]>;
    sendTransactions(repositorySource: Repository_Source, messagesByRepository: Map<Repository_GUID, RepositorySynchronizationMessage[]>): Promise<boolean>;
    sendTransactionsForRepository(repositorySource: Repository_Source, repositoryGUID: Repository_GUID, messages: RepositorySynchronizationMessage[]): Promise<boolean>;
}
//# sourceMappingURL=DebugSynchronizationAdapter.d.ts.map