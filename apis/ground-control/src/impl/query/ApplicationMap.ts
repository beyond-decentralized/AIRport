import {
	DbEntity,
	ApplicationEntity_TableIndex
} from "../../lingo/application/Entity";
import { ApplicationColumn_Index } from "../../lingo/application/Property";
import { ApplicationVersion_LocalId } from "../../lingo/application/Application";
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
		applicationVersionLocalId: ApplicationVersion_LocalId,
		tableIndex: ApplicationEntity_TableIndex,
		allColumns: boolean = false,
		TableMapConstructor = TableMap
	): ColumnMap {
		let tableMap = this.applicationMap[applicationVersionLocalId];
		if (!tableMap) {
			tableMap = new TableMapConstructor(applicationVersionLocalId);
			this.applicationMap[applicationVersionLocalId] = tableMap;
		}

		return tableMap.ensure(tableIndex, allColumns);
	}

	existsByStructure(
		applicationVersionLocalId: ApplicationVersion_LocalId,
		tableIndex: ApplicationEntity_TableIndex,
		columnIndex: ApplicationColumn_Index
	): boolean {
		let tableMap = this.applicationMap[applicationVersionLocalId];
		if (!tableMap) {
			return false;
		}
		return tableMap.existsByStructure(tableIndex, columnIndex);
	}

}