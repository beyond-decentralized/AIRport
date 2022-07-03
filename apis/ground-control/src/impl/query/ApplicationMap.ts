import {
	DbEntity,
	ApplicationEntity_TableIndex
} from "../../lingo/application/Entity";
import { ApplicationColumn_Index } from "../../lingo/application/Property";
import { Application_Index } from "../../lingo/application/Application";
import { ColumnMap } from "./ColumnMap";
import { TableMap } from "./TableMap";

export class ApplicationMap {

	constructor(
		public applicationMap: { [applicationVersionId: string]: TableMap } = {}
	) {
	}

	ensureEntity(
		entity: DbEntity,
		allColumns: boolean = false,
		TableMapConstructor = TableMap
	): ColumnMap {
		return this.ensure(entity.applicationVersion.id, entity.index, allColumns, TableMapConstructor);
	}

	ensure(
		applicationIndex: Application_Index,
		tableIndex: ApplicationEntity_TableIndex,
		allColumns: boolean = false,
		TableMapConstructor = TableMap
	): ColumnMap {
		let tableMap = this.applicationMap[applicationIndex];
		if (!tableMap) {
			tableMap = new TableMapConstructor(applicationIndex);
			this.applicationMap[applicationIndex] = tableMap;
		}

		return tableMap.ensure(tableIndex, allColumns);
	}

	existsByStructure(
		applicationIndex: Application_Index,
		tableIndex: ApplicationEntity_TableIndex,
		columnIndex: ApplicationColumn_Index
	): boolean {
		let tableMap = this.applicationMap[applicationIndex];
		if (!tableMap) {
			return false;
		}
		return tableMap.existsByStructure(tableIndex, columnIndex);
	}

}