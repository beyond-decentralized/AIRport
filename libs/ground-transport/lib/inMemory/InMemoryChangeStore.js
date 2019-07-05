"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observe_1 = require("@airport/observe");
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
            throw new Error(`Change List '${changeListName}' already exists`);
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
            changesAddedSubject = new observe_1.Subject();
            this._changesAddedSubjectMap[changeListName] = changesAddedSubject;
        }
        return changesAddedSubject;
    }
}
exports.InMemoryChangeStore = InMemoryChangeStore;
//# sourceMappingURL=InMemoryChangeStore.js.map