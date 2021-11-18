import { IRepositoryTransactionHistory } from '@airport/holding-pattern'
import { SharingAdaptor } from '../SharingAdaptor';
import { IDeltaStoreConfig } from '../config/DeltaStoreConfig';
import { IChangeListConfig } from '../config/ChangeListConfig';
import { UpdateState } from '../core/UpdateState';
import {
    ChangeRecord,
    ChangeRecordIterator
} from '../sync/ChangeModel';

export interface IDeltaStore {

    config: IDeltaStoreConfig;
    sharingAdaptor: SharingAdaptor;
    updateState: UpdateState;

    addChanges<E>(
        changeListConfig: IChangeListConfig,
        changeRecords: E[]
    ): Promise<void>;

    goOffline(): void;

    goOnline(
        remoteChangesCallback: { (transactions: IRepositoryTransactionHistory[]): Promise<void> }
    ): Promise<void>;

    loadTransactionsSinceLastKnown(
        lastKnownChangeRecord: ChangeRecord
    ): Promise<ChangeRecordIterator>;

}
