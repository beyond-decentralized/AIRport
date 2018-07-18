"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TableMap_1 = require("./TableMap");
class ColumnMap {
    constructor(tableIndex, allColumns = false) {
        this.tableIndex = tableIndex;
        this.columnMap = {};
        if (allColumns) {
            this.columnMap[TableMap_1.ALL_TABLE_COLUMNS] = true;
        }
    }
    ensure(columnIndex) {
        this.columnMap[columnIndex] = true;
    }
}
exports.ColumnMap = ColumnMap;
//# sourceMappingURL=ColumnMap.js.map