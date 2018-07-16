"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ArrayChangeRecordIterator {
    constructor(changeRecords, nextIndex = 0) {
        this.changeRecords = changeRecords;
        this.nextIndex = nextIndex;
        this.length = changeRecords.length;
    }
    next() {
        if (!this.hasNext()) {
            throw 'No more change records found';
        }
        let nextValue = this.changeRecords[this.nextIndex];
        this.nextIndex++;
        return nextValue;
    }
    hasNext() {
        return this.nextIndex < this.length;
    }
}
exports.ArrayChangeRecordIterator = ArrayChangeRecordIterator;
//# sourceMappingURL=ArrayChangeRecordIterator.js.map