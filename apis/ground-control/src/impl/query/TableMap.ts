import {TableIndex}      from "../../lingo/schema/Entity";
import {ColumnIndex}     from "../../lingo/schema/Property";
import {SchemaVersionId} from "../../lingo/schema/Schema";
import {ColumnMap}       from "./ColumnMap";

/**
 * Created by Papa on 9/10/2016.
 */

export const ALL_TABLE_COLUMNS = 'A';

export class TableMap {

	constructor(
		public schemaVersionId: SchemaVersionId,
		public tableMap: { [tableIndex: string]: ColumnMap } = {}
	) {
	}

	ensure(
		tableIndex: TableIndex,
		allColumns: boolean = false,
		ColumnMapConstructor = ColumnMap,
	): ColumnMap {
		let tableColumnMap = this.tableMap[tableIndex];
		if (!tableColumnMap) {
			tableColumnMap = new ColumnMapConstructor(tableIndex, allColumns);
			this.tableMap[tableIndex] = tableColumnMap;
		}

		return tableColumnMap;
	}

	existsByStructure(
		tableIndex: TableIndex,
		columnIndex: ColumnIndex
	): boolean {
		let tableColumnMap = this.tableMap[tableIndex];
		if (!tableColumnMap) {
			return false;
		}
		return !!tableColumnMap.columnMap[columnIndex];
	}

}
