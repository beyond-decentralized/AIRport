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
            throw `Change List '${changeListName}' already exists`;
        }
        this.changeListMap[changeListName] = [];
    }
    addChanges(changeListName, changeRecords) {
        return __awaiter(this, void 0, void 0, function* () {
            this.changeListMap[changeListName] = this.changeListMap[changeListName].concat(changeRecords);
            let changesAddedSubject = this._changesAddedSubjectMap[changeListName];
            if (changesAddedSubject) {
                changesAddedSubject.next(changeRecords);
            }
        });
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
            changesAddedSubject = new Subject_1.Subject();
            this._changesAddedSubjectMap[changeListName] = changesAddedSubject;
        }
        return changesAddedSubject;
    }
}
exports.InMemoryChangeStore = InMemoryChangeStore;
//# sourceMappingURL=InMemoryChangeStore.js.map