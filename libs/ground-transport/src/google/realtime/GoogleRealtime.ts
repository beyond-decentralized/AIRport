/**
 * Created by Papa on 1/6/2016.
 */

import {ISubject}     from '@airport/observe'
import {ChangeRecord} from "@airport/terminal-map";
import {GoogleDrive}  from '../drive/GoogleDrive';
import {
	DriveResponse,
	MimeTypes
}                     from '../drive/GoogleDriveModel';

export class GoogleRealtime {

	constructor(
		private googleDrive: GoogleDrive
	) {
	}

	findOrCreateFileUniqueFile(
		fileName: string,
		folderId: string
	): Promise<DriveResponse> {
		return this.googleDrive.findOrCreateUniqueFile(fileName, MimeTypes.REALTIME, folderId);
	}

	initializeFile(
		fileId: string
	): Promise<gapi.drive.realtime.Document> {
		return this.loadFile(fileId).then((document) => {
			this.initializeModel(document);
			return document;
		});
	}

	createInMemoryDocument(): gapi.drive.realtime.Document {
		let document = gapi.drive.realtime.newInMemoryDocument();
		this.initializeModel(document);

		return document;
	}

	private initializeModel(
		document: gapi.drive.realtime.Document
	): void {
		let model = document.getModel();
		let changeList = model.createList();
		let root = model.getRoot();
		root.set('changeList', changeList);
	}

	getChangeList(
		document: gapi.drive.realtime.Document
	): gapi.drive.realtime.CollaborativeList<ChangeRecord> {
		let changeList = document.getModel().getRoot().get('changeList');

		return changeList;
	}

	loadFile(
		fileId: string
	): Promise<gapi.drive.realtime.Document> {
		return new Promise((
			resolve,
			reject
		) => {
			gapi.drive.realtime.load(fileId, resolve, () => {
			}, reject);
		});
	}

	subscribeToValuesAdded(
		list: gapi.drive.realtime.CollaborativeList<ChangeRecord>,
		subject: ISubject<gapi.drive.realtime.BaseModelEvent>
	): void {
		list.addEventListener(gapi.drive.realtime.EventType.VALUES_ADDED, (event: gapi.drive.realtime.BaseModelEvent) => {
			subject.next(event);
		});
	}

	subscribeToValuesRemoved(
		list: gapi.drive.realtime.CollaborativeList<ChangeRecord>,
		subject: ISubject<gapi.drive.realtime.BaseModelEvent>
	): void {
		list.addEventListener(gapi.drive.realtime.EventType.VALUES_REMOVED, (event) => {
			subject.next(event);
		});
	}

	subscribeToAnyObjectChanged(
		document: gapi.drive.realtime.Document,
		subject: ISubject<gapi.drive.realtime.BaseModelEvent>
	): void {
		document.getModel().getRoot().addEventListener(gapi.drive.realtime.EventType.OBJECT_CHANGED, (event) => {
			subject.next(event);
		});
	}

}