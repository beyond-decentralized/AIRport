"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observe_1 = require("@airport/observe");
const terminal_map_1 = require("@airport/terminal-map");
/**
 * Created by Papa on 11/26/2016.
 */
class InMemoryChangeList {
    constructor(shareInfo, platformInfo, changeStore) {
        this.shareInfo = shareInfo;
        this.platformInfo = platformInfo;
        this.changeStore = changeStore;
        this._errorSubject = new observe_1.Subject();
        this._changesAddedRemotelySubject = new observe_1.Subject();
        changeStore.getChangesAddedSubject(this.shareInfo.name).subscribe((changeRecords) => {
            let remotelyAddedChanges = changeRecords.filter(changeRecord => changeRecord[platformInfo.dbIdField] !== shareInfo.dbId);
            if (remotelyAddedChanges.length) {
                this._changesAddedRemotelySubject.next(new terminal_map_1.ArrayChangeRecordIterator(remotelyAddedChanges));
            }
        });
    }
    async loadFromRecord(changeRecord) {
        let allCurrentChangeRecords = this.changeStore.getAllChanges(this.shareInfo.name);
        if (!changeRecord) {
            return new terminal_map_1.ArrayChangeRecordIterator(allCurrentChangeRecords);
        }
        let id = this.platformInfo.recordIdField;
        for (let i = 0; i < allCurrentChangeRecords.length; i++) {
            let currentRecord = allCurrentChangeRecords[i];
            if (currentRecord[id] === changeRecord[id]) {
                return new terminal_map_1.ArrayChangeRecordIterator(allCurrentChangeRecords, i + 1);
            }
        }
        throw `Change record not found. ID: ${changeRecord[id]}.`;
    }
    async addChanges(changeRecords) {
        await this.changeStore.addChanges(this.shareInfo.name, changeRecords);
    }
    errorSubject() {
        return this._errorSubject;
    }
    changesAddedRemotelySubject() {
        return this._changesAddedRemotelySubject;
    }
}
exports.InMemoryChangeList = InMemoryChangeList;
//# sourceMappingURL=InMemoryChangeList.js.map