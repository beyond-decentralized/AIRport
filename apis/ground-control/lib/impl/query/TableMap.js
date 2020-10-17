import { ColumnMap } from "./ColumnMap";
/**
 * Created by Papa on 9/10/2016.
 */
export const ALL_TABLE_COLUMNS = 'A';
export class TableMap {
    constructor(schemaVersionId, tableMap = {}) {
        this.schemaVersionId = schemaVersionId;
        this.tableMap = tableMap;
    }
    ensure(tableIndex, allColumns = false, ColumnMapConstructor = ColumnMap) {
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
//# sourceMappingURL=TableMap.js.map