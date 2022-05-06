import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { Repository_Source, Repository_UuId } from "@airport/holding-pattern-runtime";

export interface ISynchronizationAdapter {

    getTransactionsForRepository(
        repositorySource: Repository_Source,
        repositoryUuId: Repository_UuId,
        sinceSyncTimestamp?: number
    ): Promise<RepositorySynchronizationMessage[]>

    sendTransactions(
        repositorySource: Repository_Source,
        messagesByRepository: Map<Repository_UuId, RepositorySynchronizationMessage[]>
    ): Promise<boolean>

    sendTransactionsForRepository(
        repositorySource: Repository_Source,
        repositoryUuId: Repository_UuId,
        repositoryTransactionHistories: RepositorySynchronizationMessage[]
    ): Promise<boolean>

}
