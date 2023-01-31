import { SyncRepositoryMessage, Repository_GUID, Repository_Source } from "@airport/ground-control";

export interface ISynchronizationAdapter {

    getTransactionsForRepository(
        repositoryGUID: Repository_GUID,
        sinceSyncTimestamp?: number
    ): Promise<SyncRepositoryMessage[]>

    sendTransactions(
        repositoryGUID: Repository_GUID,
        messagesForRepository: SyncRepositoryMessage[]
    ): Promise<boolean>

    sendTransactionsForRepository(
        repositoryGUID: Repository_GUID,
        repositoryTransactionHistories: SyncRepositoryMessage[]
    ): Promise<boolean>

}
