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
/**
 * Created by Papa on 1/10/2016.
 */
const terminal_map_1 = require("@airport/terminal-map");
const rxjs_1 = require("rxjs");
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
    addChanges(changeRecords) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.handle.addChangeRecords(changeRecords);
        });
    }
    errorSubject() {
        let errorSubject = new rxjs_1.Subject();
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