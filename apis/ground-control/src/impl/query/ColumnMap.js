import { ALL_TABLE_COLUMNS } from "./TableMap";
export class ColumnMap {
    constructor(tableIndex, allColumns = false) {
        this.tableIndex = tableIndex;
        this.columnMap = {};
        if (allColumns) {
            this.columnMap[ALL_TABLE_COLUMNS] = true;
        }
    }
    ensure(columnIndex) {
        this.columnMap[columnIndex] = true;
    }
}
//# sourceMappingURL=ColumnMap.js.map