import {ApplicationEntity_TableIndex}        from "../../definition/application/Entity";
import {ApplicationColumn_Index}       from "../../definition/application/Property";
import {ALL_TABLE_COLUMNS} from "./TableMap";

export class ColumnMap {
	columnMap: { [columnIndex: string]: boolean } = {};

	constructor(
		public tableIndex: ApplicationEntity_TableIndex,
		allColumns: boolean = false
	) {
		if (allColumns) {
			this.columnMap[ALL_TABLE_COLUMNS] = true;
		}
	}

	ensure(columnIndex: ApplicationColumn_Index): void {
		this.columnMap[columnIndex] = true;
	}

}