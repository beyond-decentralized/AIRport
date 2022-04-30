var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let RepositoryLoader = class RepositoryLoader {
    /*
    Repository can be loaded because:
    - Repository is not present at all
    - Central: Last non-local Transaction Log timestamp is too old
    - Distributed:  Also stale timestamp but not as frequently (maybe once an hour)
    Immutable repositories are only loaded once
    */
    async loadRepository(repositorySource, repositoryUuId, context) {
        if (context.repositoryExistenceChecked) {
            return;
        }
        context.repositoryExistenceChecked = true;
        const repositoryLoadInfo = await this.repositoryDao.getRepositoryLoadInfo(repositorySource, repositoryUuId, context);
        let loadRepository = false;
        let lastSyncTimestamp = 0;
        if (!repositoryLoadInfo) {
            loadRepository = true;
        }
        else if (!repositoryLoadInfo.immutable) {
            loadRepository = true;
            for (const remoteRepositoryTransactionHistory of repositoryLoadInfo.repositoryTransactionHistory) {
                if (lastSyncTimestamp < remoteRepositoryTransactionHistory.saveTimestamp) {
                    lastSyncTimestamp = remoteRepositoryTransactionHistory.saveTimestamp;
                }
            }
        }
        if (!loadRepository) {
            return;
        }
        const now = new Date().getTime();
        const synchronizationAdapter = await this.synchronizationAdapterLoader
            .load(repositorySource);
        let messages;
        try {
            if (lastSyncTimestamp) {
                // If it's been less than 10 seconds, don't retrieve the repository
                if (lastSyncTimestamp >= now - 10000) {
                    return;
                }
                // Check 100 seconds back, in case there were update issues
                lastSyncTimestamp -= 100000;
                messages = await synchronizationAdapter.getTransactionsForRepository(repositorySource, repositoryUuId, lastSyncTimestamp);
            }
            else {
                messages = await synchronizationAdapter.getTransactionsForRepository(repositorySource, repositoryUuId);
            }
            // TODO: Add a special message for repository for adding users
            // into the repository 
            // each user will have a public key that they will distribute
            // each message is signed with the private key and the initial
            // message for repository is CREATE_REPOSITORY with the public 
            // key of the owner user
            const messageMapByUuId = new Map();
            for (const message of messages) {
                messageMapByUuId.set(message.history.uuId, message);
            }
            await this.synchronizationInManager.receiveMessages(messageMapByUuId, context);
        }
        catch (e) {
            console.error(e);
            return;
        }
    }
};
__decorate([
    Inject()
], RepositoryLoader.prototype, "repositoryDao", void 0);
__decorate([
    Inject()
], RepositoryLoader.prototype, "synchronizationAdapterLoader", void 0);
__decorate([
    Inject()
], RepositoryLoader.prototype, "synchronizationInManager", void 0);
RepositoryLoader = __decorate([
    Injected()
], RepositoryLoader);
export { RepositoryLoader };
//# sourceMappingURL=RepositoryLoader.js.map