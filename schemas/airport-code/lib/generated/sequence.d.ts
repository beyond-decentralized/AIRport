export interface ISequence {
    schemaIndex: number;
    tableIndex: number;
    columnIndex: number;
    incrementBy?: number;
    currentValue?: number;
}
