import { IUtils } from "@airport/air-control";
import { IRepositoryDao, IRepositoryTransactionHistoryDao, ITerminal } from "@airport/holding-pattern";
import { IRepositoryTransactionBlockDao, ISharingMessageDao, ISharingMessageRepoTransBlockDao, ISharingNode, ISharingNodeDao, ISharingNodeRepositoryDao, ISharingNodeRepoTransBlockDao, ISharingNodeTerminalDao } from "@airport/moving-walkway";
import { ISchemaDao } from "@airport/traffic-pattern";
import { ISyncOutMessageSender } from "./SyncOutMessageSender";
import { ISyncOutRepositoryTransactionBlockCreator } from "./SyncOutRepositoryTransactionBlockCreator";
import { ISyncOutSerializer } from "./SyncOutSerializer";
export interface ISynchronizationOutManager {
    synchronize(sharingNodes: ISharingNode[], terminal: ITerminal): Promise<void>;
}
/**
 * Synchronization manager is in charge of maintaining the AIR Terminal in sync.
 *
 * Any number of sync nodes can be configured to communicate
 * over any periods of time.  At any given point in time all pending Repository
 * Transaction Log entries
 *
 */
export declare class SynchronizationOutManager implements ISynchronizationOutManager {
    private repositoryDao;
    private repositoryTransactionHistoryDao;
    private schemaDao;
    private sharingMessageDao;
    private sharingMessageRepoTransBlockDao;
    private sharingNodeDao;
    private sharingNodeTerminalDao;
    private sharingNodeRepositoryDao;
    private sharingNodeRepoTransBlockDao;
    private repositoryTransactionBlockCreator;
    private repositoryTransactionBlockDao;
    private syncOutMessageSender;
    private syncOutSerializer;
    private utils;
    constructor(repositoryDao: IRepositoryDao, repositoryTransactionHistoryDao: IRepositoryTransactionHistoryDao, schemaDao: ISchemaDao, sharingMessageDao: ISharingMessageDao, sharingMessageRepoTransBlockDao: ISharingMessageRepoTransBlockDao, sharingNodeDao: ISharingNodeDao, sharingNodeTerminalDao: ISharingNodeTerminalDao, sharingNodeRepositoryDao: ISharingNodeRepositoryDao, sharingNodeRepoTransBlockDao: ISharingNodeRepoTransBlockDao, repositoryTransactionBlockCreator: ISyncOutRepositoryTransactionBlockCreator, repositoryTransactionBlockDao: IRepositoryTransactionBlockDao, syncOutMessageSender: ISyncOutMessageSender, syncOutSerializer: ISyncOutSerializer, utils: IUtils);
    synchronize(sharingNodes: ISharingNode[], terminal: ITerminal): Promise<void>;
    /**
     *
     * @param {SharingNodeId[]} sharingNodeIds
     * @returns {Promise<void>}
     */
    private getNotAcknowledgedRTBs;
    /**
     * Unfinished messages get merged into new messages
     */
    private updateUnsyncedSharingMessages;
    /**
     * Once an RTB has beens successfuly synced it's serialied data should be dropped.
     */
    private clearDataOfSuccessfullySyncedRTBS;
    private addNewSharingMessages;
}
