import { DbEntity_TableIndex } from "../../definition/application/DbEntity";
import { DbColumn_Index } from "../../definition/application/DbProperty";
import { DbApplicationVersion_LocalId } from "../../definition/application/DbApplication";
import { ColumnMap } from "./ColumnMap";

/**
 * Created by Papa on 9/10/2016.
 */

globalThis.ALL_TABLE_COLUMNS = '__ALL_TABLE_COLUMNS__';

export class TableMap {

	constructor(
		public applicationVersionId: DbApplicationVersion_LocalId,
		public tableMap: { [entityIndex: DbEntity_TableIndex]: ColumnMap } = {}
	) {
	}

	ensure(
		entityIndex: DbEntity_TableIndex,
		allColumns: boolean = false,
		ColumnMapConstructor = globalThis.ColumnMap as typeof ColumnMap,
	): ColumnMap {
		let tableColumnMap = this.tableMap[entityIndex];
		if (!tableColumnMap) {
			tableColumnMap = new ColumnMapConstructor(entityIndex, allColumns);
			this.tableMap[entityIndex] = tableColumnMap;
		}

		return tableColumnMap;
	}

	existsByStructure(
		entityIndex: DbEntity_TableIndex,
		columnIndex: DbColumn_Index
	): boolean {
		let tableColumnMap = this.tableMap[entityIndex];
		if (!tableColumnMap) {
			return false;
		}
		return !!tableColumnMap.columnMap[columnIndex];
	}

}
globalThis.TableMap = TableMap
