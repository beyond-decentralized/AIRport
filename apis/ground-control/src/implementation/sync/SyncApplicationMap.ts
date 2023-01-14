import { DbEntity } from "../../definition/application/Entity";
import { ApplicationMap } from "../query/ApplicationMap";
import { TableMap } from "../query/TableMap";
import { SyncColumnMap } from "./SyncColumnMap";
import { SyncTableMap } from "./SyncTableMap";

export class SyncApplicationMap extends ApplicationMap {

	constructor(
		applicationMap?: { [applicationIndex: string]: TableMap }
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
		applicationMap: ApplicationMap
	): boolean {
		for (const applicationIndex in this.applicationMap) {
			if (applicationMap.applicationMap[applicationIndex]) {
				const syncTableMap: SyncTableMap = new globalThis.SyncTableMap(
					parseInt(applicationIndex), this.applicationMap[applicationIndex].tableMap);
				if (syncTableMap.intersects(applicationMap.applicationMap[applicationIndex])) {
					return true;
				}
			}
		}
		return false;
	}

}
globalThis.SyncApplicationMap = SyncApplicationMap
