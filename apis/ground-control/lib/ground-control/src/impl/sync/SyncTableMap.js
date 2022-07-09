import { ALL_TABLE_COLUMNS, TableMap } from "../query/TableMap";
import { SyncColumnMap } from "./SyncColumnMap";
/**
 * Created by Papa on 10/7/2016.
 */
export class SyncTableMap extends TableMap {
    constructor(applicationIndex, tableMap) {
        super(applicationIndex, tableMap);
    }
    ensureEntity(tableIndex, allColumns = false) {
        return super.ensure(tableIndex, allColumns, SyncColumnMap);
    }
    intersects(columnMap) {
        for (let tableIndex in this.tableMap) {
            if (columnMap.tableMap[tableIndex]) {
                let tableColumnMap = this.tableMap[tableIndex];
                let otherTableColumnMap = columnMap.tableMap[tableIndex];
                if (tableColumnMap[ALL_TABLE_COLUMNS] || tableColumnMap[ALL_TABLE_COLUMNS]) {
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
//# sourceMappingURL=SyncTableMap.js.map