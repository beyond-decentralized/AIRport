"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const holding_pattern_1 = require("@airport/holding-pattern");
const terminal_map_1 = require("@airport/terminal-map");
const tower_1 = require("@airport/tower");
const typedi_1 = require("typedi");
const UpdateState_1 = require("../core/UpdateState");
const diTokens_1 = require("../diTokens");
let OnlineManager = class OnlineManager {
    constructor(offlineDeltaStore, repositoryManager, repositoryDao, repoTransHistory) {
        this.offlineDeltaStore = offlineDeltaStore;
        this.repositoryManager = repositoryManager;
        this.repositoryDao = repositoryDao;
        this.repoTransHistory = repoTransHistory;
        this.online = false;
    }
    goOffline() {
        this.repositoryManager.goOffline();
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
        try {
            // 1)  Flip update state to GO_ONLINE
            this.repositoryManager.setUpdateStateForAll(UpdateState_1.UpdateState.GO_ONLINE);
            // 2)  Find repositories
            const repoRecords = await this.repositoryDao.findWithTransaction();
            // 3) make each repository go Online
            let goOnlineCalls = [];
            repoRecords.forEach((repository) => {
                goOnlineCalls.push(this.repositoryGoOnline(repository));
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
            this.repositoryManager.setUpdateStateForAll(UpdateState_1.UpdateState.LOCAL);
        }
    }
    async repositoryGoOnline(repository) {
        let deltaStore = this.repositoryManager.deltaStore[repository.id];
        let remoteChangesSinceInitialGoOnline = [];
        // 3)  Go Online and start listening for new transactions coming in
        await deltaStore.goOnline(async (transactions) => {
            if (!transactions.length) {
                return;
            }
            transactions = transactions.map((repoTransaction) => {
                repoTransaction = new holding_pattern_1.RepositoryTransactionHistory(repoTransaction);
                repoTransaction.deserialize(repository);
                return repoTransaction;
            });
            // a) While Go-Online is in progress continue gathering all remote transactions that come in
            // and add them to remoteChangesSinceInitialGoOffline
            if (this.repositoryManager.getUpdateState(repository) === UpdateState_1.UpdateState.GO_ONLINE) {
                remoteChangesSinceInitialGoOnline.push(transactions);
            }
            // b) Once Go-Online finishes, when remote transactions come in
            else {
                try {
                    // i)  Flip update state to REMOTE_CHANGES
                    this.repositoryManager.setUpdateState(repository, UpdateState_1.UpdateState.REMOTE);
                    // ii)  Add remote transactions to local store
                    await this.offlineDeltaStore.addRemoteChanges(repository, transactions);
                }
                catch (error) {
                    // TODO: notify of error
                    throw error;
                }
                finally {
                    // iii) Flip state to LOCAL
                    this.repositoryManager.setUpdateState(repository, UpdateState_1.UpdateState.LOCAL);
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
            await this.offlineDeltaStore.addRemoteChanges(repository, remoteChanges);
        }
        // 6)  While there are more transactions coming in remotely:
        while (remoteChangesSinceInitialGoOnline.length) {
            remoteChanges = remoteChangesSinceInitialGoOnline;
            remoteChangesSinceInitialGoOnline = [];
            // Add them to local store
            await this.offlineDeltaStore.addRemoteChanges(repository, remoteChanges);
        }
        // 7)  Find all local unsynced transactions
        let unsyncedChanges = await this.repoTransHistory.findUnsyncedTransactions(repository);
        if (unsyncedChanges.length) {
            unsyncedChanges.forEach((transaction) => {
                // a)  Mark them as synchronized
                transaction.syncStatus = terminal_map_1.SyncStatus.SYNCHRONIZED;
            });
            // b)  add them to deltaStore
            await deltaStore.addChanges(deltaStore.config.changeListConfig, unsyncedChanges);
            // c)  save them back in local store, now with the synched flag
            // (and update db with new lastSyncedTransaction)
            await this.offlineDeltaStore.markChangesAsSynced(repository, null);
        }
        // 	8)  While there are more transactions coming in remotely:
        // Add them to local store
        while (remoteChangesSinceInitialGoOnline.length) {
            remoteChanges = remoteChangesSinceInitialGoOnline;
            remoteChangesSinceInitialGoOnline = [];
            await this.offlineDeltaStore.addRemoteChanges(repository, remoteChanges);
        }
        // 9)  Flip the online state to true
        this.online = true;
    }
    isOnline() {
        return this.online;
    }
};
__decorate([
    tower_1.Transactional()
], OnlineManager.prototype, "goOnline", null);
OnlineManager = __decorate([
    typedi_1.Service(diTokens_1.ONLINE_MANAGER),
    __param(0, typedi_1.Inject(_ => diTokens_1.OFFLINE_DELTA_STORE)),
    __param(1, typedi_1.Inject(_ => diTokens_1.REPOSITORY_MANAGER)),
    __param(2, typedi_1.Inject(_ => holding_pattern_1.RepositoryDaoToken)),
    __param(3, typedi_1.Inject(_ => holding_pattern_1.RepositoryTransactionHistoryDaoToken))
], OnlineManager);
exports.OnlineManager = OnlineManager;
//# sourceMappingURL=OnlineManager.js.map