import { DI }             from '@airport/di';
import { ISubject, RXJS }      from '@airport/observe';
import {
	ChangeRecord,
	ChangeRecordIterator
}                         from '@airport/terminal-map';
import { DocumentHandle } from './DocumentHandle';
import { GoogleRealtime } from './GoogleRealtime';

/**
 * Created by Papa on 1/7/2016.
 */

export enum Operation {
	CHANGES_ADDED_BY_OTHERS, //
	CLEAUP_BY_OWNER, //
	GET_NEXT_CHANGE
}

export class GoogleRealtimeAdaptorException {

	constructor(
		public message: string,
		public operation: Operation,
		public event: gapi.drive.realtime.BaseModelEvent,
		public exception?: any
	) {
	}

}

export class GoogleChangeRecordIterator
	implements ChangeRecordIterator {

	private nextValue: ChangeRecord;

	constructor(
		private changeList: gapi.drive.realtime.CollaborativeList<ChangeRecord>,
		private event: gapi.drive.realtime.BaseModelEvent,
		private nextIndex: number = 0
	) {
	}

	next(): ChangeRecord {
		if (this.hasNext()) {
			let nextValue  = this.nextValue;
			this.nextValue = null;
			this.nextIndex++;
			return nextValue;
		}
		let message = 'Error accessing the changelist at index: ' + this.nextIndex;
		throw generateException(message, Operation.GET_NEXT_CHANGE, this.event);
	}

	hasNext(): boolean {
		if (this.nextValue) {
			return true;
		}
		try {
			this.nextValue = this.changeList.get(this.nextIndex);
			return !!this.nextValue;
		} catch (exception) {
			return false;
		}
	}

}

let
	generateException = function(
		message: string,
		operation: Operation,
		event: gapi.drive.realtime.BaseModelEvent,
		exception?: any
	): GoogleRealtimeAdaptorException {
		message = message + '.  User ID: ' + event.userId + ', Session ID: ' + event.sessionId;

		return new GoogleRealtimeAdaptorException(
			message,
			Operation.CLEAUP_BY_OWNER,
			event,
			exception
		);
	};

export class GoogleRealtimeAdaptor {

	constructor(
		private googleRealtime: GoogleRealtime
	) {
	}

	startTest(): DocumentHandle {
		let document = this.googleRealtime.createInMemoryDocument();
		let eventHub = this.createDocumentHandle(document);

		return eventHub;
	}

	startNewShare(
		fileId: string
	): Promise<DocumentHandle> {
		return this.googleRealtime.initializeFile(fileId).then((document) => {
			let eventHub = this.createDocumentHandle(document);

			return eventHub;
		});
	}

	openShare(
		fileId: string
	): Promise<DocumentHandle> {
		return this.googleRealtime.loadFile(fileId).then((document) => {
			let documentHandle = this.createDocumentHandle(document);
			return documentHandle;
		});
	}

	private createDocumentHandle(
		document: gapi.drive.realtime.Document
	): DocumentHandle {
		let changeList            = this.googleRealtime.getChangeList(document);
		let valuesAddedSubject    = this.subscribeToChangesAddedByOthers(document);
		let valuesArchivedSubject = this.subscribeToCleanupByOwner(document, false);
		let otherChangesSubject   = this.subscribeToUnexpectedModifications(changeList, document);

		return new DocumentHandle(document, changeList, valuesAddedSubject, valuesArchivedSubject, otherChangesSubject);
	}

	private subscribeToChangesAddedByOthers(
		document: gapi.drive.realtime.Document
	): ISubject<GoogleChangeRecordIterator> {
		let valuesAddedSubject = new (DI.db().getSync(RXJS).Subject)<gapi.drive.realtime.ValuesAddedEvent<ChangeRecord>>();
		let changeList         = this.googleRealtime.getChangeList(document);
		this.googleRealtime.subscribeToValuesAdded(changeList, valuesAddedSubject);

		let changesAddedSubject = new (DI.db().getSync(RXJS).Subject)<GoogleChangeRecordIterator>();

		valuesAddedSubject.subscribe((event: gapi.drive.realtime.ValuesAddedEvent<ChangeRecord>) => {
			console.log('Changes by others.  BaseModelEvent Type: ' + event.type);

			if (event.isLocal) {
				return;
			}

			if (event.target !== changeList) {
				throw generateException('List cleaned up on an unexpected target', Operation.CHANGES_ADDED_BY_OTHERS, event);
			}

			if (event.movedFromIndex === 0 || event.movedFromIndex || event.movedFromList) {
				throw generateException('List cleaned up is a move operation', Operation.CHANGES_ADDED_BY_OTHERS, event);
			}

			event.stopPropagation();
			let iterator = new GoogleChangeRecordIterator(changeList, event, event.index);

			changesAddedSubject.next(iterator);
		});

		return changesAddedSubject;
	}

	private subscribeToCleanupByOwner(
		document: gapi.drive.realtime.Document,
		iAmTheOwner: boolean
	): ISubject<GoogleChangeRecordIterator> {
		let valuesRemovedSubject = new (DI.db().getSync(RXJS).Subject)<gapi.drive.realtime.ValuesRemovedEvent<ChangeRecord>>();
		let changeList           = this.googleRealtime.getChangeList(document);
		this.googleRealtime.subscribeToValuesRemoved(changeList, valuesRemovedSubject);

		let changesRemovedSubject = new (DI.db().getSync(RXJS).Subject)<GoogleChangeRecordIterator>();

		valuesRemovedSubject.subscribe((event: gapi.drive.realtime.ValuesRemovedEvent<ChangeRecord>) => {
			console.log('Clean-up by owner.  BaseModelEvent Type: ' + event.type);

			if (event.isLocal) {
				if (iAmTheOwner) {
					return;
				}
				throw generateException('List cleaned up by non-owner', Operation.CLEAUP_BY_OWNER, event);
			}
			if (event.target !== changeList) {
				throw generateException('List cleaned up on an unexpected target', Operation.CLEAUP_BY_OWNER, event);
			}

			if (event.movedToIndex === 0 || event.movedToIndex || event.movedToList) {
				throw generateException('List cleaned up is a move operation', Operation.CLEAUP_BY_OWNER, event);
			}

			if (event.index !== 0) {
				throw generateException('List cleaned up from invalid index: ' + event.index, Operation.CLEAUP_BY_OWNER, event);
			}

			event.stopPropagation();
			let iterator = new GoogleChangeRecordIterator(changeList, event);

			changesRemovedSubject.next(iterator);
		});

		return changesRemovedSubject;
	}

	private subscribeToUnexpectedModifications(
		changeList: gapi.drive.realtime.CollaborativeList<ChangeRecord>,
		document: gapi.drive.realtime.Document
	): ISubject<GoogleRealtimeAdaptorException> {
		let valuesRemovedSubject = new (DI.db().getSync(RXJS).Subject)<gapi.drive.realtime.ObjectChangedEvent>();
		this.googleRealtime.subscribeToAnyObjectChanged(document, valuesRemovedSubject);

		let changesRemovedSubject = new (DI.db().getSync(RXJS).Subject)<GoogleRealtimeAdaptorException>();
		valuesRemovedSubject.subscribe((event) => {
			let message = 'Unexpected change - ';
			if (!event.events) {
				message += ' target events not found';
			} else if (event.events.length !== 1) {
				message += ' unexpected number of target events: ' + event.events.length;
			} else {
				let causingEvent = event.events[0];
				if (causingEvent.target !== changeList) {
					message += ' unexpected target';
				}
				switch (causingEvent.type) {
					case gapi.drive.realtime.EventType.VALUES_ADDED:
					case gapi.drive.realtime.EventType.VALUES_REMOVED:
						return;
					default:
						message += 'unexpected event type: ' + causingEvent.type;
				}
			}
			let exception = new GoogleRealtimeAdaptorException(message, null, event);
			changesRemovedSubject.next(exception);
		});

		return changesRemovedSubject;
	}

}
