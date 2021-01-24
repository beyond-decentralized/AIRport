import { DI } from '@airport/di';
import { RXJS } from '@airport/ground-control';
import { ArrayChangeRecordIterator } from "@airport/terminal-map";
/**
 * Created by Papa on 12/14/2016.
 */
export class StubChangeList {
    constructor(shareInfo, platformInfo) {
        this.shareInfo = shareInfo;
        this.platformInfo = platformInfo;
        this._errorSubject = new (DI.db().getSync(RXJS).Subject)();
        this._changesAddedRemotelySubject = new (DI.db().getSync(RXJS).Subject)();
    }
    async loadFromRecord(changeRecord) {
        return new ArrayChangeRecordIterator([]);
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
//# sourceMappingURL=StubChangeList.js.map