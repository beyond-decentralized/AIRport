import { ColumnIndex, ApplicationIndex, TableIndex } from '@airport/ground-control';
export declare type SequenceIncrementBy = number;
export declare type SequenceCurrentValue = number;
export declare class Sequence {
    applicationIndex: ApplicationIndex;
    tableIndex: TableIndex;
    columnIndex: ColumnIndex;
    incrementBy: SequenceIncrementBy;
    currentValue: SequenceCurrentValue;
}
//# sourceMappingURL=Sequence.d.ts.map