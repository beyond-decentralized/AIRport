import { IRepository } from '@airport/holding-pattern';
export interface IOnlineManager {
    goOffline(): void;
    goOnline(): Promise<void>;
    isOnline(): boolean;
}
export declare class OnlineManager implements IOnlineManager {
    goOffline(): void;
    private online;
    private offlineDeltaStore;
    private repositoryManager;
    private repositoryDao;
    private repoTransHistoryDao;
    constructor();
    /**
     There are tree update states:
     LOCAL            0
     REMOTE_CHANGES   1
     GO_ONLINE        2
     Mutation operations of lower order type are blocked until the higher order operation finishes.
     Blocking prevents conflicts in remove transaction application.
     Go-Online logic
     1)  Flip update state to GO_ONLINE
     2)  Find the lastSyncedTransaction recorded locally
     3)  Go Online and start listening for new transactions coming in
     a) While Go-Online is in progress continue gatethering all remote transactions that come in
     and add them to remoteChangesSinceInitialGoOffline
     b) Once Go-Online finishes, when remote transactions come in
     i)  Flip update state to REMOTE_CHANGES
     ii)  Add remote transactions to local store
     iii) Flip state to LOCAL
     4)  Load from deltaStore all remote transactions since lastSyncedTransaction
     5)  Add remote transactions to local store
     6)  While there are more transactions coming in remotely:
     Add them to local store
     7)  Find all local unsynced transactions
     a)  Mark them as synchronized
     b)  add them to deltaStore
     c)  save them back in local store, now with the synched flag
     (and update db with new lastSyncedTransaction)
     8)  While there are more transactions coming in remotely:
     Add them to local store
     9)  Flip the online state to true
     Finally, always flip update state to LOCAL
     * @returns {Promise<void>}
     */
    goOnline(): Promise<void>;
    repositoryGoOnline(repository: IRepository): Promise<void>;
    isOnline(): boolean;
}
