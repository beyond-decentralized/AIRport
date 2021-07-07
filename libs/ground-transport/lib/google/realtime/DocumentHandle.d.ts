/// <reference types="google-drive-realtime-api" />
import { ChangeRecord } from '@airport/terminal-map';
import { Subject } from 'rxjs';
import { GoogleChangeRecordIterator, GoogleRealtimeAdaptorException } from './GoogleRealtimeAdaptor';
/**
 * Created by Papa on 1/10/2016.
 */
export declare class DocumentHandle {
    private document;
    changeList: gapi.drive.realtime.CollaborativeList<any>;
    valuesAddedSubject: Subject<GoogleChangeRecordIterator>;
    private valuesArchivedSubject;
    otherChangesSubject: Subject<GoogleRealtimeAdaptorException>;
    constructor(document: gapi.drive.realtime.Document, changeList: gapi.drive.realtime.CollaborativeList<any>, valuesAddedSubject: Subject<GoogleChangeRecordIterator>, valuesArchivedSubject: Subject<GoogleChangeRecordIterator>, otherChangesSubject: Subject<GoogleRealtimeAdaptorException>);
    addChangeRecord(changeRecord: ChangeRecord): Promise<any>;
    addChangeRecords(changeRecords: ChangeRecord[]): Promise<void>;
}
//# sourceMappingURL=DocumentHandle.d.ts.map