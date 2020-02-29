/**
 * Created by Papa on 1/10/2016.
 */
export class DocumentHandle {
    constructor(document, changeList, valuesAddedSubject, valuesArchivedSubject, otherChangesSubject) {
        this.document = document;
        this.changeList = changeList;
        this.valuesAddedSubject = valuesAddedSubject;
        this.valuesArchivedSubject = valuesArchivedSubject;
        this.otherChangesSubject = otherChangesSubject;
    }
    addChangeRecord(changeRecord) {
        return new Promise((resolve, reject) => {
            this.changeList.push(changeRecord);
            resolve();
        });
    }
    addChangeRecords(changeRecords) {
        return new Promise((resolve, reject) => {
            this.changeList.pushAll(changeRecords);
            resolve();
        });
    }
}
//# sourceMappingURL=DocumentHandle.js.map