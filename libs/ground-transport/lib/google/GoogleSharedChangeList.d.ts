import { Subject } from 'rxjs';
import { ChangeError, ChangeRecord, ChangeRecordIterator, GoogleChangeListShareInfo, SharedChangeList, SharingPlatformSetupInfo } from '@airport/terminal-map';
import { DocumentHandle } from './realtime/DocumentHandle';
export declare class GoogleSharedChangeList implements SharedChangeList {
    platformInfo: SharingPlatformSetupInfo;
    shareInfo: GoogleChangeListShareInfo;
    private handle;
    constructor(platformInfo: SharingPlatformSetupInfo, shareInfo: GoogleChangeListShareInfo, handle: DocumentHandle);
    loadFromRecord(changeRecord: ChangeRecord): Promise<ChangeRecordIterator>;
    addChanges(changeRecords: ChangeRecord[]): Promise<void>;
    errorSubject(): Subject<ChangeError>;
    changesAddedRemotelySubject(): Subject<ChangeRecordIterator>;
}
//# sourceMappingURL=GoogleSharedChangeList.d.ts.map