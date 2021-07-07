import { Subject } from 'rxjs';
import { ChangeError, ChangeListShareInfo, ChangeRecord, ChangeRecordIterator, SharedChangeList, SharingPlatformSetupInfo } from '@airport/terminal-map';
import { InMemoryChangeStore } from './InMemoryChangeStore';
/**
 * Created by Papa on 11/26/2016.
 */
export declare class InMemoryChangeList implements SharedChangeList {
    shareInfo: ChangeListShareInfo;
    private platformInfo;
    private changeStore;
    private _errorSubject;
    private _changesAddedRemotelySubject;
    constructor(shareInfo: ChangeListShareInfo, platformInfo: SharingPlatformSetupInfo, changeStore: InMemoryChangeStore);
    loadFromRecord(changeRecord: ChangeRecord): Promise<ChangeRecordIterator>;
    addChanges(changeRecords: ChangeRecord[]): Promise<void>;
    errorSubject(): Subject<ChangeError>;
    changesAddedRemotelySubject(): Subject<ChangeRecordIterator>;
}
//# sourceMappingURL=InMemoryChangeList.d.ts.map