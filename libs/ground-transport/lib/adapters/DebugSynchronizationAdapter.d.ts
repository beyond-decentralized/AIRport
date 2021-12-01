import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { Repository_Source, Repository_UuId } from "@airport/holding-pattern";
import { ISynchronizationAdapter } from "./ISynchronizationAdapter";
export declare class DebugSynchronizationAdapter implements ISynchronizationAdapter {
    getTransactionsForRepository(source: string, uuId: string): Promise<RepositorySynchronizationMessage>;
    sendTransactions(repositorySource: Repository_Source, messagesByRepository: Map<Repository_UuId, RepositorySynchronizationMessage[]>): Promise<boolean>;
    sendTransactionsForRepository(repositorySource: Repository_Source, repositoryUuId: Repository_UuId, repositoryTransactionHistories: RepositorySynchronizationMessage[]): Promise<boolean>;
}
//# sourceMappingURL=DebugSynchronizationAdapter.d.ts.map