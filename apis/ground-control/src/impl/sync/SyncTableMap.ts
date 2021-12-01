import {TableIndex}      from "../../lingo/application/Entity";
import {ApplicationIndex} from "../../lingo/application/Application";
import {ColumnMap}       from "../query/ColumnMap";
import {
	ALL_TABLE_COLUMNS,
	TableMap
}                        from "../query/TableMap";
import {SyncColumnMap}   from "./SyncColumnMap";

/**
 * Created by Papa on 10/7/2016.
 */

export class SyncTableMap
	extends TableMap {

	constructor(
		applicationIndex: ApplicationIndex,
		tableMap: { [tableIndex: string]: ColumnMap }
	) {
		super(applicationIndex, tableMap);
	}

	ensureEntity(
		tableIndex: TableIndex,
		allColumns: boolean = false
	): SyncColumnMap {
		return super.ensure(tableIndex, allColumns, SyncColumnMap);
	}

	intersects(
		columnMap: TableMap
	): boolean {
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