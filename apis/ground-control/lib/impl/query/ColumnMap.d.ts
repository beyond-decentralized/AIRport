import { TableIndex } from "../../lingo/schema/Entity";
import { ColumnIndex } from "../../lingo/schema/Property";
export declare class ColumnMap {
    tableIndex: TableIndex;
    columnMap: {
        [columnIndex: string]: boolean;
    };
    constructor(tableIndex: TableIndex, allColumns?: boolean);
    ensure(columnIndex: ColumnIndex): void;
}
