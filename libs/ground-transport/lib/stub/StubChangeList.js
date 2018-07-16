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
const Subject_1 = require("rxjs/Subject");
const terminal_map_1 = require("@airport/terminal-map");
/**
 * Created by Papa on 12/14/2016.
 */
class StubChangeList {
    constructor(shareInfo, platformInfo) {
        this.shareInfo = shareInfo;
        this.platformInfo = platformInfo;
        this._errorSubject = new Subject_1.Subject();
        this._changesAddedRemotelySubject = new Subject_1.Subject();
    }
    loadFromRecord(changeRecord) {
        return __awaiter(this, void 0, void 0, function* () {
            return new terminal_map_1.ArrayChangeRecordIterator([]);
        });
    }
    addChanges(changeRecords) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    errorSubject() {
        return this._errorSubject;
    }
    changesAddedRemotelySubject() {
        return this._changesAddedRemotelySubject;
    }
}
exports.StubChangeList = StubChangeList;
//# sourceMappingURL=StubChangeList.js.map