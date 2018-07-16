/**
 * Created by Papa on 1/6/2016.
 */
import { GoogleDrive } from '../drive/GoogleDrive';
import { Subject } from 'rxjs/Subject';
import { DriveResponse } from '../drive/GoogleDriveModel';
import { ChangeRecord } from "@airport/terminal-map";
export declare class GoogleRealtime {
    private googleDrive;
    constructor(googleDrive: GoogleDrive);
    findOrCreateFileUniqueFile(fileName: string, folderId: string): Promise<DriveResponse>;
    initializeFile(fileId: string): Promise<gapi.drive.realtime.Document>;
    createInMemoryDocument(): gapi.drive.realtime.Document;
    private initializeModel;
    getChangeList(document: gapi.drive.realtime.Document): gapi.drive.realtime.CollaborativeList<ChangeRecord>;
    loadFile(fileId: string): Promise<gapi.drive.realtime.Document>;
    subscribeToValuesAdded(list: gapi.drive.realtime.CollaborativeList<ChangeRecord>, subject: Subject<gapi.drive.realtime.BaseModelEvent>): void;
    subscribeToValuesRemoved(list: gapi.drive.realtime.CollaborativeList<ChangeRecord>, subject: Subject<gapi.drive.realtime.BaseModelEvent>): void;
    subscribeToAnyObjectChanged(document: gapi.drive.realtime.Document, subject: Subject<gapi.drive.realtime.BaseModelEvent>): void;
}
