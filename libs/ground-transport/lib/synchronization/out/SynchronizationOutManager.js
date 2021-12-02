import { container, DI } from '@airport/di';
import { SYNC_OUT_DATA_SERIALIZER, SYNCHRONIZATION_ADAPTER_LOADER, SYNCHRONIZATION_OUT_MANAGER } from '../../tokens';
export class SynchronizationOutManager {
    async synchronizeOut(repositoryTransactionHistories) {
        // FIXME: in InsertManager (for inserts only) add OperationHistories for all
        // records referenced form other repositories (via @ManyToOne()s).  If
        // objects behind those relations are not provided, query for them
        // and display a warning message about providing them
        // FIXME: make sure that RepositoryEntity @Id()s are populated from RepositoryTransactionHistory
        // and RecordHistory in the records and don't make it into NewValue
        const [syncOutDataSerializer, synchronizationAdapterLoader] = await container(this).get(SYNC_OUT_DATA_SERIALIZER, SYNCHRONIZATION_ADAPTER_LOADER);
        const messages = syncOutDataSerializer.serialize(repositoryTransactionHistories);
        const groupMessageMap = this.groupMessagesBySourceAndRepository(messages);
        for (const [repositorySource, messageMapForSource] of groupMessageMap) {
            const synchronizationAdapter = await synchronizationAdapterLoader.load(repositorySource);
            await synchronizationAdapter.sendTransactions(repositorySource, messageMapForSource);
        }
        await this.updateRepositoryTransactionHistories(messages, repositoryTransactionHistories);
    }
    groupMessagesBySourceAndRepository(messages) {
        const groupMessageMap = new Map();
        // TODO: group messages
        return groupMessageMap;
    }
    async updateRepositoryTransactionHistories(messages, repositoryTransactionHistories) {
        // TODO: copy over syncTimestamp (if present) and update only the histories that have it
    }
}
DI.set(SYNCHRONIZATION_OUT_MANAGER, SynchronizationOutManager);
//# sourceMappingURL=SynchronizationOutManager.js.map