import {Subject} from '@airport/observe'
import {
	ArrayChangeRecordIterator,
	ChangeError,
	ChangeListShareInfo,
	ChangeRecord,
	ChangeRecordIterator,
	SharedChangeList,
	SharingPlatformSetupInfo
}                from "@airport/terminal-map";

/**
 * Created by Papa on 12/14/2016.
 */
export class StubChangeList implements SharedChangeList {

	_errorSubject = new Subject<ChangeError>();
	_changesAddedRemotelySubject = new Subject<ChangeRecordIterator>();

	constructor(
		public shareInfo: ChangeListShareInfo,
		private platformInfo: SharingPlatformSetupInfo
	) {
	}

	async loadFromRecord(changeRecord: ChangeRecord): Promise<ChangeRecordIterator> {
		return new ArrayChangeRecordIterator([]);
	}

	async addChanges(changeRecords: ChangeRecord[]): Promise<void> {
	}

	errorSubject(): Subject<ChangeError> {
		return this._errorSubject;
	}

	changesAddedRemotelySubject(): Subject<ChangeRecordIterator> {
		return this._changesAddedRemotelySubject;
	}

}