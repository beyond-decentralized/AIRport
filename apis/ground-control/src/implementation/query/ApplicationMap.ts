import {
	DbEntity,
	DbEntity_TableIndex
} from "../../definition/application/DbEntity";
import { DbColumn_Index } from "../../definition/application/DbProperty";
import { DbApplicationVersion_LocalId } from "../../definition/application/DbApplication";
import { ColumnMap } from "./ColumnMap";
import { TableMap } from "./TableMap";

export class ApplicationMap {

	constructor(
		public applicationMap: { [applicationVersion_localId: string]: TableMap } = {}
	) {
	}

	ensureEntity(
		entity: DbEntity,
		allColumns: boolean = false,
		TableMapConstructor = TableMap
	): ColumnMap {
		return this.ensure(entity.applicationVersion._localId, entity.index, allColumns, TableMapConstructor);
	}

	ensure(
		applicationVersionLocalId: DbApplicationVersion_LocalId,
		tableIndex: DbEntity_TableIndex,
		allColumns: boolean = false,
		TableMapConstructor = globalThis.TableMap as typeof TableMap
	): ColumnMap {
		let tableMap = this.applicationMap[applicationVersionLocalId];
		if (!tableMap) {
			tableMap = new TableMapConstructor(applicationVersionLocalId);
			this.applicationMap[applicationVersionLocalId] = tableMap;
		}

		return tableMap.ensure(tableIndex, allColumns);
	}

	existsByStructure(
		applicationVersionLocalId: DbApplicationVersion_LocalId,
		tableIndex: DbEntity_TableIndex,
		columnIndex: DbColumn_Index
	): boolean {
		let tableMap = this.applicationMap[applicationVersionLocalId];
		if (!tableMap) {
			return false;
		}
		return tableMap.existsByStructure(tableIndex, columnIndex);
	}

}
globalThis.ApplicationMap = ApplicationMap
