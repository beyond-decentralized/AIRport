import { RepositorySynchronizationMessage } from "@airport/arrivals-n-departures";
import { Repository_Source, Repository_GUID } from "@airport/holding-pattern";

export interface ISynchronizationAdapter {

    getTransactionsForRepository(
        repositorySource: Repository_Source,
        repositoryGUID: Repository_GUID,
        sinceSyncTimestamp?: number
    ): Promise<RepositorySynchronizationMessage[]>

    sendTransactions(
        repositorySource: Repository_Source,
        messagesByRepository: Map<Repository_GUID, RepositorySynchronizationMessage[]>
    ): Promise<boolean>

    sendTransactionsForRepository(
        repositorySource: Repository_Source,
        repositoryGUID: Repository_GUID,
        repositoryTransactionHistories: RepositorySynchronizationMessage[]
    ): Promise<boolean>

}
