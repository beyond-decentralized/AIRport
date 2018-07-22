/// <reference types="google-drive-realtime-api" />
import { GoogleRealtime } from './GoogleRealtime';
import { ChangeRecord, ChangeRecordIterator } from '@airport/terminal-map';
import { DocumentHandle } from './DocumentHandle';
/**
 * Created by Papa on 1/7/2016.
 */
export declare enum Operation {
    CHANGES_ADDED_BY_OTHERS = 0,
    CLEAUP_BY_OWNER = 1,
    GET_NEXT_CHANGE = 2,
}
export declare class GoogleRealtimeAdaptorException {
    message: string;
    operation: Operation;
    event: gapi.drive.realtime.BaseModelEvent;
    exception: any;
    constructor(message: string, operation: Operation, event: gapi.drive.realtime.BaseModelEvent, exception?: any);
}
export declare class GoogleChangeRecordIterator implements ChangeRecordIterator {
    private changeList;
    private event;
    private nextIndex;
    private nextValue;
    constructor(changeList: gapi.drive.realtime.CollaborativeList<ChangeRecord>, event: gapi.drive.realtime.BaseModelEvent, nextIndex?: number);
    next(): ChangeRecord;
    hasNext(): boolean;
}
export declare class GoogleRealtimeAdaptor {
    private googleRealtime;
    constructor(googleRealtime: GoogleRealtime);
    startTest(): DocumentHandle;
    startNewShare(fileId: string): Promise<DocumentHandle>;
    private createDocumentHandle(document);
    private subscribeToChangesAddedByOthers(document);
    private subscribeToCleanupByOwner(document, iAmTheOwner);
    private subscribeToUnexpectedModifications(changeList, document);
    openShare(fileId: string): Promise<DocumentHandle>;
}
