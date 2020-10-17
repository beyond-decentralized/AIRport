/// <reference types="google-drive-realtime-api" />
import { ChangeRecord } from '@airport/terminal-map';
import { ISubject } from '@airport/observe';
import { GoogleChangeRecordIterator, GoogleRealtimeAdaptorException } from './GoogleRealtimeAdaptor';
/**
 * Created by Papa on 1/10/2016.
 */
export declare class DocumentHandle {
    private document;
    changeList: gapi.drive.realtime.CollaborativeList<any>;
    valuesAddedSubject: ISubject<GoogleChangeRecordIterator>;
    private valuesArchivedSubject;
    otherChangesSubject: ISubject<GoogleRealtimeAdaptorException>;
    constructor(document: gapi.drive.realtime.Document, changeList: gapi.drive.realtime.CollaborativeList<any>, valuesAddedSubject: ISubject<GoogleChangeRecordIterator>, valuesArchivedSubject: ISubject<GoogleChangeRecordIterator>, otherChangesSubject: ISubject<GoogleRealtimeAdaptorException>);
    addChangeRecord(changeRecord: ChangeRecord): Promise<any>;
    addChangeRecords(changeRecords: ChangeRecord[]): Promise<void>;
}
//# sourceMappingURL=DocumentHandle.d.ts.map