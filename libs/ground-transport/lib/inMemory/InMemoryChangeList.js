import { Subject } from 'rxjs';
import { ArrayChangeRecordIterator } from '@airport/terminal-map';
/**
 * Created by Papa on 11/26/2016.
 */
export class InMemoryChangeList {
    constructor(shareInfo, platformInfo, changeStore) {
        this.shareInfo = shareInfo;
        this.platformInfo = platformInfo;
        this.changeStore = changeStore;
        this._errorSubject = new Subject();
        this._changesAddedRemotelySubject = new Subject();
        changeStore.getChangesAddedSubject(this.shareInfo.name).subscribe((changeRecords) => {
            let remotelyAddedChanges = changeRecords.filter(changeRecord => changeRecord[platformInfo.dbIdField] !== shareInfo.dbId);
            if (remotelyAddedChanges.length) {
                this._changesAddedRemotelySubject.next(new ArrayChangeRecordIterator(remotelyAddedChanges));
            }
        });
    }
    async loadFromRecord(changeRecord) {
        let allCurrentChangeRecords = this.changeStore.getAllChanges(this.shareInfo.name);
        if (!changeRecord) {
            return new ArrayChangeRecordIterator(allCurrentChangeRecords);
        }
        let id = this.platformInfo.recordIdField;
        for (let i = 0; i < allCurrentChangeRecords.length; i++) {
            let currentRecord = allCurrentChangeRecords[i];
            if (currentRecord[id] === changeRecord[id]) {
                return new ArrayChangeRecordIterator(allCurrentChangeRecords, i + 1);
            }
        }
        throw new Error(`Change record not found. ID: ${changeRecord[id]}.`);
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
//# sourceMappingURL=InMemoryChangeList.js.map