import { DbEntity_TableIndex } from "../../definition/application/DbEntity";
import { DbColumn_Index } from "../../definition/application/DbProperty";

export class ColumnMap {
	columnMap: { [columnIndex: DbColumn_Index]: boolean } = {};

	constructor(
		public entityIndex: DbEntity_TableIndex,
		allColumns: boolean = false
	) {
		if (allColumns) {
			this.columnMap[globalThis.ALL_TABLE_COLUMNS] = true;
		}
	}

	ensure(columnIndex: DbColumn_Index): void {
		this.columnMap[columnIndex] = true;
	}

}
globalThis.ColumnMap = ColumnMap
