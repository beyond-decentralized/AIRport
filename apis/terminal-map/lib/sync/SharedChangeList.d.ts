import { ISubject } from '@airport/observe';
import { ChangeListShareInfo } from '../SharingAdaptor';
import { ChangeError, ChangeRecord, ChangeRecordIterator } from './ChangeModel';
/**
 * Created by Papa on 1/1/2016.
 */
export interface SharedChangeList {
    shareInfo: ChangeListShareInfo;
    loadFromRecord(changeRecord: ChangeRecord): Promise<ChangeRecordIterator>;
    addChanges(changeRecords: ChangeRecord[]): Promise<void>;
    errorSubject(): ISubject<ChangeError>;
    changesAddedRemotelySubject(): ISubject<ChangeRecordIterator>;
}
//# sourceMappingURL=SharedChangeList.d.ts.map