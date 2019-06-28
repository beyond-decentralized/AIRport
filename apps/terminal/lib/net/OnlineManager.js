"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const holding_pattern_1 = require("@airport/holding-pattern");
const tower_1 = require("@airport/tower");
const UpdateState_1 = require("../core/UpdateState");
const diTokens_1 = require("../diTokens");
class OnlineManager {
    constructor() {
        this.online = false;
    }
    async goOffline() {
        const repositoryManager = await di_1.DI.get(diTokens_1.REPOSITORY_MANAGER);
        repositoryManager.goOffline();
        this.online = false;
    }
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
    async goOnline() {
        const [offlineDeltaStore, repositoryDao, repoTransHistoryDao, repositoryManager] = await di_1.DI.get(diTokens_1.OFFLINE_DELTA_STORE, holding_pattern_1.REPOSITORY_DAO, holding_pattern_1.REPO_TRANS_HISTORY_DAO, diTokens_1.REPOSITORY_MANAGER);
        await tower_1.transactional(async () => {
            try {
                // 1)  Flip update state to GO_ONLINE
                repositoryManager.setUpdateStateForAll(UpdateState_1.UpdateState.GO_ONLINE);
                // 2)  Find repositories
                // const repoRecords = await this.repositoryDao.findWithTransaction()
                const repoRecords = await repositoryDao.findReposWithDetailsByIds();
                // 3) make each repository go Online
                let goOnlineCalls = [];
                repoRecords.forEach((repository) => {
                    goOnlineCalls.push(this.repositoryGoOnline(repository, offlineDeltaStore, repositoryManager, repoTransHistoryDao));
                });
                await Promise.all(goOnlineCalls);
                // 9)  Flip the online state to true
                this.online = true;
            }
            catch (error) {
                // TODO: notify of error
                throw error;
            }
            finally {
                // Finally, always flip update state to LOCAL
                repositoryManager.setUpdateStateForAll(UpdateState_1.UpdateState.LOCAL);
            }
        });
    }
    async repositoryGoOnline(repository, offlineDeltaStore, repositoryManager, repoTransHistoryDao) {
        let deltaStore = repositoryManager.deltaStore[repository.id];
        let remoteChangesSinceInitialGoOnline = [];
        // 3)  Go Online and start listening for new transactions coming in
        await deltaStore.goOnline(async (transactions) => {
            if (!transactions.length) {
                return;
            }
            transactions = transactions.map((repoTransaction) => {
                repoTransaction = new holding_pattern_1.RepositoryTransactionHistory(repoTransaction);
                // TODO: ?is the following needed?
                // repoTransaction.deserialize(repository)
                return repoTransaction;
            });
            // a) While Go-Online is in progress continue gathering all remote transactions
            // that come in and add them to remoteChangesSinceInitialGoOffline
            if (repositoryManager.getUpdateState(repository) === UpdateState_1.UpdateState.GO_ONLINE) {
                remoteChangesSinceInitialGoOnline.push(transactions);
            }
            // b) Once Go-Online finishes, when remote transactions come in
            else {
                try {
                    // i)  Flip update state to REMOTE_CHANGES
                    repositoryManager.setUpdateState(repository, UpdateState_1.UpdateState.REMOTE);
                    // ii)  Add remote transactions to local store
                    await offlineDeltaStore.addRemoteChanges(repository, transactions);
                }
                catch (error) {
                    // TODO: notify of error
                    throw error;
                }
                finally {
                    // iii) Flip state to LOCAL
                    repositoryManager.setUpdateState(repository, UpdateState_1.UpdateState.LOCAL);
                }
            }
        });
        // 4)  Load from deltaStore all remote transactions since lastSyncedTransaction
        let remoteChangesIter = await deltaStore.loadTransactionsSinceLastKnown(repository.lastSyncedTransaction);
        let remoteChanges = [];
        while (remoteChangesIter.hasNext()) {
            remoteChanges.push(remoteChangesIter.next());
        }
        // 5)  Add remote transactions to local store
        if (remoteChanges.length) {
            await offlineDeltaStore.addRemoteChanges(repository, remoteChanges);
        }
        // 6)  While there are more transactions coming in remotely:
        while (remoteChangesSinceInitialGoOnline.length) {
            remoteChanges = remoteChangesSinceInitialGoOnline;
            remoteChangesSinceInitialGoOnline = [];
            // Add them to local store
            await offlineDeltaStore.addRemoteChanges(repository, remoteChanges);
        }
        // 7)  Find all local unsynced transactions
        let unsyncedChanges = await repoTransHistoryDao.findUnsyncedTransactions(repository);
        if (unsyncedChanges.length) {
            unsyncedChanges.forEach((transaction) => {
                // a)  Mark them as synchronized
                transaction.syncStatus = ground_control_1.BlockSyncStatus.SYNCHRONIZED;
            });
            // b)  add them to deltaStore
            await deltaStore.addChanges(deltaStore.config.changeListConfig, unsyncedChanges);
            // c)  save them back in local store, now with the synched flag
            // (and update db with new lastSyncedTransaction)
            await offlineDeltaStore.markChangesAsSynced(repository, null);
        }
        // 	8)  While there are more transactions coming in remotely:
        // Add them to local store
        while (remoteChangesSinceInitialGoOnline.length) {
            remoteChanges = remoteChangesSinceInitialGoOnline;
            remoteChangesSinceInitialGoOnline = [];
            await offlineDeltaStore.addRemoteChanges(repository, remoteChanges);
        }
        // 9)  Flip the online state to true
        this.online = true;
    }
    isOnline() {
        return this.online;
    }
}
exports.OnlineManager = OnlineManager;
di_1.DI.set(diTokens_1.ONLINE_MANAGER, OnlineManager);
//# sourceMappingURL=OnlineManager.js.map