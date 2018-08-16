import { ColumnIndex, SchemaIndex, TableIndex } from '@airport/ground-control';
export declare type SequenceId = number;
export declare type SequenceIncrementBy = number;
export declare class Sequence {
    id: SequenceId;
    schemaIndex: SchemaIndex;
    tableIndex: TableIndex;
    columnIndex: ColumnIndex;
    incrementBy: SequenceIncrementBy;
}
