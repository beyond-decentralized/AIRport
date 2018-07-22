"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
/**
 * Created by Papa on 12/14/2016.
 */
class InMemoryChangeStore {
    constructor() {
        this.changeListMap = {};
        this._changesAddedSubjectMap = {};
    }
    addChangeList(changeListName) {
        if (this.changeListMap[changeListName]) {
            throw `Change List '${changeListName}' already exists`;
        }
        this.changeListMap[changeListName] = [];
    }
    async addChanges(changeListName, changeRecords) {
        this.changeListMap[changeListName] = this.changeListMap[changeListName].concat(changeRecords);
        let changesAddedSubject = this._changesAddedSubjectMap[changeListName];
        if (changesAddedSubject) {
            changesAddedSubject.next(changeRecords);
        }
    }
    getChangeListInfos() {
        let changeListInfos = [];
        for (let changeListName in this.changeListMap) {
            changeListInfos.push({
                name: changeListName,
                dbId: null
            });
        }
        return changeListInfos;
    }
    getAllChanges(changeListName) {
        return this.changeListMap[changeListName];
    }
    getChangesAddedSubject(changeListName) {
        let changesAddedSubject = this._changesAddedSubjectMap[changeListName];
        if (!changesAddedSubject) {
            changesAddedSubject = new rxjs_1.Subject();
            this._changesAddedSubjectMap[changeListName] = changesAddedSubject;
        }
        return changesAddedSubject;
    }
}
exports.InMemoryChangeStore = InMemoryChangeStore;
//# sourceMappingURL=InMemoryChangeStore.js.map