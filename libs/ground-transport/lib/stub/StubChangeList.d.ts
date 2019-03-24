import { Subject } from '@airport/observe';
import { ChangeError, ChangeListShareInfo, ChangeRecord, ChangeRecordIterator, SharedChangeList, SharingPlatformSetupInfo } from "@airport/terminal-map";
/**
 * Created by Papa on 12/14/2016.
 */
export declare class StubChangeList implements SharedChangeList {
    shareInfo: ChangeListShareInfo;
    private platformInfo;
    _errorSubject: Subject<ChangeError>;
    _changesAddedRemotelySubject: Subject<ChangeRecordIterator>;
    constructor(shareInfo: ChangeListShareInfo, platformInfo: SharingPlatformSetupInfo);
    loadFromRecord(changeRecord: ChangeRecord): Promise<ChangeRecordIterator>;
    addChanges(changeRecords: ChangeRecord[]): Promise<void>;
    errorSubject(): Subject<ChangeError>;
    changesAddedRemotelySubject(): Subject<ChangeRecordIterator>;
}
