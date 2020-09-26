import { ChangeRecord, ChangeRecordIterator } from './ChangeModel';
export declare class ArrayChangeRecordIterator implements ChangeRecordIterator {
    private changeRecords;
    private nextIndex;
    length: number;
    constructor(changeRecords: ChangeRecord[], nextIndex?: number);
    next(): ChangeRecord;
    hasNext(): boolean;
}
//# sourceMappingURL=ArrayChangeRecordIterator.d.ts.map