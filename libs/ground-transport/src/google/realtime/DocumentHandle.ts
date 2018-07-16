import {GoogleChangeRecordIterator} from './GoogleRealtimeAdaptor';
import {GoogleRealtimeAdaptorException} from './GoogleRealtimeAdaptor';
import {Subject} from 'rxjs/Subject';
import {ChangeRecord} from '@airport/terminal-map';

/**
 * Created by Papa on 1/10/2016.
 */

export class DocumentHandle {

	constructor(
		private document:gapi.drive.realtime.Document,
		public changeList:gapi.drive.realtime.CollaborativeList<any>,
		public valuesAddedSubject:Subject<GoogleChangeRecordIterator>,
		private valuesArchivedSubject:Subject<GoogleChangeRecordIterator>,
		public otherChangesSubject:Subject<GoogleRealtimeAdaptorException>
	) {
	}

	addChangeRecord(
		changeRecord:ChangeRecord
	):Promise<any> {
		return new Promise<any>((
			resolve,
			reject
		) => {
			this.changeList.push(changeRecord);
			resolve();
		});
	}

	addChangeRecords(
		changeRecords:ChangeRecord[]
	):Promise<void> {
		return new Promise<any>((
			resolve,
			reject
		) => {
			this.changeList.pushAll(changeRecords);
			resolve();
		});
	}

}
