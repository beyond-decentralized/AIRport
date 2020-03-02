"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TableMap_1 = require("../query/TableMap");
const SyncColumnMap_1 = require("./SyncColumnMap");
/**
 * Created by Papa on 10/7/2016.
 */
class SyncTableMap extends TableMap_1.TableMap {
    constructor(schemaVersionId, tableMap) {
        super(schemaVersionId, tableMap);
    }
    ensureEntity(tableIndex, allColumns = false) {
        return super.ensure(tableIndex, allColumns, SyncColumnMap_1.SyncColumnMap);
    }
    intersects(columnMap) {
        for (let tableIndex in this.tableMap) {
            if (columnMap.tableMap[tableIndex]) {
                let tableColumnMap = this.tableMap[tableIndex];
                let otherTableColumnMap = columnMap.tableMap[tableIndex];
                if (tableColumnMap[TableMap_1.ALL_TABLE_COLUMNS] || tableColumnMap[TableMap_1.ALL_TABLE_COLUMNS]) {
                    return true;
                }
                for (let columnIndex in tableColumnMap.columnMap) {
                    if (otherTableColumnMap.columnMap[columnIndex]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
exports.SyncTableMap = SyncTableMap;
//# sourceMappingURL=SyncTableMap.js.map