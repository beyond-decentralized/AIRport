import { TableIndex } from "../../lingo/application/Entity";
import { ColumnIndex } from "../../lingo/application/Property";
export declare class ColumnMap {
    tableIndex: TableIndex;
    columnMap: {
        [columnIndex: string]: boolean;
    };
    constructor(tableIndex: TableIndex, allColumns?: boolean);
    ensure(columnIndex: ColumnIndex): void;
}
//# sourceMappingURL=ColumnMap.d.ts.map