import { IMissingRecordDataToTM } from '../checker/SyncInDataChecker';
import { IDataToTM } from '../SyncInUtils';
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
    constructor();
    createRepositoryTransBlocks(dataMessagesWithIncompatibleSchemas: IDataToTM[], dataMessagesWithIncompatibleData: IDataToTM[], dataMessagesToBeUpgraded: IDataToTM[], dataMessagesWithCompatibleSchemasAndData: IDataToTM[], dataMessagesWithInvalidData: IDataToTM[]): Promise<IDataToTM[]>;
    private createRepositoryTransactionBlocks;
    createMissingRecordRepoTransBlocks(missingRecordDataToTMs: IMissingRecordDataToTM[]): Promise<void>;
    createSharingMessageRepoTransBlocks(allDataToTM: IDataToTM[]): Promise<void>;
    private recordSharingMessageToHistoryRecords;
}
