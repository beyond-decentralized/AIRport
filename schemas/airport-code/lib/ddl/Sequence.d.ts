import { ColumnIndex, SchemaIndex, TableIndex } from '@airport/ground-control';
export declare type SequenceIncrementBy = number;
export declare class Sequence {
    schemaIndex: SchemaIndex;
    tableIndex: TableIndex;
    columnIndex: ColumnIndex;
    incrementBy: SequenceIncrementBy;
}
