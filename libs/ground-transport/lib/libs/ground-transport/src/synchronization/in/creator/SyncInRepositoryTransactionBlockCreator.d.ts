import { IRepositoryTransactionBlockDao } from "@airport/moving-walkway";
export interface ISyncInRepositoryTransactionBlockCreator {
}
export declare class SyncInRepositoryTransactionBlockCreator implements ISyncInRepositoryTransactionBlockCreator {
    private repositoryTransactionBlockDao;
    constructor(repositoryTransactionBlockDao: IRepositoryTransactionBlockDao);
    private createRepositoryTransBlocks;
    private createRepositoryTransactionBlocks;
    private recordSharingMessageToHistoryRecords;
}
