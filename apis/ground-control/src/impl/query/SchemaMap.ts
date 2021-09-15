import {
	DbEntity,
	TableIndex
} from "../../lingo/schema/Entity";
import { ColumnIndex } from "../../lingo/schema/Property";
import { SchemaIndex } from "../../lingo/schema/Schema";
import { ColumnMap } from "./ColumnMap";
import { TableMap } from "./TableMap";

export class SchemaMap {

	constructor(
		public schemaMap: { [schemaVersionId: string]: TableMap } = {}
	) {
	}

	ensureEntity(
		entity: DbEntity,
		allColumns: boolean = false,
		TableMapConstructor = TableMap
	): ColumnMap {
		return this.ensure(entity.schemaVersion.id, entity.index, allColumns, TableMapConstructor);
	}

	ensure(
		schemaIndex: SchemaIndex,
		tableIndex: TableIndex,
		allColumns: boolean = false,
		TableMapConstructor = TableMap
	): ColumnMap {
		let tableMap = this.schemaMap[schemaIndex];
		if (!tableMap) {
			tableMap = new TableMapConstructor(schemaIndex);
			this.schemaMap[schemaIndex] = tableMap;
		}

		return tableMap.ensure(tableIndex, allColumns);
	}

	existsByStructure(
		schemaIndex: SchemaIndex,
		tableIndex: TableIndex,
		columnIndex: ColumnIndex
	): boolean {
		let tableMap = this.schemaMap[schemaIndex];
		if (!tableMap) {
			return false;
		}
		return tableMap.existsByStructure(tableIndex, columnIndex);
	}

}