import { IMissingRecordRepoTransBlockDao, IRepositoryTransactionBlockDao, ISharingMessageRepoTransBlockDao } from "@airport/moving-walkway";
import { IMissingRecordDataToTM } from "../checker/SyncInDataChecker";
import { IDataToTM } from "../SyncInUtils";
export interface ISyncInRepositoryTransactionBlockCreator {
    createRepositoryTransBlocks(dataMessagesWithIncompatibleSchemas: IDataToTM[], dataMessagesWithIncompatibleData: IDataToTM[], dataMessagesToBeUpgraded: IDataToTM[], dataMessagesWithCompatibleSchemasAndData: IDataToTM[], dataMessagesWithInvalidData: IDataToTM[]): Promise<IDataToTM[]>;
    createMissingRecordRepoTransBlocks(missingRecordDataToTMs: IMissingRecordDataToTM[]): Promise<void>;
    createSharingMessageRepoTransBlocks(allDataToTM: IDataToTM[]): Promise<void>;
    createSharingNodeRepoTransBlocks(allDataToTM: IDataToTM[]): Promise<void>;
}
export declare class SyncInRepositoryTransactionBlockCreator implements ISyncInRepositoryTransactionBlockCreator {
    private repositoryTransactionBlockDao;
    private missingRecordRepoTransBlockDao;
    private sharingMessageRepoTransBlockDao;
    constructor(repositoryTransactionBlockDao: IRepositoryTransactionBlockDao, missingRecordRepoTransBlockDao: IMissingRecordRepoTransBlockDao, sharingMessageRepoTransBlockDao: ISharingMessageRepoTransBlockDao);
    createRepositoryTransBlocks(dataMessagesWithIncompatibleSchemas: IDataToTM[], dataMessagesWithIncompatibleData: IDataToTM[], dataMessagesToBeUpgraded: IDataToTM[], dataMessagesWithCompatibleSchemasAndData: IDataToTM[], dataMessagesWithInvalidData: IDataToTM[]): Promise<IDataToTM[]>;
    private createRepositoryTransactionBlocks(dataMessages, syncOutcomeType, recordContents?);
    createMissingRecordRepoTransBlocks(missingRecordDataToTMs: IMissingRecordDataToTM[]): Promise<void>;
    createSharingMessageRepoTransBlocks(allDataToTM: IDataToTM[]): Promise<void>;
    private recordSharingMessageToHistoryRecords(sharingMessages, existingRepoTransBlocksWithCompatibleSchemasAndData, dataMessages, actorMapById);
}
