import { IRepositoryTransactionBlockDao } from "@airport/moving-walkway";
import { IMissingRecordDataToTM } from "../checker/SyncInDataChecker";
export interface ISyncInRepositoryTransactionBlockCreator {
}
export declare class SyncInRepositoryTransactionBlockCreator implements ISyncInRepositoryTransactionBlockCreator {
    private repositoryTransactionBlockDao;
    constructor(repositoryTransactionBlockDao: IRepositoryTransactionBlockDao);
    private createRepositoryTransBlocks;
    private createRepositoryTransactionBlocks;
    create: any;
    missingRecordRepoTransBlocks(missingRecordDataToTMs: IMissingRecordDataToTM[]): void;
    private recordSharingMessageToHistoryRecords;
}
