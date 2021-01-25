/**
 * Created by Papa on 1/10/2016.
 */
import { DI } from '@airport/di';
import { RXJS } from '@airport/observe';
import { ArrayChangeRecordIterator } from '@airport/terminal-map';
export class GoogleSharedChangeList {
    constructor(platformInfo, shareInfo, handle) {
        this.platformInfo = platformInfo;
        this.shareInfo = shareInfo;
        this.handle = handle;
    }
    loadFromRecord(changeRecord) {
        return new Promise((resolve, reject) => {
            let allCurrentChangeRecords = this.handle.changeList.asArray();
            if (!changeRecord) {
                resolve(new ArrayChangeRecordIterator(allCurrentChangeRecords));
            }
            let id = this.platformInfo.recordIdField;
            for (let i = 0; i < allCurrentChangeRecords.length; i++) {
                let currentRecord = allCurrentChangeRecords[i];
                if (currentRecord[id] === changeRecord[id]) {
                    resolve(new ArrayChangeRecordIterator(allCurrentChangeRecords, i + 1));
                }
            }
            reject(`Change record not found. ID: ${changeRecord[id]}.`);
        });
    }
    async addChanges(changeRecords) {
        await this.handle.addChangeRecords(changeRecords);
    }
    errorSubject() {
        let errorSubject = new (DI.db().getSync(RXJS).Subject)();
        this.handle.otherChangesSubject.subscribe((otherChange) => {
            errorSubject.next({
                fatal: true,
                message: otherChange.message
            });
        });
        return errorSubject;
    }
    changesAddedRemotelySubject() {
        return this.handle.valuesAddedSubject;
    }
}
//# sourceMappingURL=GoogleSharedChangeList.js.map