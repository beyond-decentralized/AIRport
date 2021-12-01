import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { IRepositoryTransactionHistory } from "@airport/holding-pattern";
export interface ISyncOutDataSerializer {
    serialize(repositoryTransactionHistories: IRepositoryTransactionHistory[]): RepositorySynchronizationMessage[];
}
export declare class SyncOutDataSerializer implements ISyncOutDataSerializer {
    serialize(repositoryTransactionHistories: IRepositoryTransactionHistory[]): RepositorySynchronizationMessage[];
}
//# sourceMappingURL=SyncOutDataSerializer.d.ts.map