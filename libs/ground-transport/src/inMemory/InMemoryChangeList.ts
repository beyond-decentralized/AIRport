import {Subject}             from '@airport/observe'
import {
	ArrayChangeRecordIterator,
	ChangeError,
	ChangeListShareInfo,
	ChangeRecord,
	ChangeRecordIterator,
	SharedChangeList,
	SharingPlatformSetupInfo
}                            from "@airport/terminal-map";
import {InMemoryChangeStore} from "./InMemoryChangeStore";

/**
 * Created by Papa on 11/26/2016.
 */
export class InMemoryChangeList implements SharedChangeList {

	private _errorSubject = new Subject<ChangeError>();
	private _changesAddedRemotelySubject = new Subject<ChangeRecordIterator>();

	constructor(
		public shareInfo: ChangeListShareInfo,
		private platformInfo: SharingPlatformSetupInfo,
		private changeStore: InMemoryChangeStore
	) {
		changeStore.getChangesAddedSubject(this.shareInfo.name).subscribe((changeRecords) => {
			let remotelyAddedChanges = changeRecords.filter(
				changeRecord => changeRecord[platformInfo.dbIdField] !== shareInfo.dbId);
			if (remotelyAddedChanges.length) {
				this._changesAddedRemotelySubject.next(new ArrayChangeRecordIterator(remotelyAddedChanges));
			}
		});
	}

	async loadFromRecord(changeRecord: ChangeRecord): Promise<ChangeRecordIterator> {
		let allCurrentChangeRecords = this.changeStore.getAllChanges(this.shareInfo.name);
		if (!changeRecord) {
			return new ArrayChangeRecordIterator(allCurrentChangeRecords);
		}
		let id = this.platformInfo.recordIdField;

		for (let i = 0; i < allCurrentChangeRecords.length; i++) {
			let currentRecord = allCurrentChangeRecords[i];
			if (currentRecord[id] === changeRecord[id]) {
				return new ArrayChangeRecordIterator(allCurrentChangeRecords, i + 1);
			}
		}
		throw new Error(`Change record not found. ID: ${changeRecord[id]}.`);
	}

	async addChanges(changeRecords: ChangeRecord[]): Promise<void> {
		await this.changeStore.addChanges(this.shareInfo.name, changeRecords);
	}

	errorSubject(): Subject<ChangeError> {
		return this._errorSubject;
	}

	changesAddedRemotelySubject(): Subject<ChangeRecordIterator> {
		return this._changesAddedRemotelySubject;
	}

}
