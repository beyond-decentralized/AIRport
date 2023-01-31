import { DbEntity_TableIndex } from "../../definition/application/DbEntity";
import { ColumnMap } from "../query/ColumnMap";

export class SyncColumnMap extends ColumnMap {

	constructor(
		entityIndex: DbEntity_TableIndex,
		allColumns: boolean = false
	) {
		super(entityIndex, allColumns);
	}

}
globalThis.SyncColumnMap = SyncColumnMap
