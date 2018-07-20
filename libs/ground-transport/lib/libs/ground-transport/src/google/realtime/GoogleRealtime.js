"use strict";
/**
 * Created by Papa on 1/6/2016.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleDriveModel_1 = require("../drive/GoogleDriveModel");
class GoogleRealtime {
    constructor(googleDrive) {
        this.googleDrive = googleDrive;
    }
    findOrCreateFileUniqueFile(fileName, folderId) {
        return this.googleDrive.findOrCreateUniqueFile(fileName, GoogleDriveModel_1.MimeTypes.REALTIME, folderId);
    }
    initializeFile(fileId) {
        return this.loadFile(fileId).then((document) => {
            this.initializeModel(document);
            return document;
        });
    }
    createInMemoryDocument() {
        let document = gapi.drive.realtime.newInMemoryDocument();
        this.initializeModel(document);
        return document;
    }
    initializeModel(document) {
        let model = document.getModel();
        let changeList = model.createList();
        let root = model.getRoot();
        root.set('changeList', changeList);
    }
    getChangeList(document) {
        let changeList = document.getModel().getRoot().get('changeList');
        return changeList;
    }
    loadFile(fileId) {
        return new Promise((resolve, reject) => {
            gapi.drive.realtime.load(fileId, resolve, () => {
            }, reject);
        });
    }
    subscribeToValuesAdded(list, subject) {
        list.addEventListener(gapi.drive.realtime.EventType.VALUES_ADDED, (event) => {
            subject.next(event);
        });
    }
    subscribeToValuesRemoved(list, subject) {
        list.addEventListener(gapi.drive.realtime.EventType.VALUES_REMOVED, (event) => {
            subject.next(event);
        });
    }
    subscribeToAnyObjectChanged(document, subject) {
        document.getModel().getRoot().addEventListener(gapi.drive.realtime.EventType.OBJECT_CHANGED, (event) => {
            subject.next(event);
        });
    }
}
exports.GoogleRealtime = GoogleRealtime;
//# sourceMappingURL=GoogleRealtime.js.map