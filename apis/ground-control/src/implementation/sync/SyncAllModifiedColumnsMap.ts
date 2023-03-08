import { DbApplication_Index } from "../../definition/application/DbApplication";
import { DbEntity } from "../../definition/application/DbEntity";
import { AllModifiedColumnsMap } from "../query/AllModifiedColumnsMap";
import { TableMap } from "../query/TableMap";
import { SyncColumnMap } from "./SyncColumnMap";
import { SyncTableMap } from "./SyncTableMap";

export class SyncAllModifiedColumnsMap extends AllModifiedColumnsMap {

	constructor(
		applicationMap?: { [applicationIndex: DbApplication_Index]: TableMap }
	) {
		super(applicationMap);
	}

	ensureEntity(
		entity: DbEntity,
		allColumns: boolean = false
	): SyncColumnMap {
		return super.ensureEntity(entity, allColumns,
			globalThis.SyncTableMap as typeof SyncTableMap);
	}

	intersects(
		allModifiedColumnsMap: AllModifiedColumnsMap
	): boolean {
		for (const applicationVersionLocalId in this.applicationMap) {
			if (allModifiedColumnsMap.applicationMap[applicationVersionLocalId]) {
				const syncTableMap: SyncTableMap = new globalThis.SyncTableMap(
					parseInt(applicationVersionLocalId),
					this.applicationMap[applicationVersionLocalId].tableMap);
				if (syncTableMap.intersects(
					allModifiedColumnsMap.applicationMap[applicationVersionLocalId]
				)) {
					return true;
				}
			}
		}
		return false;
	}

	merge(
		allModifiedColumnsMap: AllModifiedColumnsMap
	): void {
		for (const applicationVersionLocalId in allModifiedColumnsMap.applicationMap) {
			const tableMap = this.applicationMap[applicationVersionLocalId]
			const tableMapIn = allModifiedColumnsMap.applicationMap[applicationVersionLocalId]
			if (!tableMap) {
				this.applicationMap[applicationVersionLocalId] = tableMapIn
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
globalThis.SyncAllModifiedColumnsMap = SyncAllModifiedColumnsMap
