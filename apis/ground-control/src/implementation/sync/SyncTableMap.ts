import { DbEntity_TableIndex } from "../../definition/application/DbEntity";
import { Application_Index } from "../../definition/application/IApplication";
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
		applicationIndex: Application_Index,
		tableMap: { [entityIndex: string]: ColumnMap }
	) {
		super(applicationIndex, tableMap);
	}

	ensureEntity(
		entityIndex: DbEntity_TableIndex,
		allColumns: boolean = false
	): SyncColumnMap {
		return super.ensure(entityIndex, allColumns,
			globalThis.SyncColumnMap as typeof SyncColumnMap);
	}

	intersects(
		otherTableMap: TableMap
	): boolean {
		for (let entityIndex in this.tableMap) {
			if (otherTableMap.tableMap[entityIndex]) {
				let tableColumnMap = this.tableMap[entityIndex];
				let otherTableColumnMap = otherTableMap.tableMap[entityIndex];
				if (tableColumnMap.columnMap[globalThis.ALL_TABLE_COLUMNS]
					|| otherTableColumnMap.columnMap[globalThis.ALL_TABLE_COLUMNS]) {
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
