import {TableIndex} from "../../lingo/application/Entity";
import {ColumnMap}  from "../query/ColumnMap";

export class SyncColumnMap extends ColumnMap {

	constructor(
		tableIndex: TableIndex,
		allColumns: boolean = false
	) {
		super(tableIndex, allColumns);
	}

}