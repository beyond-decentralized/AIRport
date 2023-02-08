import { DbApplication_Index } from "../../definition/application/DbApplication";
import { DbEntity } from "../../definition/application/DbEntity";
import { ApplicationMap } from "../query/ApplicationMap";
import { TableMap } from "../query/TableMap";
import { SyncColumnMap } from "./SyncColumnMap";
import { SyncTableMap } from "./SyncTableMap";

export class SyncApplicationMap extends ApplicationMap {

	constructor(
		applicationMap?: { [applicationIndex: DbApplication_Index]: TableMap }
	) {
		super(applicationMap);
	}

	ensureEntity(
		entity: DbEntity,
		allColumns: boolean = false
	): SyncColumnMap {
		return super.ensureEntity(entity, allColumns, globalThis.SyncTableMap as typeof SyncTableMap);
	}

	intersects(
		fieldMap: ApplicationMap
	): boolean {
		for (const applicationIndex in this.applicationMap) {
			if (fieldMap.applicationMap[applicationIndex]) {
				const syncTableMap: SyncTableMap = new globalThis.SyncTableMap(
					parseInt(applicationIndex), this.applicationMap[applicationIndex].tableMap);
				if (syncTableMap.intersects(fieldMap.applicationMap[applicationIndex])) {
					return true;
				}
			}
		}
		return false;
	}

	merge(
		fieldMap: ApplicationMap
	): void {
		for (const applicationIndex in fieldMap.applicationMap) {
			const tableMap = this.applicationMap[applicationIndex]
			const tableMapIn = fieldMap.applicationMap[applicationIndex]
			if (!tableMap) {
				this.applicationMap[applicationIndex] = tableMapIn
				continue
			}
			for (const entityIndex in tableMapIn.tableMap) {
				const columnMap = tableMap.tableMap[entityIndex]
				const columnMapIn = tableMapIn.tableMap[entityIndex]
				if (!columnMap) {
					tableMap.tableMap[entityIndex] = columnMapIn
					continue
				}
				for (const columnIndex in columnMapIn.columnMap) {
					columnMap.columnMap[columnIndex] = true
				}
			}
		}
	}

}
globalThis.SyncApplicationMap = SyncApplicationMap
