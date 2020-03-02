"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Papa on 1/10/2016.
 */
const observe_1 = require("@airport/observe");
const terminal_map_1 = require("@airport/terminal-map");
class GoogleSharedChangeList {
    constructor(platformInfo, shareInfo, handle) {
        this.platformInfo = platformInfo;
        this.shareInfo = shareInfo;
        this.handle = handle;
    }
    loadFromRecord(changeRecord) {
        return new Promise((resolve, reject) => {
            let allCurrentChangeRecords = this.handle.changeList.asArray();
            if (!changeRecord) {
                resolve(new terminal_map_1.ArrayChangeRecordIterator(allCurrentChangeRecords));
            }
            let id = this.platformInfo.recordIdField;
            for (let i = 0; i < allCurrentChangeRecords.length; i++) {
                let currentRecord = allCurrentChangeRecords[i];
                if (currentRecord[id] === changeRecord[id]) {
                    resolve(new terminal_map_1.ArrayChangeRecordIterator(allCurrentChangeRecords, i + 1));
                }
            }
            reject(`Change record not found. ID: ${changeRecord[id]}.`);
        });
    }
    async addChanges(changeRecords) {
        await this.handle.addChangeRecords(changeRecords);
    }
    errorSubject() {
        let errorSubject = new observe_1.Subject();
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
exports.GoogleSharedChangeList = GoogleSharedChangeList;
//# sourceMappingURL=GoogleSharedChangeList.js.map