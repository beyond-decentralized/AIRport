import { IRepositoryTransactionHistory } from '@airport/holding-pattern';
import { SharingAdaptor } from '../SharingAdaptor';
import { UpdateState } from '../core/UpdateState';
import { ChangeRecord, ChangeRecordIterator } from '../sync/ChangeModel';
export interface IDeltaStore {
    sharingAdaptor: SharingAdaptor;
    updateState: UpdateState;
    addChanges<E>(changeRecords: E[]): Promise<void>;
    goOffline(): void;
    goOnline(remoteChangesCallback: {
        (transactions: IRepositoryTransactionHistory[]): Promise<void>;
    }): Promise<void>;
    loadTransactionsSinceLastKnown(lastKnownChangeRecord: ChangeRecord): Promise<ChangeRecordIterator>;
}
//# sourceMappingURL=DeltaStore.d.ts.map