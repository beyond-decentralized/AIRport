var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { ensureChildArray, ensureChildJsMap } from '@airport/ground-control';
let SynchronizationOutManager = class SynchronizationOutManager {
    async synchronizeOut(repositoryTransactionHistories) {
        await this.loadHistoryRepositories(repositoryTransactionHistories);
        const { historiesToSend, messages } = await this.syncOutDataSerializer.serialize(repositoryTransactionHistories);
        // await this.ensureGlobalRepositoryIdentifiers(repositoryTransactionHistories, messages)
        const groupMessageMap = this.groupMessagesBySourceAndRepository(messages, historiesToSend);
        for (const [repositorySource, messageMapForSource] of groupMessageMap) {
            const synchronizationAdapter = await this.synchronizationAdapterLoader.load(repositorySource);
            await synchronizationAdapter.sendTransactions(repositorySource, messageMapForSource);
        }
        await this.updateRepositoryTransactionHistories(messages, historiesToSend);
    }
    async loadHistoryRepositories(repositoryTransactionHistories) {
        const repositoryIdsToLookup = new Set();
        const repositoryMapById = new Map();
        for (const repositoryTransactionHistory of repositoryTransactionHistories) {
            repositoryIdsToLookup.add(repositoryTransactionHistory.repository.id);
        }
        if (!repositoryIdsToLookup.size) {
            return;
        }
        const repositories = await this.repositoryDao.findByIds([
            ...repositoryIdsToLookup.values()
        ]);
        for (const repository of repositories) {
            repositoryMapById.set(repository.id, repository);
        }
        for (const repositoryTransactionHistory of repositoryTransactionHistories) {
            repositoryTransactionHistory.repository =
                repositoryMapById.get(repositoryTransactionHistory.repository.id);
        }
    }
    async ensureGlobalRepositoryIdentifiers(repositoryTransactionHistories, messages) {
        const repositoryIdsToLookup = new Set();
        const repositoryMapById = new Map();
        for (const repositoryTransactionHistory of repositoryTransactionHistories) {
            const repository = repositoryTransactionHistory.repository;
            if (!repository.source || !repository.uuId) {
                repositoryIdsToLookup.add(repository.id);
            }
            else {
                repositoryMapById.set(repository.id, repository);
            }
        }
        if (!repositoryIdsToLookup.size) {
            return;
        }
        const repositories = await this.repositoryDao.findByIds([
            ...repositoryIdsToLookup.values()
        ]);
        for (const repository of repositories) {
            repositoryMapById.set(repository.id, repository);
        }
        for (const message of messages) {
            const repository = message.history.repository;
            if (!repository.source || !repository.uuId) {
                const foundRepository = repositoryMapById.get(repository.id);
                repository.source = foundRepository.source;
                repository.uuId = foundRepository.uuId;
                delete repository.id;
            }
        }
    }
    groupMessagesBySourceAndRepository(messages, historiesToSend) {
        const groupMessageMap = new Map();
        for (let i = 0; i < messages.length; i++) {
            const repository = historiesToSend[i].repository;
            ensureChildArray(ensureChildJsMap(groupMessageMap, repository.source), repository.uuId).push(messages[i]);
        }
        return groupMessageMap;
    }
    async updateRepositoryTransactionHistories(messages, repositoryTransactionHistories) {
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            const repositoryTransactionHistory = repositoryTransactionHistories[i];
            if (message.syncTimestamp) {
                repositoryTransactionHistory.syncTimestamp = message.syncTimestamp;
                await this.repositoryTransactionHistoryDao.updateSyncTimestamp(repositoryTransactionHistory);
            }
        }
    }
};
__decorate([
    Inject()
], SynchronizationOutManager.prototype, "repositoryDao", void 0);
__decorate([
    Inject()
], SynchronizationOutManager.prototype, "repositoryTransactionHistoryDao", void 0);
__decorate([
    Inject()
], SynchronizationOutManager.prototype, "synchronizationAdapterLoader", void 0);
__decorate([
    Inject()
], SynchronizationOutManager.prototype, "syncOutDataSerializer", void 0);
SynchronizationOutManager = __decorate([
    Injected()
], SynchronizationOutManager);
export { SynchronizationOutManager };
//# sourceMappingURL=SynchronizationOutManager.js.map