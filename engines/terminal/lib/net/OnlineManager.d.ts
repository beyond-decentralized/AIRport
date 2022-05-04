import { IContext } from '@airport/direction-indicator';
import { IRepository, IRepositoryTransactionHistoryDao } from '@airport/holding-pattern';
import { IRepositoryManager } from '@airport/terminal-map';
import { IOfflineDeltaStore } from '../data/OfflineDeltaStore';
export interface IOnlineManager {
    goOffline(context?: IContext): Promise<void>;
    goOnline(context?: IContext): Promise<void>;
    isOnline(context?: IContext): boolean;
}
export declare class OnlineManager implements IOnlineManager {
    private online;
    goOffline(context?: IContext): Promise<void>;
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
    goOnline(context?: IContext): Promise<void>;
    repositoryGoOnline(repository: IRepository, offlineDeltaStore: IOfflineDeltaStore, repositoryManager: IRepositoryManager, repoTransHistoryDao: IRepositoryTransactionHistoryDao): Promise<void>;
    isOnline(context?: IContext): boolean;
}
//# sourceMappingURL=OnlineManager.d.ts.map