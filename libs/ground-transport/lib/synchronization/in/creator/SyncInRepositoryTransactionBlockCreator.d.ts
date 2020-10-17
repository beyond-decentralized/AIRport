import { IMissingRecordRepoTransBlockDao, ISharingMessageRepoTransBlockDao } from '@airport/moving-walkway';
import { IMissingRecordDataToTM } from '../checker/SyncInDataChecker';
import { IDataToTM } from '../SyncInUtils';
export interface ISyncInRepositoryTransactionBlockCreator {
    createRepositoryTransBlocks(dataMessagesWithIncompatibleSchemas: IDataToTM[], dataMessagesWithIncompatibleData: IDataToTM[], dataMessagesToBeUpgraded: IDataToTM[], dataMessagesWithCompatibleSchemasAndData: IDataToTM[], dataMessagesWithInvalidData: IDataToTM[]): Promise<IDataToTM[]>;
    createMissingRecordRepoTransBlocks(missingRecordDataToTMs: IMissingRecordDataToTM[], missingRecordRepoTransBlockDao: IMissingRecordRepoTransBlockDao): Promise<void>;
    createSharingMessageRepoTransBlocks(allDataToTM: IDataToTM[], sharingMessageRepoTransBlockDao: ISharingMessageRepoTransBlockDao): Promise<void>;
    createSharingNodeRepoTransBlocks(allDataToTM: IDataToTM[]): Promise<void>;
}
export declare class SyncInRepositoryTransactionBlockCreator implements ISyncInRepositoryTransactionBlockCreator {
    createRepositoryTransBlocks(dataMessagesWithIncompatibleSchemas: IDataToTM[], dataMessagesWithIncompatibleData: IDataToTM[], dataMessagesToBeUpgraded: IDataToTM[], dataMessagesWithCompatibleSchemasAndData: IDataToTM[], dataMessagesWithInvalidData: IDataToTM[]): Promise<IDataToTM[]>;
    private createRepositoryTransactionBlocks;
    createMissingRecordRepoTransBlocks(missingRecordDataToTMs: IMissingRecordDataToTM[], missingRecordRepoTransBlockDao: IMissingRecordRepoTransBlockDao): Promise<void>;
    createSharingMessageRepoTransBlocks(allDataToTM: IDataToTM[], sharingMessageRepoTransBlockDao: ISharingMessageRepoTransBlockDao): Promise<void>;
    private recordSharingMessageToHistoryRecords;
    createSharingNodeRepoTransBlocks(allDataToTM: IDataToTM[]): Promise<void>;
}
//# sourceMappingURL=SyncInRepositoryTransactionBlockCreator.d.ts.map