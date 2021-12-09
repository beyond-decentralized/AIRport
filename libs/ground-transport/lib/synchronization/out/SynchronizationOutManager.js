import { container, DI } from '@airport/di';
import { ensureChildArray, ensureChildJsMap } from '@airport/ground-control';
import { REPOSITORY_DAO, REPOSITORY_TRANSACTION_HISTORY_DAO } from '@airport/holding-pattern';
import { SYNC_OUT_DATA_SERIALIZER, SYNCHRONIZATION_ADAPTER_LOADER, SYNCHRONIZATION_OUT_MANAGER } from '../../tokens';
export class SynchronizationOutManager {
    async synchronizeOut(repositoryTransactionHistories) {
        const [syncOutDataSerializer, synchronizationAdapterLoader] = await container(this).get(SYNC_OUT_DATA_SERIALIZER, SYNCHRONIZATION_ADAPTER_LOADER);
        await this.loadHistoryRepositories(repositoryTransactionHistories);
        const { historiesToSend, messages } = await syncOutDataSerializer.serialize(repositoryTransactionHistories);
        // await this.ensureGlobalRepositoryIdentifiers(repositoryTransactionHistories, messages)
        const groupMessageMap = this.groupMessagesBySourceAndRepository(messages, historiesToSend);
        for (const [repositorySource, messageMapForSource] of groupMessageMap) {
            const synchronizationAdapter = await synchronizationAdapterLoader.load(repositorySource);
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
        const repositoryDao = await container(this).get(REPOSITORY_DAO);
        const repositories = await repositoryDao.findByIds([...repositoryIdsToLookup.values()]);
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
        const repositoryDao = await container(this).get(REPOSITORY_DAO);
        const repositories = await repositoryDao.findByIds([...repositoryIdsToLookup.values()]);
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
        const repositoryTransactionHistoryDao = await container(this)
            .get(REPOSITORY_TRANSACTION_HISTORY_DAO);
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            const repositoryTransactionHistory = repositoryTransactionHistories[i];
            if (message.syncTimestamp) {
                repositoryTransactionHistory.syncTimestamp = message.syncTimestamp;
                await repositoryTransactionHistoryDao.updateSyncTimestamp(repositoryTransactionHistory);
            }
        }
    }
}
DI.set(SYNCHRONIZATION_OUT_MANAGER, SynchronizationOutManager);
//# sourceMappingURL=SynchronizationOutManager.js.map