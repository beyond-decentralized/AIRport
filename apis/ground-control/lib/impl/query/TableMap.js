"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ColumnMap_1 = require("./ColumnMap");
/**
 * Created by Papa on 9/10/2016.
 */
exports.ALL_TABLE_COLUMNS = 'A';
class TableMap {
    constructor(schemaVersionId, tableMap = {}) {
        this.schemaVersionId = schemaVersionId;
        this.tableMap = tableMap;
    }
    ensure(tableIndex, allColumns = false, ColumnMapConstructor = ColumnMap_1.ColumnMap) {
        let tableColumnMap = this.tableMap[tableIndex];
        if (!tableColumnMap) {
            tableColumnMap = new ColumnMapConstructor(tableIndex, allColumns);
            this.tableMap[tableIndex] = tableColumnMap;
        }
        return tableColumnMap;
    }
    existsByStructure(tableIndex, columnIndex) {
        let tableColumnMap = this.tableMap[tableIndex];
        if (!tableColumnMap) {
            return false;
        }
        return !!tableColumnMap.columnMap[columnIndex];
    }
}
exports.TableMap = TableMap;
//# sourceMappingURL=TableMap.js.map