import { DI }            from '@airport/di';
import type { ISubject } from '@airport/observe';
import { RXJS }          from '@airport/observe';
import {
	ArrayChangeRecordIterator,
	ChangeError,
	ChangeListShareInfo,
	ChangeRecord,
	ChangeRecordIterator,
	SharedChangeList,
	SharingPlatformSetupInfo
}                        from '@airport/terminal-map';

/**
 * Created by Papa on 12/14/2016.
 */
export class StubChangeList
	implements SharedChangeList {

	_errorSubject                = new (DI.db().getSync(RXJS).Subject)<ChangeError>();
	_changesAddedRemotelySubject = new (DI.db().getSync(RXJS).Subject)<ChangeRecordIterator>();

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

	errorSubject(): ISubject<ChangeError> {
		return this._errorSubject;
	}

	changesAddedRemotelySubject(): ISubject<ChangeRecordIterator> {
		return this._changesAddedRemotelySubject;
	}

}
