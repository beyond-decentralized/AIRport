import { Subject } from 'rxjs/Subject';
import { ChangeRecordIterator, ChangeError, ChangeRecord, ChangeListShareInfo, SharedChangeList, SharingPlatformSetupInfo } from "@airport/terminal-map";
/**
 * Created by Papa on 12/14/2016.
 */
export declare class StubChangeList implements SharedChangeList {
    shareInfo: ChangeListShareInfo;
    private platformInfo;
    _errorSubject: any;
    _changesAddedRemotelySubject: any;
    constructor(shareInfo: ChangeListShareInfo, platformInfo: SharingPlatformSetupInfo);
    loadFromRecord(changeRecord: ChangeRecord): Promise<ChangeRecordIterator>;
    addChanges(changeRecords: ChangeRecord[]): Promise<void>;
    errorSubject(): Subject<ChangeError>;
    changesAddedRemotelySubject(): Subject<ChangeRecordIterator>;
}
