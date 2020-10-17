export class ArrayChangeRecordIterator {
    constructor(changeRecords, nextIndex = 0) {
        this.changeRecords = changeRecords;
        this.nextIndex = nextIndex;
        this.length = changeRecords.length;
    }
    next() {
        if (!this.hasNext()) {
            throw new Error('No more change records found');
        }
        let nextValue = this.changeRecords[this.nextIndex];
        this.nextIndex++;
        return nextValue;
    }
    hasNext() {
        return this.nextIndex < this.length;
    }
}
//# sourceMappingURL=ArrayChangeRecordIterator.js.map