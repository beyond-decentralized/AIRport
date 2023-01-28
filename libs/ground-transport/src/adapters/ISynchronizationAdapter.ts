import { RepositorySynchronizationMessage, Repository_GUID, Repository_Source } from "@airport/ground-control";

export interface ISynchronizationAdapter {

    getTransactionsForRepository(
        repositoryGUID: Repository_GUID,
        sinceSyncTimestamp?: number
    ): Promise<RepositorySynchronizationMessage[]>

    sendTransactions(
        repositoryGUID: Repository_GUID,
        messagesForRepository: RepositorySynchronizationMessage[]
    ): Promise<boolean>

    sendTransactionsForRepository(
        repositoryGUID: Repository_GUID,
        repositoryTransactionHistories: RepositorySynchronizationMessage[]
    ): Promise<boolean>

}
