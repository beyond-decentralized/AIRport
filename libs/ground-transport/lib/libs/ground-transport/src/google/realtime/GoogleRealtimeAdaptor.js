"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const DocumentHandle_1 = require("./DocumentHandle");
/**
 * Created by Papa on 1/7/2016.
 */
var Operation;
(function (Operation) {
    Operation[Operation["CHANGES_ADDED_BY_OTHERS"] = 0] = "CHANGES_ADDED_BY_OTHERS";
    Operation[Operation["CLEAUP_BY_OWNER"] = 1] = "CLEAUP_BY_OWNER";
    Operation[Operation["GET_NEXT_CHANGE"] = 2] = "GET_NEXT_CHANGE";
})(Operation = exports.Operation || (exports.Operation = {}));
class GoogleRealtimeAdaptorException {
    constructor(message, operation, event, exception) {
        this.message = message;
        this.operation = operation;
        this.event = event;
        this.exception = exception;
    }
}
exports.GoogleRealtimeAdaptorException = GoogleRealtimeAdaptorException;
class GoogleChangeRecordIterator {
    constructor(changeList, event, nextIndex = 0) {
        this.changeList = changeList;
        this.event = event;
        this.nextIndex = nextIndex;
    }
    next() {
        if (this.hasNext()) {
            let nextValue = this.nextValue;
            this.nextValue = null;
            this.nextIndex++;
            return nextValue;
        }
        let message = 'Error accessing the changelist at index: ' + this.nextIndex;
        throw generateException(message, Operation.GET_NEXT_CHANGE, this.event);
    }
    hasNext() {
        if (this.nextValue) {
            return true;
        }
        try {
            this.nextValue = this.changeList.get(this.nextIndex);
            return !!this.nextValue;
        }
        catch (exception) {
            return false;
        }
    }
}
exports.GoogleChangeRecordIterator = GoogleChangeRecordIterator;
let generateException = function (message, operation, event, exception) {
    message = message + '.  User ID: ' + event.userId + ', Session ID: ' + event.sessionId;
    return new GoogleRealtimeAdaptorException(message, Operation.CLEAUP_BY_OWNER, event, exception);
};
class GoogleRealtimeAdaptor {
    constructor(googleRealtime) {
        this.googleRealtime = googleRealtime;
    }
    startTest() {
        let document = this.googleRealtime.createInMemoryDocument();
        let eventHub = this.createDocumentHandle(document);
        return eventHub;
    }
    startNewShare(fileId) {
        return this.googleRealtime.initializeFile(fileId).then((document) => {
            let eventHub = this.createDocumentHandle(document);
            return eventHub;
        });
    }
    createDocumentHandle(document) {
        let changeList = this.googleRealtime.getChangeList(document);
        let valuesAddedSubject = this.subscribeToChangesAddedByOthers(document);
        let valuesArchivedSubject = this.subscribeToCleanupByOwner(document, false);
        let otherChangesSubject = this.subscribeToUnexpectedModifications(changeList, document);
        return new DocumentHandle_1.DocumentHandle(document, changeList, valuesAddedSubject, valuesArchivedSubject, otherChangesSubject);
    }
    subscribeToChangesAddedByOthers(document) {
        let valuesAddedSubject = new rxjs_1.Subject();
        let changeList = this.googleRealtime.getChangeList(document);
        this.googleRealtime.subscribeToValuesAdded(changeList, valuesAddedSubject);
        let changesAddedSubject = new rxjs_1.Subject();
        valuesAddedSubject.subscribe((event) => {
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
    subscribeToCleanupByOwner(document, iAmTheOwner) {
        let valuesRemovedSubject = new rxjs_1.Subject();
        let changeList = this.googleRealtime.getChangeList(document);
        this.googleRealtime.subscribeToValuesRemoved(changeList, valuesRemovedSubject);
        let changesRemovedSubject = new rxjs_1.Subject();
        valuesRemovedSubject.subscribe((event) => {
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
    subscribeToUnexpectedModifications(changeList, document) {
        let valuesRemovedSubject = new rxjs_1.Subject();
        this.googleRealtime.subscribeToAnyObjectChanged(document, valuesRemovedSubject);
        let changesRemovedSubject = new rxjs_1.Subject();
        valuesRemovedSubject.subscribe((event) => {
            let message = 'Unexpected change - ';
            if (!event.events) {
                message += ' target events not found';
            }
            else if (event.events.length !== 1) {
                message += ' unexpected number of target events: ' + event.events.length;
            }
            else {
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
    openShare(fileId) {
        return this.googleRealtime.loadFile(fileId).then((document) => {
            let documentHandle = this.createDocumentHandle(document);
            return documentHandle;
        });
    }
}
exports.GoogleRealtimeAdaptor = GoogleRealtimeAdaptor;
//# sourceMappingURL=GoogleRealtimeAdaptor.js.map