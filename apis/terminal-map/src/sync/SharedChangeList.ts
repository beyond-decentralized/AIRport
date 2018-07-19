import { ChangeListShareInfo } from "../SharingAdaptor";
import { Subject } from 'rxjs';
import { ChangeError, ChangeRecord, ChangeRecordIterator } from "./ChangeModel";

/**
 * Created by Papa on 1/1/2016.
 */
export interface SharedChangeList {

	shareInfo: ChangeListShareInfo;

	loadFromRecord(changeRecord: ChangeRecord): Promise<ChangeRecordIterator>;

	addChanges(changeRecords: ChangeRecord[]): Promise<void>;

	errorSubject(): Subject<ChangeError>;

	changesAddedRemotelySubject(): Subject<ChangeRecordIterator>;

}