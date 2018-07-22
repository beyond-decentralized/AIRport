"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terminal_map_1 = require("@airport/terminal-map");
const rxjs_1 = require("rxjs");
/**
 * Created by Papa on 12/14/2016.
 */
class StubChangeList {
    constructor(shareInfo, platformInfo) {
        this.shareInfo = shareInfo;
        this.platformInfo = platformInfo;
        this._errorSubject = new rxjs_1.Subject();
        this._changesAddedRemotelySubject = new rxjs_1.Subject();
    }
    async loadFromRecord(changeRecord) {
        return new terminal_map_1.ArrayChangeRecordIterator([]);
    }
    async addChanges(changeRecords) {
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