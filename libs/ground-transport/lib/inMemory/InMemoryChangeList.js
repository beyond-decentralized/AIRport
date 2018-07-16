"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_map_1 = require("@airport/terminal-map");
const Subject_1 = require("rxjs/Subject");
/**
 * Created by Papa on 11/26/2016.
 */
class InMemoryChangeList {
    constructor(shareInfo, platformInfo, changeStore) {
        this.shareInfo = shareInfo;
        this.platformInfo = platformInfo;
        this.changeStore = changeStore;
        this._errorSubject = new Subject_1.Subject();
        this._changesAddedRemotelySubject = new Subject_1.Subject();
        changeStore.getChangesAddedSubject(this.shareInfo.name).subscribe((changeRecords) => {
            let remotelyAddedChanges = changeRecords.filter(changeRecord => changeRecord[platformInfo.dbIdField] !== shareInfo.dbId);
            if (remotelyAddedChanges.length) {
                this._changesAddedRemotelySubject.next(new terminal_map_1.ArrayChangeRecordIterator(remotelyAddedChanges));
            }
        });
    }
    loadFromRecord(changeRecord) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    addChanges(changeRecords) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.changeStore.addChanges(this.shareInfo.name, changeRecords);
        });
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