var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
let DebugSynchronizationAdapter = class DebugSynchronizationAdapter {
    async getTransactionsForRepository(repositorySource, repositoryGUID, sinceSyncTimestamp) {
        const response = await this.client.getRepositoryTransactions(repositorySource, repositoryGUID, sinceSyncTimestamp);
        const messages = [];
        // NOTE: syncTimestamp is populated here because file sharing mechanisms
        // (IPFS) won't be able to modify the messages themselves
        for (const fragment of response) {
            if (fragment.repositoryGUID !== repositoryGUID) {
                console.error(`Got a reponse fragment for repository ${fragment.repositoryGUID}.
    Expecting message fragments for repository: ${repositoryGUID}`);
                continue;
            }
            for (const message of fragment.messages) {
                message.syncTimestamp = fragment.syncTimestamp;
                messages.push(message);
            }
        }
        return messages;
    }
    async sendTransactions(repositorySource, messagesByRepository) {
        let allSent = true;
        for (const [repositoryGUID, messages] of messagesByRepository) {
            try {
                if (!await this.sendTransactionsForRepository(repositorySource, repositoryGUID, messages)) {
                    allSent = false;
                }
            }
            catch (e) {
                console.error(e);
                allSent = false;
            }
        }
        return allSent;
    }
    async sendTransactionsForRepository(repositorySource, repositoryGUID, messages) {
        if (!messages || !messages.length) {
            return false;
        }
        const syncTimestamp = await this.client.sendRepositoryTransactions(repositorySource, repositoryGUID, messages);
        if (!syncTimestamp) {
            return false;
        }
        for (const message of messages) {
            message.syncTimestamp = syncTimestamp;
        }
        return true;
    }
};
__decorate([
    Inject()
], DebugSynchronizationAdapter.prototype, "client", void 0);
DebugSynchronizationAdapter = __decorate([
    Injected()
], DebugSynchronizationAdapter);
export { DebugSynchronizationAdapter };
//# sourceMappingURL=DebugSynchronizationAdapter.js.map