/**
 * Created by Papa on 1/6/2016.
 */
/// <reference types="google-drive-realtime-api" />
import { ChangeRecord } from "@airport/terminal-map";
import { Subject } from 'rxjs';
import { GoogleDrive } from '../drive/GoogleDrive';
import { DriveResponse } from '../drive/GoogleDriveModel';
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