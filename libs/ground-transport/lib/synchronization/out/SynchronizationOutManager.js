import { container, DI } from '@airport/di';
import { ensureChildArray, ensureChildJsMap } from '@airport/ground-control';
import { REPOSITORY_TRANSACTION_HISTORY_DAO } from '@airport/holding-pattern';
import { SYNC_OUT_DATA_SERIALIZER, SYNCHRONIZATION_ADAPTER_LOADER, SYNCHRONIZATION_OUT_MANAGER } from '../../tokens';
export class SynchronizationOutManager {
    async synchronizeOut(repositoryTransactionHistories) {
        const [syncOutDataSerializer, synchronizationAdapterLoader] = await container(this).get(SYNC_OUT_DATA_SERIALIZER, SYNCHRONIZATION_ADAPTER_LOADER);
        const messages = await syncOutDataSerializer.serialize(repositoryTransactionHistories);
        const groupMessageMap = this.groupMessagesBySourceAndRepository(messages);
        for (const [repositorySource, messageMapForSource] of groupMessageMap) {
            const synchronizationAdapter = await synchronizationAdapterLoader.load(repositorySource);
            await synchronizationAdapter.sendTransactions(repositorySource, messageMapForSource);
        }
        await this.updateRepositoryTransactionHistories(messages, repositoryTransactionHistories);
    }
    groupMessagesBySourceAndRepository(messages) {
        const groupMessageMap = new Map();
        for (const message of messages) {
            const repository = message.history.repository;
            ensureChildArray(ensureChildJsMap(groupMessageMap, repository.source), repository.uuId).push(message);
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