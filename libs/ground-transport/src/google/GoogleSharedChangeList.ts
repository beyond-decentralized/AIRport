/**
 * Created by Papa on 1/10/2016.
 */
import {
	ISubject,
	Subject
}                       from '@airport/observe'
import {
	ArrayChangeRecordIterator,
	ChangeError,
	ChangeRecord,
	ChangeRecordIterator,
	GoogleChangeListShareInfo,
	SharedChangeList,
	SharingPlatformSetupInfo
}                       from '@airport/terminal-map';
import {DocumentHandle} from './realtime/DocumentHandle';

export class GoogleSharedChangeList implements SharedChangeList {

	constructor(
		public platformInfo: SharingPlatformSetupInfo,
		public shareInfo: GoogleChangeListShareInfo,
		private handle: DocumentHandle
	) {
	}

	loadFromRecord(
		changeRecord: ChangeRecord
	): Promise<ChangeRecordIterator> {
		return new Promise((
			resolve,
			reject
		) => {
			let allCurrentChangeRecords = this.handle.changeList.asArray();
			if (!changeRecord) {
				resolve(new ArrayChangeRecordIterator(allCurrentChangeRecords));
			}
			let id = this.platformInfo.recordIdField;

			for (let i = 0; i < allCurrentChangeRecords.length; i++) {
				let currentRecord = allCurrentChangeRecords[i];
				if (currentRecord[id] === changeRecord[id]) {
					resolve(new ArrayChangeRecordIterator(allCurrentChangeRecords, i + 1));
				}
			}
			reject(`Change record not found. ID: ${changeRecord[id]}.`);
		});
	}

	async addChanges(
		changeRecords: ChangeRecord[]
	): Promise<void> {
		await this.handle.addChangeRecords(changeRecords);
	}

	errorSubject(): ISubject<ChangeError> {
		let errorSubject = new Subject<ChangeError>();

		this.handle.otherChangesSubject.subscribe((otherChange) => {
			errorSubject.next({
				fatal: true,
				message: otherChange.message
			});
		});

		return errorSubject;
	}

	changesAddedRemotelySubject(): ISubject<ChangeRecordIterator> {
		return this.handle.valuesAddedSubject;
	}

}