import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { IRepositoryTransactionHistory } from "@airport/holding-pattern";
import { ISynchronizationAdapter } from "./ISynchronizationAdapter";
export declare class DebugSynchronizationAdapter implements ISynchronizationAdapter {
    getTransactionsForRepository(source: string, uuId: string): Promise<RepositorySynchronizationMessage>;
    sendTransactionsForRepository(source: string, uuId: string, repositoryTransactionHistories: IRepositoryTransactionHistory[]): Promise<boolean>;
}
//# sourceMappingURL=DebugSynchronizationAdapter.d.ts.map