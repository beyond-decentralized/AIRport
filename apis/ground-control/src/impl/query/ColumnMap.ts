import {TableIndex}        from "../../lingo/schema/Entity";
import {ColumnIndex}       from "../../lingo/schema/Property";
import {ALL_TABLE_COLUMNS} from "./TableMap";

export class ColumnMap {
	columnMap: { [columnIndex: string]: boolean } = {};

	constructor(
		public tableIndex: TableIndex,
		allColumns: boolean = false
	) {
		if (allColumns) {
			this.columnMap[ALL_TABLE_COLUMNS] = true;
		}
	}

	ensure(columnIndex: ColumnIndex): void {
		this.columnMap[columnIndex] = true;
	}

}