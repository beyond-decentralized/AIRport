import { IRepositoryBlock, Repository_GUID } from "@airport/ground-control";

export interface ISynchronizationAdapter {

    getBlocksForRepository(
        repositoryGUID: Repository_GUID,
        sinceSyncTimestamp?: number
    ): Promise<IRepositoryBlock[]>

    sendBlocks(
        repositoryGUID: Repository_GUID,
        messagesForRepository: IRepositoryBlock[]
    ): Promise<boolean>

    sendBlocksForRepository(
        repositoryGUID: Repository_GUID,
        repositoryTransactionHistories: IRepositoryBlock[]
    ): Promise<boolean>

}
