import { DbEntity_TableIndex } from "../../definition/application/DbEntity";
import { DbApplication_Index } from "../../definition/application/DbApplication";
import { ColumnMap } from "../query/ColumnMap";
import {
	TableMap
} from "../query/TableMap";
import { SyncColumnMap } from "./SyncColumnMap";

/**
 * Created by Papa on 10/7/2016.
 */

export class SyncTableMap
	extends TableMap {

	constructor(
		applicationIndex: DbApplication_Index,
		tableMap: { [tableIndex: string]: ColumnMap }
	) {
		super(applicationIndex, tableMap);
	}

	ensureEntity(
		tableIndex: DbEntity_TableIndex,
		allColumns: boolean = false
	): SyncColumnMap {
		return super.ensure(tableIndex, allColumns,
			globalThis.SyncColumnMap as typeof SyncColumnMap);
	}

	intersects(
		columnMap: TableMap
	): boolean {
		for (let tableIndex in this.tableMap) {
			if (columnMap.tableMap[tableIndex]) {
				let tableColumnMap = this.tableMap[tableIndex];
				let otherTableColumnMap = columnMap.tableMap[tableIndex];
				if (tableColumnMap[globalThis.ALL_TABLE_COLUMNS]
					|| tableColumnMap[globalThis.ALL_TABLE_COLUMNS]) {
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
globalThis.SyncTableMap = SyncTableMap
