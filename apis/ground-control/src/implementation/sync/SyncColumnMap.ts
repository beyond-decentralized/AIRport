import { DbEntity_TableIndex } from "../../definition/application/DbEntity";
import { ColumnMap } from "../query/ColumnMap";

export class SyncColumnMap extends ColumnMap {

	constructor(
		tableIndex: DbEntity_TableIndex,
		allColumns: boolean = false
	) {
		super(tableIndex, allColumns);
	}

}
globalThis.SyncColumnMap = SyncColumnMap
