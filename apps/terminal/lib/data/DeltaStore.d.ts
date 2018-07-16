import { PlatformType } from "@airport/ground-control";
import { Subscription } from "rxjs";
import { IDeltaStoreConfig, SharingAdaptor, IChangeListConfig, ChangeRecord, ChangeRecordIterator, SharedChangeList } from "@airport/terminal-map";
import { UpdateState } from "../core/UpdateState";
import { GoogleSharingAdaptor } from "@airport/ground-transport";
import { IRepositoryTransactionHistory } from "@airport/holding-pattern";
/**
 * Created by Papa on 5/27/2016.
 */
export interface IDeltaStore {
    config: IDeltaStoreConfig;
    sharingAdaptor: SharingAdaptor;
    updateState: UpdateState;
    addChanges<E>(changeListConfig: IChangeListConfig, changeRecords: E[]): Promise<void>;
    goOffline(): void;
    goOnline(remoteChangesCallback: {
        (transactions: IRepositoryTransactionHistory[]): Promise<void>;
    }): Promise<void>;
    loadTransactionsSinceLastKnown(lastKnownChangeRecord: ChangeRecord): Promise<ChangeRecordIterator>;
}
export declare class DeltaStore implements IDeltaStore {
    config: IDeltaStoreConfig;
    sharingAdaptor: SharingAdaptor;
    protected changeList: SharedChangeList;
    protected remoteChangesSubscription: Subscription;
    protected lastKnownChangeRecord: ChangeRecord;
    updateState: UpdateState;
    constructor(config: IDeltaStoreConfig, sharingAdaptor?: SharingAdaptor);
    addChanges<E>(changeListConfig: IChangeListConfig, changeRecords: E[]): Promise<void>;
    goOffline(): void;
    loadTransactionsSinceLastKnown(lastKnownChangeRecord: any): Promise<any>;
    goOnline(remoteChangesCallback: {
        (transactions: IRepositoryTransactionHistory[]): Promise<void>;
    }): Promise<void>;
    private setupChangeList;
    private loadChangeList;
}
export declare function getSharingAdaptor(platformType: PlatformType): SharingAdaptor;
export declare function getGooglesSharingAdaptor(): GoogleSharingAdaptor;
